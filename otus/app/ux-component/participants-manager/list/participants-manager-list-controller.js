(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantsListCtrl', Controller);

  Controller.$inject = [
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.participant.storage.ParticipantStorageService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
  ];

  function Controller(ParticipantManagerService, LoadingScreenService, ApplicationStateService, EventService, DashboardService, ParticipantStorageService, DynamicTableSettingsFactory) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.selectParticipant = selectParticipant;
    self.addParticipant = addParticipant;
    const MESSAGE = "Carregando todos os participantes! Favor aguarde."

    /* Lifecycle methods */
    function onInit() {
      LoadingScreenService.changeMessage(MESSAGE);
      self.participants = angular.copy(self.participantsList);
      if(!self.participants){
        LoadingScreenService.start();
        ParticipantManagerService.listIdexers().then(function(response) {
          self.participants = angular.copy(response);
          _buildParticipants()
          LoadingScreenService.finish();
        }).catch(function(err) {
          ApplicationStateService.activateDashboard();
        });
      } else {
        _buildParticipants();
      }
    }

    function _buildParticipants(){
      self.participants.map(function(participant) {
        participant.birthday = new Date(participant.birthdate.value);
        participant.obito = participant.late ? 'Sim': 'Não';
      });
      self.selectedParticipant = null;
      _buildDynamicTableSettings();
    }

    function addParticipant() {
      ApplicationStateService.activateCreateParticipant();
    }

    function selectParticipant(participant) {
      delete participant["birthday"];
      delete participant["obito"];
      ParticipantManagerService.selectParticipant(participant);
      ApplicationStateService.activateParticipantDashboard();
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Recrutamento', '15', 'left', 4)
        //property, formatType
        .addColumnProperty('recruitmentNumber')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nome', '35', '', 1)
        //property, formatType
        .addColumnProperty('name')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Sexo', '10', '', 3)
        //property, formatType
        .addColumnProperty('sex')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nascimento', '15', '', 2)
        //property, formatType
        .addColumnProperty('birthday', 'DATE')
        .setFormatData("'dd/MM/yy")
        .addHeader('Centro', '10', '', 5)
        .addColumnProperty('fieldCenter.acronym')
        .addHeader('Óbito', '10', '', 5)
        .addColumnProperty('obito')
        .addHeader('Relatórios', '10', '', 6)
        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        .addColumnIconButton(
          'find_in_page', 'Ver participante', 'teste', 'Participante selecionado',
          self.selectParticipant, false, false, true, false, false
        )
        .setCheckbox(false)
        .setElementsArray(self.participants)
        .setTitle('Lista de Participantes')
        // .setCallbackAfterChange(self.dynamicDataTableChange)
        //Don't use with Service, in this case pass Service as attribute in the template
        // .setTableUpdateFunction(AliquotTransportationService.dynamicDataTableFunction.updateDataTable)
        /*
          //Optional Config's

          .setFilter(true)
          .setReorder(true)
          .setPagination(true)
          .setSelectedColor()
          .setHoverColor()

        */
        .getSettings();
    }
  }
}());
