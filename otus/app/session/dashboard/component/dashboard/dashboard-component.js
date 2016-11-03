(function() {
  'use strict';

  angular
    .module('otusjs.otus.dashboard')
    .component('otusDashboard', {
      controller: Controller,
      templateUrl: 'app/session/dashboard/component/dashboard/dashboard-template.html'
    });

  function Controller() {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    /* Lifecycle methods */
    function onInit() {
      self.selectedParticipant = null;
    }
  }
}());
