(function() {
  'use strict';

  angular
    .module('otusjs.otus.participant.searchEngine')
    .component('otusParticipantSearchResult', {
      controller: Controller,
      templateUrl: 'app/session/participant/search-engine/component/result/participant-search-result-template.html',
      require: {
        'otusParticipantSearchTool': '^otusParticipantSearchTool'
      },
      bindings: {
        onSelect: '&'
      }
    });

  Controller.$inject = [
    'otusjs.otus.participant.context.ParticipantContextService'
  ]

  function Controller(ParticipantContextService) {
    var self = this;

    var OPENED_FOOTER_MESSAGE = 'Fechar Lista';
    var CLOSED_FOOTER_MESSAGE = 'Visualizar Participantes';

    self.participants = [];
    self.showResultList = false;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    self.setResultData = setResultData;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function selectParticipant(selectedParticipant) {
      self.showResultList = false;
      self.participants = [];
      ParticipantContextService.selectParticipant(selectedParticipant);
      self.onSelect({
        participant: selectedParticipant
      });
    }

    function setResultData(data) {
      self.showResultList = data.length > 0;
      self.participants = data;
    }

    function onInit() {
      self.otusParticipantSearchTool.resultComponent = self;
    }
  }
}());
