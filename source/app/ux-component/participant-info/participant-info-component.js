(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantInfo', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-info/participant-info-template.html',
      bindings: {
        hasLaboratory: '='
      }
    });

  Controller.$inject = [
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.participant.business.ParticipantLabelFactory',
    'otusjs.otus.uxComponent.Publisher'
  ];

  function Controller(ApplicationStateService,
                      EventService,
                      DashboardService,
                      ParticipantLabelFactory,
                      Publisher) {
    var self = this;

    self.participantBirthdate;

    self.attacheLabTitle = 'Vincular laboratório ao participante'
    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;

    self.getSex = getSex;

    function getSex(sex){
      if(sex){
        return sex == 'F' || sex == 'f' ? 'Feminino' : 'Masculino';
      }
    }


    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    /* Lifecycle methods */
    function onInit() {
       _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.selectedParticipant = null;
    }

    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
        self.isEmpty = false;
        self.participantLabel = ParticipantLabelFactory.create(self.selectedParticipant)
        _publishPrintStructure()
        _subscribeLabels()
      } else {
        DashboardService
        .getSelectedParticipant()
        .then(function(participantData) {
            self.selectedParticipant = participantData;
            self.participantBirthdate = self.selectedParticipant.birthdate ? new Date(self.selectedParticipant.birthdate.value) : '';
            self.isEmpty = false;
            self.participantLabel = ParticipantLabelFactory.create(self.selectedParticipant)
            _publishPrintStructure()
            _subscribeLabels()
          });
      }
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

    self.updateParticipant = function () {
      ApplicationStateService.activateUpdateParticipant();
    }
  }
}());
