(function() {
  'use strict';

  angular
    .module('otusjs.user.business')
    .service('otusjs.user.business.UserSearchService', Service);

  Service.$inject = [
    '$filter',
    'otusjs.user.core.ContextService',
    'otusjs.user.core.EventService',
    'otusjs.user.business.UserRepositoryService',
  ];

  function Service($filter, ContextService, EventService, UserRepositoryService) {
    var self = this;
    var _filteredUsers = [];

    /* Public methods */
    self.filter = filter;
    self.getAll = getAll;
    self.getFilteredData = getFilteredData;
    self.hasResultFilter = hasResultFilter;
    self.selectUser = selectUser;

    function filter(query) {
      var users = UserRepositoryService.listIdexers();
      if (query) {
        _filteredUsers = $filter('userQuick')(users, query);
      } else {
        _filteredUsers = [];
      }
    }

    function getAll() {
      return UserRepositoryService.listIdexers();
    }

    function getFilteredData() {
      return _filteredUsers;
    }

    function hasResultFilter() {
      return _filteredUsers.length > 0;
    }

    function selectUser(user) {
      _filteredUsers = [];
      ContextService.selectUser(user);
      EventService.fireUserSelected(user);
    }
  }
}());
