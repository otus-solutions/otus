/**
 * ActivityCollectionService
 * @namespace Services
 */
(function () {
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
    self.listAllCategories = listAllCategories;
    self.update = update;
    self.updateCheckerActivity = updateCheckerActivity;
    self.addActivityRevision = addActivityRevision;
    self.getActivityRevisions = getActivityRevisions;
    self.importActivities = importActivities;
    self.getById = getById;
    self.createFollowUpActivity = createFollowUpActivity;
    self.reopenActivity = reopenActivity;
    self.getAllByStageGroup = getAllByStageGroup;
    self.discardActivity = discardActivity;

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
      return _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .insert(activities)
            .then(function (remoteActivities) {
              return ActivityStorageService.insert(remoteActivities);
            });
        });

    }

    /**
     * Updates activities in collection.
     * @param {(object|array)} activities - the activity (or array of activities) to be updated
     * @memberof ActivityCollectionService
     */
    function update(activities) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          remoteStorage
            .update(activities)
            .then(function () {
              request.resolve();
            });
        });

      return request.promise;
    }

    /**
     * Updates checker activity in collection.
     * @param {(string)} id - the activity id to be updated
     * @param {(object)} user - the user to be updated
     * @memberof ActivityCollectionService
     */

    function updateCheckerActivity(recruitmentNumber, checkerUpdated) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          remoteStorage
            .updateCheckerActivity(recruitmentNumber, checkerUpdated)
            .then(function (response) {
              request.resolve(response);
            }).catch(function () {
              request.reject();
            });
        });

      return request.promise;
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
        .then(function (remoteStorage) {
          return remoteStorage
            .findActivities({
              recruitmentNumber: _participant.recruitmentNumber
            })
            .then(function (activities) {
              ActivityStorageService.clear();
              var localData = ActivityStorageService.insert(activities);
              request.resolve(localData);
            });
        });

      return request.promise;
    }

    function listAllCategories() {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .findCategories()
            .then(function (activityConfiguration) {
              request.resolve(activityConfiguration);
            });
        });

      return request.promise;
    }

    /**
     * Add registry review activity in collection.
     * @param {(object)} activityReview - the object to be inserted
     * @memberof ActivityCollectionService
     */
    function addActivityRevision(activityRevision, activity) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          remoteStorage
            .addActivityRevision(activityRevision, activity)
            .then(function (response) {
              request.resolve(response);
            }).catch(function () {
              request.reject();
            });
        });

      return request.promise;
    }

    function getActivityRevisions(activityID, activity) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          remoteStorage
            .getActivityRevisions(activityID, activity)
            .then(function (response) {
              request.resolve(response);
            }).catch(function () {
              request.reject();
            });
        });

      return request.promise;
    }

    function getById(activityId, rn) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          remoteStorage
            .getById(activityId, rn)
            .then(function (response) {
              request.resolve(response);
            }).catch(function () {
              request.reject();
            });
        });

      return request.promise;
    }

    function importActivities(surveyActivities, acronym, version) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          remoteStorage
            .importActivities(surveyActivities, acronym, version)
            .then(function (response) {
              request.resolve(response);
            }).catch(function () {
              request.reject();
            });
        });

      return request.promise;
    }

    /**
    * Adds activities to collection.
    * @param {(object|array)} activities - the activity (or array of activities) to be inserted
    * @returns {Promise} promise with activity or activities inserted when resolved
    * @memberof ActivityCollectionService
    */
    function createFollowUpActivity(activities) {
      var request = $q.defer();

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .createFollowUpActivity(activities)
            .then(function (remoteActivities) {
              var localActivities = ActivityStorageService.insert(remoteActivities);
              request.resolve(localActivities);
            });
        });

      return request.promise;
    }


    function reopenActivity(activity) {
      let request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage.reopenActivity(activity)
            .then(() => request.resolve())
            .catch(err => request.reject(err));
        });
      return request.promise;
    }

    function getAllByStageGroup(participant) {
      return _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.getAllByStageGroup(participant))
        .then(response => {
          return response.data
        });
    }

    function discardActivity(activityId, participant) {
      _remoteStorage.whenReady()
        .then(remoteStorage => remoteStorage.discardActivity(activityId, participant));
    }

  }
}());
