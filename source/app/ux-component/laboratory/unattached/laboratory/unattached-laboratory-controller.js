(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('unattachedLaboratoryCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    '$mdToast',
    '$timeout',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.laboratory.business.participant.LaboratoryLabelFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.configuration.LaboratoryConfigurationService'
  ];

  function Controller($mdDialog, $mdToast, $timeout, DialogShowService, UnattachedLaboratoryService, LaboratoryLabelFactory, LoadingScreenService, LaboratoryConfigurationService) {
    var self = this;
    const LABORATORY_NOT_FOUND_MESSAGE = "Laboratório não encontrado";
    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";


    self.attacheLaboratory = attacheLaboratory;
    self.generateLabels = generateLabels;
    self.discardUnattached = discardUnattached;

    function discardUnattached() {
      showDeleteDialog().then(function () {
        LoadingScreenService.start();
        UnattachedLaboratoryService.discardUnattached(self.laboratoryData._id.$oid).then(function () {
          self.reloadData();
          LoadingScreenService.finish();
        }).catch(function () {
          if (error.data) {
            self.attacheError = LABORATORY_NOT_FOUND_MESSAGE;
          } else {
            self.attacheError = UNEXPECTED_ERROR_MESSAGE;
          }
          LoadingScreenService.finish();
          _showToast(self.attacheError);
        });
      });
    }

    function generateLabels() {
      LoadingScreenService.start();
      if (self.labels) {
        _runLabelMaker();
      } else {
        if (self.laboratoryData.tubes) {
          _fillLabels(self.laboratoryData);
          _runLabelMaker();
        } else {
          UnattachedLaboratoryService.getById(self.laboratoryData._id.$oid).then(function (result) {
            _fillLabels(result);
            _runLabelMaker();
          }).catch(function (error) {
            if (error.data) {
              self.attacheError = "Laboratório não encontrado";
            } else {
              self.attacheError = UNEXPECTED_ERROR_MESSAGE;
            }
            LoadingScreenService.finish();
            _showToast(self.attacheError);
          });
        }
      }
    }

    function _fillLabels(lab) {
      lab.tubes.map(function(tubeInfo) {
        var tubeDescriptor = LaboratoryConfigurationService.getTubeDescriptor(tubeInfo.type);
        var momentDescriptor = LaboratoryConfigurationService.getMomentDescriptor(tubeInfo.moment);

        tubeInfo.label = tubeDescriptor ? tubeDescriptor.label : '';
        tubeInfo.boxColor = tubeDescriptor ? tubeDescriptor.color : '';
        tubeInfo.momentLabel = momentDescriptor.label !== '' ? momentDescriptor.label : 'Nenhum';
        tubeInfo.typeLabel = tubeDescriptor.label;
        return tubeInfo
      });
      self.labels = LaboratoryLabelFactory.createForUnattached(angular.copy(lab));
    }

    function _runLabelMaker() {
      $timeout(function() {
        $(".label-maker-" + self.laboratoryData._id.$oid).find("button").click();
      });
      LoadingScreenService.finish();
    }

    function _showAttacheDialog(msg) {
      var message = msg || 'Deseja realmente vincular este laboratório ao participante? O vínculo não poderá ser desfeito.';

      var _attacheDialog = {
        dialogToTitle:'Vincular Laboratório',
        titleToText:'Confirmação de Vínculo',
        textDialog: message,
        ariaLabel:'Confirmação de vínculo',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          },
          {
            message:'Voltar',
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };

      return DialogShowService.showDialog(_attacheDialog);

    }

    function attacheLaboratory() {
      self.attacheError = null;
      _showAttacheDialog().then(function () {
        LoadingScreenService.start();
        UnattachedLaboratoryService.attacheLaboratoryToParticipant(self.laboratoryData.identification, self.recruitmentNumber).then(function () {
          self.reloadData();
          LoadingScreenService.finish();
        }).catch(function (error) {
          LoadingScreenService.finish();
          if (error.data && typeof error.data === "object") {
            if (error.data.MESSAGE.match("Participant with recruitment number")) {
              self.attacheError = "Numero de recrutamento " + self.recruitmentNumber + " não encontrado";
            } else if (error.data.MESSAGE.match("Participant already have a laboratory")) {
              self.attacheError = "Participante já possui laboratório";
            } else if (error.data.MESSAGE.match("Laboratory is already attached")) {
              self.attacheError = "Laboratório já foi vinculado a um participante";
            } else if (error.data.MESSAGE.match("Participant not identified")) {
              self.attacheError = "Participante não identificado";
            } else if (error.data.MESSAGE.match("Invalid configuration")) {
              if (error.data.CONTENT.laboratoryCollectGroup !== error.data.CONTENT.participantCollectGroup) {
                self.attacheError = "O laboratório e o participante devem pertencer ao mesmo grupo de controle de qualidade";
              }
              if (error.data.CONTENT.laboratoryFieldCenter !== error.data.CONTENT.participantFieldCenter) {
                if (self.attacheError) {
                  self.attacheError += " e " + "ao mesmo centro"
                } else {
                  self.attacheError = "O laboratório e o participante devem pertencer ao mesmo centro";
                }
              }
            } else {
              self.attacheError = UNEXPECTED_ERROR_MESSAGE;
            }
          } else {
            self.attacheError = UNEXPECTED_ERROR_MESSAGE;
          }
          _showToast(self.attacheError);

        });
      }).catch(function () {
      });

    }


    function showDeleteDialog() {
      var message = "O laboratório " + self.laboratoryData.identification + " será excluído permanentemente! Deseja realmente excluir?";

      var _deleteDialog = {
        dialogToTitle:'Exclusão',
        titleToText:'ATENÇÃO',
        textDialog: message,
        ariaLabel:'Confirmação de exclusão',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          },
          {
            message:'Cancelar',
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };
      return DialogShowService.showDialog( _deleteDialog);
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
