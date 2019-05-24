/**
 * LaboratoryCollectionService
 * @namespace Services
 */
(function () {
  'use strict';

  angular
    .module('otusjs.user.repository')
    .service('otusjs.user.repository.UserCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.user.core.ModuleService'
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
    var _remoteStorage = ModuleService.getUserPermissionRemoteStorage();

    /* Public methods */
    self.getAllPermission = getAllPermission;

    /**
     * get permission to collection.
     * @returns {Promise} promise with user permission
     * @memberof LaboratoryCollectionService
     */
    function getAllPermission() {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getAllPermission(laboratory)
            .then(function (remoteLaboratory) {
              var localLaboratory = LaboratoryLocalStorageService.insert(remoteLaboratory);
              request.resolve(localLaboratory);
            });
        });

      return request.promise;
    }




  }
}());
