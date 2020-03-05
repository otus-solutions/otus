(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusPendencyListPaginator', {
      controller: 'pendencyListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-paginator/pendency-list-paginator.html',
      bindings: {
        stuntmanSearchSettings: '=',
        pendencies: '=',
        paginatorActive: '<'
      }
    }).controller('pendencyListPaginatorCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService', '$mdToast'];

  function Controller(PendencyViewerService, $mdToast) {
    const self = this;

    self.getNextPage = getNextPage;
    self.getPreviousPage = getPreviousPage;
    self.refreshListByCurrentQuantity = refreshListByCurrentQuantity;

    self.activeNextPage = true;
    self.activePreviousPage = false;

    function getNextPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.currentQuantity += stuntmanSearchSettings.quantityToGet
      PendencyViewerService.getAllPendencies(stuntmanSearchSettings)
        .then(pendencies => PendencyViewerService.checkPaginatorLimit(pendencies, stuntmanSearchSettings))
        .then(checkedData => {
          self.pendencies = checkedData.pendencies;
          self.activePreviousPage = checkedData.activePreviousPage;
          self.activeNextPage = checkedData.activeNextPage;
        })
        .catch(e => {
          self.activeNextPage = e.activePage;
          _showToast(e.msg)
        });
    }

    function getPreviousPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.currentQuantity -= stuntmanSearchSettings.quantityToGet;
      PendencyViewerService.getAllPendencies(stuntmanSearchSettings)
        .then(pendencies => PendencyViewerService.checkPaginatorLimit(pendencies, stuntmanSearchSettings))
        .then(checkedData => {
          self.pendencies = checkedData.pendencies;
          self.activePreviousPage = checkedData.activePreviousPage;
          self.activeNextPage = checkedData.activeNextPage;
        }).catch(e => {
          self.activePreviousPage = e.activePage;
          _showToast(e.msg);
      });
    }

    function _showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .position("left bottom")
          .hideDelay(4000)
      );
    }

    function refreshListByCurrentQuantity() {
      PendencyViewerService.getAllPendencies(self.stuntmanSearchSettings)
        .then(pendencies => PendencyViewerService.checkPaginatorLimit(pendencies, self.stuntmanSearchSettings))
        .then(checkedData => {
          self.pendencies = checkedData.pendencies;
          // self.activeNextPage = true;
          // self.activePreviousPage = true;
        }).catch(e => {
        self.activeNextPage = true;
        self.activePreviousPage = true;
        _showToast(e.msg);
      });

    }
  }
}());