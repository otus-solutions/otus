(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller("otusFlagReportDashboardCtrl", Controller);

  Controller.$inject = [
    'STATE',
    'otusjs.application.state.ApplicationStateService'
  ];


  function Controller(STATE, ApplicationStateService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    function onInit() { }
  }

}());