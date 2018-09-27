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
    'otusjs.application.activity.StatusHistoryService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusFlagReportParseDataFactory'
  ];

  function Controller(ProjectFieldCenterService, MonitoringService, StatusHistoryService, dashboardContextService, LoadingScreenService,FlagReportParseData) {

    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.updateData = updateData;
    self.data = [];

    self.setActivities = setActivities;

    function onInit() {
      self.selectedAcronym = null;
      self.selectedStatus = null;
      LoadingScreenService.start();
      self.ready = false;
      _constructor();
      LoadingScreenService.finish();
    }

    function _constructor() {
      //generateRandomDataForTesting(self.setActivities);

      _loadAllAcronyms();
      _loadAllCenters();
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
            generateRandomDataForTesting(self.setActivities);
            self.data = FlagReportParseData.create(self.data);
            _getStatus();
          });
      }
    }

    function _getStatus() {
      self.status = StatusHistoryService.listStatus();
      self.selectedStatus = null;
      _loadAllCenters();
    }

    function _loadAllCenters() {
      if(!self.centers){
        ProjectFieldCenterService.loadCenters().then((result) => {
          self.centers = angular.copy(result);
          setUserFieldCenter();
        });
      }
    }

    function setUserFieldCenter() {
      dashboardContextService
        .getLoggedUser()
        .then((userData) => {
          let {acronym} = userData.fieldCenter;
          if(!acronym) {
            _setCenter(self.centers[0].acronym);
          } else {
            self.centers = [].concat(self.centers.find((center) => {
              return center.acronym === userData.fieldCenter.acronym;
            }));
            _setCenter(userData.fieldCenter.acronym);
          }
          _loadActivitiesProgress(self.selectedCenter.acronym);
        });
    }

    function updateData(activities = null, acronym = null, status = null, center) {
      if(center && center !== self.selectedCenter.acronym){
        _setCenter(center);
        _loadActivitiesProgress(center);
      }else {
        if (acronym !== self.selectedAcronym || status !== self.selectedStatus) {
          _setActivity(acronym);
          _setStatus(status);
          self.setActivities(activities, acronym, StatusHistoryService.getStatusValue(status));
        } else if(activities && activities !== self.activities){

          self.setActivities(activities, acronym, status);
        }
      }

    }

    self.updatePage = updatePage;

    function updatePage(activities = null) {
      self.setActivities(activities, self.selectedAcronym, StatusHistoryService.getStatusValue(self.selectedStatus));
    }

    function setActivities(activities, acronym, status) {
      self.activities = activities;
    }

    function _setCenter(acronym) {
      self.selectedCenter = self.centers.find(function (center) {
        return center.acronym === acronym;
      });
    }

    function _setStatus(status) {
      self.selectedStatus = status;
    }

    function _setActivity(acronym) {
      self.selectedAcronym = acronym;
    }

    function _loadActivitiesProgress(center) {
      if(!self.activities){

        MonitoringService.getActivitiesProgress(center)
          .then((response) => {
            console.log(response)
            self.ready= true;
            LoadingScreenService.finish();
          }).catch((e)=>{

        });
      } else {
        self.setActivities(self.activities, self.selectedAcronym, self.selectedStatus);
        self.ready= true;
        LoadingScreenService.finish();
      }
    }


    function generateRandomDataForTesting(activities) {
      var nQuestionnaires = 39;
      var nParticipants = 2000;

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
            acronym: self.acronymsList[i],
            status: value
          });


        }
        self.data.push(item);
      }
      self.activities = self.data;

      // self.setActivities(self.activities, self.selectedAcronym, self.selectedStatus);


    }



  }

}());
