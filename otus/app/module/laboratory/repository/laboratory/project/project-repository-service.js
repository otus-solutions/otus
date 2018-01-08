(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.ProjectRepositoryService', Service);

  Service.$inject = [
    'otusjs.laboratory.repository.ProjectCollectionService'
  ];

  function Service(ProjectCollectionService) {
    var self = this;
    var laboratory = {};

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getAliquotConfiguration = getAliquotConfiguration;
    self.getAliquotsDescriptors = getAliquotsDescriptors;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.getSendedExams = getSendedExams;
    self.createSendExam = createSendExam;
    self.deleteSendedExams = deleteSendedExams;

    function getAliquots() {
      return ProjectCollectionService.getAliquots();
    }

    function getAliquotConfiguration() {
      return ProjectCollectionService.getAliquotConfiguration();
    }


    function getAliquotsDescriptors() {
      return ProjectCollectionService.getAliquotDescriptors();
      // return $http.get('app/module/laboratory/repository/laboratory/aliquots-descriptors.json');
    }

    function getAliquotsByCenter(center) {
      return ProjectCollectionService.getAliquotsByCenter(center);
    }

    /* exam lot */
    function getLots() {
      return ProjectCollectionService.getLots();
    }

    function createLot(lotStructure) {
      return ProjectCollectionService.createLot(lotStructure);
    }

    function updateLot(lotStructure) {
      return ProjectCollectionService.updateLot(lotStructure);
    }

    function deleteLot(lotCode) {
      return ProjectCollectionService.deleteLot(lotCode);
    }

    /* sending exam */
    function getSendedExams() {
      return ProjectCollectionService.getSendedExams();
    }

    function createSendExam(SendStructure) {
      return ProjectCollectionService.createSendExam(SendStructure);
    }

    function deleteSendedExams(SendedExamCode) {
      return ProjectCollectionService.deleteSendedExams(SendedExamCode);
    }
  }
}());
