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
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
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

    function getLots() {
      if (!_rest) {
        throw new Error('REST resource is no initialized.');
      }
      return _rest.getLots().$promise;
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
