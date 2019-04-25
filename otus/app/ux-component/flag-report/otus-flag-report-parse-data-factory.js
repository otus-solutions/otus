(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusFlagReportParseDataFactory', Factory);

  function Factory() {
    var self = this;

    self.create = create;

    function create(json, acronym = null, status = null) {

      var obj = {};
      obj.columns = [];
      obj.index = json.index;
      obj.data = [];

      if (json.data.length) {
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
            obj.data.push(data);
          });

          if (acronym) {
            json.columns.forEach(function (column) {
              if (column[1] == acronym)
                obj.columns.push([column[0], column[1]]);
            });
          } else {
            obj.columns = json.columns;
          }
        } else {
          obj.columns = json.columns;
          obj.data = json.data;
        }
      }

      return obj;
    }

    return self;
  }
}());
