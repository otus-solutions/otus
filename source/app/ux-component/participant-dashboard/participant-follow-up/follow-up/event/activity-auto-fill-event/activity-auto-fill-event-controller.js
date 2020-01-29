(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activityAutoFillEventCtrl', Controller);

  Controller.$inject = [
    '$compile',
    '$scope',
    'SurveyFormFactory',
    'otusjs.participant.business.ParticipantFollowUpService',
    'otusjs.model.activity.ActivityFactory',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.deploy.ConfigurationRestService',
    'otusjs.activity.repository.ActivityRepositoryService',
    'otusjs.application.session.core.ContextService'
  ];

  function Controller($compile, $scope, SurveyFormFactory, ParticipantFollowUpService, ActivityFactory, ParticipantActivityService, ConfigurationRestService, ActivityRepositoryService, SessionContextService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      self.eventData = self.parent.eventData;
      self.parent.activateEvent = activateEvent;
    }

    function activateEvent() {
      SessionContextService.getLoggedUser().then((user) => {
        ConfigurationRestService.getSurveyByAcronym(self.eventData.acronym).then((surveyForm) => {
          if (surveyForm.data.length > 0) {
            ParticipantActivityService
              .listAllCategories()
              .then((response) => {
                let activityConfiguration = {};
                activityConfiguration.category = response[0];
                let activity = ActivityFactory.createAutoFillActivity(SurveyFormFactory.fromJsonObject(surveyForm.data[surveyForm.data.length-1]), user, self.parent.selectedParticipant, activityConfiguration);
                ActivityRepositoryService.createActivity(activity).then((result) => {
                  self.eventData.activityId = result._id;
                  ParticipantFollowUpService.activateFollowUpEvent(self.parent.selectedParticipant.recruitmentNumber, self.eventData).then(function(result) {
                    self.eventData.participantEvents.push(result);
                  });
                });
              });
          } else {

          }
        });
      });

    }
  }
}());