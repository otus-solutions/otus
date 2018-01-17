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
      if(self.action === 'view'){
        _loadList();
      } else {
        _buildExamSending();
      }

      self.formattedDate = $filter('date')(self.fileStructure.examResultLot.realizationDate, 'dd/MM/yyyy');
    }

    function _loadList() {
      SendingExamService.getSendedExamById(self.fileStructure.examResultLot._id).then(function (response) {
        self.fileStructure.examResults = response;
        _buildExamSending();
        self.updateDataTable(self.fileStructure.examResults);
      });
    }

    function _buildExamSending(){
      self.sendingExam = SendingExamService.loadExamSendingFromJson(self.fileStructure.examResultLot, self.fileStructure.examResults);
      self.sendingExam.examResultLot.resultsQuantity = self.fileStructure.examResults.length;
    }

    function dynamicDataTableChange() { }

  }
}());
