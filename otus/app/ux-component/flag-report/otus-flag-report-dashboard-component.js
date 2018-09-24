(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusFlagReportDashboard', {
      controller: "otusFlagReportCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/otus-flag-report-dashboard-template.html'
    })
    .controller("otusFlagReportCtrl", Controller);

  Controller.$inject = [
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.monitoring.business.MonitoringService'
  ];

  function Controller(ProjectFieldCenterService, MonitoringService) {

    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.ready = false;

    function onInit() {
      _loadAllCenters();
    }

    function _loadAllCenters() {
      ProjectFieldCenterService.loadCenters().then((result) => {
        self.centers = angular.copy(result);
        _loadAllAcronyms();
      });

    }

    function _loadAllAcronyms() {
      MonitoringService.listAcronyms()
        .then(function(activities) {
          self.questionnairesList = activities.map(function(acronym) {
            return acronym;
          }).filter(function(elem, index, self) {
            return index == self.indexOf(elem);
          });
          self.ready = true;

        });
    }



  }

}());