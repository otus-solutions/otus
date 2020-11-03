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
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdToast,$mdDialog, $filter, LoadingScreenService,
                      ParticipantLaboratoryService, ParticipantManagerService,
                      DialogService) {
    var self = this;
    self.tubeCode = "";
    self.originalTube = {};
    self.selectedTube = {}
    self.$onInit = onInit;
    self.participantManagerService = ParticipantManagerService

    self.isValidCode = isValidCode;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelTube = cancelTube
    self.saveMetadata = saveMetadata

    function onInit() {
      LoadingScreenService.start()
      ParticipantManagerService.setup().then(function (response) {
        self.onReady = true;
        LoadingScreenService.finish()
      });
    }

    function isValidCode(tubeCode) {
      if(tubeCode.length === 9) {
        ParticipantLaboratoryService.getLaboratoryByTube(tubeCode, ParticipantManagerService).then(participantLaboratory => {
            self.participantLaboratory = participantLaboratory
            const foundTube = self.participantLaboratory.tubes.find(tube => {
              return tube.code == tubeCode
            })
            self.originalTube = angular.copy(foundTube);
            self.newTube = foundTube
            self.tubeCode = ""
          }).catch(e => {
            toastError(tubeCode)
          })
      }
    }

    function cancelTube() {
      if(self.originalTube.hasOwnProperty('code')) {
        return DialogService.showDialog(self.confirmCancel).then(function() {
          self.originalTube = {}
          self.newTube = {}
        });
      }
    }

    function saveChangedTubes() {
      if (haveTubesChanged()) {

        _updateChangedTubes(self.newTube);
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Não existem alterações a serem salvas.')
        );
      }
    }

    function saveMetadata() {
      if(self.originalTube.tubeCollectionData.isCollected) {
        const tubeStructure = {
          tubes: [self.newTube]
        }
        ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure).then(() => {
          _showToastMsg('Volume parcial salvo com sucesso!');
        }).catch(function(e) {
          _showToastMsg('Falha ao registrar volume parcial');
        });
      }
    }

    function _updateChangedTubes(tube) {

      if(!tube.tubeCollectionData.isCollected) {
        tube.collect()
      }

      const tubeStructure = {
        tubes: [tube]
      }

      DialogService.showDialog(self.confirmFinish).then(function() {
        ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure).then(function() {
          self.participantLaboratory.updateTubeList();
          _showToastMsg('Registrado com sucesso!');
        }).catch(function(e) {
          _showToastMsg('Falha ao registrar coleta');
        });
      });
    }

    function haveTubesChanged() {
      return (
        self.originalTube.tubeCollectionData.isCollected !== self.newTube.tubeCollectionData.isCollected
        || self.originalTube.tubeCollectionData.metadata !== self.newTube.tubeCollectionData.metadata
        || self.originalTube.tubeCollectionData.operator !== self.newTube.tubeCollectionData.operator
        || self.originalTube.tubeCollectionData.time !== self.newTube.tubeCollectionData.time
      );
    }

    function toastError(tubeCode) {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Tubo ' + tubeCode + ' não encontrado')
          .hideDelay(1000)
      );
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
