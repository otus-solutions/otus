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
    var self = this;
    var _AliquotsNotFound;

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
        _AliquotsNotFound.textContent(
          'Aliquota(s): '
          + _convertArrayToStringIncludesLastPosition(reason.data.CONTENT,' e ')
          + ' não encontrada(s) no sistema '
        );
        $mdDialog.show(_AliquotsNotFound).then(function() {});
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
      _AliquotsNotFound = $mdDialog.confirm()
        .title('Aliquota(s) não encontradas')
        .ariaLabel('Confirmação de cancelamento')
        .ok('Ok');
    }
  }
}());
