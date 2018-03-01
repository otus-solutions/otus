(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizerManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/toolbar/results-visualizer-toolbar-template.html',
      bindings: {
        action: '<',
        sendingExam: '<',
        errorAliquots: '=',
        aliquotsNotIdentified: '=',
        dynamicDataTableChange: '&'
      }
    });

  Controller.$inject = [
    '$mdDialog',
    'otusjs.laboratory.business.project.sending.SendingExamService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($mdDialog, SendingExamService, ProjectContextService, ApplicationStateService) {
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

    function saveUpload() {
      if (self.aliquotsNotIdentified) {
        _buildMessageForceSendOfAliquots();
        _forceSendOfAliquots();
      } else {
        SendingExamService.createSendExam(JSON.stringify(self.sendingExam)).then(function () {
          ProjectContextService.clearFileStructure();
          ApplicationStateService.activateExamSending();
          self.aliquotsNotIdentified = [];
        }, function (reason) {
          _handleFailuresToSend(reason);
          $mdDialog.show(aliquotsNotFound).then(function () {
            self.dynamicDataTableChange();
          });
        });
      }
    }

    function _handleFailuresToSend(reason) {
      if (reason.data.MESSAGE === ALIQUOT_NOT_FOUND_BACKEND_MESSAGE) {
        var uniqueErrorAliquots = _getUnique(reason.data.CONTENT);
        self.errorAliquots = uniqueErrorAliquots;
        self.aliquotsNotIdentified = [];
        uniqueErrorAliquots.forEach(function (errorAliquot) {
          self.sendingExam.exams.forEach(function (exam) {
            exam.examResults.forEach(function (result) {
              if (errorAliquot == result.aliquotCode) {
                self.aliquotsNotIdentified.push(result);
              }
            });
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
        _addFlagOfForcedSend();
        SendingExamService.createSendExam(JSON.stringify(self.sendingExam)).then(function () {
          ProjectContextService.clearFileStructure();
          ApplicationStateService.activateExamSending();
          self.aliquotsNotIdentified = [];
        }, function (reason) {
          _handleFailuresToSend(reason);
          $mdDialog.show(aliquotsNotFound).then(function () {
            self.dynamicDataTableChange();
          });
        });
      });
    }

    function _addFlagOfForcedSend() {
      self.sendingExam.examSendingLot.forcedSave = true;
      self.sendingExam.exams.map(function (exam) {
        exam.examResults.map(function (result) {
          self.aliquotsNotIdentified.map(function (resultNotIdentified) {
            if (resultNotIdentified.aliquotCode === result.aliquotCode) {
              result.aliquotValid = false;
            }
          });
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