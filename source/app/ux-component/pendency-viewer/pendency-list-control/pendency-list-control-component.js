(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyListControl', {
      controller: 'pendencyListControlCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-control/pendency-list-control-template.html',
      bindings: {
        getPendencies: '&',
        searchSettings: '=',
        pendencyAttributes: '<',
        paginatorActive: '='

      }
    }).controller('pendencyListControlCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    self.openFilters = openFilters;
    self.closeFilters = closeFilters;

    self.filtersViewEnable = false;

    function openFilters() {
      self.filtersViewEnable = true;
    }

    function closeFilters() {
      if (self.filtersViewEnable) self.filtersViewEnable = !self.filtersViewEnable;
    }

  }
}());