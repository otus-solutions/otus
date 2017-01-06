(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.model.ActivityFacadeService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;

    /* Public methods */
    self.getActivity = getActivity;
    self.useActivity = useActivity;
    self.createActivity = createActivity;
    self.createQuestionFill = createQuestionFill;
    self.fillQuestion = fillQuestion;
    self.openActivitySurvey = openActivitySurvey;
    self.initializeActivitySurvey = initializeActivitySurvey;
    self.getFillingByQuestionID = getFillingByQuestionID;

    function getActivity() {
      return ActivityFacadeService.surveyActivity;
    }

    function useActivity(activity) {
      ActivityFacadeService.surveyActivity = activity;
    }

    function createActivity(template, user, participant, paperActivityData) {
      if (paperActivityData) {
        ActivityFacadeService.createPaperActivity(template, user, participant, paperActivityData);
      } else {
        ActivityFacadeService.createActivity(template, user, participant, participant);
      }

      return getActivity();
    }

    function openActivitySurvey() {
      ActivityFacadeService.openActivitySurvey();
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
  }
}());
