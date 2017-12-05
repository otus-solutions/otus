(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant')
    .service('otusjs.laboratory.business.participant.ParticipantLaboratoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.repository.LaboratoryRepositoryService',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.participant.LaboratoryLabelFactory',
    'otusjs.laboratory.core.EventService',
    'otusjs.laboratory.participant.ParticipantLaboratoryFactory',
    'otusjs.laboratory.business.configuration.LaboratoryConfigurationService'
  ];

  function Service($q, LaboratoryRepositoryService, ContextService, LaboratoryLabelFactory, EventService, ParticipantLaboratoryFactory, LaboratoryConfigurationService) {
    var self = this;
    var _participantLaboratory;
    var _laboratoryConfiguration;

    _init();

    self.initializeLaboratory = initializeLaboratory;
    self.getSelectedParticipant = getSelectedParticipant;
    self.hasLaboratory = hasLaboratory;
    self.getLaboratory = getLaboratory;
    self.onParticipantSelected = onParticipantSelected;
    self.generateLabels = generateLabels;
    self.getLoggedUser = getLoggedUser;
    self.updateLaboratoryParticipant = updateLaboratoryParticipant;
    self.updateAliquots = updateAliquots;
    self.updateTubeCollectionData = updateTubeCollectionData;

    function _init() {
      _laboratoryConfiguration = null;
      self.listTubes = [];
    }

    function onParticipantSelected(listener) {
      EventService.onParticipantSelected(listener);
    }

    function initializeLaboratory() {
      var request = $q.defer();
      getSelectedParticipant()
        .then(function(participant) {
          self.participant = participant;
          getLaboratoryDescriptors()
            .then(function() {
              return LaboratoryRepositoryService
                .initializeLaboratory(participant)
                .then(function(laboratory) {
                  _participantLaboratory = ParticipantLaboratoryFactory.fromJson(laboratory, getLoggedUser(), self.participant);
                  request.resolve(laboratory);
                });
            });
        });
      return request.promise;
    }

    function hasLaboratory() {
      var request = $q.defer();

      getSelectedParticipant()
        .then(function(participant) {
          getLaboratoryDescriptors()
            .then(function() {
              LaboratoryRepositoryService
                .getLaboratory(participant)
                .then(function(laboratory) {
                  self.participant = participant;
                  if (laboratory !== 'null') {
                    _participantLaboratory = ParticipantLaboratoryFactory.fromJson(laboratory, getLoggedUser(), self.participant);
                    request.resolve(true);
                  } else {
                    request.resolve(false);
                  }
                });
            });
        });

      return request.promise;
    }

    function getSelectedParticipant() {
      return ContextService.getSelectedParticipant();
    }

    function getCurrentUser() {
      return ContextService.getCurrentUser();
    }

    function getLaboratory() {
      return _participantLaboratory;
    }

    function getLaboratoryDescriptors() {
      return LaboratoryConfigurationService.getLaboratoryDescriptors();
    }

    function getLoggedUser() {
      return ContextService.getCurrentUser();
    }

    function updateLaboratoryParticipant() {
      return LaboratoryRepositoryService.updateLaboratoryParticipant(JSON.stringify(_participantLaboratory));
    }

    function updateTubeCollectionData(updateStructure) {
      return LaboratoryRepositoryService.updateTubeCollectionData(JSON.stringify(updateStructure));
    }

    function updateAliquots(updateStructure) {
      return LaboratoryRepositoryService.updateAliquots(updateStructure);
    }

    function generateLabels() {
      return LaboratoryLabelFactory.create(self.participant, angular.copy(_participantLaboratory));
    }
  }
}());
