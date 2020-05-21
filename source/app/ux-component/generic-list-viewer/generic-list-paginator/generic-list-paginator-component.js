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
    // 'otusjs.genericListViewer.self.viewerService',
    // 'GENERIC_LIST_VIEWER_LABELS'
  ];

  function Controller() {
    const self = this;

    self.LABELS = {
      PREVIOUS_PAGE_BUTTON:'Página Anterior',
      CUSTOM_PAGE_BUTTON:'Nova Consulta',
      NEXT_PAGE_BUTTON:'Próxima Página'
    };

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