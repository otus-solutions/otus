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
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.ContextService',
    '$mdDialog'
  ];

  function Controller(STATE, $q, ParticipantManagerService, ApplicationStateService, dashboardContextService, $mdDialog) {
    var self = this;


    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.querySearch = querySearch;
    self.selectParticipant = selectParticipant;

    var confirmParticipantChange;

    function onInit() {
      self.inputedText = '';
      if(ApplicationStateService.getCurrentState() != STATE.DASHBOARD){
        self.autoCompleteClass = 'md-autocomplete-participant';
      } else {
        self.autoCompleteClass = 'md-dashboard-autocomplete';
      }
      ParticipantManagerService.setup();
    }

    function querySearch() {
      var request = $q.defer();
      ParticipantManagerService.filter(self.inputedText)
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
      } else if(ApplicationStateService.getCurrentState() == STATE.LABORATORY && dashboardContextService.getChangedState()) {
        $mdDialog.show(confirmParticipantChange).then(function() {
        _setParticipant();
        dashboardContextService.setChangedState();
        });
      } else {
        _setParticipant();
      }
    }

    function _setParticipant() {
      ParticipantManagerService.selectParticipant(self.selectedParticipant);
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
