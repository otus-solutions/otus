(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultVisualizer', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/results-visualizer/visualizer-template.html'
    });

  Controller.$inject = [
    '$mdDialog',
    '$filter',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.laboratory.business.project.sending.SendingExamService'
  ];

  function Controller($mdDialog, $filter, ApplicationStateService, ProjectContextService, SendingExamService) {
    var self = this;
    var therIsNoDataToShow;

    self.$onInit = onInit;
    self.dynamicDataTableChange = dynamicDataTableChange;

    function onInit() {
      _buildDialogs();
      self.action = ProjectContextService.getExamSendingAction();
      self.fileStructure = ProjectContextService.getFileStructure();
      if(!self.fileStructure){
        $mdDialog.show(therIsNoDataToShow).then(function() {
          ApplicationStateService.activateExamSending();
        });
      } else {
        if (self.action === 'view') {
          self.sendingExam = [];
          self.sendingExam.examResults = [];
          _loadList();
        } else {
          _buildExamSending();
          self.sendingExam.examResultLot.resultsQuantity = self.fileStructure.examResults.length;
        }
        self.formattedDate = $filter('date')(self.fileStructure.examResultLot.realizationDate, 'dd/MM/yyyy HH:mm');
      }
    }

    function _loadList() {
      SendingExamService.getSendedExamById(self.fileStructure.examResultLot._id).then(function (response) {
        self.fileStructure.examResults = response;
        _buildExamSending();
        self.updateDataTable(self.fileStructure.examResults);
      });
    }

    function _buildExamSending() {
      self.sendingExam = SendingExamService.loadExamSendingFromJson(self.fileStructure.examResultLot, self.fileStructure.examResults);
    }

    function dynamicDataTableChange() { }

    function _buildDialogs() {
      therIsNoDataToShow = $mdDialog.alert()
        .title('Erro ao entrar na tela de visualização de resultados')
        .textContent('Para acessar a tela de visualização de resultados você deve enviar um novo arquivo ou selecionar algum envio anterior.')
        .ariaLabel('erro')
        .ok('Ok');
    }
  }
}());
