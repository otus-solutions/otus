(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business')
    .service('otusjs.laboratory.business.ParticipantLaboratoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.repository.ParticipantLaboratoryRepositoryService',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.ParticipantLaboratoryFactory',
    'otusjs.laboratory.core.EventService'
  ];

  function Service($q, ParticipantLaboratoryRepositoryService, ContextService, ParticipantLaboratoryFactory, EventService) {
    var self = this;
    self.participant = {};
    self.tubes = {};

    self.initializeLaboratory = initializeLaboratory;
    self.getSelectedParticipant = getSelectedParticipant;
    self.hasLaboratory = hasLaboratory;
    self.getLaboratory = getLaboratory;
    self.onParticipantSelected = onParticipantSelected;
    self.toJson = toJson;

    function onParticipantSelected(listener) {
      EventService.onParticipantSelected(listener);
    }

    function initializeLaboratory() {
      return getSelectedParticipant()
        .then(function(participant) {
          self.participant = participant;
          return ParticipantLaboratoryRepositoryService
            .initializeLaboratory(participant)
            .then(function(laboratory) {
              self.laboratory = laboratory;
              return laboratory;
            });
        });
    }

    function getSelectedParticipant() {      
      return ContextService.getSelectedParticipant();
    }

    function hasLaboratory() {
      var request = $q.defer();

      getSelectedParticipant()
        .then(function(participant) {
          ParticipantLaboratoryRepositoryService
            .getLaboratory(participant)
            .then(function(laboratory) {
              self.participant = participant;
              self.laboratory = laboratory;
              if (laboratory) {
                request.resolve(true);
              } else {
                request.resolve(false);
              }
            });
        });

      return request.promise;
    }

    function getLaboratory() {
      return getSelectedParticipant()
        .then(function(participant) {
          ParticipantLaboratoryRepositoryService
            .getLaboratory(participant)
            .then(function(laboratory) {
              self.laboratory = laboratory;
            });
        });
    }

    function toJson() {
      return ParticipantLaboratoryFactory.create().toJson(self.participant, self.laboratory);
    }
  }
}());
