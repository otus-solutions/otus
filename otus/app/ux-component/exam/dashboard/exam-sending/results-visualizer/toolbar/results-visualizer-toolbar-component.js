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
    'otusjs.laboratory.business.project.sending.SendingExamService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(SendingExamService, ProjectContextService, ApplicationStateService) {
    var self = this;

    self.$onInit = onInit;
    self.cancelUpload = cancelUpload;
    self.saveUpload = saveUpload;

    function onInit() {}

    function cancelUpload() {
      ProjectContextService.clearFileStructure();
      ApplicationStateService.activateExamSending();
    }

    function saveUpload() {
      console.log(JSON.stringify(self.sendingExam));
      SendingExamService.createSendExam(JSON.stringify(self.sendingExam)).then(function (){
        ProjectContextService.clearFileStructure();
        ApplicationStateService.activateExamSending();
      });
    }
  }
}());
