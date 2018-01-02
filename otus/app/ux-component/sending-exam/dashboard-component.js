(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusResultUploadDashboard', {
      controller: Controller,
      templateUrl: 'app/ux-component/sending-exam/dashboard-template.html'
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller() {
    var self = this;
  }
}());
