(function() {
  'use strict';

  angular
    .module('otusjs.activity.repository')
    .service('otusjs.activity.repository.ActivityRepositoryService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService',
    'otusjs.activity.repository.ActivityCollectionService',
    'otusjs.activity.repository.SurveyCollectionService'
  ];

  function Service(ModuleService, ContextService, ActivityCollectionService, SurveyCollectionService) {
    var self = this;

    /* Public methods */
    self.createFromSurvey = createFromSurvey;
    self.createFromPaperActivity = createFromPaperActivity;
    self.listAll = listAll;
    self.listAvailables = listAvailables;
    self.remove = remove;

    function createFromSurvey(surveys, loggedUser, participant) {
      _createActivity(surveys, loggedUser, participant);
    }

    function createFromPaperActivity(surveys, loggedUser, participant, paperActivityData) {
      _createActivity(surveys, loggedUser, participant, paperActivityData);
    }

    function _createActivity(surveys, loggedUser, participant, paperActivityData) {
      ModuleService
        .whenActivityFacadeServiceReady()
        .then(function(activityFacadeService) {
          var activities = surveys.map(function(survey) {
            var activity = activityFacadeService.createActivity(survey, loggedUser, participant, paperActivityData);
            return JSON.parse(activity.toJson());
          });
          ActivityCollectionService.insert(activities);
          ActivityCollectionService.save();
        });
    }

    function listAll(participant) {
      ActivityCollectionService.useParticipant(participant);
      return ActivityCollectionService.listAll().then(_toEntity);
    }

    function listAvailables() {
      return SurveyCollectionService.listAll().then(_toEntity);
    }

    function remove(activities) {
      ActivityCollectionService.remove(activities);
      ActivityCollectionService.save();
    }

    function _toEntity(rawData) {
      if (Array.isArray(rawData)) {
        return rawData.map(function(data) {
          return _mapEntity(data);
        });
      } else {
        return _mapEntity(data);
      }
    }

    function _mapEntity(data) {
      var activity = null;

      if (data.hasOwnProperty('surveyFormType')) {
        activity = ModuleService.Model.Survey.fromJsonObject(data.surveyTemplate);
        activity.type = data.surveyFormType;
      } else {
        activity = ModuleService.Model[data.objectType].fromJsonObject(data);
      }

      activity.$loki = data.$loki;
      return activity;
    }
  }
}());
