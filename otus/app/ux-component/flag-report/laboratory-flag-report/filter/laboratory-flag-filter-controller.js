(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryFlagFilterComponentCtrl', Controller);

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
          self.onChangeFilter();
          break;
        case "status":
          self.selectedStatus = null;
          self.onChangeFilter();
          break;
        case "center":
          self.selectedAcronym = null;
          self.selectedStatus = null;
          self.onChangeFilter();

      }
    }

    function onChangeFilter(activities) {
      let status = isNaN(parseInt(self.selectedStatus)) ? null : parseInt(self.selectedStatus);
      self.onUpdate(activities, self.selectedAcronym, status, self.selectedCenter)
    }
  }


}());
