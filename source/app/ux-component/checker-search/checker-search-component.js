(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusCheckerSearch', {
      controller: 'otusCheckerSearchCtrl as $ctrl',
      templateUrl: 'app/ux-component/checker-search/checker-search-template.html',
      bindings: {
        searchSettings: '=',
        filterItem: '=',
        placeholderTitle: '@',
        changeWatcher: '&',
        selectedItem: '='
      }
    }).controller('otusCheckerSearchCtrl', Controller);

  Controller.$inject = [
    'STATE',
    '$q',
    '$timeout',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.genericListViewer.GenericListViewerService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(STATE, $q, $timeout, CheckerItemFactory, ParticipantActivityService,
                      GenericListViewerService, ApplicationStateService) {
    const self = this;

    self.$onInit = onInit;
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;

    function onInit() {
      self.checkers = angular.copy(ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create));
    }

    function querySearch(query) {
      let results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
      let deferred = $q.defer();

      $timeout(function () {
        deferred.resolve(results);
      }, Math.random() * 1000, false);

      return deferred.promise;
    }

    function _createFilterFor(query) {
      let lowerCaseQuery = angular.lowercase(query);

      return function filterFn(checker) {
        return checker.text.toLowerCase().indexOf(lowerCaseQuery) > -1
          || checker.checker.email.toLowerCase().indexOf(lowerCaseQuery) > -1;
      };
    }

    function selectedItemChange(item) {
      if (item && ApplicationStateService.currentStateIsListViewer()) {
        GenericListViewerService.getChecker(item, self.filterItem, self.searchSettings);
      }
    }

    function searchTextChange() {
      if (ApplicationStateService.currentStateIsListViewer()) {
        if(self.inputedText === "") {
          delete self.searchSettings.filter[self.filterItem.title];
        }
        else {
          self.searchSettings.filter[self.filterItem.title] = self.inputedText;
        }
        self.changeWatcher();
      }
    }
  }
}());