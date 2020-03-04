(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusPendencyListPaginator', {
      controller:'pendencyListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-paginator/pendency-list-paginator.html',
      bindings: {
        searchSettings: '='
      }
    }).controller('pendencyListPaginatorCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    self.paginatorActive = true;

  }
}());