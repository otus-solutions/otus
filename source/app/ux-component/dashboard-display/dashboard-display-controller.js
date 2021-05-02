(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusDashboardDisplayCtrl', Controller);

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.participant.core.EventService',
    'otusjs.participant.business.ParticipantLabelFactory',
    'otusjs.otus.uxComponent.Publisher'
  ];

  function Controller(
    ApplicationStateService,
    UserAccessPermissionService,
    ParticipantLaboratoryService,
    EventService,
    DashboardService,
    ParticipantFactory,
    LoadingScreenService,
    ParticipantEventService,
    ParticipantLabelFactory,
    Publisher) {

    var self = this;
    self.participantLaboratory = {};

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.initializeLaboratory = initializeLaboratory;
    self.updateParticipant = updateParticipant;

    function onInit() {
      self.selectedParticipant = undefined;
      self.laboratoryChecking = undefined;
      self.userAccessToLaboratory = undefined;
      _loadParticipant();
      _getCheckingExist();
      _checkingLaboratoryPermission();
      EventService.onParticipantSelected(_setParticipant);

      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      ParticipantLaboratoryService.onParticipantSelected(_setupLaboratory);
      EventService.onLabCreated(_setupLaboratory);
      _setupLaboratory();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = ParticipantFactory.fromJson(participantData);
        ParticipantEventService.fireParticipantLoaded(self.selectedParticipant);
        _executeLabelsStored();
      } else {
        ParticipantLaboratoryService
          .getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = ParticipantFactory.fromJson(participantData);
            ParticipantEventService.fireParticipantLoaded(self.selectedParticipant)
            _executeLabelsStored();
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
          if (hasLaboratory) {
            self.participantLaboratory = ParticipantLaboratoryService.getLaboratory();
          }
          LoadingScreenService.finish();
        });
    }

    function initializeLaboratory() {
      LoadingScreenService.start();
      ParticipantLaboratoryService.initializeLaboratory()
        .then(function (laboratory) {
          if (laboratory) {
            self.hasLaboratory = true;
            self.ready = true;
            self.participantLaboratory = ParticipantLaboratoryService.getLaboratory();
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

    function _executeLabelsStored() {
      self.participantLabel = ParticipantLabelFactory.create(self.selectedParticipant)
      _publishPrintStructure()
      _subscribeLabels()
    }

    function _labelToPrint(callback) {
      callback(
        self.participantLabel
      )
    }

    function _subscribeLabels() {
      Publisher.unsubscribe('label-to-print')
      Publisher.subscribe('label-to-print', _labelToPrint)
    }

    function _publishPrintStructure() {
      Publisher.publish("default-print-structure", (defaultPrintStructure) => {
        self.participantLabel.printStructure = defaultPrintStructure
      })
    }

    function updateParticipant() {
      ApplicationStateService.activateUpdateParticipant();
    }
  }
}());
