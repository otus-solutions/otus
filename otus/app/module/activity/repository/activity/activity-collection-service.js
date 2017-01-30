/**
 * ActivityCollectionService
 * @namespace Services
 */
(function() {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.ActivityCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.storage.ActivityLocalStorageService'
  ];

  /**
   * ActivityCollectionService represents to application the activity collection. It abstracts to
   * other layers the storage implementation. Currently, are two storages wrapped in this service: a
   * remote storage and a local storage. Basically the oprations workflow is try to send/retrieve data
   * from remote storage and after the same operation is done into local storage.
   * @namespace ActivityCollectionService
   * @memberof Services
   */
  function Service($q, ModuleService, ActivityStorageService) {
    var self = this;
    var _remoteStorage = ModuleService.getActivityRemoteStorage();
    var _participant = null;

    /* Public methods */
    self.useParticipant = useParticipant;
    self.resetParticipantInUse = resetParticipantInUse;
    self.insert = insert;
    self.listAll = listAll;
    self.update = update;

    /**
     * Configures collection to use a participant as reference on "ready-queries". Ready-queries are
     * all methods of this service that deal with data and don't need parameters to operator over
     * data set.
     * @param {(object)} participant - the participant to be used as reference
     * @memberof ActivityCollectionService
     */
    function useParticipant(participant) {
      _participant = participant;
    }

    /**
     * Reset the participant reference that should be used by collection.
     * @see {@link | useParticipant}
     * @memberof ActivityCollectionService
     */
    function resetParticipantInUse() {
      _participant = null;
    }

    /**
     * Adds activities to collection.
     * @param {(object|array)} activities - the activity (or array of activities) to be inserted
     * @returns {Promise} promise with activity or activities inserted when resolved
     * @memberof ActivityCollectionService
     */
    function insert(activities) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .insert(activities)
            .then(function(remoteActivities) {
              var localActivities = ActivityStorageService.insert(remoteActivities);
              request.resolve(localActivities);
            });
        });

      return request.promise;
    }

    /**
     * Updates activities in collection.
     * @param {(object|array)} activities - the activity (or array of activities) to be updated
     * @memberof ActivityCollectionService
     */
    function update(activities) {
      return _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          remoteStorage
            .update(activities)
            .then(ActivityStorageService.update);
        });
    }

    /**
     * Fetches activities from collection based on participant passed to {@link | useParticipant}
     * method.
     * @param {(object|array)} activities - the activity (or array of activities) to be updated
     * @returns {Promise} promise with activity or activities found
     * @memberof ActivityCollectionService
     */
    function listAll() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function(remoteStorage) {
          return remoteStorage
            .find({
              recruitmentNumber: _participant.recruitmentNumber
            })
            .then(function(activities) {
              ActivityStorageService.clear();
              var localData = ActivityStorageService.insert(activities);
              request.resolve(localData);
            });
        });

      return request.promise;
    }
  }
}());
