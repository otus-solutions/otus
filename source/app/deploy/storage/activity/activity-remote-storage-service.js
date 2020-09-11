/**
 * ActivityRemoteStorageService
 * @namespace Services
 */
(function () {
  'use strict';

  angular
    .module('otusjs.deploy.storage')
    .service('otusjs.deploy.ActivityRemoteStorageService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ActivityRestService',
    'otusjs.deploy.ActivityImportRestService',
    'otusjs.deploy.ActivityConfigurationRestService',
    'otusjs.deploy.ActivitySharingRestService'
  ];

  /**
   * ActivityRemoteStorageService creates a communication between the application and
   * ActivityRestService. Thus, layers above this service doesn't really know from
   * where the storage is coming, considering that a remote storage not necessarily
   * is accessed through a REST service. The interface of this service has the
   * intent of represents to the client code that it is an collection like an
   * MongoDB or IndexDB collection. If new storage sources are created, this service
   * should wrap it.
   * @see {ActivityRestService}
   * @namespace ActivityRemoteStorage
   * @memberof Services
   */
  function Service($q, ActivityRestService, ActivityImportRestService,
                   ActivityConfigurationRestService, ActivitySharingRestService) {
    var self = this;

    /* Public methods */
    self.insert = insert;
    self.update = update;
    self.updateCheckerActivity = updateCheckerActivity;
    self.findActivities = findActivities;
    self.findCategories = findCategories;
    self.getById = getById;
    self.addActivityRevision = addActivityRevision;
    self.getActivityRevisions = getActivityRevisions;
    self.importActivities = importActivities;
    self.createFollowUpActivity = createFollowUpActivity;
    self.getSharedURL = getSharedURL;
    self.renovateSharedURL = renovateSharedURL;
    self.deleteSharedURL = deleteSharedURL;
    self.reopenActivity = reopenActivity;

    /**
     * Adds activities to collection.
     * @param {(object|array)} activities - the activity (or array of activities) to
     * be inserted
     * @returns {Promise} promise with activity or activities inserted with the _id
     * value inserted
     * when resolved
     * @memberof ActivityRemoteStorageService
     */
    function insert(activitiesToInsert) {
      let insertions = activitiesToInsert.map(_insertOne);
      return $q.all(insertions);
    }

    /**
     * Updates activities in collection.
     * @param {(object|array)} activity - the activity (or array of activities) to be
     * updated
     * @returns {Promise} promise with activity or activities updated when resolved
     * @memberof ActivityRemoteStorageService
     */
    function update(activityToUpdate) {
      var deferred = $q.defer();

      _updateArray(activityToUpdate, function (updatedActivities) {
        deferred.resolve(updatedActivities);
      });

      return deferred.promise;
    }


    /**
     * Updates activities in collection.
     * @param {(object|array)} activity - the activity (or array of activities) to be
     * updated
     * @returns {Promise} promise with activity or activities updated when resolved
     * @memberof ActivityRemoteStorageService
     */
    function updateCheckerActivity(recruitmentNumber, checkerUpdated) {
      var deferred = $q.defer();

      ActivityRestService
        .updateCheckerActivity(recruitmentNumber, checkerUpdated)
        .then(function (response) {
          deferred.resolve(response);
        }).catch(function () {
          deferred.reject();
        });

      return deferred.promise;
    }

    /**
     * Finds activities in collection. An object-like query can be passed to filter
     * the results.
     * @param {object} query - the query object to be applied like filter
     * @returns {Promise} promise with activity or activities updated when resolved
     * @memberof ActivityRemoteStorageService
     */
    function findActivities(query) {
      return ActivityRestService.list(query.recruitmentNumber);
    }

    /**
     * Find activity in collection. An object-like query can be passed to filter
     * the results.
     * @param {object} activityInfo - the query object to be applied like filter
     * @returns {Promise} promise with activity or activities updated when resolved
     * @memberof ActivityRemoteStorageService
     */

    function getById(activityId, rn) {
      var deferred = $q.defer();

      ActivityRestService
        .getById(activityId, rn)
        .then(function (response) {
          deferred.resolve(response);
        }).catch(function () {
          deferred.reject();
        });

      return deferred.promise;
    }

    /**
     * Finds categories in collection. An object-like query can be passed to filter
     * the results.
     * @param {object} query - the query object to be applied like filter
     * @returns {Promise} promise with category or categories updated when resolved
     * @memberof ActivityRemoteStorageService
     */
    function findCategories() {
      return ActivityConfigurationRestService.list();
    }

    /**
     * By the fact that the remote storage does its job asynchronously and that we
     * need insert an array of data, this method helps to synchronize the iteration
     * upon each data. Thus, we can ensures that the {@link insert} method will be
     * resolved only when all data is stored. When the work is done, the client
     * callback will be executed.
     * @param {array} activities - the array of data to store
     * @param {function} callback - the client callback that will be called
     * @param {integer=} currentIndex - (optional) the initial index to iterate over
     * the array
     * @memberof ActivityRemoteStorageService
     */
    function _insertArray(activities, callback, currentIndex) {
      _processArray(_insertOne)(activities, callback, currentIndex);
    }

    /**
     * Handles the insert of one activity in the remote storage and get the ID
     * generated by the remote storage.
     * @param {object} activity - the activity that should be inserted
     * @returns {Promise} promise with activity inserted when resolved
     * @memberof ActivityRemoteStorageService
     */
    function _insertOne(activity) {
      return ActivityRestService
        .save(activity)
        .then(function (response) {
          activity._id = response.data;
          return activity;
        });
    }

    /**
     * By the fact that the remote storage does its job asynchronously and that we
     * need update an array of data, this method helps to synchronize the iteration
     * upon each data. Thus, we can ensures that the {@link insert} method will be
     * resolved only when all data is updated. When the work is done, the client
     * callback will be executed.
     * @param {array} activities - the array of data to store
     * @param {callback} callback - the client callback that will be called
     * @param {currentIndex=} currentIndex - (optional) the initial index to iterate
     * over the array
     * @memberof ActivityRemoteStorageService
     */
    function _updateArray(activities, callback, currentIndex) {
      _processArray(_updateOne)(activities, callback, currentIndex);
    }

    /**
     * Handles the update of one activity in the remote storage.
     * @param {object} activity - the activity that should be inserted
     * @returns {Promise} promise with activity inserted when resolved
     * @memberof ActivityRemoteStorageService
     */
    function _updateOne(activity) {
      var deferred = $q.defer();

      ActivityRestService
        .update(activity)
        .then(function (response) {
          deferred.resolve(activity);
        });

      return deferred.promise;
    }

    function _processArray(procedure) {
      return function process(dataArray, callback, currentIndex) {
        currentIndex = currentIndex || 0;
        var data = dataArray[currentIndex];

        procedure(data)
          .then(function () {
            ++currentIndex;
            if (currentIndex < dataArray.length) {
              process(dataArray, callback, currentIndex);
            } else {
              if (callback) callback(dataArray);
            }
          });
      };
    }

    /**
     * Add activityRevision in collection.
     * @param {(object)} activityRevision - the activityReview to be insered
     * @returns {Promise} promise with activityRevision inserted when resolved
     * @memberof ActivityRemoteStorageService
     */
    function addActivityRevision(activityRevision, activity) {
      var deferred = $q.defer();

      ActivityRestService
        .addActivityRevision(activityRevision, activity)
        .then(function (response) {
          deferred.resolve(response);
        }).catch(function () {
          deferred.reject();
        });

      return deferred.promise;
    }

    function getActivityRevisions(activityID, activity) {
      var deferred = $q.defer();

      ActivityRestService
        .getActivityRevisions(activityID, activity)
        .then(function (response) {
          deferred.resolve(response);
        }).catch(function () {
          deferred.reject();
        });

      return deferred.promise;
    }

    /**
    * Import activities in collection.
    * @param {(object)} surveyActivities - the Activities answered to be insered
    * @param {(string)} acronym - the acronym of survey to be insered
    * @param {(integer)} version - the version of survey to be insered
    * @returns {Promise} promise with activities not inserted inserted when resolved
    * @memberof ActivityRemoteStorageService
    */
    function importActivities(surveyActivities, acronym, version) {
      var deferred = $q.defer();

      ActivityImportRestService
        .importActivities(surveyActivities, acronym, version)
        .then(function (response) {
          deferred.resolve(response);
        }).catch(function () {
          deferred.reject();
        });

      return deferred.promise;
    }

    /**
    * Create FollowUp in collection.
    * @param {(object)} createFollowUp - the createFollowUp to be insered
    * @returns {Promise} promise with createFollowUp inserted when resolved
    * @memberof ActivityRemoteStorageService
    */
    function createFollowUpActivity(activity) {
      var deferred = $q.defer();

      ActivityRestService
        .createFollowUpActivity(activity)
        .then(function (response) {
          deferred.resolve(response);
        }).catch(function () {
          deferred.reject();
        });

      return deferred.promise;
    }

    /** activity-sharing in collection */
    function getSharedURL(activityId) {
      return ActivitySharingRestService.getSharedURL(activityId);
    }

    function renovateSharedURL(activitySharingId) {
      return ActivitySharingRestService.renovateSharedURL(activitySharingId);
    }

    function deleteSharedURL(activitySharingId) {
      return ActivitySharingRestService.deleteSharedURL(activitySharingId);
    }


    function reopenActivity(activity){
      return ActivityRestService.reopen(activity);
    }

  }
}());
