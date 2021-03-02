(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('unattachedLaboratoryCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$timeout',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.laboratory.business.participant.LaboratoryLabelFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.storage.LaboratoryLocalStorageService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller($q,
                      $mdToast,
                      $timeout,
                      DialogShowService,
                      UnattachedLaboratoryService,
                      LaboratoryLabelFactory,
                      LoadingScreenService,
                      LaboratoryConfigurationService,
                      LaboratoryLocalStorageService,
                      LaboratoryViewerService) {
    var self = this;

    const LABORATORY_NOT_FOUND_MESSAGE = "Laboratório não encontrado";
    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";

    self.$onInit = onInit;
    let defer = $q.defer();
    self.labelPromise = defer.promise;
    self.attacheLaboratory = attacheLaboratory;
    self.generateLabels = generateLabels;
    self.discardUnattached = discardUnattached;

    function onInit() {
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(() => {});
    }

    function discardUnattached() {
      showDeleteDialog().then(function () {
        LoadingScreenService.start();
        UnattachedLaboratoryService.discardUnattached(self.laboratoryData._id.$oid).then(function () {
          self.reloadData();
          LoadingScreenService.finish();
        }).catch(function () {
          self.attacheError = (error.data ? LABORATORY_NOT_FOUND_MESSAGE : UNEXPECTED_ERROR_MESSAGE);
          LoadingScreenService.finish();
          _showToast(self.attacheError);
        });
      });
    }

    function generateLabels() {
      LoadingScreenService.start();
      if (self.laboratoryData.tubes) {
        _fillLabels(self.laboratoryData);
      }
      else {
        UnattachedLaboratoryService.getById(self.laboratoryData._id.$oid)
          .then(function (result) {
            _fillLabels(result);
            defer.resolve();
          })
          .catch(function (error) {
            self.attacheError = (error.data ? LABORATORY_NOT_FOUND_MESSAGE : UNEXPECTED_ERROR_MESSAGE);
            LoadingScreenService.finish();
            _showToast(self.attacheError);
          });
      }
      LoadingScreenService.finish();
    }

    function _fillLabels(lab) {
      lab.tubes.map(function(tubeInfo) {
        var tubeDescriptor = LaboratoryConfigurationService.getTubeDescriptor(tubeInfo.type);
        var momentDescriptor = LaboratoryConfigurationService.getMomentDescriptor(tubeInfo.moment);

        tubeInfo.label = tubeDescriptor ? tubeDescriptor.label : '';
        tubeInfo.boxColor = tubeDescriptor ? tubeDescriptor.color : '';
        tubeInfo.momentLabel = momentDescriptor ? ( momentDescriptor.label !== '' ? momentDescriptor.label : 'Nenhum') : "";
        tubeInfo.typeLabel = tubeDescriptor ? tubeDescriptor.label : '';
        return tubeInfo;
      });
      self.labels = LaboratoryLabelFactory.createForUnattached(angular.copy(lab));
      self.labelsWithoutTubes = angular.copy(self.labels);
      self.labelsWithoutTubes.tubes = [];
      self.labels.type = "laboratoryUnattachedLabel";
      LaboratoryLocalStorageService.findAndDeleteLabels({"type": "laboratoryUnattachedLabel"});
      LaboratoryLocalStorageService.findAndDeleteLabels({"type": "laboratoryParticipantLabel"});
    }

    function attacheLaboratory() {
      self.attacheError = null;

      const textDialog = 'Deseja realmente vincular o laboratório código <b>'.concat(self.laboratoryData.identification)
        .concat('</b> ao participante <b>').concat(self.recruitmentNumber)
        .concat('</b><br /><b>O vínculo não poderá ser desfeito.</b>');

      DialogShowService.showConfirmationDialog('Confirmação de Vínculo', textDialog, 'Confirmação de vínculo')
        .then(function () {
          UnattachedLaboratoryService.attacheLaboratoryToParticipant(self.laboratoryData.identification, self.recruitmentNumber)
            .then(function () {
              LoadingScreenService.start();
              self.reloadData();
              LoadingScreenService.finish();
            })
            .catch(function (error) {
              console.info(error)
              if (error.status && error.data && typeof error.data === "object") {
                if (error.status === 404 || (error.status === 400 && error.data.MESSAGE === "Data Validation Fail: java.lang.Throwable: Laboratory not found")) {
                  _showToast("Laboratório não encontrado")
                } else if (error.status === 400 && error.data.MESSAGE === "Data Validation Fail: Laboratory is already attached") {
                  _showToast(`O laboratório ${self.laboratoryData.identification} já foi vinculado a um participante`)
                } else if (error.status === 400 && error.data.MESSAGE === "Data Validation Fail: Invalid configuration") {
                  _showToast(_getErrorMessageForInvalidConfiguration(error.data))
                } else if (error.status === 400 && error.data.MESSAGE === "Data Validation Fail: Participant already have a laboratory") {
                  _showToast(`Participante já possui laboratório`)
                } else if (error.status === 400 && error.data.MESSAGE === "Data Validation Fail: Participant with recruitment number") {
                  _showToast(`Número de recrutamento ${self.recruitmentNumber} não encontrado`)
                } else if (error.status === 400 && error.data.MESSAGE === "Data Validation Fail: Participant not identified") {
                  _showToast("Participante não identificado")
                } else {
                  _showToast(UNEXPECTED_ERROR_MESSAGE);
                }
              } else {
                _showToast(UNEXPECTED_ERROR_MESSAGE);
              }
            });
        });
    }

    function _getErrorMessageForInvalidConfiguration(errorData){
      if (errorData.CONTENT.laboratoryCollectGroup !== errorData.CONTENT.participantCollectGroup) {
        self.attacheError = "O laboratório e o participante devem pertencer ao mesmo grupo de controle de qualidade";
      }
      if (errorData.CONTENT.laboratoryFieldCenter !== errorData.CONTENT.participantFieldCenter) {
        if (self.attacheError) {
          self.attacheError += " e " + "ao mesmo centro"
        } else {
          self.attacheError = "O laboratório e o participante devem pertencer ao mesmo centro";
        }
      }
      return self.attacheError;
    }


    function showDeleteDialog() {
      return DialogShowService.showConfirmationDialog(
        'ATENÇÃO',
        "O laboratório " + self.laboratoryData.identification + " será excluído permanentemente! Deseja realmente excluir?",
        'Confirmação de exclusão'
      );
    }

    function _showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(10000)
      );
    }

  }

}());
