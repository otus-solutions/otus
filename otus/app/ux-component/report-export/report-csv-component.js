(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('reportCsv', {
      controller: Controller,
      templateUrl: 'app/ux-component/report-export/report-csv-template.html',
      bindings: {
        csvData: '<',
        csvField: '<'
      }
    });

  function Controller(){
    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      _ReportBuild();
    }

    function _exportReport(CsvTemplate) {
      var downloadElement = document.createElement('a');
                        downloadElement.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(CsvTemplate));
                        downloadElement.setAttribute('download', 'exams.csv');
                        downloadElement.setAttribute('target', '_blank');
                        downloadElement.click();

    }

    function _ReportBuild() {

      // var json2csv = require('json2csv');
      console.log(self);
      try {
        var result = json2csv({
          data: self.csvData,
          fields: self.Field
        });
      } catch (err) {
        console.error(err);
      }
      _exportReport(result);
    }


  }

}());
