(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueMessageItem', {
      controller:'issueMessageItemCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-messages-viewer/issue-messages-item/issue-messages-item-template.html',
      bindings: {
        item: '<',
        itemAttributes: '<'
      }
    }).controller('issueMessageItemCtrl', Controller);

  Controller.$inject = [
    'otusjs.issueMessagesViewer.IssueMessagesViewerService',
  ];


  function Controller(IssueMessagesViewerService) {
    const self = this;

    self.$onInit = onInit;

    function onInit() {
      self.rn = self.item.sender.rn;
      self.name = IssueMessagesViewerService.capitalizeName(self.item.sender.name);
      self.center = self.item.sender.center;
      self.creationDate = IssueMessagesViewerService.formatDate(new Date(self.item.creationDate));
    }

  }

}());