(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantSearchResult', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-search-result/participant-search-result-template.html',
      require: {
        'otusParticipantSearchTool': '^otusParticipantSearchTool'
      },
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
    self.selectParticipant = selectParticipant;
    self.setResultData = setResultData;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    function selectParticipant(selectedParticipant) {
      ParticipantSearchService.selectParticipant(selectedParticipant);
      self.participants = [];
      self.showResultList = ParticipantSearchService.hasResultFilter();

      self.onSelect({
        participant: selectedParticipant
      });
    }

    function setResultData(data) {
      self.participants = data;
      self.showResultList = ParticipantSearchService.hasResultFilter();
    }

    function onInit() {
      self.participants = [];
      self.showResultList = false;
      self.otusParticipantSearchTool.resultComponent = self;
    }
  }
}());
