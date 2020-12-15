(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusDashboardDisplayCtrl', Controller);

  Controller.$inject = [
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService'
  ];

  function Controller(UserAccessPermissionService, LaboratoryViewerService, EventService, DashboardService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.laboratoryChecking = false;
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init);
    }

    function _init() {
      self.laboratoryChecking = true;
      self.selectedParticipant = undefined;
      self.userAccessToLaboratory = undefined;
      _loadParticipant();
      _checkingLaboratoryPermission();
      EventService.onParticipantSelected(_setParticipant);
    }

    function _loadParticipant() {
      return DashboardService.getSelectedParticipant()
        .then(function (participantData) {
          _setParticipant(participantData)
        });
    }

    function _setParticipant(participantData) {
      self.selectedParticipant = participantData;
    }

    function _checkingLaboratoryPermission() {
      UserAccessPermissionService.getCheckingLaboratoryPermission()
        .then(response => {
          self.userAccessToLaboratory = response;
        });
    }
  }
}());
