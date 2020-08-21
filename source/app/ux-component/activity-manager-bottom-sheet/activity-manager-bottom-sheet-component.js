(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManagerBottomSheet', {
      controller: "otusActivityManagerBottomSheetCtrl as $ctrl",
      templateUrl: 'app/ux-component/activity-manager-bottom-sheet/activity-manager-bottom-sheet-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      },
      bindings: {
        'updateList': '&',
        'onViewInfo': '&'
      }
    }).controller("otusActivityManagerBottomSheetCtrl", Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$timeout',
    '$mdDialog',
    '$mdColors',
    'otusjs.activity.core.EventService',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.activity.business.ActivityViewService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.business.ParticipantActivityService'
  ];

  function Controller($q, $mdToast, $timeout, $mdDialog, $mdColors,
                      EventService, CheckerItemFactory, DialogService, ActivityViewService, ActivityPlayerService, ApplicationStateService, ParticipantActivityService) {
    var self = this;
    var confirmDeleteSelectedActivity;

    /* Public methods */
    self.fillSelectedActivity = fillSelectedActivity;
    self.viewSelectedActivity = viewSelectedActivity;
    self.deleteSelectedActivity = deleteSelectedActivity;
    self.visualizeSelectedActivityInfo = visualizeSelectedActivityInfo;
    self.updateChecker = updateChecker;
    self.DialogController = DialogController;
    self.activitySharingDialog = activitySharingDialog;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.selectedItemCounterBackgroundColor = $mdColors.getThemeColor('default-primary');
      _buildDialogs();
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      EventService.onActivitySelected(_updateComponent);
    }

    function fillSelectedActivity() {
      ActivityPlayerService.load().then(function () {
        ApplicationStateService.activateActivityPlayer();
      });
    }

    function viewSelectedActivity() {
      ActivityViewService.load().then(function () {
        ApplicationStateService.activateActivityViewer()
      });
    }

    function deleteSelectedActivity() {
      DialogService.showDialog(confirmDeleteSelectedActivity).then(function () {
        ParticipantActivityService.getSelectedActivities().discard();
        self.updateList();
      });
    }

    function updateChecker() {
      self.cancel = $mdDialog.cancel;
      $mdDialog.show({
        locals: {selectedActivity: self.selectedActivity, updateList: self.updateList},
        templateUrl: 'app/ux-component/paper-activity-checker-update/paper-activity-checker-update-template.html',
        parent: angular.element(document.body),
        controller: self.DialogController,
        controllerAs: "vm",
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true
      });
    }

    function visualizeSelectedActivityInfo() {
      self.onViewInfo();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;

      } else {
        ParticipantActivityService
          .getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = participantData;
          });
      }
    }

    function _updateComponent(selectedActivities) {
      if (selectedActivities.length <= 0) {
        self.showBottomSheet = false;
        self.showVisualizationButton = false;
        self.showViewerButton = false;
        self.showFillingButton = false;
        self.showDeleteButton = false;
        self.showInfoButton = false;
        self.showPendenciesButton = false;
        self.isPaperActivity = false;
        self.selectedItemCounter = null;
      } else if (selectedActivities.length === 1) {
        var isAutoFill = selectedActivities[0].mode === "AUTOFILL" ? true : false;
        self.showBottomSheet = true;
        self.showVisualizationButton = true;
        self.showFillingButton = !isAutoFill;
        self.showViewerButton = true;
        self.showDeleteButton = true;
        self.showPendenciesButton = !isAutoFill;
        self.showInfoButton = true;
        self.isPaperActivity = selectedActivities[0].statusHistory.getInitializedOfflineRegistry() != undefined ? true : false;
        self.statusSelectedActivity = selectedActivities[0].statusHistory.getLastStatus().name;
        self.selectedItemCounter = null;
      } else {
        self.showBottomSheet = true;
        self.showVisualizationButton = false;
        self.showFillingButton = false;
        self.showViewerButton = false;
        self.showDeleteButton = true;
        self.showInfoButton = false;
        self.showPendenciesButton = false;
        self.isPaperActivity = false;
        self.selectedItemCounter = selectedActivities.length;
      }

       self.selectedActivity = angular.copy(selectedActivities[0]);
    }

    function _buildDialogs() {
      confirmDeleteSelectedActivity = {
        dialogToTitle: 'Confirmação',
        titleToText: 'Confirmar exclusão de atividade:',
        textDialog: 'A atividade será excluida.',
        ariaLabel: 'Confirmação de exclusão',
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

    function DialogController(selectedActivity, updateList) {
      var self = this;
      self.selectedActivity = selectedActivity;
      self.user = selectedActivity.statusHistory.getInitializedOfflineRegistry().user;
      self.date = selectedActivity.statusHistory.getInitializedOfflineRegistry().date;
      /* Public methods */
      self.querySearch = querySearch;
      self.updateCheckerActivity = updateCheckerActivity;
      self.cancel = cancel;

      onInit();

      function onInit() {
        self.checkers = ParticipantActivityService.listActivityCheckers().map(CheckerItemFactory.create);
        self.selectedItem = CheckerItemFactory.create(self.user);
        self.maxDate = new Date();

      }

      function querySearch(query) {
        var results = query ? self.checkers.filter(_createFilterFor(query)) : self.checkers;
        var deferred = $q.defer();

        $timeout(function () {
          deferred.resolve(results);
        }, Math.random() * 1000, false);

        return deferred.promise;
      }

      function updateCheckerActivity() {
        var activityStatus = angular.copy(self.selectedActivity.statusHistory.getInitializedOfflineRegistry());
        activityStatus.setUser(self.selectedItem.checker);
        activityStatus.setDate(self.date);
        ParticipantActivityService.updateCheckerActivity(
          self.selectedActivity.participantData.recruitmentNumber,
          self.selectedActivity.getID(),
          activityStatus)
          .then(function (response) {
            self.cancel();
            if (response) {
              updateList();
              _showMessage("Salvo com sucesso.")
            } else {
              _showMessage("Aferidor não alterado.")
            }
          }).catch(function (e) {
          self.cancel();
          _showMessage("Ocorreu um problema! Não foi possível alterar o aferidor.");
        })
          .then(_cleanSelectedActivity());
      }

      function cancel() {
        _cleanSelectedActivity();
        $mdDialog.cancel();

      }

      function _showMessage(msg) {
        $mdToast.show(
          $mdToast.simple()
            .position("bottom right")
            .textContent(msg)
            .hideDelay(3000));
      }

      function _createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(checker) {
          return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
        };
      }

      function _cleanSelectedActivity(){
        self.selectedActivity = null;
      }

    }

    function activitySharingDialog() {
      alert("Activity sharing")
    }

  }
}());
