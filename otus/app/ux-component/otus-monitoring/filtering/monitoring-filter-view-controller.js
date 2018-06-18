(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('monitoringFilterViewCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$filter'
  ];

  function Controller($mdToast, $filter) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.fieldCenter = "";
    self.selectedFieldCenters = [];
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";
    self.selectedFieldCenters = {};
    self.selected = [];


    /* Public methods */
    self.onFilter = onFilter;

    function onInit() {
      self.centers = $filter('orderBy')(self.centers);
      self.centers.forEach(function(fieldCenter) {
        self.selectedFieldCenters[fieldCenter.acronym] = true;
      });

      self.onFilter();
    }

    function onFilter() {
      self.selected = [];
      for (var center in self.selectedFieldCenters) {
        if (self.selectedFieldCenters[center])
          self.selected.push(center);
      }
      // checa se a data de inicio e fim fazem sentido
      if (self.startDateInfo && self.endDateInfo) {
        var startNumbers = self.startDateInfo.split('/').map(function(item) {
          return parseInt(item, 10);
        });

        var endNumbers = self.endDateInfo.split('/').map(function(item) {
          return parseInt(item, 10);
        });

        if ((startNumbers[1] - endNumbers[1] == 0) && (startNumbers[0] - endNumbers[0] > 0)) {
          showInvalidDateMessage();
        } else if (startNumbers[1] - endNumbers[1] > 0) {
          showInvalidDateMessage();
        } else {
          if (self.questionnaireInfo && self.selected.length) {
            var questionnaireData = self.parseData(self.selected, self.questionnaireInfo, self.startDateInfo, self.endDateInfo);
            self.updateData(self.questionnaireInfo, questionnaireData);
            // self.updateData(self.selected);
          }
        }
      }
    }

    function showInvalidDateMessage() {
      var msgDataInvalida = "Datas inválidas! A data inicial deve ser menor que a data final.";
      $mdToast.show(
        $mdToast.simple()
        .textContent(msgDataInvalida)
        .hideDelay(4000)
      );
    }

  }
}());
