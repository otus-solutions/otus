(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller("otusFlagReportDashboardCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;
    self.ready;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.buildLaboratoryFlagReport = buildLaboratoryFlagReport;

    /* Public methods */
    function onInit() {
      self.ready = false;
    }

    function buildLaboratoryFlagReport() {
      self.ready = true;
    }
  }

}());