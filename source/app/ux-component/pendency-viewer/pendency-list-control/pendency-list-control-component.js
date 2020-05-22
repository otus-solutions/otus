(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyListControl', {
      controller: 'pendencyListControlCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-control/pendency-list-control-template.html',
      bindings: {
        getItems: '&',
        searchSettings: '=',
        itemAttributes: '<',
        paginatorActive: '='

      }
    }).controller('pendencyListControlCtrl', Controller);

  Controller.$inject = ['PENDENCY_VIEWER_TITLES'];

  function Controller(PENDENCY_VIEWER_TITLES) {
    const self = this;
    self.PENDENCY_VIEWER_TITLES = PENDENCY_VIEWER_TITLES;

    self.openFilters = openFilters;
    self.closeFilters = closeFilters;

    self.filtersViewEnable = false;

    function openFilters() {
      self.filtersViewEnable = true;
    }

    function closeFilters() {
      self.filtersViewEnable = false;
    }

  }
}());