(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantSearch', {
      controller: Controller,
      templateUrl: 'app/ux-component/participant-search/participant-search-template.html',
      bindings: {
        onSelect: '&'
      }
    });

  Controller.$inject = [
    'STATE',
    '$q',
    'otusjs.participant.business.ParticipantSearchService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(STATE, $q, ParticipantSearchService, ApplicationStateService) {
    var self = this;


    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.querySearch = querySearch;
    self.selectParticipant = selectParticipant;

    function onInit() {
      self.inputedText = '';
      ParticipantSearchService.setup();
    }

    function querySearch() {
      var request = $q.defer();
      ParticipantSearchService.filter(self.inputedText)
        .then(function(value) {
          request.resolve(value);
        });
      return request.promise;
    }

    function selectParticipant() {
      if (!self.selectedParticipant)
        return;
      ParticipantSearchService.selectParticipant(self.selectedParticipant);
      self.onSelect({
        participant: self.selectedParticipant
      });
      if(ApplicationStateService.getCurrentState() == STATE.DASHBOARD){
        ApplicationStateService.activateParticipantDashboard();
      }
    }

  }
}());
