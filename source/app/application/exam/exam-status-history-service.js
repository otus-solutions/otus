(function () {
  'use strict';

  angular
    .module('otusjs.application.exam')
    .service('otusjs.application.exam.ExamStatusHistoryService', Service);

  Service.$inject = [];

  function Service() {
    const DEFAULT_COLOR = '#ffffff';
    const STATUS = [
      {
        name: 'NOT_RECEIVED',
        label: 'Não Recebido',
        color: '#F4415C',
        icon: '',
        value: -1
      },
      {
        name: 'RECEIVED',
        label: 'Recebido',
        color: '#1ECE8B',
        icon: 'check_circle',
        value: 1
      },
      {
        name: 'UNREALIZED',
        label: 'Não será realizado',
        color: '#CECECE',
        icon: '',
        value: 0
      }
    ];

    var self = this;
    /* Public functions */
    self.getColors = getColors;
    self.getLabels = getLabels;
    self.listStatus = listStatus;
    self.getStatusValue = getStatusValue;
    self.getStatusLabel = getStatusLabel;
    self.getStatusColor = getStatusColor;
    self.getDefaultColor = getDefaultColor;

    function listStatus() {
      return STATUS;
    }

    function getStatusValue(name) {
      if(!name){
        return null;
      }

      let search = STATUS.find(function (status) {
        return status.name == name;
      });
      return search.value;
    }

    function getStatusLabel(value = null) {
      if(value == null){
        return "";
      }

      let search = STATUS.find(function (status) {
        return status.value == value;
      });
      return search.label;
    }

    function getStatusColor(value = null) {
      if(value == null){
        return "";
      }

      let search = STATUS.find(function (status) {
        return status.value == value;
      });
      return search.color;
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

}());