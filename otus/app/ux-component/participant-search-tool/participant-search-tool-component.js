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

  function Controller(ParticipantSearchService) {
    var self = this;

    /* Public methods */
    self.filter = filter;
    self.$onInit = onInit;
    self.selectParticipant = selectParticipant;

    function filter() {
      ParticipantSearchService.filter(self.inputedText)
        .then(function(value) {
           var slicedList = value.slice(0, 15);
           ParticipantSearchService.setFilteredParticipants(slicedList);
           self.resultComponent.setResultData(slicedList);
        });
    }

    function onInit() {
      ParticipantSearchService.setup();
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
