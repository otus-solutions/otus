(function() {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantMessagesService', Service);

  Service.$inject = [
    '$mdDialog',
    '$mdToast',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Service($mdDialog, $mdToast, DialogShowService) {
    var self = this;

    const DELAY = 3000;
    self.showClearDialog = showClearDialog;
    self.showRecruitmentNumberGenerated = showRecruitmentNumberGenerated;
    self.showSaveDialog = showSaveDialog;
    self.showNotSave = showNotSave;
    self.showToast = showToast;

    function showClearDialog() {

      var _clearDialog = {
            dialogToTitle:'Exclusão',
            titleToText:'Descartar Alterações?',
            textDialog:'Todos os campos disponíveis serão apagados! Deseja realmente realizar este procedimento?',
            ariaLabel:'Confirmação de cancelamento',
            buttons: [
          {
            message:'Continuar',
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

      return DialogShowService.showDialog(_clearDialog);
    }

    function showSaveDialog() {

      var _saveDialog = {
        dialogToTitle:'Salvar',
        titleToText:'Confirmar novo Participante',
        textDialog:'Deseja salvar as alterações?',
        ariaLabel:'Confirmação de finalização',
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

      return DialogShowService.showDialog(_saveDialog);

    }

    function showRecruitmentNumberGenerated(participantData) {
      return $mdDialog.show($mdDialog.alert()
        .title('Novo participante criado')
        .textContent('Participante '+participantData.name+' criado com número de recrutamento: '+participantData.recruitmentNumber)
        .ariaLabel('Confirmação de finalização')
        .ok('Ok'));
    }

    function showNotSave(errorMessage) {
      var rn = errorMessage.match(/\d+/g);
      var msg = errorMessage || 'Ocorreu um problema na inserção de participante.';
      if (rn) {
        if(errorMessage.match(/\RN inconsistency/g)){
          msg = 'Número de recrutamento deve iniciar com o código do centro.'
        } else {
          msg = 'Número de recrutamento ' + rn[0] + ' já existente.'
        }
      }

      var _notDialog = {
        dialogToTitle:'Participante',
        titleToText:'Não foi possível salvar',
        textDialog:msg,
        ariaLabel:'Confirmação de finalização',
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

      return DialogShowService.showDialog(_notDialog);

    }

    function showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position("right bottom")
        .hideDelay(DELAY)
      );
    }

  }

}());