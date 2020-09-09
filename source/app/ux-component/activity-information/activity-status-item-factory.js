(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.ActivityStatusItemFactory', Factory);

  Factory.$inject = [
    'ACTIVITY_MANAGER_LABELS'
  ]

  function Factory(ACTIVITY_MANAGER_LABELS) {
    var self = this;

    /* Public methods */
    self.create = create;

    function create(data) {
      return new ActivityStatusItem(ACTIVITY_MANAGER_LABELS, data);
    }

    return self;
  }

  function ActivityStatusItem(ACTIVITY_MANAGER_LABELS, data) {
    var self = this;

    self.date = _getFormattedDate(data);
    self.user = data.user;
    self.user.formattedName = data.user.name + ' ' + data.user.surname;
    self.status = _buildStatus(data);

    function _buildStatus(status) {
      var map = ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS;

      return map[status.name];
    }

    function _getFormattedDate(status) {
      try {
        var formattedDate = new Date(status.date);
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return null;
      }
    }
  }
}());
