(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusNoFilterGenericListViewer', {
      controller: 'noFilterGenericListViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/no-filter-generic-list/no-filter-generic-list-viewer-template.html',
      bindings: {
        viewerTitle: '<',
        items: '<',
        itemComponentName: '<',
        itemAttributes: '<'
      }
    }).controller('noFilterGenericListViewerCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    const self = this;

    // self.$onInit = onInit;
    //
    // function onInit() {
    //
    // }

  }

}());