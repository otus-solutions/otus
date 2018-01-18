(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizerManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/toolbar/results-visualizer-toolbar-template.html',
      bindings: {
        onLotDelete: '&',
        action: '<',
        sendingExam: '<'
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
    var self = this;
    var aliquotsNotFound;

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
      SendingExamService.createSendExam(JSON.stringify(self.sendingExam)).then(function (){
        ProjectContextService.clearFileStructure();
        ApplicationStateService.activateExamSending();
      },function (reason) {
        if(reason.data.MESSAGE === ALIQUOT_NOT_FOUND_BACKEND_MESSAGE){
          aliquotsNotFound
          .title('Aliquota(s) não encontrada(s)')
          .textContent(
            'A(s) seguinte(s) aliquota(s) não existe(m) no sistema: '
            + _convertArrayToStringIncludesLastPosition(reason.data.CONTENT,' e ')
            + '.'
          );
        } else {
          aliquotsNotFound
          .title('Falha no envio do arquivo')
          .textContent('Ocorreu algum problema ao enviar os resultados.');
        }
        $mdDialog.show(aliquotsNotFound).then(function() {});
      });
    }

    function _convertArrayToStringIncludesLastPosition(array, includes){
      var text = "";
      array.forEach(function(value, index) {
        if(index == 0){
          text = text + value;
        } else {
          if(index == array.length - 1){
            text = text + includes + value;
          } else {
            text = text + ', ' + value;
          }
        }
      }, this);

      return text;
    }

    function _buildDialogs() {
      aliquotsNotFound = $mdDialog.alert()
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok');
    }
  }
}());
