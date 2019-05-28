(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardDisplay', {
      controller: "otusDashboardDisplayCtrl as $ctrl",
      templateUrl: 'app/ux-component/dashboard-display/dashboard-display-template.html'
    });

}());
