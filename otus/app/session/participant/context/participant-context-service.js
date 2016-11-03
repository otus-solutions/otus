(function() {
  'use strict';

  angular
    .module('otusjs.otus.participant.context')
    .service('otusjs.otus.participant.context.ParticipantContextService', Service);

  function Service() {
    var self = this;
    var _preList = [];
    var _selectedParticipant = null;

    /* Public methods */
    self.getPreList = getPreList;
    self.setPreList = setPreList;
    self.selectParticipant = selectParticipant;
    self.getSelectedParticipant = getSelectedParticipant;

    function getPreList() {
      return _preList;
    }

    function setPreList(preList) {
      _preList = preList;
    }

    function selectParticipant(participant) {
      _selectedParticipant = participant;
    }

    function getSelectedParticipant() {
      return _selectedParticipant;
    }
  }
}());
