(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusDashboardDisplayCtrl', Controller);

  Controller.$inject = [
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(
    UserAccessPermissionService,
    ParticipantLaboratoryService,
    EventService,
    DashboardService,
    ParticipantFactory,
    LoadingScreenService) {

    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.intializeLaboratory = intializeLaboratory;

    function onInit() {
      self.selectedParticipant = undefined;
      self.laboratoryChecking = undefined;
      self.userAccessToLaboratory = undefined;
      _loadParticipant();
      _getCheckingExist();
      EventService.onParticipantSelected(_setParticipant);

      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      ParticipantLaboratoryService.onParticipantSelected(_setupLaboratory);
      EventService.onLabCreated(_setupLaboratory);
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = ParticipantFactory.fromJson(participantData);
      } else {
        ParticipantLaboratoryService
          .getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = ParticipantFactory.fromJson(participantData);
          });
      }
    }

    function _setupLaboratory() {
      LoadingScreenService.start();
      self.hasLaboratory = true;
      ParticipantLaboratoryService
        .hasLaboratory()
        .then(function (hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          self.ready = true;
          LoadingScreenService.finish();
        });
    }

    function intializeLaboratory() {
      LoadingScreenService.start();
      ParticipantLaboratoryService.initializeLaboratory()
        .then(function (laboratory) {
          if (laboratory) {
            self.hasLaboratory = true;
            self.ready = true;
          }
          LoadingScreenService.finish();
        });
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

    function _getCheckingExist() {
      ParticipantLaboratoryService.getCheckingExist()
        .then(response => {
          self.laboratoryChecking = response;
          if(self.laboratoryChecking){
            _checkingLaboratoryPermission();
            _setupLaboratory();
          }
        });
    }

    function _checkingLaboratoryPermission() {
      UserAccessPermissionService.getCheckingLaboratoryPermission()
        .then(response => {
          self.userAccessToLaboratory = response;
        });
    }
  }
}());
