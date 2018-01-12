(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizer', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/visualizer-template.html'
    });

  Controller.$inject = [
    '$filter',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService'
  ];

  function Controller($filter, ApplicationStateService, ProjectContextService) {
    var self = this;

    self.$onInit = onInit;
    self.dynamicDataTableChange = dynamicDataTableChange;

    function onInit() {
      self.action = ProjectContextService.getExamSendingAction();
      self.fileStructure = ProjectContextService.getFileStructure();
      console.log(self.fileStructure);
      self.formattedDate = $filter('date')(self.fileStructure.realizationDate, 'dd/MM/yyyy');
    }

    function dynamicDataTableChange() {}

  }
}());
