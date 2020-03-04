(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusPendencyListPaginator', {
      controller:'pendencyListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-paginator/pendency-list-paginator.html',
      bindings: {
        stuntmanSearchSettings: '=',
        pendencies: '='
      }
    }).controller('pendencyListPaginatorCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService'];

  function Controller(PendencyViewerService) {
    const self = this;

    self.getNextPage = getNextPage;

    self.paginatorActive = true;

    function getNextPage(stuntmanSearchSettings) {
      PendencyViewerService.getAllPendencies(stuntmanSearchSettings)
        .then( data => self.pendencies = data);
      stuntmanSearchSettings.currentQuantity += 5;
    }
  }
}());