(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusPendencyListPaginator', {
      controller: 'pendencyListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-paginator/pendency-list-paginator.html',
      bindings: {
        callValidationItemsLimits: '=',
        stuntmanSearchSettings: '=',
        items: '=',
        paginatorActive: '<',
      }
    }).controller('pendencyListPaginatorCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService', 'PENDENCY_VIEWER_TITLES'];

  function Controller(PendencyViewerService, PENDENCY_VIEWER_TITLES) {
    const self = this;
    self.PENDENCY_VIEWER_TITLES = PENDENCY_VIEWER_TITLES;
    self.activeNextPage = true;
    self.activePreviousPage = false;

    self.getNextPage = getNextPage;
    self.getPreviousPage = getPreviousPage;
    self.runCustomPagination = runCustomPagination;


    function getNextPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.currentQuantity += stuntmanSearchSettings.quantityToGet;

      // PendencyViewerService.callValidationPendenciesLimits(self, stuntmanSearchSettings, "next");
      self.callValidationItemsLimits(self, stuntmanSearchSettings, "next");
    }

    function getPreviousPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.quantityToGet > stuntmanSearchSettings.currentQuantity ?
        stuntmanSearchSettings.currentQuantity = 0 :
        stuntmanSearchSettings.currentQuantity -= stuntmanSearchSettings.quantityToGet;

      // PendencyViewerService.callValidationPendenciesLimits(self, stuntmanSearchSettings, "previous");
      self.callValidationItemsLimits(self, stuntmanSearchSettings, "previous");
    }

    function runCustomPagination(stuntmanSearchSettings) {
      // PendencyViewerService.callValidationPendenciesLimits(self, stuntmanSearchSettings, "refreshListByCurrentQuantity");
      self.callValidationItemsLimits(self, stuntmanSearchSettings, "refreshListByCurrentQuantity");
    }
  }
}());