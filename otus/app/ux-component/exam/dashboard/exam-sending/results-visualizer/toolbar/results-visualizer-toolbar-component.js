(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizerManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/toolbar/results-visualizer-toolbar-template.html',
      bindings: {
        action: '<',
        sendingExam: '<',
        onLotDelete: '&',
        errorAliquots: '=',
        errorExamResults: '=',
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
          var uniqueErrorAliquots = _getUnique(reason.data.CONTENT);
          self.errorAliquots = uniqueErrorAliquots;
          self.errorExamResults = [];
          uniqueErrorAliquots.forEach(function (errorAliquot) {
            self.sendingExam.examResults.forEach(function (examResult) {
              if(errorAliquot === examResult.aliquotCode){
                self.errorExamResults.push(examResult);
              }
            });
          });
          aliquotsNotFound
          .title('Aliquota(s) não encontrada(s)')
          .textContent(
            'A(s) aliquota(s) não encontrada(s) sera(ão) apontada(s) na lista: '
          );
        }else if(reason.data.MESSAGE === EMPTY_LOT_BACKEND_MESSAGE){
          aliquotsNotFound
            .title('O lote não possue resultados')
            .textContent(
              'Um lote vazio não pode ser enviado.'
            );
        } else {
          aliquotsNotFound
          .title('Falha no envio do arquivo')
          .textContent('Ocorreu algum problema ao enviar os resultados.');
        }
        $mdDialog.show(aliquotsNotFound).then(function() {
          self.dynamicDataTableChange();
        });
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

    function _getUnique(array){
      var uniqueValues = [];
      array.forEach(function (value) {
        if(!uniqueValues.includes(value))
          uniqueValues.push(value)
      });
      return uniqueValues;
    }

    function _buildDialogs() {
      aliquotsNotFound = $mdDialog.alert()
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok');
    }
  }
}());
