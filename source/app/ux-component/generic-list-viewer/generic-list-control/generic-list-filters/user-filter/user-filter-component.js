(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserFilter', {
      controller: 'userFilterCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/user-filter/user-filter-template.html',
      bindings: {
        filterItem: '<',
        searchSettings: '=',
        clear: '=',
        changePaginationViewState: '='
      }
    }).controller('userFilterCtrl', Controller);

  Controller.$inject = ['GENERIC_LIST_VIEWER_LABELS'];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.CANCEL_BUTTON_ICON = GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL.CANCEL_BUTTON;
  }

}());
