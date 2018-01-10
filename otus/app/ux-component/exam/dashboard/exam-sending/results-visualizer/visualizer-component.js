(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizer', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/visualizer-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService'
  ];

  function Controller(ApplicationStateService, ContextService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      self.fileStructure = ContextService.getFileStructure();
      console.log("self.fileStructure", self.fileStructure);
    }
  }
}());
