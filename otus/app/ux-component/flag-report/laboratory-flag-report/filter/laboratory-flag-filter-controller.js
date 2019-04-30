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
    self.changeCenters = changeCenters;

    function onInit() {
      self.onChangeFilter = onChangeFilter;
    }

    function clear(field) {
      switch (field) {
        case "examName":
          self.selectedExamName = undefined;
          self.onChangeFilter();
          break;
        case "center":
          self.selectedExamName = undefined;
          self.selectedStatus = undefined;
          self.onChangeFilter();
      }
    }

    function changeCenters() {
      if (self.selectedCenter) {
        onChangeFilter();
      }
    }

    function onChangeFilter(exams) {
      self.onUpdate(exams, self.selectedExamName, self.selectedCenter)
    }
  }


}());
