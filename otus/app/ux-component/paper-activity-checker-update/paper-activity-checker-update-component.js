(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPaperActivityCheckerUpdate', {
      controller: "otusPaperActivityCheckerUpdateCtrl as $ctrl",
      templateUrl: 'app/ux-component/paper-activity-checker-update/paper-activity-checker-update-template.html',
      bindings: {
        selectedActivity: '='
      }
    })
  //   .controller("otusPaperActivityCheckerUpdateCtrl", Controller);
  //
  // Controller.$inject = [
  //   '$q',
  //   '$timeout',
  //   '$mdDialog',
  //   'otusjs.activity.business.ParticipantActivityService',
  //   'otusjs.application.state.ApplicationStateService',
  //   'otusjs.otus.uxComponent.CheckerItemFactory'
  // ];
  //
  // function Controller($q, $timeout,$mdDialog, ActivityService, ApplicationStateService, CheckerItemFactory, selectedActivity) {
  //   var self = this;
  //
  //   /* Public methods */
  //   self.querySearch = querySearch;
  //   // self.returnToParticipantActivities = returnToParticipantActivities;
  //   self.goToActivityAdder = goToActivityAdder;
  //   self.$onInit = onInit;
  //
  //   function querySearch(query) {
  //     var results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
  //     var deferred = $q.defer();
  //
  //     $timeout(function() {
  //       deferred.resolve(results);
  //     }, Math.random() * 1000, false);
  //
  //     return deferred.promise;
  //   }
  //
  //   // function returnToParticipantActivities() {
  //   //   ApplicationStateService.activateParticipantActivities();
  //   // }
  //
  //   function goToActivityAdder() {
  //     self.paperActivityData.checker = self.selectedItem.checker;
  //     ActivityService.initializePaperActivityData(self.paperActivityData);
  //     ApplicationStateService.activateActivityAdder();
  //   }
  //
  //   self.cancel = ()=>{
  //     $mdDialog.cancel();
  //   }
  //
  //   function onInit() {
  //     self.paperActivityData = {};
  //     self.paperActivityData.realizationDate = new Date();
  //     self.checkers = ActivityService.listActivityCheckers().map(CheckerItemFactory.create);
  //     console.log(self.selectedActivity);
  //   }
  //
  //   function _createFilterFor(query) {
  //     var lowercaseQuery = angular.lowercase(query);
  //
  //     return function filterFn(checker) {
  //       return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
  //     };
  //   }
  // }
}());
