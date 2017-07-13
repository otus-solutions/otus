(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business')
    .service('otusjs.laboratory.business.ParticipantLaboratoryService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.repository.ParticipantLaboratoryRepositoryService',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.LaboratoryLabelFactory',
    'otusjs.laboratory.core.EventService',
    'otusjs.laboratory.ParticipantLaboratoryFactory'
  ];

  function Service($q, ParticipantLaboratoryRepositoryService, ContextService, LaboratoryLabelFactory, EventService, ParticipantLaboratoryFactory) {
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

    function _init() {
      _laboratoryConfiguration = null;
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
            .then(function(labDescriptor) {
              return ParticipantLaboratoryRepositoryService
                .initializeLaboratory(participant)
                .then(function(laboratory) {
                  _participantLaboratory = ParticipantLaboratoryFactory.fromJson(laboratory, labDescriptor, getLoggedUser(),self.participant);
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
            .then(function(labDescriptor) {
              ParticipantLaboratoryRepositoryService
                .getLaboratory(participant)
                .then(function(laboratory) {
                  self.participant = participant;
                  if (laboratory !== 'null') {
                    _participantLaboratory = ParticipantLaboratoryFactory.fromJson(JSON.stringify(laboratory.data), labDescriptor, getLoggedUser(),self.participant);
                    console.log(_participantLaboratory);
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
      var defer = $q.defer();
      if (_laboratoryConfiguration) {
        defer.resolve(_laboratoryConfiguration);
      } else {
        ParticipantLaboratoryRepositoryService.getLaboratoryDescriptors()
          .then(function(labConfiguration) {
            _laboratoryConfiguration = labConfiguration.data;
            defer.resolve(_laboratoryConfiguration);
         }, function(e){
            defer.reject(e);
         });
      }
      return defer.promise;
    }

    function getLoggedUser() {
      return ContextService.getCurrentUser();
    }

    function updateLaboratoryParticipant() {
      return ParticipantLaboratoryRepositoryService.updateLaboratoryParticipant(_participantLaboratory.toJSON());
    }

    function updateAliquots(updateStructure) {
      return ParticipantLaboratoryRepositoryService.updateAliquots(updateStructure);      
    }

    function generateLabels() {
      return LaboratoryLabelFactory.create(self.participant, angular.copy(_participantLaboratory));
    }
  }
}());
