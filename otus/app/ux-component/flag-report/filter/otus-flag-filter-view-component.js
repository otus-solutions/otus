(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('flagFilterViewComponent', {
      controller: "flagFilterViewCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/filter/otus-flag-filter-view-template.html',
      bindings: {
        activitiesStatus: '=',
        acronymsList: '=',
        centers: '=',
        onUpdate: '='
      }
    })
    .controller('flagFilterViewCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$filter',
    'mdcDefaultParams',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller() {
    var self = this;

    self.$onInit = onInit;

    self.onChangeFilter = onChangeFilter;
    self.statusHistory = [];

    /* Public functions */
    self.clear = clear;

    function onInit() {

    }


    function clear(field) {
      switch (field) {
        case "acronym":
          self.selectedAcronym = null;
          break;
        case "status":
          self.selectedStatus = null;
          break;
      }
    }

    function onChangeFilter(activities) {
      self.onUpdate(activities, self.selectedAcronym, self.selectedStatus, self.selectedCenter)
    }


  }


}());
