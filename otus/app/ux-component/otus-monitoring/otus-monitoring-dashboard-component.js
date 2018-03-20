(function () {
    'use strict';
  
    angular
      .module('otusjs.otus.uxComponent')
      .component('otusMonitoringDashboard', {
        controller: Controller,
        templateUrl: 'app/ux-component/otus-monitoring/otus-monitoring-dashboard-template.html'
      });
  
    Controller.$inject = [
    ];
  
    function Controller() {
      var self = this;
  
      // lifecycle hooks
      self.$onInit = onInit;
  
      /* Public methods */
      function onInit() {

      }
    }
  }());
  