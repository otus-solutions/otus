(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantsListCtrl', Controller);

  Controller.$inject = [
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
  ];

  function Controller(ParticipantManagerService, LoadingScreenService, ApplicationStateService, DynamicTableSettingsFactory) {
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
        participant.birthday = participant.birthdate ? new Date(participant.birthdate.value) : "";
        participant.obito = participant.late ? 'Sim': 'Não';
      });
      self.selectedParticipant = null;
      _buildDynamicTableSettings();
    }

    function addParticipant() {
      ApplicationStateService.activateCreateParticipant();
    }

    function selectParticipant(participant) {
      var _participant = angular.copy(participant);
      delete _participant["birthday"];
      delete _participant["obito"];
      ParticipantManagerService.selectParticipant(_participant);
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
        .addHeader('Óbito', '10', '', 6)
        .addColumnProperty('obito')
        .addHeader('Home', '10', '',7)
        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        .addColumnIconButton(
          'person', 'Ver participante', '', 'Participante selecionado',
          self.selectParticipant, false, false, true, false, false
        )
        .setCheckbox(false)
        .setElementsArray(self.participants)
        .setTitle('Lista de Participantes')
        // .setCallbackAfterChange(self.dynamicDataTableChange)
        //Don't use with Service, in this case pass Service as attribute in the template
        // .setTableUpdateFunction(MaterialTransportationService.dynamicDataTableFunction.updateDataTable)
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
