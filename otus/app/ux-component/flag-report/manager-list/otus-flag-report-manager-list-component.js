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

  function Controller(ProjectFieldCenterService,
                      MonitoringService,
                      StatusHistoryService,
                      dashboardContextService,
                      LoadingScreenService,
                      FlagReportParseData) {

    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.prepareForCSV = prepareForCSV;

    self.updateData = updateData;
    self.updatePage = updatePage;
    self.setActivities = setActivities;

    function onInit() {
      self.ready = false;
      _resetData();
      LoadingScreenService.start();
      _constructor();
    }

    function prepareForCSV(){
      self.CSVActivities = {};
      self.activities.forEach(function(data) {
        self.CSVActivities[data.rn] = [].concat(data.activities);
      });
    }

    function _translateStatus(status){
      var translate = "";
      switch (status) {
        case -1:
          translate = "Criado";
          break;
        case 0:
          translate = "Opcional";
          break;
        case 1:
          translate = "Salvo";
          break;
        case 2:
          translate = "Finalizado";
          break;
        default:

      }

      return translate;
    }

    self.download = function(){
      alasql("CREATE TABLE flags(RN INT,SIGLA STRING, STATUS STRING)");
      self.rawActivities.forEach(function(data) {
        data.activities.forEach(function(a) {
          alasql("INSERT INTO flags VALUES("+a.rn+",'"+a.acronym+"','"+_translateStatus(a.status)+"')")
        });

      });
      alasql('SELECT * INTO CSV("report-flags.csv",{headers:true}) FROM flags');
    }

    function _resetData() {
      self.activitiesData = [];
      self.selectedAcronym = null;
      self.selectedStatus = null;
    }

    function _constructor() {
      self.colors = StatusHistoryService.getColors();
      self.labels = StatusHistoryService.getLabels();
      _loadAllCenters();
    }

    function _loadAllCenters() {
      if(!self.centers){
        ProjectFieldCenterService.loadCenters().then((result) => {
          self.centers = angular.copy(result);
          setUserFieldCenter();
        }).catch(function (e) {
          console.log(e)
        });
      } else {
        _loadActivitiesProgress(self.selectedCenter.acronym);
      }
    }

    function setUserFieldCenter() {
      dashboardContextService
        .getLoggedUser()
        .then((userData) => {
          var {acronym} = userData.fieldCenter;
          if(!acronym) {
            _setCenter(self.centers[0].acronym);
          } else {
            self.centers = [].concat(self.centers.find((center) => {
              return center.acronym === userData.fieldCenter.acronym;
            }));
            _setCenter(userData.fieldCenter.acronym);
          }
          _loadAllAcronyms();
        })
        .catch(function (e) {
          console.log(e);
        });
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
            _getStatus();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    function _getStatus() {
      self.status = StatusHistoryService.listStatus();
      self.selectedStatus = null;
      _loadActivitiesProgress(self.selectedCenter.acronym);
    }
    self.export = {};
    function _loadActivitiesProgress(center) {
      if(!self.activities || center !== self.selectedCenter.acronym){
        if (center !== self.selectedCenter.acronym) self.$onInit();
        MonitoringService.getActivitiesProgressReport(center)
          .then((response) => {
            self.rawActivities = angular.copy(response);
            self.activitiesData = FlagReportParseData.create(response);
            self.updatePage(self.rawActivities);
            self.ready= true;
            LoadingScreenService.finish();
          }).catch((e)=>{
          console.log(e)
        });
      } else {
        self.setActivities(self.activities, self.selectedAcronym, self.selectedStatus);
        self.ready= true;
        LoadingScreenService.finish();
      }
    }

    function updateData(activities = null, acronym = null, status = null, center) {
      if(center && center !== self.selectedCenter.acronym){
        _loadActivitiesProgress(center);
        _setCenter(center);
      }else {
        if (acronym !== self.selectedAcronym || status !== self.selectedStatus) {
          _setActivity(acronym);
          _setStatus(status);
          self.activitiesData = FlagReportParseData.create(self.rawActivities, acronym, status)
          self.setActivities(self.activitiesData, acronym, status);
        } else if(activities && activities !== self.activities){

          self.setActivities(activities, acronym, status);
        }
      }
    }

    function updatePage(activities = null) {
        self.activities = activities
        prepareForCSV();
        self.setActivities(FlagReportParseData.create(activities), self.selectedAcronym, self.selectedStatus);
    }

    function setActivities(activities) {
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


  }

}());
