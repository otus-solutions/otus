(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueItem', {
      controller:'issueItemCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-viewer/issue-item/issue-item-template.html',
      bindings: {
        item: '<',
        itemAttributes: '<'
      }
    }).controller('issueItemCtrl', Controller);

  Controller.$inject = [ 'otusjs.issueViewer.IssueViewerService' ];

  function Controller(IssueViewerService) {
    const self = this;
    self.$onInit = onInit;

    function onInit(){
      self.rn = self.item.rn;
      self.name = self.item.name;
      self.center = self.item.center;
      self.creationDate = IssueViewerService.formatDate(new Date(self.item.creationDate));
      self.status = IssueViewerService.translateStatus(self.item.status);
      self.statusClass = `issue-status status-${self.item.status.toLowerCase()}`;
    }
  }

}());