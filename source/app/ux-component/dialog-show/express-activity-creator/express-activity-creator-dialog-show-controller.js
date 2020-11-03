(function() {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .controller('otusExpressActivityCreatorDialogController', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.ExpressActivityCreatorDialogShowService',
    'otusjs.otus.uxComponent.ExpressActivityCreatorDialogValues',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'ACTIVITY_MANAGER_LABELS'
  ];


  function Controller(ExpressActivityCreatorDialogShowService, expressActivityCreatorDialogValues, CheckerItemFactory, ACTIVITY_MANAGER_LABELS){
    const self = this;
    self.dialogValues = expressActivityCreatorDialogValues;
    self.categories = [];
    self.optionModes = [];
    self.surveyForm = {};
    self.preActivityArtefacts = {};

    self.$onInit = onInit;
    self.createActivity = createActivity;
    self.updateRealizationDate = updateRealizationDate;

    function onInit(){
      self.preActivityArtefacts = angular.copy(self.data.preActivityArtefacts);
      _loadOptionModes();
      _loadCategories();
      _getSurveyByAcronym(self.preActivityArtefacts.acronym);
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
      ExpressActivityCreatorDialogShowService.loadCategories()
        .then(response => self.categories = response);
    }

    function _getSurveyByAcronym(acronym) {
      ExpressActivityCreatorDialogShowService.getSurveyByAcronym(acronym)
        .then(surveyFound => self.preActivityArtefacts.surveyForm = surveyFound);
    }

    function createActivity(){
      if(self.activityCreationForm.$invalid){
        self.activityCreationForm.$setDirty();
        if(self.activityCreationForm.checker) {
          self.activityCreationForm.checker.$setDirty()
        }
        return;
      }
      ExpressActivityCreatorDialogShowService.createActivity(self.preActivityArtefacts)
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