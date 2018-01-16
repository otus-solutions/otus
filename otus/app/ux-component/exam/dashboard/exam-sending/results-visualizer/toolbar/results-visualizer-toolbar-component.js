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
        fileStructure: '<'
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

    function onInit() {
      console.log(JSON.stringify(self.fileStructure));
    }

    function cancelUpload() {
      ProjectContextService.clearFileStructure();
      ApplicationStateService.activateExamSending();
    }

    function saveUpload() {
      SendingExamService.createSendExam(JSON.stringify(self.fileStructure)).then(function (){
        ProjectContextService.clearFileStructure();
        ApplicationStateService.activateExamSending();
      });
    }
  }
}());
