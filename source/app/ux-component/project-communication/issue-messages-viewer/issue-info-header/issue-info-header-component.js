(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueInfoHeader', {
      controller: 'issueInfoHeaderCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-messages-viewer/issue-info-header/issue-info-header-template.html'
    }).controller('issueInfoHeaderCtrl', Controller);

  Controller.$inject = [
    'otusjs.issueMessagesViewer.IssueMessagesViewerService'
  ];

  function Controller(IssueMessagesViewerService) {
    const self = this;

    self.$onInit = onInit;

    function onInit(){
      self.issue = IssueMessagesViewerService.getCurrIssue();
      self.creationDate = IssueMessagesViewerService.formatDate(new Date(self.issue.creationDate));
      self.status = IssueMessagesViewerService.formatStatus(self.issue.status);
    }

  }

}());