(function() {
  'use strict';

  angular
    .module('otusjs.otus.participant.searchEngine')
    .component('otusParticipantSearchTool', {
      controller: Controller,
      templateUrl: 'app/session/participant/search-engine/component/search-tool/search-tool-template.html',
      bindings: {
        onSelect: '&'
      }
    });

  Controller.$inject = [
    'ParticipantSearchResultService'
  ];

  function Controller(ParticipantSearchResultService) {
    var self = this;

    /* Public methods */
    self.filter = filter;
    self.$onInit = onInit;
    self.selectParticipant = selectParticipant;

    function filter() {
      ParticipantSearchResultService.filter(self.query);
      self.resultComponent.setResult(ParticipantSearchResultService.getFiltered());
    }

    function onInit() {
      self.resultComponent = {};
    }

    function selectParticipant(selectedParticipant) {
      self.onSelect({
        participant: selectedParticipant
      });
    }
  }
}());
