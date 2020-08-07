(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusParticipantSearch', {
      controller: 'otusParticipantSearchCtrl as $ctrl',
      templateUrl: 'app/ux-component/participant-search/participant-search-template.html',
      bindings: {
        onSelect: '&',
        showAllParticipantsButton: "<",
        showAllParticipants: '&',
        onReady: '=',
        attributeFilterItem: '=',
        searchSettings: '=',
        changeWatcher: '&'
      }
    }).controller('otusParticipantSearchCtrl', Controller);

  Controller.$inject = [
    'STATE',
    '$q',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.ContextService',
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.genericListViewer.GenericListViewerService'
  ];

  function Controller(STATE, $q, ParticipantManagerService, ApplicationStateService,
                      DashboardContextService, $mdDialog, DialogService, GenericListViewerService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.querySearch = querySearch;
    self.selectParticipant = selectParticipant;
    self.showParticipants = self.showAllParticipants;
    self.showParticipantsButton = self.showAllParticipantsButton;
    self.searchTextChange = searchTextChange;

    var confirmParticipantChange;

    function onInit() {
      self.inputedText = '';
      if(ApplicationStateService.getCurrentState() === STATE.DASHBOARD){
        self.autoCompleteClass = 'md-dashboard-autocomplete';
        self.backgroundColor = {};
      }
      else{
        self.autoCompleteClass = 'md-autocomplete-participant';
        self.backgroundColor = {backgroundColor: 'default-primary'};
      }

      ParticipantManagerService.setup().then(function (response) {
        self.onReady = true;
      });
    }

    function querySearch() {
      var request = $q.defer();
      ParticipantManagerService.filter(self.inputedText)
        .then(function (value) {
          request.resolve(value);
        });
      return request.promise;
    }

    function selectParticipant() {
      _buildDialogs();
      if (!self.selectedParticipant) {
        return;
      }

      if (ApplicationStateService.getCurrentState() == STATE.DASHBOARD) {
        _setParticipant();
        ApplicationStateService.activateParticipantDashboard();
      } else if (ApplicationStateService.getCurrentState() == STATE.LABORATORY && DashboardContextService.getChangedState()) {
        DialogService.showDialog(confirmParticipantChange).then(function () {
          _setParticipant();
          DashboardContextService.setChangedState();
        });
      } else if (ApplicationStateService.currentStateIsListViewer()) {
        GenericListViewerService.getSelectedParticipantRN(self.selectedParticipant,
          self.attributeFilterItem, self.searchSettings);
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

    function searchTextChange() {
      if (ApplicationStateService.currentStateIsListViewer()) {
        if(self.inputedText === "") delete self.searchSettings.filter["rn"];
        else self.searchSettings.filter["rn"] = self.inputedText;
        self.changeWatcher();
      }
    }

    function _buildDialogs() {
      confirmParticipantChange = {
        dialogToTitle: 'Descartar',
        titleToText: 'Confirmar troca de participante:',
        textDialog: 'Alterações não finalizadas serão descartadas.',
        ariaLabel: 'Confirmação de troca',
        buttons: [
          {
            message: 'Ok',
            action: function () {
              $mdDialog.hide()
            },
            class: 'md-raised md-primary'
          },
          {
            message: 'Voltar',
            action: function () {
              $mdDialog.cancel()
            },
            class: 'md-raised md-no-focus'
          }
        ]
      };
    }

  }
}());
