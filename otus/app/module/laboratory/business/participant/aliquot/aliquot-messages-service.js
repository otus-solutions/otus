(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant.aliquot')
    .service('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService', Service);

  Service.$inject = [
    '$mdDialog',
    '$mdToast',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Service($mdDialog, $mdToast, DialogService) {
    var self = this;

    self.showExitDialog = showExitDialog;
    self.showSaveDialog = showSaveDialog;
    self.showDeleteDialog = showDeleteDialog;
    self.showConvertDialog = showConvertDialog;
    self.showToast = showToast;
    self.showNotRemovedDialog = showNotRemovedDialog;
    self.showNotConvertedDialog = showNotConvertedDialog;

    function showExitDialog(msg) {
      var message = msg || 'Alíquotas alteradas serão descartadas.';

      var _exitDialog = {
        dialogToTitle:'Exclusão',
        titleToText:'Descartar Alterações?',
        textDialog: message,
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

      return DialogService.showDialog( _exitDialog);
    }

    function showSaveDialog(msg) {
      var message = msg || 'Deseja salvar as alterações?';

      var _saveDialog = {
            dialogToTitle:'Salvar',
            titleToText:'Confirmar alteração:',
            textDialog: message,
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

      return DialogService.showDialog(_saveDialog);

    }

    function showConvertDialog(examNames, $scope) {
      var message = 'Deseja salvar as alterações?';

      var dropDownConfig = {};
      dropDownConfig.isRequired = true;
      dropDownConfig.label = "Selecione o tipo de aliquota";
      dropDownConfig.ariaLabel = "Selecione o tipo de aliquota";
      dropDownConfig.values = examNames;

      var textInputConfig = {};
      textInputConfig.label = "Observação";
      textInputConfig.ariaLabel = "Observação";

      var _saveDialog = {
        dialogToTitle:'Salvar',
        titleToText:'Confirmar converção da aliquota:',
        textInputConfig: textInputConfig,
        dropDownConfig: dropDownConfig,
        textDialog: message,
        ariaLabel:'Confirmação de finalização',
        buttons: [
          {
            message:'Ok',
            action:function(result){
              if(result.dropDownSelected && result.dropDownSelected !== "None"){
                $mdDialog.hide({
                  observation: result.textInputFill, examName: result.dropDownSelected
                })
              } else {
                $scope.dialogForm.$setValidity('dropDownName', true);
              }
            },
            class:'md-raised md-primary'
          },
          {
            message:'Voltar',
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };

      return DialogService.showDialog(_saveDialog);

    }

    function showDeleteDialog(msg) {
      var message = msg || "A exclusão desta alíquota será um procedimento irreversível! Deseja realmente excluir?";

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

      return DialogService.showDialog( _deleteDialog);

    }

    function showNotRemovedDialog(msg) {

      var _removedDialog = {
        dialogToTitle:'Alíquota',
        titleToText:'ALÍQUOTA NÃO REMOVIDA',
        textDialog: _buildMessage(msg),
        ariaLabel:'Confirmação de leitura',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          }
        ]
      };

      return DialogService.showDialog( _removedDialog);

    }

    function showNotConvertedDialog(msg) {
      var _removedDialog = {
        dialogToTitle:'Alíquota',
        titleToText:'ALÍQUOTA NÃO CONVERTIDA',
        textDialog: _buildMessage(msg),
        ariaLabel:'Confirmação de leitura',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          }
        ]
      };

      return DialogService.showDialog( _removedDialog);
    }

    function _buildMessage(msg) {
      var message = '<p>A alíquota se encontra em: </p><br><dl>';
      if(msg.transportationLot){
        message = message + '<li>Lote de Transporte (Código do lote: ' + msg.transportationLot + ')</li>';
      }

      if(msg.examLot){
        message = message + '<li>Lote de Exames (Código do lote: ' + msg.examLot + ')</li>';
      }

      if(msg.examResult){
        message = message + '<li>Existem Resultados com essa alíquota!</li>';
      }
      message = message + '</dl><br><br><b>Para esse procedimento é necessário a remoção da aliquota do(s) ambiente(s) acima.</b>';

      return message;
    }

    function showToast(msg, delay) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(delay)
      );
    }
  }

}());
