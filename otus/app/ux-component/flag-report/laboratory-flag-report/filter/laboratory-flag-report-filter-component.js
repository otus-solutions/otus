(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratoryFlagReportFilterComponent', {
      controller: 'otusLaboratoryFlagReportFilterComponentCtrl as $ctrl',
      templateUrl: 'app/ux-component/flag-report/laboratory-flag-report/filter/laboratory-flag-report-filter-template.html',
      bindings: {
        examsStatus: '=',
        examsNameList: '=',
        centers: '=',
        onUpdate: '='
      }
    });
}());
