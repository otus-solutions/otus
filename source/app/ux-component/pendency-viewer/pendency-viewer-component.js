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

    self.pendencies = [];
    self.getAllPendencies = getAllPendencies;

    const searchSettingsTest = {
      "currentQuantity": 4,
      "quantityToGet": 10,
      "filter": {
        "receiver":  ["fdrtec@gmail.com"]
      }
    }

    function getAllPendencies(searchSettings) {
      PendencyViewerService.getAllPendencies(searchSettingsTest)
        .then( data => self.pendencies = data);
    }
  }

}());