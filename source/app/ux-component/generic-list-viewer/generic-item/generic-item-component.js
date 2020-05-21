(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericItem', {
      controller:'genericItemCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-item/generic-item-template.html',
      bindings: {
        item: '<',
        itemAttributes: '<'
      }
    }).controller('genericItemCtrl', Controller);

  Controller.$inject = ['otusjs.genericListViewer.GenericListViewerService'];

  function Controller(GenericListViewerService) {
    const self = this;

    self.dueDate = GenericListViewerService.formatDate(new Date(self.item.dueDate));
    self.creationDate = GenericListViewerService.formatDate(new Date(self.item.creationDate));
    self.remainingDays = GenericListViewerService.calculateRemainingDays(self.item.dueDate);
  }

}());