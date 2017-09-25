(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardDisplay', {
      controller: Controller,
      templateUrl: 'app/ux-component/dashboard-display/dashboard-display-template.html'
    });

  function Controller() {
    var self = this;
  }
}());
