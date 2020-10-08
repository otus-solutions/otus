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
    self.acronyms = [];
    self.stage = [];


    self.model = {
      "_id": "20193n8120938",
      "objectType": "ActivityBasicModel",
      "acronym": "FRC",
      "name": "Formulário de revisão cardiovascular",
      "activities": [
        {
          "mode": "AUTOFILL",
          "iconMode": ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.MODE.AUTOFILL.icon,
          "category": "C0",
          "lastStatus": {
            "name": "FINALIZED",
            "iconStatus": ACTIVITY_MANAGER_LABELS.ACTIVITY_ATTRIBUTES.STATUS.FINALIZED.icon,
            "user": {
              "userEmail": "fulano@gmail.com"
            },
            "date": "2020-09-30T00:00:00"
          },
          "externalId": "20200921516453"
        }
      ],
      "stage": "87624basdkjasmdijas"
    }

    let var2 = angular.copy(self.model);
    var2.activities = [];

    //TODO map for stage

    self.acronyms.push(self.model);
    self.acronyms.push(var2);
    self.acronyms.push(var2);

    self.stages = [
      {
        stage: "onda 3",
        "acronyms": self.acronyms
      },
      {
        stage: "onda covid",
        "acronyms": self.acronyms
      },
      {
        stage: "onda 4",
        "acronyms": self.acronyms
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
