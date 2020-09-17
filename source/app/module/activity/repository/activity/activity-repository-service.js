(function () {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.ActivityRepositoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.repository.ActivityCollectionService',
    'otusjs.activity.repository.SurveyCollectionService'
  ];

  function Service($q, ModuleService, ActivityCollectionService, SurveyCollectionService) {
    var self = this;
    var _existsWorkingInProgress = null;

    /* Public methods */
    self.createFromSurvey = createFromSurvey;
    self.createFromPaperActivity = createFromPaperActivity;
    self.listAll = listAll;
    self.listAllCategories = listAllCategories;
    self.listAvailables = listAvailables;
    self.save = save;
    self.discard = discard;
    self.updateCheckerActivity = updateCheckerActivity;
    self.addActivityRevision = addActivityRevision;
    self.getActivityRevisions = getActivityRevisions;
    self.importActivities = importActivities;
    self.getById = getById;

    self.createOnLineActivity = createOnLineActivity;
    self.createPaperActivity = createPaperActivity;
    self.createAutoFillActivity = createAutoFillActivity;
    self.saveActivities = saveActivities;

    self.createActivity = createActivity;
    self.createFollowUpActivity = createFollowUpActivity;
    self.reopenActivity = reopenActivity;

    function listAll(participant) {
      if (!participant) {
        throw new Error('No participant selected to list activities.', 'activity-repository-service.js', 63);
      }

      ActivityCollectionService.useParticipant(participant);

      if (_existsWorkingInProgress) {
        return _existsWorkingInProgress
          .then(function () {
            return _listAll();
          });
      }
      return _listAll();
    }

    function listAvailables() {
      return SurveyCollectionService.listAll().then(_toEntity);
    }

    function getById(activityId, rn) {
      return ActivityCollectionService.getById(activityId, rn).then(_toEntity);
    }


    function createFromSurvey(surveys, loggedUser, participant, configuration) {
      return _createActivity(surveys, loggedUser, participant, null, configuration);
    }

    function createFromPaperActivity(surveys, loggedUser, participant, paperActivityData, configuration) {
      return _createActivity(surveys, loggedUser, participant, paperActivityData, configuration);
    }

    function save(activity) {
      return _update([_toDbObject(activity)]);
    }

    function discard(activities) {
      return _update(activities.map(_toDbObject));
    }

    function _createActivity(surveys, loggedUser, participant, paperActivityData, configuration) {
      var work = _setupWorkProgress();
      ModuleService
        .whenActivityFacadeServiceReady()
        .then(function (activityFacadeService) {
          var activities = _toActivityModel(surveys, loggedUser, participant, paperActivityData, activityFacadeService, configuration);
          return ActivityCollectionService.insert(activities)
            .then(work.finish)
            .catch(err => {
              console.log('repository');
              work.finish();
            });
        });
    }

    function _listAll() {
      return ActivityCollectionService.listAll().then(_toEntity);
    }

    function listAllCategories() {
      return ActivityCollectionService.listAllCategories();
    }

    function updateCheckerActivity(recruitmentNumber, checkerUpdated) {
      return ActivityCollectionService.updateCheckerActivity(recruitmentNumber, checkerUpdated);
    }

    function _update(toUpdate) {
      if (!toUpdate || !toUpdate.length) {
        throw new Error('No activity to update.', 'activity-repository-service.js', 50);
      }
      return ActivityCollectionService.update(toUpdate).then(_setupWorkProgress().finish);
    }

    function _toActivityModel(surveys, loggedUser, participant, paperActivityData, activityFacadeService, configuration) {
      return surveys.map(function (survey) {
        var configActivity = configuration[survey.surveyTemplate.identity.acronym];
        var activity = activityFacadeService.createActivity(survey, loggedUser, participant, paperActivityData, configActivity);
        return activity.toJSON();
      });
    }

    function _setupWorkProgress() {
      var defer = $q.defer();
      _existsWorkingInProgress = defer.promise;

      return {
        finish: function () {
          defer.resolve();
        }
      };
    }

    /*************************************************************************************************
     * The next methods (_toEntity, _restoreEntity and _toDbObject) must be moved to another object
     * that will be responsible for the work of mapping the database objects to entities and
     * vice versa.
     ************************************************************************************************/
    function _toEntity(dbObjects) {
      if (Array.isArray(dbObjects)) {
        return dbObjects.map(function (dbObject) {
          return _restoreEntity(dbObject);
        });
      }

      return [_restoreEntity(dbObjects)];
    }

    function _restoreEntity(dbObject) {
      var entity = ModuleService.Model[dbObject.objectType].fromJsonObject(dbObject);
      entity.$loki = dbObject.$loki;
      entity.meta = dbObject.meta;
      return entity;
    }

    function _toDbObject(entity) {
      var dbObject = entity.toJSON();
      dbObject.$loki = entity.$loki;
      dbObject.meta = entity.meta;
      dbObject.isDiscarded = entity.isDiscarded;
      return dbObject;
    }

    function addActivityRevision(activityRevision, activity) {
      return ActivityCollectionService.addActivityRevision(activityRevision, activity);
    }

    function getActivityRevisions(activityID, activity) {
      return ActivityCollectionService.getActivityRevisions(activityID, activity);
    }

    function importActivities(surveyActivities, acronym, version) {
      return ActivityCollectionService.importActivities(surveyActivities, acronym, version);
    }


    function createOnLineActivity(survey, loggedUser, participant, configuration, externalID) {
      return ModuleService
        .whenActivityFacadeServiceReady()
        .then(function (ActivityFacadeService) {
          return ActivityFacadeService.createActivity(survey, loggedUser, participant, null, configuration, externalID);
        });
    }

    function createPaperActivity(survey, loggedUser, participant, paperActivityData, configuration, externalID) {
      return ModuleService
        .whenActivityFacadeServiceReady()
        .then(function (ActivityFacadeService) {
          return ActivityFacadeService.createActivity(survey, loggedUser, participant, paperActivityData, configuration, externalID);
        });
    }

    function createAutoFillActivity(survey, loggedUser, participant, configuration, externalID) {
      return ModuleService
        .whenActivityFacadeServiceReady()
        .then(function (ActivityFacadeService) {
          return ActivityFacadeService.createAutoFillActivity(survey, loggedUser, participant, configuration, externalID);
        });
    }

    function saveActivities(activities) {
      var work = _setupWorkProgress();
      return ActivityCollectionService.insert(activities)
        .then(work.finish)
        .catch(err => {
          work.finish();
          return $q.reject(err);
        });
    }

    function createActivity(activity) {
      return ActivityCollectionService.insert([activity]);
    }

    function createFollowUpActivity(activity) {
      return ActivityCollectionService.createFollowUpActivity(activity);
    }

    function reopenActivity(activity){
      return ActivityCollectionService.reopenActivity(activity)
        .then(_setupWorkProgress().finish);
    }

  }

}());
