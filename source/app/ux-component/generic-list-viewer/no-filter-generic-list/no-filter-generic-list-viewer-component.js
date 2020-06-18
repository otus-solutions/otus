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
        itemAttributes: '<',
        headerComponentName: '<'
      }
    }).controller('noFilterGenericListViewerCtrl', Controller);

  Controller.$inject = [
    'otusjs.utils.HtmlBuilderService'
  ];

  function Controller(HtmlBuilderService) {
    const self = this;

    self.$onInit = onInit;

    function onInit(){
      const tag = HtmlBuilderService.generateTagName(self.headerComponentName);
      self.headerTemplate = '<'+ tag +'/>';
    }

  }

}());