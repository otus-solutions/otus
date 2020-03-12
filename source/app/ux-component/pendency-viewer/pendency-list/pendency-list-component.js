(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyList', {
      controller: 'pendencyListCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list/pendency-list-template.html',
      bindings: {
        pendencies: '<',
        pendencyAttributes: '<'
      }
    }).controller('pendencyListCtrl', Controller);

  Controller.$inject = ['PENDENCY_VIEWER_TITLES'];

  function Controller(PENDENCY_VIEWER_TITLES) {
    const self = this;
    self.PENDENCY_VIEWER_TITLES = PENDENCY_VIEWER_TITLES;
  }

}());

