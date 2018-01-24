(function() {
    'use strict';

    angular
      .module('otusjs.deploy')
      .service('otusjs.deploy.model.AliquotFacadeService', Service);

    Service.$inject = [
      '$q'
      // 'otusjs.model.activity.AliquotFacadeService'
    ];

    //TODO: REFATORAÇÃO TOTAL
    function Service($q) {
      var self = this;

      /* Public methods */
      self.getChartData = getChartData;
      self.setLotsList = setLotsList;

      function setLotsList(lotsList) {
        self.lotsList = lotsList;
      }

      function getChartData() {
        var deferred = $q.defer();

        self.lotDataSet = [];
        self.lotsList.forEach(function(lot) {
            lot.isSelected = false;
            var labelsCount = {};

            var dataSet = [];
            dataSet.backgroundColor = [];
            dataSet.data = [];
            dataSet.labels = [];
            dataSet.fieldCenter = lot.fieldCenter;
            dataSet.chartId = lot.code;

            lot.aliquotList.forEach(function(aliquot) {
              if (labelsCount[aliquot.label]) {
                labelsCount[aliquot.label] = labelsCount[aliquot.label] + 1;
              } else {
                labelsCount[aliquot.label] = 1;
                dataSet.labels.push(aliquot.label);
              }
              if (!self.colorSet[aliquot.label]) {
                self.colorSet[aliquot.label] = color[Object.keys(self.colorSet).length];
              }
            });

            for (var key in labelsCount) {
              dataSet.data.push(labelsCount[key]);
              dataSet.backgroundColor.push(self.colorSet[key]);
            }
            self.lotDataSet.push(dataSet);
            deferred.resolve(self.lotDataSet);
          });
          return deferred.promise;
        }


      }
    }());
