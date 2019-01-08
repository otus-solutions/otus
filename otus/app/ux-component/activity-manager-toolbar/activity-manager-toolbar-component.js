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
    'otusjs.otus.uxComponent.CheckerItemFactory',
    '$q',
    '$timeout'
  ];

  function Controller(ParticipantActivityService, ActivityPlayerService, EventService, ApplicationStateService, $mdDialog, DialogService, CheckerItemFactory, $q, $timeout) {
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

    self.isOffline = () => {
      // ParticipantActivityService.getSelectedActivities().
      // ApplicationStateService.activatePaperActivityCheckerUpdate();
      self.cancel = $mdDialog.cancel;
      $mdDialog.show({
        locals: {selectedActivity: self.selectedPaperActivity},
        // template: '<otus-paper-activity-checker-update selected-activity="$ctrl.selectedPaperActivity"></otus-paper-activity-checker-update>',
        templateUrl: 'app/ux-component/paper-activity-checker-update/paper-activity-checker-update-template.html',
        parent: angular.element(document.body),
        controller: DialogController,
        controllerAs: "vm",
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true,

      }).then(function (data) {
        console.log(data)
      })
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
        self.isPaperActivity = false;
      } else if (selectedActivities.length === 1) {
        self.showVisualizationButton = true;
        self.showFillingButton = true;
        self.showDeleteButton = true;
        self.showInfoButton = true;
        self.isPaperActivity = selectedActivities[0].statusHistory.getInitializedOfflineRegistry() ? true : false;
      } else {
        self.showVisualizationButton = false;
        self.showFillingButton = false;
        self.showDeleteButton = true;
        self.showInfoButton = false;
        self.isPaperActivity = false;
      }

      if (self.isPaperActivity){
        self.selectedPaperActivity = angular.copy(selectedActivities[0]);
      } else {
        delete self.selectedPaperActivity;
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

    function DialogController(selectedActivity) {
      var self = this;
      self.selectedActivity = selectedActivity;
      /* Public methods */
      self.querySearch = querySearch;
      self.goToActivityUpdate = goToActivityUpdate;
      self.cancel = cancel;
      self.$onInit = onInit;

      onInit();

      function querySearch(query) {
        var results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
        var deferred = $q.defer();

        $timeout(function() {
          deferred.resolve(results);
        }, Math.random() * 1000, false);

        return deferred.promise;
      }

      function goToActivityUpdate() {
        self.paperActivityData.checker = self.selectedItem.checker;
        self.selectedActivity.statusHistory.getInitializedOfflineRegistry().setUser(self.selectedItem.checker);
        self.cancel();
        //TODO: fazer TIAGO
        // ParticipantActivityService.initializePaperActivityData(self.paperActivityData);
        // ApplicationStateService.activateActivityAdder();
      }

      function cancel(){
        $mdDialog.cancel();
      }

      function onInit() {
        self.paperActivityData = {};
        self.paperActivityData.realizationDate = new Date();
        self.checkers = ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create);
      }

      function _createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(checker) {
          return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
        };
      }
    }



  }



}());
