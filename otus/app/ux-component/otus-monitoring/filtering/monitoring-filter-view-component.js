(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('monitoringFilterViewComponent', {
      controller: "monitoringFilterViewCtrl as $ctrl",
      templateUrl: 'app/ux-component/otus-monitoring/filtering/monitoring-filter-view-template.html',
      bindings: {
        selectedLots: '=',
        csvData: '=',
        parseData: '=',
        questionnairesList: '=',
        uniqueDatesList: '=',
        centers: '=',
        updateData: '='
      }
    });


}());
