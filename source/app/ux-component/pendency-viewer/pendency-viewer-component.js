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
    self.searchSettings = {};
    self.getAllPendencies = getAllPendencies;

    function getAllPendencies(searchSettings) {
      PendencyViewerService.getAllPendencies(searchSettings)
        .then( data => self.pendencies = data);
    }
  }

}());