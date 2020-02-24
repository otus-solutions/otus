(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyListControl', {
      controller: 'pendencyListControlCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-control/pendency-list-control-template.html',
      bindings: {
        getPendencies: '&',
        searchSettings: '=',
      }
    }).controller('pendencyListControlCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;


    self.openFilters = openFilters;
    self.closeFilters = closeFilters;

    self.filtersViewEnable = false;

    // self.pendencyAttributes = [
    //   {title: 'rn', translatedTitle: 'Número de Recrutamento', icon: 'account_circle'},
    //   {title: 'acronym', translatedTitle: 'Sigla do Formulário', icon: 'description'},
    //   {title: 'externalID', translatedTitle: 'ID Externo', icon: 'fingerprint'},
    //   {title: 'requester', translatedTitle: 'Usuário Solicitante', icon: 'record_voice_over'},
    //   {title: 'receiver', translatedTitle: 'Revisor Responsável', icon: 'assignment_turned_in'},
    //   {title: 'dueDate', translatedTitle: 'Data de Vencimento', icon: 'hourglass_empty'}
    // ];




    self.searchSettings = {
      "currentQuantity": 4,
      "quantityToGet": 10,
      "filter": {}
    }

    function openFilters() {
      self.filtersViewEnable = true;
    }

    function closeFilters () {
      if(self.filtersViewEnable) self.filtersViewEnable = !self.filtersViewEnable;

    }

    // self.searchSettings = {
    //   currentQuantity: 100,
    //   quantityToGet: 50,
    //   order: {
    //     fields: ["creationDate", "rn"],
    //     mode: 1
    //   },
    //   filter: {
    //     dueDate: null,
    //     requester: null,
    //     receiver: ['fdrtec@gmail.com'],
    //     acronym: null,
    //     rn: null,
    //     status: null,
    //     externalID: null
    //   }
    // }

    // self.searchSettings = {
    //   "currentQuantity": 4,
    //   "quantityToGet": 10,
    //   "filter": {
    //     "dueDate": null,
    //     "requester": null,
    //     "receiver": null,
    //     "acronym": null,
    //     "rn": null,
    //     "status": null,
    //     "externalID": null
    //   }
    // }

    // self.searchSettings = {
    //   "currentQuantity": 4,
    //   "quantityToGet": 10,
    //   "filter": {
    //     "receiver":  ["fdrtec@gmail.com"]
    //   }
    // }


  }
}());