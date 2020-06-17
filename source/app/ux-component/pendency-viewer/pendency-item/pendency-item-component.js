(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendencyItem', {
      controller:'pendencyItemCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-item/pendency-item-template.html',
      bindings: {
        item: '<',
        itemAttributes: '<'
      }
    }).controller('pendencyItemCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService'];

  function Controller(PendencyViewerService) {
    const self = this;

    self.$onInit = onInit;

    function onInit() {
      self.dueDate = PendencyViewerService.formatDate(new Date(self.item.dueDate));
      self.creationDate = PendencyViewerService.formatDate(new Date(self.item.creationDate));
      self.remainingDays = PendencyViewerService.calculateRemainingDays(self.item.dueDate);
    }
  }

}());