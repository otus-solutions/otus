(function() {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .controller('otusExpressActivityCreatorDialogController', Controller);

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.otus.uxComponent.OtusExpressActivityCreatorDialogValues',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'ACTIVITY_MANAGER_LABELS'

  ];

  function Controller(ParticipantActivityService, OtusExpressActivityCreatorDialogValues, CheckerItemFactory, ACTIVITY_MANAGER_LABELS){
    const self = this;
    self.dialogValues = OtusExpressActivityCreatorDialogValues;
    self.categories = [];
    self.optionModes = [];

    self.$onInit = onInit;
    self.createActivity = createActivity;

    function onInit(){
      _loadOptionModes();
      _loadCategories();
      _getSurveyByAcronym(self.data.preActivityArtefacts.acronym);
    }

    function createActivity(){
      alert("createActivity");
      console.info(self.data)

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
      ParticipantActivityService.listAllCategories()
        .then(response => self.categories = response);
    }


    function _getSurveyByAcronym(acronym) {
      // ParticipantActivityService.
    }
  }

}())