(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyViewComponent', {
      controller: 'pendencyViewCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-viewer-template.html',
      bindings: {}
    }).controller('pendencyViewCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService', 'PENDENCY_VIEWER_TITLES'];

  function Controller(PendencyViewerService, PENDENCY_VIEWER_TITLES) {
    const self = this;

    self.getAllPendencies = getAllPendencies;
    self.$onInit = onInit;

    self.pendencies = [];
    self.paginatorActive = false;
    self.PENDENCY_VIEWER_TITLES = PENDENCY_VIEWER_TITLES;

    function onInit() {
      self.searchSettings = PendencyViewerService.getSearchSettings();
      self.pendencyAttributes = PendencyViewerService.getPendencyAttributes();
      getAllPendencies(self.searchSettings);
    }

    function getAllPendencies(searchSettings) {
      _prepareParametersForPagination(searchSettings);
      PendencyViewerService.getAllPendencies(searchSettings)
        .then(data => {
          if (!data.length) self.paginatorActive = false;
          self.pendencies = data
        });
    }

    function _prepareParametersForPagination(searchSettings) {
      if (self.stuntmanSearchSettings) self.stuntmanSearchSettings = null;
      self.paginatorActive = true;
      self.stuntmanSearchSettings = angular.copy(searchSettings);
    }
  }

}());