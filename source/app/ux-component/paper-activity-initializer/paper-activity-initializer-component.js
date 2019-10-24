(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPaperActivityInitializer', {
      controller: Controller,
      templateUrl: 'app/ux-component/paper-activity-initializer/paper-activity-initializer-template.html',
      bindings: {
        checkers: '<'
      }
    });

  Controller.$inject = [
    '$q',
    '$timeout',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.uxComponent.CheckerItemFactory'
  ];

  function Controller($q, $timeout, ActivityService, ApplicationStateService, CheckerItemFactory) {
    var self = this;

    /* Public methods */
    self.querySearch = querySearch;
    self.returnToParticipantActivities = returnToParticipantActivities;
    self.goToActivityAdder = goToActivityAdder;
    self.$onInit = onInit;

    function querySearch(query) {
      var results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve(results);
      }, Math.random() * 1000, false);

      return deferred.promise;
    }

    function returnToParticipantActivities() {
      ApplicationStateService.activateParticipantActivities();
    }

    function goToActivityAdder() {
      self.paperActivityData.checker = self.selectedItem.checker;
      ActivityService.initializePaperActivityData(self.paperActivityData);
      ApplicationStateService.activateActivityAdder();
    }

    function onInit() {
      self.paperActivityData = {};
      self.paperActivityData.realizationDate = new Date();
    }

    function _createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(checker) {
        return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
      };
    }
  }
}());
