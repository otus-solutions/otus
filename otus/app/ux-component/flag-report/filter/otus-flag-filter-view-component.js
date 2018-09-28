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

  function Controller() {
    var self = this;

    self.$onInit = onInit;
    self.statusHistory = [];

    /* Public functions */
    self.clear = clear;

    function onInit() {
      self.onChangeFilter = onChangeFilter;
    }

    function clear(field) {
      switch (field) {
        case "acronym":
          self.selectedAcronym = null;
          self.onChangeFilter(null, self.selectedAcronym, self.selectedStatus, self.selectedCenter);
          break;
        case "status":
          self.selectedStatus = null;
          self.onChangeFilter(null, self.selectedAcronym, self.selectedStatus, self.selectedCenter);
          break;
      }
    }

    function onChangeFilter(activities) {
      let status = isNaN(parseInt(self.selectedStatus)) ? null : parseInt(self.selectedStatus);
      self.onUpdate(activities, self.selectedAcronym, status, self.selectedCenter)
    }
  }


}());
