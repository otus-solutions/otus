(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('laboratoryMaterialManagerDashboardCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$filter',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.business.UserAccessPermissionService'
  ];

  function Controller($mdToast, $mdDialog, $filter, LoadingScreenService,
                      ParticipantLaboratoryService, ParticipantManagerService,
                      DialogService, UserAccessPermissionService) {
    var self = this;
    self.participantManagerService = ParticipantManagerService;
    self.tubeCode = "";
    self.originalTube = {};
    self.selectedTube = {};
    self.tubeCustomMetadataOptions = null;

    self.$onInit = onInit;
    self.participantManagerService = ParticipantManagerService
    self.userAccessToLaboratory = "";

    self.isValidCode = isValidCode;
    self.tubeHasCustomMetadata = tubeHasCustomMetadata;
    self.originalTubeHasCode = originalTubeHasCode;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelTube = cancelTube;
    self.saveMetadata = saveMetadata;
    self.updateTubeCustomMetadata = updateTubeCustomMetadata;
    self.isEnterKey = isEnterKey;
    self.updateAliquots = function (){};


    function onInit() {
      LoadingScreenService.start()
      _checkingLaboratoryPermission();
      ParticipantManagerService.setup().then(function (response) {
        self.onReady = true;
        LoadingScreenService.finish()
      });
    }

    function _checkingLaboratoryPermission() {
      return UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userAccessToLaboratory = response;
      });
    }

    function isEnterKey(event,tubeCode) {
      if (event.keyCode === 13) {
        if (tubeCode.length === 9) {
          isValidCode(tubeCode);
        } else {
          _showToastMsg('O tubo deve ter 9 dígitos')
        }
      }
    }

    function isValidCode(tubeCode) {
      if(tubeCode.length === 9) {
        ParticipantLaboratoryService.getLaboratoryByTube(tubeCode, ParticipantManagerService)
          .then(participantLaboratory => {
            self.participantLaboratory = participantLaboratory;
            const foundTube = self.participantLaboratory.tubes.find(tube => {
              return tube.code == tubeCode;
            });
            self.originalTube = angular.copy(foundTube);
            self.newTube = foundTube;
            self.tubeCode = "";

            ParticipantLaboratoryService.getTubeMedataDataByType(self.originalTube.type)
              .then(data => {
                self.tubeCustomMetadataOptions = data.map(obj => angular.extend(obj, obj, {selected: false}));

                if(self.originalTube.tubeCollectionData.customMetadata){
                  self.tubeCustomMetadataOptions
                    .filter(obj => self.originalTube.tubeCollectionData.customMetadata.includes(obj._id))
                    .forEach(obj => obj.selected = true);
                }
                else{
                  self.originalTube.tubeCollectionData.customMetadata = [];
                }
              })
              .catch(e => _showToastMsg('Tipo de tubo não encontrado'));
          })
          .catch(e => _showToastMsg('Tubo ' + tubeCode + ' não encontrado'));
      }
    }

    function tubeHasCustomMetadata(){
      return self.tubeCustomMetadataOptions && self.tubeCustomMetadataOptions.length > 0;
    }

    function originalTubeHasCode(){
      return self.originalTube.hasOwnProperty('code');
    }

    function cancelTube() {
      if(self.originalTubeHasCode()) {
        return DialogService.showDialog(self.confirmCancel).then(function() {
          self.originalTube = {};
          self.newTube = {};
        });
      }
    }

    function saveChangedTubes() {
      _updateChangedTubes();
    }

    function saveMetadata() {
      if (self.newTube.tubeCollectionData.isCollected) {
        const tubeStructure = {
          tubes: [self.newTube]
        };
        ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure).then(() => {
          _showToastMsg('Volume parcial salvo com sucesso!');
        }).catch(function (e) {
          _showToastMsg('Falha ao registrar volume parcial');
        });
      }
    }

    function updateTubeCustomMetadata(option){
      const originalTubeCopy = angular.copy(self.originalTube);

      if(option.selected){
        self.originalTube.pushCustomMetadata(option._id);
      }
      else{
        self.originalTube.removeCustomMetadata(option._id);
      }

      ParticipantLaboratoryService.updateTubeCustomMetadata(self.originalTube)
        .then(response => {})
        .catch(err => {
          self.originalTube = angular.copy(originalTubeCopy);
          _showToastMsg('Falha ao registrar metadado')
        });
    }

    function _updateChangedTubes() {
      const customMetadata = self.originalTube.toJSON().tubeCollectionData.customMetadata;

      DialogService.showDialog(self.confirmFinish).then(function () {
        self.newTube.collect()
        const tubeStructure = {
          tubes: [self.newTube]
        }
        tubeStructure.tubes[0].tubeCollectionData.customMetadata = customMetadata

        ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure).then(function () {
          self.participantLaboratory.updateTubeList();

          _showToastMsg('Registrado com sucesso!');
        }).catch(function (e) {
          _showToastMsg('Falha ao registrar coleta');
        });
      });
    }

    function _showToastMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(1000)
      );
    }

    self.buttons = [
      {
        message: 'Ok',
        action: function () {
          $mdDialog.hide()
        },
        class: 'md-raised md-primary'
      },
      {
        message: 'Voltar',
        action: function () {
          $mdDialog.cancel()
        },
        class: 'md-raised md-no-focus'
      }
    ];

    self.confirmCancel = {
      dialogToTitle: 'Cancelamento',
      titleToText: 'Confirmar cancelamento:',
      textDialog: 'Alterações não finalizadas serão descartadas.',
      ariaLabel: 'Confirmação de cancelamento',
      buttons: self.buttons
    };

    self.confirmFinish = {
      dialogToTitle: 'Salvar',
      titleToText: 'Confirmar alteração:',
      textDialog: 'Deseja salvar as alterações?',
      ariaLabel: 'Confirmação de finalização',
      buttons: self.buttons
    };

  }
}());
