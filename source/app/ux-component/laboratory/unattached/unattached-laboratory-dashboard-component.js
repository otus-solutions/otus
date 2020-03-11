(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('unattachedLaboratoryDashboard', {
      controller: 'unattachedLaboratoryDashboardCtrl as $ctrl',
      templateUrl: 'app/ux-component/laboratory/unattached/unattached-laboratory-dashboard-template.html',
      bindings: {
        user: '<'
      }
    });
}());
