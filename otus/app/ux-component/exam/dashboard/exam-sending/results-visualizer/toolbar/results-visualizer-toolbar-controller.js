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
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($scope, $mdDialog, SendingExamService, AliquotErrorReportingService, ProjectContextService, ApplicationStateService, LoadingScreenService) {
    const MESSAGE_LOADING = "Por favor aguarde o carregamento.<br> Esse processo pode demorar um pouco...";
    const ALIQUOT_DOES_MATCH_EXAM = "Data Validation Fail: Aliquot does not match exam"
    const ALIQUOT_NOT_FOUND = "Data Validation Fail: Aliquot not found";
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
            $mdDialog.show(aliquotError).then(function () { });
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
          .title('O lote não possue resultados')
          .textContent('Um lote vazio não pode ser enviado.');
      } else {
        aliquotError
          .title('Falha no envio do arquivo')
          .textContent('Ocorreu algum problema ao enviar os resultados. Por favor, tente novamente em alguns minutos.');
      }
    }

    function _aliquotErrorDoesNotMatchExam(reason) {
      self.disabledSave = true;
      _reportAliquotsWithProblems(reason);
      aliquotError
        .title('Aliquota(s) não correspondente(s) ao(s) exame(s)')
        .textContent('O envio será impossibilitado. Clique em exportar relatório de erros para obter mais detalhes');
    }

    function _aliquotErrorNotFound(reason) {
      self.sendingExam.examSendingLot.forcedSave = true;
      _reportAliquotsWithProblems(reason);
      aliquotError
        .title('Aliquota(s) não encontrada(s)')
        .textContent('Se desejar você pode forçar o envio, clicando novamente em salvar.');
    }

    function _reportAliquotsWithProblems(reason) {
      var report = AliquotErrorReportingService.createErrorReporting(reason.data.CONTENT);
      self.errorAliquots = reason.data.CONTENT;
      self.csvData = report;
      self.aliquotsWithProblems = [];
      self.sendingExam.exams.forEach(function (exam) {
        exam.examResults.forEach(function (result) {
          var invalidAliquotCode = self.errorAliquots.find(function (errorAliquot) { return errorAliquot.aliquot == result.aliquotCode });
          if (invalidAliquotCode) {
            result.aliquotValid = false;
            self.aliquotsWithProblems.push(result);
          }
        });
      });
    }

    function _buildMessageForceSendOfAliquots() {
      _confirmForceSendOfAliquots = $mdDialog.confirm()
        .title('Atenção! Aliquota(s) não encontrada(s)')
        .textContent('Você deseja forçar o sistema a salvar?')
        .ariaLabel('Confirmar o desejo de forçar o sistema a salvar aliquota(s) não encontrada(s)')
        .ok('Sim')
        .cancel('Não');
    }

    function _forceSendOfAliquots() {
      $mdDialog.show(_confirmForceSendOfAliquots).then(function () {
        Promise.resolve()
          .then(_loadWait)
          .then(function () {
            _sendExam();
          });
      });
    }

    function _buildDialogs() {
      aliquotError = $mdDialog.alert()
        .ariaLabel('Diálogo de alerta')
        .ok('Ok');
    }
  }
}());