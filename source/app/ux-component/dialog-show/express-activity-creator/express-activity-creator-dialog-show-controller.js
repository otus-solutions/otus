(function() {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .controller('otusExpressActivityCreatorDialogController', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.OtusExpressActivityCreatorDialogShowService',
    'otusjs.otus.uxComponent.OtusExpressActivityCreatorDialogValues',
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

    function onInit(){
      _loadOptionModes();
      _loadCategories();
      _getSurveyByAcronym(self.data.preActivityArtefacts.acronym);
    }

    function _loadOptionModes() {
      self.optionModes = [
        {
          mode: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.name,
          label: ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.label
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

    function _getSurveyByAcronym(acronym = 'TCLEC') {
      expressActivityCreatorService.getSurveyByAcronym(acronym)
        .then(surveyFound => self.preActivityArtefacts.surveyForm = surveyFound);
    }

    function createActivity(){
      if(self.activityCreationForm.$invalid){
        alert("form invalid");
        return;
      }
      alert("createActivity");
      expressActivityCreatorService.createActivity(self.preActivityArtefacts)
        .then(() => self.data.cancel());
    }

  }

}())