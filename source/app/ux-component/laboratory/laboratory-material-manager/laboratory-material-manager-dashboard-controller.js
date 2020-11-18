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
    self.tubeCode = "";
    self.originalTube = {};
    self.selectedTube = {};
    self.tubeCustomMetadata = null;
    self.participantManagerService = ParticipantManagerService;

    self.$onInit = onInit;
    self.isValidCode = isValidCode;
    self.saveChangedTubes = saveChangedTubes;
    self.cancelTube = cancelTube;
    self.saveMetadata = saveMetadata;

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
          self.participantLaboratory = participantLaboratory;
          const foundTube = self.participantLaboratory.tubes.find(tube => {
            return tube.code == tubeCode;
          });
          self.originalTube = angular.copy(foundTube);
          self.newTube = foundTube;
          self.tubeCode = "";

          console.log(self.originalTube);//.
          ParticipantLaboratoryService.getTubeMedataDataByType(self.originalTube.type)
            .then(data => {
              self.tubeCustomMetadata = data;
              console.log(data);
            })
            .catch(err => console.log(err));

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
      _updateChangedTubes();
    }

    function saveMetadata() {
      if(self.newTube.tubeCollectionData.isCollected) {
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

    function _updateChangedTubes() {

      DialogService.showDialog(self.confirmFinish).then(function() {
        self.newTube.collect()

        const tubeStructure = {
          tubes: [self.newTube]
        }

        ParticipantLaboratoryService.updateTubeCollectionDataWithRn(self.participantLaboratory.recruitmentNumber, tubeStructure).then(function() {
          self.participantLaboratory.updateTubeList();
          _showToastMsg('Registrado com sucesso!');
        }).catch(function(e) {
          _showToastMsg('Falha ao registrar coleta');
        });
      });
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
