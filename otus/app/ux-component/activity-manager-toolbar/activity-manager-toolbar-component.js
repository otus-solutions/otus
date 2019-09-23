(function () {
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
        'updateList': '&',
        'onViewInfo': '&'
      }
    }).controller("otusActivityManagerToolbarCtrl", Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$timeout',
    '$mdDialog',
    'otusjs.activity.core.EventService',
    'otusjs.otus.uxComponent.CheckerItemFactory',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.activity.business.ActivityViewService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.report.business.ParticipantReportWidgetFactory',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($q, $mdToast, $timeout, $mdDialog, EventService, CheckerItemFactory, DialogService, ActivityViewService, ActivityPlayerService,
                      ApplicationStateService, ParticipantActivityService, ParticipantReportWidgetFactory, LoadingScreenService) {

    var confirmDeleteSelectedActivity;
    var self = this;
    /* Public methods */
    self.fillSelectedActivity = fillSelectedActivity;
    self.viewSelectedActivity = viewSelectedActivity;
    self.deleteSelectedActivity = deleteSelectedActivity;
    self.visualizeSelectedActivityInfo = visualizeSelectedActivityInfo;
    self.updateChecker = updateChecker;
    self.DialogController = DialogController;
    self.reloadActivityReport = reloadActivityReport;
    self.generateActivityReport = generateActivityReport;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.report = {};

    function onInit() {
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
        locals: {selectedActivity: self.selectedPaperActivity, updateList: self.updateList},
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
        self.showVisualizationButton = false;
        self.showViewerButton = false;
        self.showFillingButton = false;
        self.showDeleteButton = false;
        self.showInfoButton = false;
        self.isPaperActivity = false;
      } else if (selectedActivities.length === 1) {
        self.showVisualizationButton = true;
        self.showFillingButton = true;
        self.showViewerButton = true;
        self.showDeleteButton = true;
        self.showInfoButton = true;
        self.isPaperActivity = selectedActivities[0].statusHistory.getInitializedOfflineRegistry() ? true : false;
      } else {
        self.showVisualizationButton = false;
        self.showFillingButton = false;
        self.showViewerButton = false;
        self.showDeleteButton = true;
        self.showInfoButton = false;
        self.isPaperActivity = false;
      }

      if (self.isPaperActivity) {
        self.selectedPaperActivity = angular.copy(selectedActivities[0]);
      } else {
        delete self.selectedPaperActivity;
      }
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
        });
      }

      function cancel() {
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
    }

    function reloadActivityReport() {
      let selectedActivityID = ParticipantActivityService.getSelectedActivities().list()[0].getID();

      self.ready = false;
      ParticipantReportWidgetFactory.getParticipantReportList(self.selectedParticipant)
        .then(function (reports) {
          self.report = reports[0];
          self.report.getReportTemplate();
          self.ready = true;
        })
        .catch(function () {
          self.ready = true;
        });
    }

    function generateActivityReport(report) {
      console.log(report)
      console.log(report.compiledTemplate);
      LoadingScreenService.changeMessage(report.getLoadingMessage());
      LoadingScreenService.start();
      report.generateReport(LoadingScreenService.finish);
    }
  }
}());