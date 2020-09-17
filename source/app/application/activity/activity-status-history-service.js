(function() {
  'use strict';

  angular
    .module('otusjs.application.activity')
    .service('otusjs.application.activity.StatusHistoryService', Service);

  Service.$inject = [];

  function Service() {
    var self = this;

    const STATUS = [
      {
        name: 'CREATED',
        label: 'Criado',
        color: '#F4415C',
        icon: 'fiber_new',
        value: -1
      },
      {
        name: 'SAVED',
        label: 'Salvo',
        color: '#F4CA41',
        icon: 'save',
        value: 1
      },
      {
        name: 'FINALIZED',
        label: 'Finalizado',
        color: '#1ECE8B',
        icon: 'check_circle',
        value: 2
      },
      {
        name: 'UNREALIZED',
        label: 'Não será realizado',
        color: '#CECECE',
        icon: '',
        value: 0
      }
    ];

    self.listStatus = listStatus;
    self.getStatusValue = getStatusValue;
    self.getStatusLabel = getStatusLabel;
    self.getStatusColor = getStatusColor;
    self.getLabels = getLabels;
    self.getColors = getColors;

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
      let {value} = search;
      return value;
    }

    function getStatusLabel(value = null) {
      if(value == null){
        return "";
      }

      let search = STATUS.find(function (status) {
        return status.value == value;
      });
      let {label} = search;
      return label;
    }

    function getStatusColor(value = null) {
      if(value == null){
        return "";
      }

      let search = STATUS.find(function (status) {
        return status.value == value;
      });
      let {color} = search;
      return color;
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
  }
}());