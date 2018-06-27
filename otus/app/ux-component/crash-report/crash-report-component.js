(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusCrashReport', {
      controller: Controller,
      templateUrl: 'app/ux-component/crash-report/crash-report-component.html',
      transclude: true
    });

  Controller.$inject = [
    'otusjs.application.crash.CrashReportService'
  ]


  function Controller(Service) {
    var self = this;

    self.saveToCrashReport = saveToCrashReport;


    function saveToCrashReport() {

      var cookieReport = Service.getCookie();
      var cookieJSON ='data:text/json;charset=utf-8,' + cookieReport;
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year  = date.getFullYear();


      var downloadElement = document.createElement('a');
      downloadElement.setAttribute('href', cookieJSON);
      downloadElement.setAttribute('download', 'bug-report-'+ day + '-'+ month + '-' + year +'.json');
      downloadElement.setAttribute('target', '_blank');
      document.body.appendChild(downloadElement);
      downloadElement.click();

    }

  }

}());
