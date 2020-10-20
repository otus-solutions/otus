(function() {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .controller('otusExpressActivityCreatorDialogController', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.OtusExpressActivityCreatorDialogShowService',
    'otusjs.otus.uxComponent.ExpressActivityCreatorDialogValues',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'ACTIVITY_MANAGER_LABELS'

  ];

  function Controller(expressActivityCreatorService, OtusExpressActivityCreatorDialogValues, CheckerItemFactory, ACTIVITY_MANAGER_LABELS){
    const self = this;
    self.dialogValues = OtusExpressActivityCreatorDialogValues;
    self.categories = [];
    self.optionModes = [];
    self.surveyForm = {};
    self.preActivityArtefacts = {};

    self.$onInit = onInit;
    self.createActivity = createActivity;
    self.updateRealizationDate = updateRealizationDate;

    function onInit(){
      _loadOptionModes();
      _loadCategories();
      _getSurveyByAcronym(self.data.preActivityArtefacts.acronym);
      self.preActivityArtefacts.realizationDate = new Date();
    }

    function _loadOptionModes() {
      self.optionModes = [
        {
          mode: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.name,
          label: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.label,
          isDefault: true
        },
        {
          mode: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.PAPER.name,
          label: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.PAPER.label
        },
        {
          mode: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.name,
          label: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.label
        }
      ]
    }

    function _loadCategories() {
      expressActivityCreatorService.loadCategories()
        .then(response => self.categories = response);

    }

    function _getSurveyByAcronym(acronym) {
      expressActivityCreatorService.getSurveyByAcronym(acronym)
        .then(surveyFound => self.preActivityArtefacts.surveyForm = surveyFound);
    }

    function createActivity(){
      if(self.activityCreationForm.$invalid){
        alert("form invalid");
        return;
      }
      expressActivityCreatorService.createActivity(self.preActivityArtefacts)
        .then(() => self.data.cancel())
        .then(() => self.data.preActivityArtefacts.actionRefreshCallback());
    }

    function updateRealizationDate(updatedDate) {
      self.realizationDate = updatedDate;
      _cleanCheckerSearchText();
    }

    function _cleanCheckerSearchText() {
      self.checkerSearchText = "";
    }
  }

}())