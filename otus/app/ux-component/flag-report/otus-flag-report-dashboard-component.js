(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportDashboard', {
      controller: "otusFlagReportCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/otus-flag-report-dashboard-template.html'
    })
    .controller("otusFlagReportCtrl", Controller);

  Controller.$inject = [];

  function Controller() {

    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {

    }

    
  }

}());