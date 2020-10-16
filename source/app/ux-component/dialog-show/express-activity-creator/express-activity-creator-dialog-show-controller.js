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

  function Controller(ExpressActivityCreatorService, OtusExpressActivityCreatorDialogValues, CheckerItemFactory, ACTIVITY_MANAGER_LABELS){
    const self = this;
    self.dialogValues = OtusExpressActivityCreatorDialogValues;
    self.categories = [];
    self.optionModes = [];
    self.surveyForm = {};
    self.preActivity = {};


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
      ExpressActivityCreatorService.loadCategories()
        .then(response => self.categories = response);
    }

    function _getSurveyByAcronym(acronym = 'TCLEC') {
      ExpressActivityCreatorService.getSurveyByAcronym(acronym)
        .then(surveyFound => self.surveyForm = surveyFound);
    }

    function createActivity(){
      alert("createActivity");
      // console.info(self.data);
      console.info(self)
    }

  }

}())