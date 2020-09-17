(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('monitoringFilterViewCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$filter',
    'mdcDefaultParams',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdToast, $filter, mdcDefaultParams, LoadingScreenService) {
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
    self.onChangeAcronym = onChangeAcronym;

    function onInit() {
      self.centers = $filter('orderBy')(self.centers);
      self.centers.forEach(function(fieldCenter) {
        self.selectedFieldCenters[fieldCenter.acronym] = true;
      });
      self.onFilter();
    }

    function onFilter() {
      $(".dtp-btn-today").hide();
      var startNumbers = [];
      var endNumbers = [];
      var _startDateInfo = null;
      var _endDateInfo = null;

      if (self.startDateInfo) {
        let month = String(self.startDateInfo.getMonth() + 1);
        _startDateInfo = self.startDateInfo.getFullYear().toString().concat("-", month, "-1");
        startNumbers.push(self.startDateInfo.getMonth() + 1);
        startNumbers.push(self.startDateInfo.getFullYear());
      }

      if (self.endDateInfo) {
        let month = String(self.endDateInfo.getMonth() + 1);
        _endDateInfo = self.endDateInfo.getFullYear().toString().concat("-", month, "-1");
        endNumbers.push(self.endDateInfo.getMonth() + 1);
        endNumbers.push(self.endDateInfo.getFullYear());
      }

      self.selected = _getSelectedCenters();

      if (startNumbers && endNumbers) {
        if (_onValidateDates(startNumbers, endNumbers) && self.questionnaireInfo) {
          self.updateData(self.questionnaireInfo, self.selected, _startDateInfo, _endDateInfo);
        }
      } else if (self.questionnaireInfo) {
        self.updateData(self.questionnaireInfo, self.selected, _startDateInfo, _endDateInfo);
      }
    }

    function _onValidateDates(firstPeriod, finalPeriod) {
      if ((firstPeriod[1] - finalPeriod[1] == 0) && (firstPeriod[0] - finalPeriod[0] > 0)) {
        showInvalidDateMessage();
        return false;
      }
      if (firstPeriod[1] - finalPeriod[1] > 0) {
        showInvalidDateMessage();
        return false;
      }
      return true;
    }

    function onChangeAcronym() {
      LoadingScreenService.start();
      self.selected = _getSelectedCenters();
      self.startDateInfo = null;
      self.endDateInfo = null;
      self.updateData(self.questionnaireInfo, self.selected, null, null).then(function(response) {
        self.startDateInfo = new Date(response.startDate);
        self.endDateInfo = new Date(response.endDate);
        LoadingScreenService.finish();
      });
    }

    function _getSelectedCenters() {
      var _selected = [];
      for (var center in self.selectedFieldCenters) {
        if (self.selectedFieldCenters[center])
          _selected.push(center);
      }
      return _selected;
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
