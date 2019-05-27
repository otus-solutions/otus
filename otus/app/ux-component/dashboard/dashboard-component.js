(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard/dashboard-template.html',
      bindings: {
        redirect: "="
      }
    });

  function Controller() {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
    }
  }
}());
