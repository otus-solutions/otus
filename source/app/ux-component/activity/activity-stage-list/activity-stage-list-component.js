(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityStageList', {
      controller: 'otusActivityStageListCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity/activity-stage-list/activity-stage-list-template.html',
      //TODO bindings rethink to use
      bindings: {
        stageDataSettings: "=",
        updateFunction: '=?'
      }
    }).controller('otusActivityStageListCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdColors',
    'ACTIVITY_MANAGER_LABELS',
    'otusjs.activity.core.EventService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.activity.business.ParticipantActivityService'
  ];

  function Controller($mdToast, $mdColors, ACTIVITY_MANAGER_LABELS, EventService, LoadingScreenService, ParticipantActivityService) {
    var self = this;

    self.$onInit = onInit;
    self.stage = [];

    function onInit() {
      EventService.onParticipantSelected(_loadActivityStages);
      _loadActivityStages();
    }

    function _loadActivityStages() {
      LoadingScreenService.start();
      ParticipantActivityService.getAllByStageGroup().then(stages => {
        self.stages = stages;
        self.stages.map(stage => {
          stage.acronyms.forEach(acronym => { _activityAttributes(acronym.activities) })
        });
      })
      LoadingScreenService.finish();
    }

    function _activityAttributes(activities) {
      return activities.forEach(activity => {
        activity.attributeMode = Object.values(ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE)
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

    //TODO create service for activities
    function _showMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(2000)
      );
    }
  }
}());
