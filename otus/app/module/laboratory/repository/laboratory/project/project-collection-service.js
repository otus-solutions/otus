/**
 * LaboratoryCollectionService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.repository')
    .service('otusjs.laboratory.repository.ProjectCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.core.ModuleService'
  ];

  /**
   * LaboratoryCollectionService represents to application the activity collection. It abstracts to
   * other layers the storage implementation. Currently, are two storages wrapped in this service: a
   * remote storage and a local storage. Basically the oprations workflow is try to send/retrieve data
   * from remote storage and after the same operation is done into local storage.
   * @namespace LaboratoryCollectionService
   * @memberof Services
   */
  function Service($q, ModuleService) {
    var self = this;
    var _remoteStorage = ModuleService.getLaboratoryRemoteStorage();
    var _prjectRemoteStorage = ModuleService.getProjectRemoteStorage();
    var _participant = null;

    //Laboratory Project Public Methods
    self.getAliquots = getAliquots;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getAliquotDescriptors = getAliquotDescriptors;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;

    function getAliquots() {
      var request = $q.defer();

      _remoteStorage
      .whenReady()
      .then(function(remoteStorage) {
         return remoteStorage
         .getAliquots()
         .then(function(aliquots) {
            request.resolve(aliquots);
         });
      });

      return request.promise;
    }

    function getAliquotDescriptors() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .getAliquotDescriptors()
            .then(function(descriptors) {
              request.resolve(descriptors);
            });
        });

      return request.promise;
    }

    function getAliquotsByCenter(lotCode) {
      var request = $q.defer();

      _remoteStorage
      .whenReady()
      .then(function(remoteStorage) {
         return remoteStorage
         .getAliquotsByCenter(lotCode)
         .then(function(aliquots) {
            request.resolve(aliquots);
         });
      });

      return request.promise;
    }

    function getLots() {
      var request = $q.defer();

      _prjectRemoteStorage
      .whenReady()
      .then(function(remoteStorage) {
         return remoteStorage
         .getLots()
         .then(function(lots) {
            request.resolve(lots);
         });
      });

      return request.promise;
    }

    /**
     * Create the transport lot.
     * @param {(object)} lotStructure - structure of transport lot
     * @memberof LaboratoryCollectionService
     */
    function createLot(lotStructure) {
      var request = $q.defer();

      _prjectRemoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .createLot(lotStructure)
            .then(function(data) {
              request.resolve(data);
            })
            .catch(function(e){
               request.reject(e);
            });
        });

      return request.promise;
    }

    /**
     * Update the transport lot.
     * @param {(object)} lotStructure - structure of transport lot
     * @memberof LaboratoryCollectionService
     */
    function updateLot(lotStructure) {
      var request = $q.defer();

      _prjectRemoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .updateLot(lotStructure)
            .then(function(data) {
              request.resolve(data);
            })
            .catch(function(e){
               request.reject(e);
            });
        });

      return request.promise;
    }

    /**
     * Delete the transport lot.
     * @param {(object)} lotCode - code of transport lot
     * @memberof LaboratoryCollectionService
     */
    function deleteLot(lotCode) {
      var request = $q.defer();

      _prjectRemoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .deleteLot(lotCode)
            .then(function(data) {
              request.resolve(data);
            })
            .catch(function(e){
               request.reject(e);
            });
        });

      return request.promise;
    }
  }
}());
