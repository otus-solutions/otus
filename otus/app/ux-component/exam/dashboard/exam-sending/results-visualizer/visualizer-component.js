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
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.laboratory.business.project.sending.SendingExamService'
  ];

  function Controller($filter, ApplicationStateService, ProjectContextService, SendingExamService) {
    var self = this;

    self.$onInit = onInit;
    self.dynamicDataTableChange = dynamicDataTableChange;

    function onInit() {
      self.action = ProjectContextService.getExamSendingAction();
      self.fileStructure = ProjectContextService.getFileStructure();
      if (_isEmpty(self.fileStructure.examResults)) {
        _loadList();
      }
      self.formattedDate = $filter('date')(self.fileStructure.examResultLot.realizationDate, 'dd/MM/yyyy');
    }

    function _loadList() {
      SendingExamService.getSendedExamById(self.fileStructure.examResultLot._id).then(function (response) {
        self.fileStructure.examResults = response;
        self.updateDataTable(self.fileStructure.examResults);
      });
    }

    function _isEmpty(list) {
      if (list.length === 0)
        return true;
      else
        return false;
    }

    function dynamicDataTableChange() { }

  }
}());
