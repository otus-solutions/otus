(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ExamsRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;
    var _uploadRest = null;

    /* Public methods */
    self.initialize = initialize;
    self.create = create;
    self.getLots = getLots;
    self.getLotAliquots = getLotAliquots;
    self.getAliquots = getAliquots;
    self.getAliquot = getAliquot;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.getAvailableExams = getAvailableExams;
    self.getSendedExamById = getSendedExamById;
    self.getSendedExams = getSendedExams;
    self.createSendExam = createSendExam;
    self.deleteSendedExams = deleteSendedExams;

    function initialize() {
      _rest = OtusRestResourceService.getExamLotResource();
      _uploadRest = OtusRestResourceService.getExamUploadResource();

    }

    function create() {
      _rest.create();
    }

    function getLots(centerAcronym) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLots({acronym:centerAcronym}).$promise;
    }

    function getLotAliquots(id) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLotAliquots({lotId:id}).$promise;
    }

    function getAliquots() {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAliquots().$promise;
    }

    function getAliquot(aliquotFilter) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAliquot(aliquotFilter).$promise;
    }



    function createLot(persistanceStructure) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.createLot({}, persistanceStructure).$promise;
    }

    function updateLot(persistanceStructure) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.updateLot({}, persistanceStructure).$promise;
    }

    function deleteLot(lotCode) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.deleteLot({ id: lotCode }).$promise;
    }

    function getAvailableExams(center) {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getAvailableExams({center: center}).$promise;
    }
    /* sending exam */

    function getSendedExamById(id) {
      if (!_uploadRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _uploadRest.getById({ id: id }).$promise;
    }

    function getSendedExams() {
      if (!_uploadRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _uploadRest.listAll().$promise;
    }

    function createSendExam(persistanceStructure) {
      if (!_uploadRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _uploadRest.create({}, persistanceStructure).$promise;
    }

    function deleteSendedExams(sendedResultsLotCode) {
      if (!_uploadRest) {
        throw new Error('REST resource is no initialized.');
      }
      return _uploadRest.delete({ id: sendedResultsLotCode }).$promise;
    }
  }
}());
