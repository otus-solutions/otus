(function() {
    'use strict';

    angular
      .module('otusjs.otus.uxComponent')
      .factory('otusFlagReportParseDataFactory', Factory);

    function Factory() {
      var self = this;

      self.create = create;

      function create(data) {

        var currentSummedValue = null;
        var dataToBeOrganized = [];

        for (var i = 0; i < data.length; i++) {
          currentSummedValue = 0;
          for (var j = 0; j < data[i].activities.length; j++) {
            currentSummedValue += data[i].activities[j].status;
          }
          dataToBeOrganized.push({ data: data[i], value: currentSummedValue });
        }

        dataToBeOrganized.sort(function (a, b) {
          return b.value - a.value;
        })


        var organizedData = [];
        for (var i = 0; i < dataToBeOrganized.length; i++) {
          organizedData.push(dataToBeOrganized[i].data);
        }
        return organizedData;

      }

      return self;
    }
  }());
