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
      ParticipantSearchResultService.filter(self.query);
      self.resultComponent.setResultData(ParticipantSearchResultService.getFilteredData());
    }

    function onInit() {
      self.resultComponent = {};
    }

    function selectParticipant(selectedParticipant) {
      self.query = '';
      self.onSelect({
        participant: selectedParticipant
      });
    }
  }
}());
