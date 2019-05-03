(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .factory('otusjs.monitoring.business.FlagReportFilterService', Service);


  Service.$inject = [];

  function Service() {
    var self = this;

    /* Public methods */
    self.filter = filter;

    function filter(json, acronym = null, status = null) {
      if (json.data.length) {
        let result = {};
        result.columns = [];
        result.index = json.index;
        result.data = [];

        if (acronym != null || status != null) {
          json.data.forEach(function (line) {
            var data = [];
            for (let i = 0; i < json.columns.length; i++) {
              if (acronym) {
                if (json.columns[i][1] == acronym) {
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
              } else if (status != null) {
                if (status == line[i]) {
                  data.push(line[i]);
                } else {
                  data.push(null)
                }
              } else {
                data.push(line[i]);
              }
            }
            result.data.push(data);
          });

          if (acronym) {
            json.columns.forEach(function (column) {
              if (column[1] == acronym)
                result.columns.push([column[0], column[1]]);
            });
          } else {
            result.columns = json.columns;
          }
        } else {
          _defaultValues();
        }
      }

      return result;
    }

    function _defaultValues() {
      obj.columns = json.columns;
      obj.data = json.data;
    }

  }
}());
