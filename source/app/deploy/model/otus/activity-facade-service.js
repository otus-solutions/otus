(function() {
  'use strict';

  angular
    .module('otusjs.deploy.model.otus')
    .service('otusjs.deploy.model.ActivityFacadeService', Service);

  Service.$inject = [
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ParticipantFactory, ActivityFacadeService) {
    var self = this;
    var _currentUser = null;

    /* Public methods */
    self.getActivity = getActivity;
    self.useActivity = useActivity;
    self.createActivity = createActivity;
    self.createQuestionFill = createQuestionFill;
    self.fillQuestion = fillQuestion;
    self.openSurveyActivity = openSurveyActivity;
    self.initializeActivitySurvey = initializeActivitySurvey;
    self.getFillingByQuestionID = getFillingByQuestionID;
    self.createActivityRevision = createActivityRevision;
    self.getActivityRevisions = getActivityRevisions;

    function getActivity() {
      return ActivityFacadeService.surveyActivity;
    }

    function useActivity(activity) {
      ActivityFacadeService.surveyActivity = activity;
      self.surveyActivity = activity;
    }

    function createActivity(template, user, participant, paperActivityData, configuration, externalID) {
      if (paperActivityData) {
        ActivityFacadeService.createPaperActivity(template, user, ParticipantFactory.fromJson(participant).toJSON(), paperActivityData, configuration, externalID);
      } else {
        ActivityFacadeService.createActivity(template, user, ParticipantFactory.fromJson(participant).toJSON(), configuration, externalID);
      }

      return getActivity();
    }

    function openSurveyActivity(user) {
      _currentUser = user;
      ActivityFacadeService.openActivitySurvey(_currentUser);
    }

    function initializeActivitySurvey() {
      ActivityFacadeService.initializeActivitySurvey();
    }

    function createQuestionFill(question, answer, metadata, comment) {
      return ActivityFacadeService.createQuestionFill(question, answer, metadata, comment);
    }

    function fillQuestion(filling) {
      ActivityFacadeService.fillQuestion(filling);
    }

    function getFillingByQuestionID(questionID) {
      return ActivityFacadeService.getFillingByQuestionID(questionID);
    }

    function createActivityRevision(activityId, revisionDate) {
      return ActivityFacadeService.createActivityRevision(activityId, revisionDate);
    }

    function getActivityRevisions(revisions){
      return ActivityFacadeService.createActivityRevisionFromJson(revisions);
    }

  }
}());
