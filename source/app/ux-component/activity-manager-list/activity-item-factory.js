(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ActivityItemFactory', Factory);


  Factory.$inject = ['ACTIVITY_MANAGER_LABELS'];

  function Factory(ACTIVITY_MANAGER_LABELS) {
    let self = this;

    /* Public methods */
    self.create = create;

    function create(activity) {
      return new ActivityItem(ACTIVITY_MANAGER_LABELS, activity);
    }

    return self;
  }

  function ActivityItem(ACTIVITY_MANAGER_LABELS, activity) {
    let self = this;

    if (activity.surveyForm.surveyTemplate){
      self.name = activity.surveyForm.surveyTemplate.identity.name;
      self.acronym = activity.surveyForm.surveyTemplate.identity.acronym;
    } else {
      self.name = activity.surveyForm.name;
      self.acronym = activity.surveyForm.acronym;
    }

    try{
      self.category = activity.category.label;
    }
    catch (e) {
      self.category = '';
    }

    self.mode = _getMode();
    self.realizationDate = _getFormattedDate();
    self.status = _getStatus();
    self.isDiscarded = activity.isDiscarded;
    self.activity = activity;
    self.externalID = activity.externalID;
    self.id = activity.getID();

    function _getFormattedDate() {
      try {
        let formattedDate = new Date(activity.getRealizationDate());
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return null;
      }
    }

    function _getStatus() {
      const STATUS = ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS;
      const SELECTED_STATUS = [
        STATUS.INITIALIZED_OFFLINE,
        STATUS.SAVED,
        STATUS.FINALIZED,
        STATUS.REOPENED
      ];

      let lastStatus = activity.statusHistory.getLastStatus();
      let status = SELECTED_STATUS.find(status => status.name === lastStatus.name);
      try{
        return status.label;
      }
      catch (e) {
        return STATUS.CREATED.label;
      }
    }

    function _getMode() {
      const MODE = ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE;
      const SELECTED_MODES = [
        MODE.PAPER,
        MODE.ONLINE,
        MODE.AUTOFILL
      ];

      let mode = SELECTED_MODES.find(mode => mode.name === activity.mode);
      if(!mode){
        return {
          name: '',
          icon: ''
        };
      }
      return mode;
    }
  }
}());
