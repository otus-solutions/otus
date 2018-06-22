(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('monitoringFilterViewCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$filter',
    'mdcDefaultParams'
  ];

  function Controller($mdToast, $filter, mdcDefaultParams) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    self.fieldCenter = "";
    self.selectedFieldCenters = [];
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";
    self.selectedFieldCenters = {};
    self.selected = [];
    mdcDefaultParams({
      lang: 'pt-br',
      cancelText: 'cancelar',
      todayText: 'Mês Atual',
      okText: 'ok'
    });


    /* Public methods */
    self.onFilter = onFilter;

    function onInit() {
      self.centers = $filter('orderBy')(self.centers);
      self.centers.forEach(function(fieldCenter) {
        self.selectedFieldCenters[fieldCenter.acronym] = true;
      });
    }

    function onFilter() {
      var startNumbers = [];
      var endNumbers = [];
      var _startDateInfo = null;
      var _endDateInfo = null;

      if (self.startDateInfo) {
        let month = String(self.startDateInfo.getMonth() + 1);
        _startDateInfo = self.startDateInfo.getFullYear().toString().concat("-",month,"-1");
        startNumbers.push(self.startDateInfo.getMonth()+1);
        startNumbers.push(self.startDateInfo.getFullYear());
      }

      if (self.endDateInfo) {
        let month = String(self.endDateInfo.getMonth() + 1);
        _endDateInfo = self.endDateInfo.getFullYear().toString().concat("-",month,"-1");
        endNumbers.push(self.endDateInfo.getMonth()+1);
        endNumbers.push(self.endDateInfo.getFullYear());
      }

      self.selected = [];
      for (var center in self.selectedFieldCenters) {
        if (self.selectedFieldCenters[center])
          self.selected.push(center);
      }
      // checa se a data de inicio e fim fazem sentido
      if (self.startDateInfo && self.endDateInfo) {

        if ((startNumbers[1] - endNumbers[1] == 0) && (startNumbers[0] - endNumbers[0] > 0)) {
          showInvalidDateMessage();
        } else if (startNumbers[1] - endNumbers[1] > 0) {
          showInvalidDateMessage();
        }

      }

      if (self.questionnaireInfo && self.selected.length) {

        self.updateData(self.questionnaireInfo, self.selected, _startDateInfo, _endDateInfo);
      }

    }

    self.onChangeAcronym = function() {
      self.updateData(self.questionnaireInfo);
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
