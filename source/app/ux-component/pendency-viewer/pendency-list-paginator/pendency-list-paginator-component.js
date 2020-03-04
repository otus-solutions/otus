(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusPendencyListPaginator', {
      controller:'pendencyListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-paginator/pendency-list-paginator.html',
      bindings: {
        stuntmanSearchSettings: '=',
        pendencies: '=',
        paginatorActive: '<'
      }
    }).controller('pendencyListPaginatorCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService'];

  function Controller(PendencyViewerService) {
    const self = this;

    self.getNextPage = getNextPage;
    self.getPreviousPage = getPreviousPage;

    function getNextPage(stuntmanSearchSettings) {
      PendencyViewerService.getAllPendencies(stuntmanSearchSettings)
        .then( data => self.pendencies = data)
        .then(self.pendencies.length ? stuntmanSearchSettings.currentQuantity += stuntmanSearchSettings.quantityToGet :
          stuntmanSearchSettings.currentQuantity += 0);
    }

    function getPreviousPage(stuntmanSearchSettings) {
      PendencyViewerService.getAllPendencies(stuntmanSearchSettings)
        .then( data => self.pendencies = data)
        .then(self.pendencies.length ? _validatesLowerLimit(stuntmanSearchSettings):
          stuntmanSearchSettings.currentQuantity -= stuntmanSearchSettings.quantityToGet);
    }

    function _validatesLowerLimit(stuntmanSearchSettings){
      if(stuntmanSearchSettings.currentQuantity > 0){
        stuntmanSearchSettings.currentQuantity -= stuntmanSearchSettings.quantityToGet;
      }
      else(stuntmanSearchSettings.currentQuantity += 0)
    }

  }
}());