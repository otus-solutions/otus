(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusPendencyListPaginator', {
      controller: 'pendencyListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-paginator/pendency-list-paginator.html',
      bindings: {
        stuntmanSearchSettings: '=',
        pendencies: '=',
        paginatorActive: '<',
      }
    }).controller('pendencyListPaginatorCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService'];

  function Controller(PendencyViewerService) {
    const self = this;

    self.getNextPage = getNextPage;
    self.getPreviousPage = getPreviousPage;
    self.runCustomPagination = runCustomPagination;

    self.activeNextPage = true;
    self.activePreviousPage = false;
    self.activePage = true;


    function getNextPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.currentQuantity += stuntmanSearchSettings.quantityToGet;
      PendencyViewerService.callValidationPendenciesLimits(self, stuntmanSearchSettings, "next");
    }

    function getPreviousPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.quantityToGet > stuntmanSearchSettings.currentQuantity ?
        stuntmanSearchSettings.currentQuantity = 0 :
        stuntmanSearchSettings.currentQuantity -= stuntmanSearchSettings.quantityToGet;
      PendencyViewerService.callValidationPendenciesLimits(self, stuntmanSearchSettings, "previous");
    }

    function runCustomPagination(stuntmanSearchSettings) {
      PendencyViewerService.callValidationPendenciesLimits(self, stuntmanSearchSettings, "refreshListByCurrentQuantity");
    }
  }
}());