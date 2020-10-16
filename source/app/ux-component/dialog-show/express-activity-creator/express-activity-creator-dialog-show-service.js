(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.OtusExpressActivityCreatorDialogShowService', Service);

  Service.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
  ];

  function Service(ParticipantActivityService) {
    const self = this;
    self.loadCategories = loadCategories;
    self.getSurveyByAcronym = getSurveyByAcronym;


    function loadCategories() {
      return ParticipantActivityService.listAllCategories();
    }

    function getSurveyByAcronym(acronym) {
      return ParticipantActivityService.listAvailables()
        .then(surveyForms => surveyForms.find(surveyForm => surveyForm.acronym === acronym))
        .catch(e => console.info(e));
    }


    // function createPreActivity(survey) {
    //   return ParticipantActivityService.createPreActivity(
    //     survey,
    //     angular.copy(self.configuration),
    //     angular.copy(self.mode),
    //     angular.copy(self.paperActivityCheckerData));
    // }

  }

}());