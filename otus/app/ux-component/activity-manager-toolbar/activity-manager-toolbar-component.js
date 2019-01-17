(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-manager-toolbar/activity-manager-toolbar-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      },
      bindings: {
        'onDelete': '&',
        'onViewInfo': '&'
      }
    });

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.activity.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',

  ];

  function Controller(ParticipantActivityService, ActivityPlayerService, EventService, ApplicationStateService, $mdDialog, DialogService) {
    var self = this;
    var confirmDeleteSelectedActivity;
    /* Public methods */
    self.fillSelectedActivity = fillSelectedActivity;
    self.deleteSelectedActivity = deleteSelectedActivity;
    self.visualizeSelectedActivityInfo = visualizeSelectedActivityInfo;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function fillSelectedActivity() {
      ActivityPlayerService
        .load()
        .then(function() {
          ApplicationStateService.activateActivityPlayer();
        });
    }

    function deleteSelectedActivity() {
      DialogService.showDialog(confirmDeleteSelectedActivity).then(function() {
        ParticipantActivityService.getSelectedActivities().discard();
        self.onDelete();
      });
    }

    function visualizeSelectedActivityInfo() {
      self.onViewInfo();
    }


    function onInit() {
      _buildDialogs();
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      EventService.onActivitySelected(_updateComponent);
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
      } else {
        ParticipantActivityService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
          });
      }
    }

    function _updateComponent(selectedActivities) {
      if (selectedActivities.length <= 0) {
        self.showVisualizationButton = false;
        self.showFillingButton = false;
        self.showDeleteButton = false;
        self.showInfoButton = false;
      } else if (selectedActivities.length === 1) {
        self.showVisualizationButton = true;
        self.showFillingButton = true;
        self.showDeleteButton = true;
        self.showInfoButton = true;
      } else {
        self.showVisualizationButton = false;
        self.showFillingButton = false;
        self.showDeleteButton = true;
        self.showInfoButton = false;
      }
    }

    function _buildDialogs() {

      confirmDeleteSelectedActivity = {
        dialogToTitle:'Confirmação',
        titleToText:'Confirmar exclusão de atividade:',
        textDialog:'A atividade será excluida.',
        ariaLabel:'Confirmação de exclusão',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          },
          {
            message:'Voltar',
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };
    }
  }
}());
