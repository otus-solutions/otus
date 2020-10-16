(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityStageList', {
      controller: 'otusActivityStageListCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity/activity-stage-list/activity-stage-list-template.html'
    }).controller('otusActivityStageListCtrl', Controller);

  Controller.$inject = [
    '$log',
    '$mdToast',
    'ACTIVITY_MANAGER_LABELS',
    'otusjs.activity.core.EventService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.business.ActivityPlayerService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.model.activity.ActivityBasicFactory',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($log, $mdToast, ACTIVITY_MANAGER_LABELS, EventService, LoadingScreenService, ParticipantActivityService, ActivityPlayerService, ApplicationStateService, ActivityBasicFactory, DialogService) {
    var self = this;

    /* Public methods */
    self.fillSelectedActivity = fillSelectedActivity;
    self.showFillingButton = showFillingButton;
    self.deleteSelectedActivity = deleteSelectedActivity;

    self.$onInit = onInit;

    self.stage = [];

    function onInit() {
      EventService.onParticipantSelected(_loadActivityStages);
      _refreshActivityStage()
    }

    function _refreshActivityStage() {
      LoadingScreenService.start();
      _loadActivityStages();
      LoadingScreenService.finish();
    }

    function _loadActivityStages() {
      ParticipantActivityService.listAvailables().then(function (surveys) {

        ParticipantActivityService.getAllByStageGroup().then(stages => {
          stages.map(stage => {
            let surveyFilter = angular.copy(surveys);

            surveyFilter.forEach(survey => stage.acronyms.find(acronym => {
              if (acronym.acronym == survey.acronym) {
                _activityAttributes(acronym.activities);
                return survey.activities = acronym.activities;
              }
            }))

            stage.acronyms = angular.copy(surveyFilter);
          });

          self.stages = stages;
        });
      })
        .catch(err => {
          $log.error(err);
          _showMsg(ACTIVITY_MANAGER_LABELS.ATTRIBUTES_MESSAGE.SCENE.TOAST.ERROR.errorFind);
        })
    }

    function _activityAttributes(activities) {
      return activities.forEach(activity => {
        activity = ActivityBasicFactory.fromJsonObject(activity);
        activity.lastStatus.mode = Object.values(ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE)
          .find(status => status.name === activity.mode);
        activity.lastStatus.status = Object.values(ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS)
          .find(status => status.name === activity.lastStatus.name);
        activity.lastStatus.realizationDate = _getFormattedDate(activity.lastStatus.date);
      })
    }

    function _getFormattedDate(date) {
      try {
        let formattedDate = new Date(date);
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
      } catch (e) {
        return null;
      }
    }

    function fillSelectedActivity(itemActivity) {
      ParticipantActivityService.selectActivities([itemActivity]);

      ActivityPlayerService.load().then(function () {
        ApplicationStateService.activateActivityPlayer();
      });
    }

    function showFillingButton(mode) {
      return !(mode === ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.name);
    }

    function deleteSelectedActivity(itemActivity) {

      DialogService.showConfirmationDialog(ACTIVITY_MANAGER_LABELS.ATTRIBUTES_MESSAGE.SCENE.DIALOG.confirmDelete.dialogToTitle,
        ACTIVITY_MANAGER_LABELS.ATTRIBUTES_MESSAGE.SCENE.DIALOG.confirmDelete.titleToText,
        ACTIVITY_MANAGER_LABELS.ATTRIBUTES_MESSAGE.SCENE.DIALOG.confirmDelete.textDialog
      ).then(function () {
        ParticipantActivityService.discardActivity(itemActivity._id);
        _loadActivityStages();
      });
    }

    function _showMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(2000)
      );
    }
  }
}());
