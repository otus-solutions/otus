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
        case "examName":
          self.selectedExamName = undefined;
          self.onChangeFilter();
          break;
        case "status":
          self.selectedStatus = null;
          self.onChangeFilter();
          break;
        case "center":
          self.selectedExamName = undefined;
          self.selectedStatus = undefined;
          self.onChangeFilter();
          break;
      }
    }

    function onChangeFilter(exams) {
      let status = isNaN(parseInt(self.selectedStatus)) ? null : parseInt(self.selectedStatus);
      self.onUpdate(exams, self.selectedExamName, status, self.selectedCenter)
    }
  }


}());
