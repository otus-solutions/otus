(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusDateFilter', {
      controller: 'dateFilterCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/date-filter/date-filter-template.html',
      bindings: {
        filterItem: '<',
        searchSettings: '=',
        clear: '=',
        changePaginationViewState: '='
      }
    }).controller('dateFilterCtrl', Controller);

  Controller.$inject = ['GENERIC_LIST_VIEWER_LABELS'];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.CANCEL_BUTTON_ICON = GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL.CANCEL_BUTTON;
    self.STANDARD_DATE_FORMAT = GENERIC_LIST_VIEWER_LABELS.STANDARD_DATE_FORMAT;
  }

}());
