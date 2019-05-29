(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDashboardHomeDisplay', {
      controller: 'otusDashboardHomeDisplayCtrl as $ctrl',
      templateUrl: 'app/ux-component/dashboard-home-display/dashboard-home-display-template.html'
    });

}());
