(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantCreateDashboardCtrl', Controller);

  Controller.$inject = [
    'STATE',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.participant.storage.ParticipantStorageService',
    'otusjs.otus.uxComponent.DynamicTableSettingsFactory'
  ];

  function Controller(STATE, ApplicationStateService, EventService, DashboardService, ParticipantStorageService, DynamicTableSettingsFactory) {
    var self = this;

    /* Public methods */
    self.selectParticipant = selectParticipant;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.getCurrentState = getCurrentState;
    self.STATE = STATE;

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    /* Lifecycle methods */
    function onInit() {
      self.participants = angular.copy(ParticipantStorageService.getCollection().data);
      self.participants.map(function(p) {
        p.birthday = new Date(p.birthdate.value);
      });
      console.log(self.participants);
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.selectedParticipant = null;
      _buildDynamicTableSettings();
    }

    function _buildDynamicTableSettings() {
      self.dynamicTableSettings = DynamicTableSettingsFactory.create()
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Recrutamento', '15', 'left', 4)
        //property, formatType
        .addColumnProperty('recruitmentNumber')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nome', '40', '', 1)
        //property, formatType
        .addColumnProperty('name')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Sexo', '15', '', 3)
        //property, formatType
        .addColumnProperty('sex')
        //header, flex, align, ordinationPriorityIndex
        .addHeader('Nascimento', '15', '', 2)
        //property, formatType
        .addColumnProperty('birthday', 'DATE')
        .setFormatData("'dd/MM/yy")
        .addHeader('Centro', '15', '', 5)
        .addColumnProperty('fieldCenter.acronym')
        //icon, tooltip, classButton, successMsg,
        //buttonFuntion, returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
        // .addColumnIconButton(
        //   'delete_forever', 'Remover Alíquota', '', 'A Alíquota foi removida',
        //   self.removeElement, false, false, true, false, false
        // )

        .setElementsArray(self.participants)
        .setTitle('Lista de Participantes')
        .setCallbackAfterChange(self.dynamicDataTableChange)
        //Don't use with Service, in this case pass Service as attribute in the template
        // .setTableUpdateFunction(AliquotTransportationService.dynamicDataTableFunction.updateDataTable)
        /*
          //Optional Config's
          .setCheckbox(false)
          .setFilter(true)
          .setReorder(true)
          .setPagination(true)
          .setSelectedColor()
          .setHoverColor()

        */
        .getSettings();
    }

    function getCurrentState() {
      return ApplicationStateService.getCurrentState();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
        self.isEmpty = false;
      } else {
        DashboardService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
            self.isEmpty = false;
          });
      }
    }
  }
}());
