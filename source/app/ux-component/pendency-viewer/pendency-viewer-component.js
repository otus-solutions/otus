(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyViewComponent', {
      controller:'pendencyViewCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-viewer-template.html',
      bindings: {}
    }).controller('pendencyViewCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService'];

  function Controller(PendencyViewerService) {
    const self = this;

    self.getAllPendencies = getAllPendencies;
    self.$onInit = onInit;

    self.searchSettings = {
      "currentQuantity": 0,
      "quantityToGet": 5,
      "order": {

        "fields":["dueDate"],
        "mode": 1
      },
      "filter":{
        "status": "NOT_FINALIZED"
      }
    };


    self.pendencyAttributes = [
      {title: 'rn', translatedTitle: 'Número de Recrutamento', icon: 'account_circle'},
      {title: 'requester', translatedTitle: 'Solicitante', icon: 'record_voice_over'},
      {title: 'receiver', translatedTitle: 'Responsável', icon: 'assignment_ind'},
      {title: 'acronym', translatedTitle: 'Sigla do Formulário', icon: 'assignment'},
      {title: 'externalID', translatedTitle: 'ID Externo', icon: 'fingerprint'},
      {title: 'dueDate', translatedTitle: 'Data de Vencimento', icon: 'hourglass_empty'}
    ];

    self.pendencies = [];

    function onInit(){
      getAllPendencies(self.searchSettings);
    }

    function getAllPendencies(searchSettings) {
      if(self.stuntmanSearchSettings) self.stuntmanSearchSettings = null;
      self.stuntmanSearchSettings = angular.copy(searchSettings);
      PendencyViewerService.getAllPendencies(searchSettings)
        .then( data => self.pendencies = data);
    }
  }

}());