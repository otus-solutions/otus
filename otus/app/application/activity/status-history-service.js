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
        color: '#EF5545',
        icon: 'fiber_new',
        value: -1
      },
      {
        name: 'OPTIONAL',
        label: 'Opcional',
        color: '#808080',
        icon: '',
        value: 0
      },
      {
        name: 'SAVED',
        label: 'Salvo',
        color: '#FCFF82',
        icon: 'save',
        value: 1
      },
      {
        name: 'FINALIZED',
        label: 'Finalizado',
        color: '#91EF45',
        icon: 'check_circle',
        value: 2
      }
    ];

    self.listStatus = listStatus;
    self.getStatusValue = getStatusValue;
    self.getStatusLabel = getStatusLabel;
    self.getLabels = getLabels;
    self.getColors = getColors;


    function listStatus() {
      return STATUS;
    }

    function getStatusValue(name) {
      if(name){
        let search = STATUS.find(function (status) {
          return status.name == name;
        });
        let {value} = search;
        return value;
      } else {
        return null;
      }
    }

    function getStatusLabel(value = null) {
      if(value!=null){
        let search = STATUS.find(function (status) {
          return status.value == value;
        });
        let {label} = search;
        return label;
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

  }


}())