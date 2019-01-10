(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManagerToolbar', {
      controller: "otusActivityManagerToolbarCtrl as $ctrl",
      templateUrl: 'app/ux-component/activity-manager-toolbar/activity-manager-toolbar-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      },
      bindings: {
        'onDelete': '&',
        'onViewInfo': '&'
      }
    }).controller("otusActivityManagerToolbarCtrl", Controller);

  Controller.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.activity.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    '$q',
    '$timeout',
    '$mdToast'
  ];

  function Controller(ParticipantActivityService, ActivityPlayerService, EventService, ApplicationStateService, $mdDialog, DialogService, CheckerItemFactory, $q, $timeout, $mdToast) {
    var self = this;
    var confirmDeleteSelectedActivity;
    /* Public methods */
    self.fillSelectedActivity = fillSelectedActivity;
    self.deleteSelectedActivity = deleteSelectedActivity;
    self.visualizeSelectedActivityInfo = visualizeSelectedActivityInfo;
    self.updateChecker = updateChecker;
    self.DialogController = DialogController
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

    function updateChecker() {
      self.cancel = $mdDialog.cancel;
      $mdDialog.show({
        locals: {selectedActivity: self.selectedPaperActivity},
        templateUrl: 'app/ux-component/paper-activity-checker-update/paper-activity-checker-update-template.html',
        parent: angular.element(document.body),
        controller: self.DialogController,
        controllerAs: "vm",
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true,
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
      self.user = selectedActivity.statusHistory.getInitializedOfflineRegistry().user;
      /* Public methods */
      self.querySearch = querySearch;
      self.updateCheckerActivity = updateCheckerActivity;
      self.cancel = cancel;

      onInit();

      function querySearch(query) {
        var results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
        var deferred = $q.defer();

        $timeout(function() {
          deferred.resolve(results);
        }, Math.random() * 1000, false);

        return deferred.promise;
      }

      function updateCheckerActivity() {
        var activityStatus = angular.copy(self.selectedActivity.statusHistory.getInitializedOfflineRegistry());
        activityStatus.setUser(self.selectedItem.checker);
        ParticipantActivityService.updateCheckerActivity(
          self.selectedActivity.getID(),
          activityStatus)
          .then(function (response) {
            self.cancel();
            if(response){
              self.selectedActivity.statusHistory.getInitializedOfflineRegistry().setUser(self.selectedItem.checker);
              _showMessage("Salvo com sucesso.")
            } else {
              _showMessage("Aferidor não alterado.")
            }
          }).catch(function (e) {
          self.cancel();
          _showMessage("Ocorreu um problema! Não foi possível alterar o aferidor.");
        });
      }

      function _showMessage(msg) {
        $mdToast.show(
          $mdToast.simple()
            .position("bottom right")
            .textContent(msg)
            .hideDelay(3000));
      }

      function cancel(){
        $mdDialog.cancel();
      }

      function onInit() {
        self.checkers = ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create);
        self.selectedItem = CheckerItemFactory.create(self.user);
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
