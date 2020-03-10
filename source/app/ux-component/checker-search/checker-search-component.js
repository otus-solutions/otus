(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusCheckerSearch', {
      controller:  'userActivityPendencyCtrl as $ctrl',
      templateUrl: 'app/ux-component/checker-search/checker-search-template.html',
      bindings: {
        searchSettings: '=',
        pendencyFilterItem: '=',
        placeholderTitle: '@',
        changeWatcher: '&'
      }
    }).controller('otusCheckerSearchCtrl', Controller);

  Controller.$inject = [
    'STATE',
    '$q',
    '$timeout',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.pendencyViewer.PendencyViewerService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(STATE, $q, $timeout, CheckerItemFactory, ParticipantActivityService,
                      PendencyViewerService, ApplicationStateService) {
    const self = this;

    self.$onInit = onInit;
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    function onInit() {
      self.checkers = angular.copy(ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create));
    }

    function querySearch(query) {
      var results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
      var deferred = $q.defer();

      $timeout(function () {
        deferred.resolve(results);
      }, Math.random() * 1000, false);

      return deferred.promise;
    }

    function _createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(checker) {
        return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1
          || checker.checker.email.toLowerCase().indexOf(lowercaseQuery) > -1;
      };
    }

    function selectedItemChange(item) {
      if (ApplicationStateService.getCurrentState() == STATE.PENDENCY_VIEWER && item) {
        PendencyViewerService.getChecker(item, self.pendencyFilterItem, self.searchSettings);
      }
    }

    function searchTextChange() {
      switch (ApplicationStateService.getCurrentState()) {
        case STATE.PENDENCY_VIEWER:
          if(self.inputedText === "") delete self.searchSettings.filter[self.pendencyFilterItem.title];
          else self.searchSettings.filter[self.pendencyFilterItem.title] = self.inputedText;
          self.changeWatcher();
      }
    }
  }
}());