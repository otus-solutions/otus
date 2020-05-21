(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusGenericListPaginator', {
      controller: 'genericListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-paginator/generic-list-paginator.html',
      bindings: {
        callValidationItemsLimits: '=',
        stuntmanSearchSettings: '=',
        items: '=',
        paginatorActive: '<',
      }
    }).controller('genericListPaginatorCtrl', Controller);

  Controller.$inject = [
    'GENERIC_LIST_VIEWER_LABELS'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.LABELS = GENERIC_LIST_VIEWER_LABELS.PAGINATOR;
    self.activeNextPage = true;
    self.activePreviousPage = false;

    self.getNextPage = getNextPage;
    self.getPreviousPage = getPreviousPage;
    self.runCustomPagination = runCustomPagination;


    function getNextPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.currentQuantity += stuntmanSearchSettings.quantityToGet;
      self.callValidationItemsLimits(self, stuntmanSearchSettings, "next");
    }

    function getPreviousPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.quantityToGet > stuntmanSearchSettings.currentQuantity ?
        stuntmanSearchSettings.currentQuantity = 0 :
        stuntmanSearchSettings.currentQuantity -= stuntmanSearchSettings.quantityToGet;
      self.callValidationItemsLimits(self, stuntmanSearchSettings, "previous");
    }

    function runCustomPagination(stuntmanSearchSettings) {
      self.callValidationItemsLimits(self, stuntmanSearchSettings, "refreshListByCurrentQuantity");
    }
  }
}());