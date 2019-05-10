(function () {
  'use strict';

  angular
    .module('otusjs.application.exam')
    .service('otusjs.application.exam.ExamStatusHistoryService', Service);

  Service.$inject = [];

  function Service() {
    const DEFAULT_COLOR = '#ffffff';
    var self = this;

    const STATUS = [
      {
        name: 'UNREALIZED',
        label: 'Não Recebido',
        color: '#F4415C',
        icon: '',
        value: 0
      },
      {
        name: 'RECEIVED',
        label: 'Recebido',
        color: '#1ECE8B',
        icon: 'check_circle',
        value: 1
      }
    ];

    self.listStatus = listStatus;
    self.getStatusValue = getStatusValue;
    self.getStatusLabel = getStatusLabel;
    self.getStatusColor = getStatusColor;
    self.getLabels = getLabels;
    self.getColors = getColors;
    self.getDefaultColor = getDefaultColor;

    function listStatus() {
      return STATUS;
    }

    function getStatusValue(name) {
      if (name) {
        let search = STATUS.find(function (status) {
          return status.name == name;
        });
        return search.value;
      } else {
        return null;
      }
    }

    function getStatusLabel(value = null) {
      if (value != null) {
        let search = STATUS.find(function (status) {
          return status.value == value;
        });
        return search.label;
      } else {
        return "";
      }
    }

    function getStatusColor(value = null) {
      if (value != null) {
        let search = STATUS.find(function (status) {
          return status.value == value;
        });
        return search.color;
      } else {
        return "";
      }
    }

    function getLabels() {
      var response = [];
      STATUS.forEach(function (status) {
        response.push(status.label);
      });
      return response;
    }

    function getColors() {
      var response = [];
      STATUS.forEach(function (status) {
        response.push(status.color);
      });
      return response;
    }

    function getDefaultColor() {
      return DEFAULT_COLOR;
    }

  }


}())