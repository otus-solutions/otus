(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ActivityItemFactory', Factory);

  Factory.$inject = ['ACTIVITY_MANAGER_LABELS']

  function Factory(ACTIVITY_MANAGER_LABELS) {
    var self = this;

    /* Public methods */
    self.create = create;

    function create(activity) {
      return new ActivityItem(ACTIVITY_MANAGER_LABELS, activity);
    }

    return self;
  }

  function ActivityItem(ACTIVITY_MANAGER_LABELS, activity) {
    var self = this;

    if (activity.surveyForm.surveyTemplate){
      self.name = activity.surveyForm.surveyTemplate.identity.name;
      self.acronym = activity.surveyForm.surveyTemplate.identity.acronym;
    } else {
      self.name = activity.surveyForm.name;
      self.acronym = activity.surveyForm.acronym;
    }
    self.category = activity.category && activity.category.label ? activity.category.label : ''; //TODO: remove ternary
    self.mode = _getMode();
    self.realizationDate = _getFormattedDate();
    self.status = _getStatus();
    self.isDiscarded = activity.isDiscarded;
    self.activity = activity;
    self.externalID = activity.externalID;
    self.id = activity.getID();

    function _getFormattedDate() {
      try {
        var formattedDate = new Date(activity.getRealizationDate());
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return null;
      }
    }

    function _getStatus() {
      var status = activity.statusHistory.getLastStatus();

      if (ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.INITIALIZED_OFFLINE.name === status.name) {
        return ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.INITIALIZED_OFFLINE.label;
      } else if (ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.SAVED.name === status.name) {
        return ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.SAVED.label;
      } else if (ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.FINALIZED.name === status.name) {
        return ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.FINALIZED.label;
      } else {
        return ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.CREATED.label;
      }
    }

    function _getMode() {
      if (ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.PAPER.name === activity.mode) {
        return ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.PAPER;
      } else if (ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE.name === activity.mode) {
        return ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.ONLINE;
      } else if (ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.name === activity.mode){
        return ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL;
      } else {
        return {
          name: '',
          icon: ''
        };
      }
    }
  }
}());
