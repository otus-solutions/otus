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
  ];

  function Controller($mdToast, $mdDialog, $filter, LoadingScreenService,
                      ParticipantLaboratoryService, ParticipantManagerService,
                      DialogService) {
    var self = this;
    self.participantManagerService = ParticipantManagerService;
    self.tubeCode = "";
    self.originalTube = {};
    self.selectedTube = {};
    self.tubeCustomMetadataOptions = null;
    self.showTubeCustomMetadataOptions = false;

    self.$onInit = onInit;
    self.isValidCode = isValidCode;
    self.tubeHasCustomMetadata = tubeHasCustomMetadata;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelTube = cancelTube;
    self.saveMetadata = saveMetadata;
    self.updateCustomMetadata = updateCustomMetadata;

    function onInit() {
      self.showTubeCustomMetadataOptions = false;
      LoadingScreenService.start();
      ParticipantManagerService.setup().then(function (response) {
        self.onReady = true;
        LoadingScreenService.finish()
      });
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

                if(self.originalTube.customMetadata){
                  self.tubeCustomMetadataOptions
                    .filter(obj => self.originalTube.customMetadata.includes(obj._id))
                    .forEach(obj => obj.selected = true);
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

    function cancelTube() {
      if(self.originalTube.hasOwnProperty('code')) {
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
      if(self.newTube.tubeCollectionData.isCollected) {
        const tubeStructure = {
          tubes: [self.newTube]
        };
        ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure).then(() => {
          _showToastMsg('Volume parcial salvo com sucesso!');
        }).catch(function(e) {
          _showToastMsg('Falha ao registrar volume parcial');
        });
      }
    }

    function updateCustomMetadata(){
      const newTube = angular.copy(self.originalTube);
      newTube.customMetadata = self.tubeCustomMetadataOptions
        .filter(option => option.selected)
        .map(obj => obj._id);

      ParticipantLaboratoryService.updateTubeCustomMetadata(newTube)
        .then(response => {
          self.originalTube.customMetadata = newTube.customMetadata;
        })
        .catch(err => _showToastMsg('Falha ao registrar coleta'));
    }

    function _updateChangedTubes() {
      DialogService.showDialog(self.confirmFinish).then(function() {
        self.newTube.collect();
        const tubeStructure = {
          tubes: [self.newTube]
        };
        ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure).then(function() {
          self.participantLaboratory.updateTubeList();
          _showToastMsg('Registrado com sucesso!');
        }).catch(function(e) {
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
        message:'Ok',
        action:function(){$mdDialog.hide()},
        class:'md-raised md-primary'
      },
      {
        message:'Voltar',
        action:function(){$mdDialog.cancel()},
        class:'md-raised md-no-focus'
      }
    ];

    self.confirmCancel = {
      dialogToTitle:'Cancelamento',
      titleToText:'Confirmar cancelamento:',
      textDialog:'Alterações não finalizadas serão descartadas.',
      ariaLabel:'Confirmação de cancelamento',
      buttons: self.buttons
    };

    self.confirmFinish = {
      dialogToTitle:'Salvar',
      titleToText:'Confirmar alteração:',
      textDialog:'Deseja salvar as alterações?',
      ariaLabel:'Confirmação de finalização',
      buttons: self.buttons
    };
    
  }
}());
