(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.FlagReportFilterService', Service);


  Service.$inject = [];

  function Service() {
    var self = this;

    /* Public methods */
    self.filter = filter;

    function filter(json, value = null, status = null) {
      var result = {};
      result.columns = [];
      result.index = json.index;
      result.data = [];

      if (json.data.length) {
        if (value != null || status != null) {
          json.data.forEach(function (line) {
            var data = [];
            for (let i = 0; i < json.columns.length; i++) {
              if (value) {
                if (json.columns[i][1] == value) {
                  if (status != null) {
                    if (status == line[i]) {
                      data.push(line[i]);
                    } else {
                      data.push(null)
                    }
                  } else {
                    data.push(line[i]);
                  }
                }
              } else {
                if (status != null) {
                  if (status == line[i]) {
                    data.push(line[i]);
                  } else {
                    data.push(null)
                  }
                } else {
                  data.push(line[i]);
                }
              }

            }
            result.data.push(data);
          });

          if (value) {
            json.columns.forEach(function (column) {
              if (column[1] == value)
                result.columns.push([column[0], column[1]]);
            });
          } else {
            result.columns = json.columns;
          }
        } else {
          result.columns = json.columns;
          result.data = json.data;
        }
      }
      return result;
    }
  }
}());
