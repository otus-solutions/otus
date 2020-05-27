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

  Controller.$inject = ['otusjs.IssueViewerService'];

  function Controller(IssueViewerService) {
    const self = this;
    self.rn = IssueViewerService.findRecruitmentNumberFromEmail(self.item.sender);
    self.creationDate = IssueViewerService.formatDate(new Date(self.item.creationDate));
  }

}());