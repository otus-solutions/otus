(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard/dashboard-template.html',
      bindings: {
        redirect: "=",
        userPermission: "<"
      }
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(ApplicationStateService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      console.log(self.userPermission);
    }
  }
}());
