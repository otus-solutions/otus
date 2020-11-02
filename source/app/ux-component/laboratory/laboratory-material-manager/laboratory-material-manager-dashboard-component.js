(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('laboratoryMaterialManagerDashboard', {
      controller: 'laboratoryMaterialManagerDashboardCtrl as $ctrl',
      templateUrl: 'app/ux-component/laboratory/laboratory-material-manager/laboratory-material-manager-dashboard-template.html',
      bindings: {
        user: '<'
      }
    });
}());
