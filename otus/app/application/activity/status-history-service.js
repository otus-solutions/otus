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
        color: '#595959',
        icon: 'fiber_new',
        value: -1
      },
      {
        name: 'SAVED',
        label: 'Salvo',
        color: '#ae8323',
        icon: 'save',
        value: 1
      },
      {
        name: 'FINALIZED',
        label: 'Finalizado',
        color: '#009688',
        icon: 'check_circle',
        value: 2
      }
    ];

    self.listStatus = listStatus;
    self.getStatusValue = getStatusValue;


    function listStatus() {
      return STATUS;
    }

    function getStatusValue(name) {
      let search = STATUS.find(function (status) {
        return status.name == name;
      });
      let {value} = search;
      return value;
    }

  }


}())