(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportManager', {
      controller: "otusFlagReportManagerCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/manager-list/otus-flag-report-manager-list-template.html',
      bindings:{
        user: "="
      }
    })
    .controller("otusFlagReportManagerCtrl", Controller);

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.MonitoringService',
    'ACTIVITY',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(ProjectFieldCenterService, MonitoringService, ACTIVITY, dashboardContextService, LoadingScreenService) {

    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.updateData = updateData;
    self.data = [];

    self.setActivities = setActivities;
    function onInit() {

      LoadingScreenService.start();
      self.ready = false;
      _constructor();
      LoadingScreenService.finish();
    }

    function _constructor() {
      generateRandomDataForTesting(self.setActivities);
      _getStatus();
      _loadAllCenters();
    }

    function _getStatus() {
      self.status = ACTIVITY.STATUS;
      self.selectedStatus = null;
    }

    function _loadAllCenters() {
      if(!self.centers){
        ProjectFieldCenterService.loadCenters().then((result) => {
          self.centers = angular.copy(result);
          setUserFieldCenter();
        });
      }
    }

    function _loadAllAcronyms() {
      if(!self.acronymsList){
        MonitoringService.listAcronyms()
          .then((activities) => {
            self.acronymsList = activities.map(function(acronym) {
              return acronym;
            }).filter(function(elem, index, self) {
              return index == self.indexOf(elem);
            });
            self.setActivities(self.activities);
            self.selectedAcronym = null;
            self.ready = true;
            LoadingScreenService.finish();
          });
      }
    }

    function setUserFieldCenter() {

        dashboardContextService
          .getLoggedUser()
          .then((userData) => {
            let {acronym} = userData.fieldCenter;
            if(!acronym) {
              _loadAllCenters();
            } else {
              self.centers = [].concat(self.centers.find((center) => {
                return center.acronym === userData.fieldCenter.acronym;
              }));
              self.selectedCenter = angular.copy(self.centers);
            }
            _loadAllAcronyms();

          });

    }

    function updateData(activities, acronym, status, center) {
      console.log(activities)
      if (activities){
        self.setActivities(activities);
      }
    }

    function setActivities(activities) {
      self.activities = activities;
    }


    function generateRandomDataForTesting(activities) {
      var nQuestionnaires = 39;
      var nParticipants = 3000;

      for (var j = 0; j < nParticipants; j++) {

        var item = {
          rn: 'P' + j,
          activities: []
        };

        for (var i = 0; i < nQuestionnaires; i++) {
          var random = Math.random();
          var value;

          if (random < 0.25) {
            value = -1;
          } else if (random <= 0.50) {
            value = 0;
          } else if (random <= 0.75) {
            value = 1;
          }
          else {
            value = 2;
          }
          item.activities.push({
            acronym: "Q" + i,
            status: value
          });


        }
        self.data.push(item);
      }
      self.activities = self.data;

      // return self.setActivities;

    }



  }

}());