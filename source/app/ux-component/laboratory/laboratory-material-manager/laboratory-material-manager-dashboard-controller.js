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

  function Controller($mdToast,$mdDialog, $filter, LoadingScreenService, ParticipantLaboratoryService, ParticipantManagerService, DialogService) {
    var self = this;
    self.tubeCode = "";
    self.tube = {};
    self.selectedTube = {}

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

    self.$onInit = onInit;

    self.isValidCode = isValidCode;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelTube = cancelTube

    function onInit() {
      LoadingScreenService.start()
      ParticipantManagerService.setup().then(function (response) {
        self.onReady = true;
        LoadingScreenService.finish()
      });
    }

    function saveChangedTubes() {
      console.info(self.newTube == self.tube)

      if (self.newTube != self.tube) {
        _updateChangedTubes(self.newTube);
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Não existem alterações a serem salvas.')
        );
      }
    }

    function _updateChangedTubes(tube) {

      const tubeStructure = {
        tubes: [tube]
      }

      DialogService.showDialog(self.confirmFinish).then(function() {
        ParticipantLaboratoryService.updateTubeCollectionData(tubeStructure).then(function() {
          self.participantLaboratory.updateTubeList();
          _showToastMsg('Registrado com sucesso!');
        }).catch(function(e) {
          _showToastMsg('Falha ao registrar coleta');
        });
      });
    }

    async function isValidCode(tubeCode) {
      if(tubeCode.length == 9) {
        await ParticipantLaboratoryService.getLaboratoryByTube(tubeCode).then(participantLaboratory => {
            self.participantLaboratory = participantLaboratory
          }).catch(e => {
            toastError(tubeCode)
          })
        const foundTube = self.participantLaboratory.tubes.find(tube => {
          return tube.code == tubeCode
        })
        self.tube = foundTube;
        self.newTube = angular.copy(self.tube)
      }
      self.tubeCode = ""
    }

    function cancelTube() {
      if(self.tube.hasOwnProperty('code')) {
        return DialogService.showDialog(self.confirmCancel).then(function() {
          self.tube = {}
          self.newTube = {}
          isValidCode(self.tubeCode)
        });
      }
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
  }
}());
