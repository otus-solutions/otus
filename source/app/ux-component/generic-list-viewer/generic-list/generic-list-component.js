(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericList', {
      controller: 'genericListCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list/generic-list-template.html',
      bindings: {
        itemComponentName: '<',
        items: '<',
        itemAttributes: '<'
      }
    }).controller('genericListCtrl', Controller);

  Controller.$inject = [
    'GENERIC_LIST_VIEWER_LABELS',
    'otusjs.utils.HtmlBuilderService'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS, HtmlBuilderService) {
    const self = this;
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;

    self.$onInit = onInit;

    function onInit(){
      const tag = HtmlBuilderService.generateTagName(self.itemComponentName);
      self.itemTemplate = '<'+ tag +' item="item" item-attributes="$ctrl.itemAttributes"/>';
    }

  }

}());

