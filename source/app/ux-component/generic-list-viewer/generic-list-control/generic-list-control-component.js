(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericListControl', {
      controller: 'genericListControlCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-control-template.html',
      bindings: {
        getItems: '&',
        searchSettings: '=',
        itemAttributes: '<',
        paginatorActive: '='

      }
    }).controller('genericListControlCtrl', Controller);

  Controller.$inject = [
    'GENERIC_LIST_VIEWER_LABELS'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;

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