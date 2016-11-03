(function() {
  'use strict';

  angular
    .module('otusjs.otus.participant.context')
    .service('otusjs.otus.participant.context.ParticipantContextService', Service);

  function Service() {
    var self = this;
    var _selectedParticipant = null;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    self.getSelectedParticipant = getSelectedParticipant;

    function selectParticipant(participant) {
      _selectedParticipant = participant;
    }

    function getSelectedParticipant() {
      return _selectedParticipant;
    }
  }
}());
