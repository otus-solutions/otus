(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantsManagerDashboard', {
      controller: 'otusParticipantsManagerDashboardCtrl as $ctrl',
      templateUrl: 'app/ux-component/participants-manager/dashboard/participants-manager-dashboard-template.html'
    });
}());
