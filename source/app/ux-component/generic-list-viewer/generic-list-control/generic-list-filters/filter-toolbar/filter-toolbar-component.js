(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusListFilterToolbar', {
      controller: 'listFilterToolbar as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/filter-toolbar/filter-toolbar-template.html',
      bindings: {
        clearAll: '='
      }
    }).controller('listFilterToolbar', Controller);

  Controller.$inject = ['GENERIC_LIST_VIEWER_LABELS'];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.LABELS = GENERIC_LIST_VIEWER_LABELS.CONTROL_PANEL;
  }

}());
