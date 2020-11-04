(function () {
  'use strict'

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.ExpressActivityCreatorDialogShowService', Service);

  Service.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
  ];

  function Service(ParticipantActivityService) {
    const self = this;
    self.loadCategories = loadCategories;
    self.getSurveyByAcronym = getSurveyByAcronym;
    self.createActivity = createActivity;


    function loadCategories() {
      return ParticipantActivityService.listAllCategories();
    }

    function getSurveyByAcronym(acronym) {
      return ParticipantActivityService.listAvailables()
        .then(surveyForms => surveyForms.find(surveyForm => surveyForm.acronym === acronym));
    }

    function _createPreActivity({surveyForm, configuration, mode, checkerData, realizationDate, externalID} = preActivityArtefacts) {
      let preActivity = ParticipantActivityService.createPreActivity(surveyForm, configuration, mode);
      if(externalID) preActivity.externalID = externalID;
      if(_isPaperActivity(mode)) preActivity.updatePaperActivityData(checkerData, realizationDate);
      preActivity.preActivityValid = true;
      return preActivity;
    }

    function _isPaperActivity(mode){
      return mode === "PAPER" ? 1 : 0;
    }

    function createActivity(preActivityArtefacts) {
      let preActivity = _createPreActivity(preActivityArtefacts);
      if (preActivity.preActivityValid) return ParticipantActivityService.saveActivities([preActivity]);
    }
  }

}());