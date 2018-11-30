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

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getAliquot = getAliquot;
    self.getAliquotConfiguration = getAliquotConfiguration;
    self.getAliquotsDescriptors = getAliquotsDescriptors;
    self.getAvailableExams = getAvailableExams;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.getSendedExamById = getSendedExamById;
    self.getSendedExams = getSendedExams;
    self.createSendExam = createSendExam;
    self.deleteSendedExams = deleteSendedExams;

    function getAliquots() {
      return ProjectCollectionService.getAliquots();
    }

    function getAliquot(aliquotFilter) {
      return ProjectCollectionService.getAliquot(aliquotFilter);
    }

    function getAliquotConfiguration() {
      return ProjectCollectionService.getAliquotConfiguration();
    }

    function getAliquotsDescriptors() {
      return ProjectCollectionService.getAliquotDescriptors();
    }

    function getAvailableExams(center) {
      return ProjectCollectionService.getAvailableExams(center);
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
    function getSendedExamById(id) {
      return ProjectCollectionService.getSendedExamById(id);
    }

    function getSendedExams() {
      return ProjectCollectionService.getSendedExams();
    }

    function createSendExam(sendStructure) {
      return ProjectCollectionService.createSendExam(sendStructure);
    }

    function deleteSendedExams(sendedExamCode) {
      return ProjectCollectionService.deleteSendedExams(sendedExamCode);
    }
  }
}());
