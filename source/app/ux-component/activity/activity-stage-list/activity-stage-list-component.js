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
  ];

  function Controller($mdToast, $mdColors, ACTIVITY_MANAGER_LABELS, EventService, LoadingScreenService) {
    var self = this;

    self.$onInit = onInit;
    self.stage = [];

    self.model = {
      "_id": "20193n8120938",
      "objectType": "ActivityBasicModel",
      "acronym": "FRC",
      "name": "Formulário de revisão cardiovascular",
      "activities": [
        {
          "mode": "AUTOFILL",
          "category": "C0",
          "lastStatus": {
            "name": "FINALIZED",
            "user": {
              "userEmail": "fulano@gmail.com"
            },
            "date": "2020-09-30T00:00:00"
          },
          "externalId": "20200921516453"
        },
        {
          "mode": "ONLINE",
          "category": "C0",
          "lastStatus": {
            "name": "SAVED",
            "user": {
              "userEmail": "fulano@gmail.com"
            },
            "date": "2020-10-30T00:00:00"
          },
          "externalId": "20200921516454"
        }
      ],
      "stage": "87624basdkjasmdijas"
    }

    var var2 = angular.copy(self.model);
    var2.activities = [];
    var acronyms = [];

    //TODO map for stage

    acronyms.push(angular.copy(self.model));
    acronyms.push(var2);
    acronyms.push(var2);
    acronyms.push(angular.copy(self.model));

    let stages2 = [
      {
        stageName: "onda 3",
        "acronyms": acronyms
      },
      {
        stageName: "onda covid",
        "acronyms": acronyms
      },
      {
        stageName: "onda 4",
        "acronyms": acronyms
      }
    ]

    function onInit() {
      EventService.onParticipantSelected(_loadActivityStages);
      _loadActivityStages();
    }

    function _loadActivityStages() {
      LoadingScreenService.start();
      self.stages = stages2;
      self.stages.map(stage => {
        stage.acronyms.forEach(acronym => { _activityAttributes(acronym.activities) })
      });
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
