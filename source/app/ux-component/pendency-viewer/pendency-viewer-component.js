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
      "quantityToGet": 100,
      "order": {
        "fields":["rn", "dueDate"],
        "mode": 1
      },
      "filter":{
        "status": "NOT_FINALIZED"
      }
    };

    self.pendencies = [];

    function onInit(){
      getAllPendencies(self.searchSettings);
    }

    function getAllPendencies(searchSettings) {
      PendencyViewerService.getAllPendencies(searchSettings)
        .then( data => self.pendencies = data);
    }
  }

}());