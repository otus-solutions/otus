(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantDashboardToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-dashboard-toolbar/participant-dashboard-toolbar-template.html'
    });

  function Controller() {
    var self = this;
  }
}());
