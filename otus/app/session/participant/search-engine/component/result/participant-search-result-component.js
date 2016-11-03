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
    var _open = true;

    self.footer = {};
    self.participants = [];
    self.hasResult = false;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    self.setResult = setResult;
    self.$onInit = onInit;

    function onInit() {
      self.footer.message = CLOSED_FOOTER_MESSAGE;
      self.otusParticipantSearchTool.resultComponent = self;
    }

    function selectParticipant(selectedParticipant) {
      self.hasResult = false;
      self.participants = [];
      ParticipantContextService.selectParticipant(selectedParticipant);
      self.onSelect({
        participant: selectedParticipant
      });
    }

    function setResult(data) {
      self.hasResult = data.length > 0;
      self.participants = data;
    }
  }
}());
