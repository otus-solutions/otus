(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericList', {
      controller: 'genericListCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list/generic-list-template.html',
      bindings: {
        items: '<',
        itemAttributes: '<'
      }
    }).controller('genericListCtrl', Controller);

  Controller.$inject = ['GENERIC_LIST_VIEWER_LABELS'];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;
  }

}());

