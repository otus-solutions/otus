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
    'ACTIVITY_MANAGER_LABELS'
  ];

  function Controller($mdToast, $mdColors, ACTIVITY_MANAGER_LABELS) {
    var self = this;

    self.$onInit = onInit;
    self.activities = [];
    self.stage = [];


    self.model = {
      "_id": "20193n8120938",
      "objectType": "ActivityBasicModel",
      "acronym": "FRC",
      "name": "Formulário de revisão cardiovascular",
      "mode": "AUTOFILL",
      "category": "C0",
      "lastStatus": {
        "name": "FINALIZED",
        "user": {},
        "date": "2020-09-30T00:00:00"
      },
      "externalId": "20200921516453",
      "stage": "87624basdkjasmdijas"
    }

    //TODO map for stage

    self.activities.push(self.model);

    self.stages = [
      {
        stage: "onda 3",
        activities: self.activities
      },
      {
        stage: "onda covid",
        activities: self.activities
      },
      {
        stage: "onda 4",
        activities: self.activities
      }
    ]

    function onInit() {

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
