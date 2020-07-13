(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusResultVisualizerManagerToolbarCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$mdDialog',
    'otusjs.laboratory.business.project.sending.SendingExamService',
    'otusjs.laboratory.business.project.sending.AliquotErrorReportingService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($scope, $mdDialog, SendingExamService, AliquotErrorReportingService, ProjectContextService, ApplicationStateService, LoadingScreenService, DialogService) {
    const MESSAGE_LOADING = "Por favor aguarde o carregamento.<br> Esse processo pode demorar um pouco...";
    const ALIQUOT_DOES_MATCH_EXAM = "Data Validation Fail: Material does not match exam"
    const ALIQUOT_NOT_FOUND = "Data Validation Fail: Material not found";
    const EMPTY_LOT = "Data Validation Fail: Empty Lot";

    var aliquotError;
    var _confirmForceSendOfAliquots;
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.cancelUpload = cancelUpload;
    self.saveUpload = saveUpload;

    function onInit() {
      _buildDialogs();
    }

    function cancelUpload() {
      ProjectContextService.clearFileStructure();
      ApplicationStateService.activateExamSending();
    }

    function _loadWait() {
      LoadingScreenService.changeMessage(MESSAGE_LOADING);
      LoadingScreenService.start();
    }

    function saveUpload() {
      if (self.aliquotsWithProblems) {
        _saveForced();
      } else {
        _save();
      }
    }

    function _save() {
      Promise.resolve()
        .then(_loadWait)
        .then(function () {
          _sendExam();
        });
    }

    function _saveForced() {
      _buildMessageForceSendOfAliquots();
      _forceSendOfAliquots();
    }

    function _sendExam() {
      SendingExamService.createSendExam(JSON.stringify(self.sendingExam))
        .then(function () {
          ProjectContextService.clearFileStructure();
          ApplicationStateService.activateExamSending();
          self.aliquotsWithProblems = [];
          LoadingScreenService.finish();
        }).catch(function (reason) {
          _handleFailuresToSend(reason);
          $scope.$$postDigest(function () {
            self.dynamicDataTableChange(self.sendingExam.getExamList());
            LoadingScreenService.finish();
            DialogService.showDialog(aliquotError).then(function () { });
          });
        });
    }

    function _handleFailuresToSend(reason) {
      if (reason.data.MESSAGE === ALIQUOT_DOES_MATCH_EXAM) {
        _aliquotErrorDoesNotMatchExam(reason);
      } else if (reason.data.MESSAGE === ALIQUOT_NOT_FOUND) {
        _aliquotErrorNotFound(reason);
      } else if (reason.data.MESSAGE === EMPTY_LOT) {
        aliquotError
          .dialogToTitle = 'O lote não possui resultados';
        aliquotError
          .textDialog ='Um lote vazio não pode ser enviado.';
      } else {
        aliquotError
          .dialogToTitle ='Falha no envio do arquivo';
        aliquotError
          .textDialog ='Ocorreu algum problema ao enviar os resultados. Por favor, tente novamente em alguns minutos.';
      }
    }

    function _aliquotErrorDoesNotMatchExam(reason) {
      self.disabledSave = true;
      _reportAliquotsWithProblems(reason);
      aliquotError
        .dialogToTitle ='Materiais não correspondentes aos exames';
      aliquotError
        .textDialog ='O envio será impossibilitado. Clique em exportar relatório de erros para obter mais detalhes';
    }

    function _aliquotErrorNotFound(reason) {
      self.sendingExam.examSendingLot.forcedSave = true;
      _reportAliquotsWithProblems(reason);
      aliquotError
        .dialogToTitle ='Materiais não encontrados';
      aliquotError
        .textDialog ='Se desejar você pode forçar o envio, clicando novamente em salvar.';
    }

    function _reportAliquotsWithProblems(reason) {
      self.errorAliquots = reason.data.CONTENT;
      self.csvData = AliquotErrorReportingService.createErrorReporting(reason.data.CONTENT);
      self.aliquotsWithProblems = AliquotErrorReportingService.setValidAliquot(self.sendingExam, self.errorAliquots);
    }

    function _buildMessageForceSendOfAliquots() {
       _confirmForceSendOfAliquots = {
         dialogToTitle:'Atenção! Materiais não encontrados',
         textDialog:'Você deseja forçar o sistema a salvar?',
         ariaLabel:'Confirmar o desejo de forçar o sistema a salvar materiais não encontrados',
         buttons: [
           {
             message:'Sim',
             action:function(){$mdDialog.hide()},
             class:'md-raised md-primary'
           },
           {
             message:'Não',
             action:function(){$mdDialog.cancel()},
             class:'md-raised md-no-focus'
           }
         ]
       };
    }

    function _forceSendOfAliquots() {
     DialogService.showDialog(_confirmForceSendOfAliquots).then(function () {
        Promise.resolve()
          .then(_loadWait)
          .then(function () {
            _sendExam();
          });
      });
    }

    function _buildDialogs() {
      aliquotError = {
         dialogToTitle:'Alerta',
         textDialog:'',
         ariaLabel:'Diálogo de alerta',
         buttons: [
           {
             message:'Ok',
             action:function(){$mdDialog.hide()},
             class:'md-raised md-primary'
           }
         ]
       };
    }
  }
}());