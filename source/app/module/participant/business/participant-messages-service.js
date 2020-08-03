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

    const DELAY = 4000;
    self.showClearDialog = showClearDialog;
    self.showRecruitmentNumberGenerated = showRecruitmentNumberGenerated;
    self.showUpdateParticipant = showUpdateParticipant;
    self.showSaveDialog = showSaveDialog;
    self.showUpdateDialog = showUpdateDialog;
    self.showNotSave = showNotSave;
    self.showToast = showToast;
    self.showLoginEmailDialog = showLoginEmailDialog;

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

    function showUpdateDialog() {

      var _saveDialog = {
        dialogToTitle:'Atualizar',
        titleToText:'Confirmar alteração em Participante',
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


    function showLoginEmailDialog(sceneValues) {
      var _loginDialog = {
        dialogToTitle: sceneValues.dialogToTitle,
        titleToText:sceneValues.titleToText,
        textDialog:sceneValues.textDialog,
        ariaLabel:sceneValues.ariaLabel,
        buttons: [
          {
            message:sceneValues.button.confirm,
            action:function(){$mdDialog.hide()},
            class: sceneValues.button.confirm == "Salvar"? 'md-raised md-primary': 'md-raised md-warn'},
          {
            message:sceneValues.button.cancel,
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };

      return DialogShowService.showDialog(_loginDialog);
    }

    function showRecruitmentNumberGenerated(participantData) {
      return $mdDialog.show($mdDialog.alert()
        .title('Novo participante criado')
        .textContent('Participante '+participantData.name+' criado com número de recrutamento: '+participantData.recruitmentNumber)
        .ariaLabel('Confirmação de finalização')
        .ok('Ok'));
    }

    function showUpdateParticipant(participantData) {
      return $mdDialog.show($mdDialog.alert()
        .title('Participante atualizado')
        .textContent('Participante '+participantData.name+' atualizado com sucesso.')
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
