(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller("otusFlagReportManagerCtrl", Controller);

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.MonitoringService',
    'otusjs.application.activity.StatusHistoryService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusFlagReportParseDataFactory',
    '$q',
    '$timeout'
  ];

  function Controller(ProjectFieldCenterService,
    MonitoringService,
    StatusHistoryService,
    DashboardContextService,
    LoadingScreenService,
    FlagReportParseData,
    $q,
    $timeout) {

    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.updateData = updateData;
    self.updatePage = updatePage;
    self.setActivities = setActivities;
    self.downloadCSV = downloadCSV;
    self.INDEX = 0;
    self.ERROR = true;
    self.MESSAGES = [
      "Não existem atividades disponíveis para visualização.",
      "Não foi possível carregar os dados do centro.",
      "Não foi possível carregar os dados de acrônimos no sistema.",
      "Não foi possível carregar os dados de atividades no sistema."
    ];

    self.$onDestroy = function () {
      alasql("DROP TABLE IF EXISTS flags");
    };

    function onInit() {
      self.ready = false;
      _resetData();
      LoadingScreenService.start();
      _constructor();
    }

    function _prepareForCSV() {
      return $q(function (resolve, reject) {
        alasql("DROP TABLE IF EXISTS flags");
        alasql("CREATE TABLE IF NOT EXISTS flags(RN INT,ACRONIMO STRING, STATUS STRING)");
        var rn = 0;
        if (Array.isArray(self.rawActivities.data)) {
          if (self.activitiesData.data.length > 0) {
            try {
              self.activitiesData.data.forEach(function (line) {
                for (let i = 0; i < self.activitiesData.columns.length; i++) {
                  alasql("INSERT INTO flags VALUES(" + self.activitiesData.index[rn] + ",'" + self.activitiesData.columns[i][1] + "','" + StatusHistoryService.getStatusLabel(line[i]) + "')");
                }
                rn++;
              });
            } catch (e) {
              reject(e);
            }
          }
          resolve(true);
        } else {
          reject("Data not found.");
        }
      });
    }

    function downloadCSV() {
      LoadingScreenService.changeMessage("Por favor, aguarde! Estamos gerando o arquivo para download.");
      LoadingScreenService.start();
      $timeout(function () {
        _prepareForCSV().then(function (response) {
          if (response) {
            var name = "relatorio-flags-".concat(new Date().toLocaleDateString());
            var QUERY_ACRONYM = self.selectedAcronym != null ? "ACRONIMO='" + self.selectedAcronym + "'" : "2=2";
            var QUERY_STATUS = self.selectedStatus != null ? "STATUS='" + StatusHistoryService.getStatusLabel(self.selectedStatus) + "'" : "3=3";
            alasql('SELECT * INTO CSV("' + name + '.csv",{headers:true}) FROM flags WHERE 1=1 AND ' + QUERY_ACRONYM + ' AND ' + QUERY_STATUS);
            LoadingScreenService.finish();
          }
        }).catch(function (e) {
          throw new Error(e);
        }).finally(function () {
          LoadingScreenService.finish();
        });
      }, 2000);
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
      self.INDEX++;
      if (!self.centers) {
        ProjectFieldCenterService.loadCenters().then((result) => {
          self.centers = angular.copy(result);
          setUserFieldCenter();
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
          throw e;
        });
      } else {
        _loadActivitiesProgress(self.selectedCenter.acronym);
      }
    }

    function setUserFieldCenter() {
      DashboardContextService
        .getLoggedUser()
        .then((userData) => {
          var { acronym } = userData.fieldCenter;
          if (!acronym) {
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
          LoadingScreenService.finish();
          throw e;
        });
    }

    function _loadAllAcronyms() {
      self.INDEX++;
      if (!self.acronymsList) {
        MonitoringService.listAcronyms()
          .then((activities) => {
            self.acronymsList = activities.map(function (acronym) {
              return acronym;
            }).filter(function (elem, index, self) {
              return index == self.indexOf(elem);
            });
            _getStatus();
          })
          .catch((e) => {
            LoadingScreenService.finish();
            throw e;
          });
      }
    }

    function _getStatus() {
      self.status = StatusHistoryService.listStatus();
      self.selectedStatus = null;
      _loadActivitiesProgress(self.selectedCenter.acronym);
    }

    function _loadActivitiesProgress(center) {
      self.INDEX++;
      if (!self.activities || center !== self.selectedCenter.acronym) {
        if (center !== self.selectedCenter.acronym) self.$onInit();
        MonitoringService.getActivitiesProgressReport(center)
          .then((response) => {
            alasql("DROP TABLE IF EXISTS flags");
            self.rawActivities = angular.copy(response);
            self.activitiesData = angular.copy(response);
            self.ready = true;
            self.ERROR = false;
          }).catch((e) => {
            LoadingScreenService.finish();
            throw e;
          });
      } else {
        self.setActivities(self.activities, self.selectedAcronym, self.selectedStatus);
        self.ready = true;
        self.ERROR = false;
      }

    }

    function updateData(activities = null, acronym = null, status = null, center) {
      if (center && center !== self.selectedCenter.acronym) {
        _loadActivitiesProgress(center);
        _setCenter(center);
      } else {
        if (acronym !== self.selectedAcronym || status !== self.selectedStatus) {
          _setActivity(acronym);
          _setStatus(status);
          self.newActivitiesData = FlagReportParseData.create(self.activitiesData, acronym, status)
          self.setActivities(self.newActivitiesData, acronym, status);
        } else if (activities && activities !== self.activities) {
          self.setActivities(activities, acronym, status);
        }
      }
    }

    function updatePage(activities = null, startPage, endPage) {
      if (startPage !== undefined && endPage !== undefined) {
        self.activitiesData.index = self.rawActivities.index.slice(startPage, endPage + 1);
      }
      self.activitiesData.data = angular.copy(activities);
      self.setActivities(FlagReportParseData.create(self.activitiesData, self.selectedAcronym, self.selectedStatus), self.selectedAcronym, self.selectedStatus);
      LoadingScreenService.finish();
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
