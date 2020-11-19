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

    self.$onInit = onInit;
    self.isValidCode = isValidCode;
    self.tubeHasCustomMetadata = tubeHasCustomMetadata;
    self.originalTubeHasCode = originalTubeHasCode;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelTube = cancelTube;
    self.saveMetadata = saveMetadata;
    self.updateTubeCustomMetadata = updateTubeCustomMetadata;

    function onInit() {
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

                if(self.originalTube.tubeCollectionData.customMetadata){
                  self.tubeCustomMetadataOptions
                    .filter(obj => self.originalTube.tubeCollectionData.customMetadata.includes(obj._id))
                    .forEach(obj => obj.selected = true);
                }
                else{
                  self.originalTube.tubeCollectionData.customMetadata = [];
                }

                console.log(self.tubeCustomMetadataOptions)
                console.log('self.originalTube.tubeCollectionData.customMetadata\n', JSON.stringify(self.originalTube.tubeCollectionData.customMetadata));
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

    function updateTubeCustomMetadata(option){
      const newTube = angular.copy(self.originalTube);

      const value = {
        _id: option._id,
        value: option.value
      };///.

      if(option.selected){
        console.log('adicionar\n', JSON.stringify(value, null, 2));
        newTube.tubeCollectionData.customMetadata.push(option._id);
      }
      else{
        console.log('remover\n', JSON.stringify(value, null, 2));
        newTube.tubeCollectionData.customMetadata = newTube.tubeCollectionData.customMetadata.filter(id => id !== option._id);
      }

      console.log('newTube.tubeCollectionData.customMetadata\n', JSON.stringify(newTube.tubeCollectionData.customMetadata));//.

      ParticipantLaboratoryService.updateTubeCustomMetadata(newTube)
        .then(response => {
          self.originalTube.tubeCollectionData.customMetadata = angular.copy(newTube.tubeCollectionData.customMetadata);
          console.log('new self.originalTube.tubeCollectionData.customMetadata\n', JSON.stringify(self.originalTube.tubeCollectionData.customMetadata));//.
        })
        .catch(err => _showToastMsg('Falha ao registrar metadado'));
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
