(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantCreateDashboard', {
      controller: 'otusParticipantCreateDashboardCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-create/dashboard/participant-create-dashboard-template.html'
    });
}());
