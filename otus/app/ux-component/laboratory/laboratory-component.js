(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratory', {
      controller: Controller,
      templateUrl: 'app/ux-component/laboratory/laboratory-start.html'
    });

  Controller.$inject = [
    'otusjs.laboratory.business.ParticipantLaboratoryService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.core.EventService'
  ];

  function Controller(ParticipantLaboratoryService, LoadingScreenService, EventService) {
    var self = this;
    self.json = '';

    /* Public methods */
    self.$onInit = onInit;
    self.intializeLaboratory = intializeLaboratory;

    function onInit() {
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.hasLaboratory = false;
      LoadingScreenService.start();
      ParticipantLaboratoryService.onParticipantSelected(_setupLaboratory);
      _setupLaboratory();
    }

    function _setupLaboratory() {
      ParticipantLaboratoryService
        .hasLaboratory()
        .then(function(hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          if (hasLaboratory) {
            _fetchLaboratory();
          }
          LoadingScreenService.finish();
        });
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
      } else {
        ParticipantLaboratoryService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
          });
      }
    }

    function intializeLaboratory() {
      LoadingScreenService.start();

      ParticipantLaboratoryService
        .initializeLaboratory()
        .then(function(laboratory) {
          if (laboratory) {
            self.hasLaboratory = true;
            _fetchLaboratory();
          }
          LoadingScreenService.finish();
        });
    }

    function _fetchLaboratory() {
      ParticipantLaboratoryService
        .getLaboratory()
        .then(function() {
          self.json = ParticipantLaboratoryService.toJson();
        });
    }
  }
}());
