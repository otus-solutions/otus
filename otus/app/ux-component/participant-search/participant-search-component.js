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
    'otusjs.application.state.ApplicationStateService',
    '$mdDialog'
  ];

  function Controller(STATE, $q, ParticipantSearchService, ApplicationStateService, $mdDialog) {
    var self = this;


    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.querySearch = querySearch;
    self.selectParticipant = selectParticipant;

    var confirmParticipantChange;

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
      _buildDialogs();
      if (!self.selectedParticipant){
        return;
      } else if(ApplicationStateService.getCurrentState() == STATE.DASHBOARD){
        _setParticipant();
        ApplicationStateService.activateParticipantDashboard();
      } else if(ApplicationStateService.getCurrentState() == STATE.LABORATORY) {
        $mdDialog.show(confirmParticipantChange).then(function() {
        _setParticipant();
        });
      } else {
        _setParticipant();
      }
    }

    function _setParticipant() {
      ParticipantSearchService.selectParticipant(self.selectedParticipant);
      self.onSelect({
        participant: self.selectedParticipant
      });
      self.inputedText = '';
    }

    function _buildDialogs() {
      confirmParticipantChange = $mdDialog.confirm()
        .title('Confirmar troca de participante:')
        .textContent('Alterações não finalizadas serão descartadas')
        .ariaLabel('Confirmação de troca')
        .ok('Ok')
        .cancel('Voltar');
    }

  }
}());
