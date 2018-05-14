(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizerManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/toolbar/results-visualizer-toolbar-template.html',
      bindings: {
        action: '<',
        sendingExam: '=',
        errorAliquots: '=',
        aliquotsNotIdentified: '=',
        dynamicDataTableChange: '='
      }
    });

  Controller.$inject = [
    '$scope',
    '$mdDialog',
    'otusjs.laboratory.business.project.sending.SendingExamService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($scope, $mdDialog, SendingExamService, ProjectContextService, ApplicationStateService, LoadingScreenService) {
    const MESSAGE_LOADING = "Por favor aguarde o carregamento.<br> Esse processo pode demorar um pouco...";
    const ALIQUOT_NOT_FOUND_BACKEND_MESSAGE = "Data Validation Fail: Aliquots not found";
    const EMPTY_LOT_BACKEND_MESSAGE = "Data Validation Fail: Empty Lot";

    var aliquotsNotFound;
    var _confirmForceSendOfAliquots;
    var self = this;
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
      if (self.aliquotsNotIdentified) {
        _saveForced();
      } else {
        _save();
      }
    }

    function _save(){
      Promise.resolve()
        .then(_loadWait)
        .then(function () {
          _sendExam();
        });
    }

    function _saveForced(){
      _buildMessageForceSendOfAliquots();
      _forceSendOfAliquots();
    }

    function _sendExam() {
      SendingExamService.createSendExam(JSON.stringify(self.sendingExam))
      .then(function () {
        ProjectContextService.clearFileStructure();
        ApplicationStateService.activateExamSending();
        self.aliquotsNotIdentified = [];
        LoadingScreenService.finish();
      })
      .catch(function (reason) {
        _handleFailuresToSend(reason);
        $scope.$$postDigest(function(){
          self.dynamicDataTableChange(self.sendingExam.getExamList());
          LoadingScreenService.finish();
          $mdDialog.show(aliquotsNotFound).then(function () {            

          });
        });
      });
    }

    function _handleFailuresToSend(reason) {
      if (reason.data.MESSAGE === ALIQUOT_NOT_FOUND_BACKEND_MESSAGE) {
        self.sendingExam.examSendingLot.forcedSave = true;
        self.aliquotsNotIdentified = [];
        self.errorAliquots = _getUnique(reason.data.CONTENT);
        self.sendingExam.exams.forEach(function (exam) {
          exam.examResults.forEach(function (result) {
            var invalidAliquotCode = self.errorAliquots.find(function(aliquotCode){ return aliquotCode == result.aliquotCode });
            if (invalidAliquotCode) {
              result.aliquotValid = false;
              self.aliquotsNotIdentified.push(result);
            }
          });
        });

        aliquotsNotFound
          .title('Aliquota(s) não encontrada(s)')
          .textContent('Se desejar você pode forçar o envio, clicando novamente em salvar.');
      } else if (reason.data.MESSAGE === EMPTY_LOT_BACKEND_MESSAGE) {
        aliquotsNotFound
          .title('O lote não possue resultados')
          .textContent('Um lote vazio não pode ser enviado.');
      } else {
        aliquotsNotFound
          .title('Falha no envio do arquivo')
          .textContent('Ocorreu algum problema ao enviar os resultados.');
      }
    }

    function _getUnique(array) {
      var uniqueValues = [];
      array.forEach(function (value) {
        if (!uniqueValues.includes(value))
          uniqueValues.push(value)
      });
      return uniqueValues;
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
      aliquotsNotFound = $mdDialog.alert()
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok');
    }
  }
}());