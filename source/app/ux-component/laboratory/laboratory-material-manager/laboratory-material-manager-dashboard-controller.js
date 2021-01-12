(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('laboratoryMaterialManagerDashboardCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$filter',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller($mdToast, $filter, LoadingScreenService,
                      ParticipantLaboratoryService, ParticipantManagerService,
                      DialogService, UserAccessPermissionService, LaboratoryViewerService) {
    var self = this;
    self.participantManagerService = ParticipantManagerService;
    self.tubeCode = "";
    self.originalTube = {};
    self.selectedTube = {};
    self.tubeCustomMetadataOptions = null;

    self.$onInit = onInit;
    self.participantManagerService = ParticipantManagerService;
    self.userAccessToLaboratory = "";

    self.isValidCode = isValidCode;
    self.tubeHasCustomMetadata = tubeHasCustomMetadata;
    self.originalTubeHasCode = originalTubeHasCode;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelTube = cancelTube;
    self.saveMetadata = saveMetadata;
    self.updateTubeCustomMetadata = updateTubeCustomMetadata;
    self.isEnterKey = isEnterKey;
    self.saveDynamicMetadata = saveDynamicMetadata;

    function onInit() {
      self.laboratoryExists = false;
      LoadingScreenService.start();
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init, LoadingScreenService.finish);
    }

    function _init(){
      self.laboratoryExists = true;
      _checkingLaboratoryPermission();
      ParticipantManagerService.setup().then(response => {
        self.onReady = true;
        LoadingScreenService.finish();
      });
    }

    function _checkingLaboratoryPermission() {
      return UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userAccessToLaboratory = response;
      });
    }

    function isEnterKey(event,tubeCode) {
      if (event.key === 13) {
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
        return DialogService.showConfirmationDialog(
          'Confirmar cancelamento',
          'Alterações não finalizadas serão descartadas.',
          'Confirmação de cancelamento')
          .then(function() {
            self.originalTube = {};
            self.newTube = {};
          });
      }
    }

    function saveChangedTubes() {
      _updateChangedTubes();
    }

    function _updateCollection(participantLaboratory, tubeStructure) {
      ParticipantLaboratoryService.updateTubeCollectionDataWithRn(participantLaboratory.recruitmentNumber, tubeStructure).then(() => {
        _showToastMsg('salvo com sucesso!');
      }).catch(function (e) {
        _showToastMsg('Falha ao registrar');
      });
    }

    function saveDynamicMetadata() {
      const tubeStructure = {
        tubes: [self.newTube]
      };
      console.log('saveDynamicMetadata')
      console.log(tubeStructure)
      _updateCollection(self.participantLaboratory, tubeStructure)
    }

    function saveMetadata() {
      if (self.newTube.tubeCollectionData.isCollected) {
        const tubeStructure = {
          tubes: [self.newTube]
        };
        _updateCollection(self.participantLaboratory, tubeStructure);
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
      const dynamic = self.newTube.tubeCollectionData.dynamicMetadata
      DialogService.showConfirmationDialog(
        'Confirmar alteração',
        'Deseja salvar as alterações?',
        'Confirmação de finalização')
        .then(function () {
          self.newTube.collect();
          const tubeStructure = {
            tubes: [self.newTube]
          };
          tubeStructure.tubes[0].tubeCollectionData.customMetadata = customMetadata;
          tubeStructure.tubes[0].tubeCollectionData.dynamicMetadata = dynamic;

          ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure)
            .then(function () {
              self.participantLaboratory.updateTubeList();
              _showToastMsg('Registrado com sucesso!');
            })
            .catch(function (e) {
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

  }
}());
