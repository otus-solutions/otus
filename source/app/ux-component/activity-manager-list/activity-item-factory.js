(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ActivityItemFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create(activity) {
      return new ActivityItem(activity);
    }

    return self;
  }

  function ActivityItem(activity) {
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

      if ('INITIALIZED_OFFLINE' === status.name) {
        return 'Realizado em papel';
      } else if ('SAVED' === status.name) {
        return 'Salvo';
      } else if ('FINALIZED' === status.name) {
        return 'Finalizado';
      } else {
        return 'Criado';
      }
    }

    function _getMode() {
      if ('PAPER' === activity.mode) {
        return {
          name: 'Em papel',
          icon: 'description'
        };
      } else if ('ONLINE' === activity.mode) {
        return {
          name: 'Online',
          icon: 'signal_cellular_alt'
        };
      } else if ('AUTOFILL' === activity.mode){
        return {
          name: 'Auto Preenchimento',
          icon: 'home_work'
        }
      } else {
        return {
          name: '',
          icon: ''
        };
      }
    }
  }
}());
