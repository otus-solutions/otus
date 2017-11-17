(function() {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ParticipantActivityService', Service);

  Service.$inject = [
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService',
    'otusjs.activity.repository.ActivityRepositoryService',
    'otusjs.activity.repository.UserRepositoryService'
  ];

  function Service(ModuleService, ContextService, ActivityRepositoryService, UserRepositoryService) {
    var self = this;
    var _paperActivityCheckerData = null;

    /* Public methods */
    self.initializePaperActivityData = initializePaperActivityData;
    self.add = add;
    self.listAll = listAll;
    self.listAvailables = listAvailables;
    self.selectActivities = selectActivities;
    self.getSelectedActivities = getSelectedActivities;
    self.getSelectedParticipant = getSelectedParticipant;
    self.listActivityCheckers = listActivityCheckers;
    self.setActivitiesSelection = setActivitiesSelection
    self.getActivitiesSelection = getActivitiesSelection

    function add(surveys) {
      var loggedUser = ContextService.getLoggedUser();

      getSelectedParticipant()
      .then(function(selectedParticipant) {
        if (_paperActivityCheckerData) {
          ActivityRepositoryService.createFromPaperActivity(self.listSurveys, loggedUser, selectedParticipant, _paperActivityCheckerData);
          _paperActivityCheckerData = null;
        } else {
          ActivityRepositoryService.createFromSurvey(self.listSurveys, loggedUser, selectedParticipant);
        }
      });
    }

    function setActivitiesSelection(surveys) {
      self.listSurveys = surveys;
    }

    function getActivitiesSelection() {
      return self.listSurveys;
    }

    function listAll() {
      return getSelectedParticipant()
        .then(function(selectedParticipant) {
          return ActivityRepositoryService.listAll(selectedParticipant);
        });
    }

    function listAvailables() {
      return ActivityRepositoryService.listAvailables();
    }

    function initializePaperActivityData(paperActivityCheckerData) {
      _paperActivityCheckerData = paperActivityCheckerData;
    }

    function selectActivities(activities) {
      ContextService.selectActivities(activities);
    }

    function getSelectedActivities() {
      return {
        list: function list() {
          return ContextService.getSelectedActivities();
        },
        discard: function discard() {
          var toDiscard = ContextService.getSelectedActivities().map(function(activity) {
            activity.isDiscarded = true;
            return activity;
          });
          ActivityRepositoryService.discard(toDiscard);
          ContextService.clearSelectedActivities();
        }
      };
    }

    function getSelectedParticipant() {
      return ContextService.getSelectedParticipant();
    }

    function listActivityCheckers() {
      return UserRepositoryService.listAll();
    }

    function useSelectedActivity() {
      var selectedActivities = getSelectedActivities();
      if (selectedActivities.length === 1) {
        ContextService.setActivityInUse(selectedActivities[0]);
        ModuleService.ActivityFacadeService.useActivity(selectedActivities[0]);
      }
    }
  }
}());
