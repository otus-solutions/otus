(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantSearchTool', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-search-tool/participant-search-tool-template.html',
      bindings: {
        onSelect: '&'
      }
    });

  Controller.$inject = [
    'otusjs.participant.business.ParticipantSearchService'
  ];

  function Controller(ParticipantSearchResultService) {
    var self = this;

    /* Public methods */
    self.filter = filter;
    self.$onInit = onInit;
    self.selectParticipant = selectParticipant;

    function filter() {
      ParticipantSearchResultService.filter(self.inputedText)
        .then(function(value) {
           self.resultComponent.setResultData(value.slice(0, 15));
        });
    }

    function onInit() {
      ParticipantSearchResultService.setup();
      self.resultComponent = {};
    }

    function selectParticipant(selectedParticipant) {
      self.inputedText = '';
      self.onSelect({
        participant: selectedParticipant
      });
    }
  }
}());
