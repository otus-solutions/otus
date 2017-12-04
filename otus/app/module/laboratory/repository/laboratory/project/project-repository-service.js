(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.LaboratoryRepositoryService', Service);

  Service.$inject = [
    'otusjs.laboratory.repository.ProjectCollectionService'
  ];

  function Service(ProjectCollectionService) {
    var self = this;
    var laboratory = {};

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

    function getAliquots() {
      return ProjectCollectionService.getAliquots();
    }

    function getAliquotsByCenter(center) {
      return ProjectCollectionService.getAliquotsByCenter(center);
    }

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
  }
}());
