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
    self.getPendencies = getPendencies;

    function getPendencies(selectedFilters) {
      console.log("list pendency");
      self.pendencies = PendencyViewerService.getPendencies(selectedFilters);
    }
  }

}());