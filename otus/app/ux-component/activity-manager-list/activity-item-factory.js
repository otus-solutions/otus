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

    self.name = activity.template.identity.name;
    self.acronym = activity.template.identity.acronym;
    self.mode = _getMode();
    self.realizationDate = _getFormattedDate();
    self.status = _getStatus();
    self.activity = activity;

    function _getFormattedDate() {
      try {
        var formattedDate = new Date(activity.getRealizationDate());
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return null;
      }
    }

    function _getStatus() {
      if ('INITIALIZED_OFFLINE' === activity.statusHistory.getLastStatus().name) {
        return 'Finalizado em papel';
      } else if ('SAVED' === activity.statusHistory.getLastStatus().name) {
        return 'Salvo';
      } else if ('FINALIZED' === activity.statusHistory.getLastStatus().name) {
        return 'Finalizado';
      } else {
        return '';
      }
    }

    function _getMode() {
      if ('PAPER' === activity.mode) {
        return {
          name: 'Em papel',
          icon: 'file-document'
        };
      } else if ('ONLINE' === activity.mode) {
        return {
          name: 'Online',
          icon: 'signal'
        };
      } else {
        return {
          name: '',
          icon: ''
        };
      }
    }
  }
}());
