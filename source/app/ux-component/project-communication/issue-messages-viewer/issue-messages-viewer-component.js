(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueMessagesViewerComponent', {
      controller: 'issueMessagesViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-messages-viewer/issue-messages-viewer-template.html',
      bindings: {
        issueId: '<'
      }
    }).controller('issueMessagesViewerCtrl', Controller);

  Controller.$inject = [
    'ISSUE_MESSAGES_VIEWER_CONSTANTS',
    'otusjs.issueMessagesViewer.IssueMessagesViewerService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller(ISSUE_MESSAGES_VIEWER_CONSTANTS, IssueMessagesViewerService, LoadingScreenService, DialogService) {
    const self = this;

    self.viewerTitle = ISSUE_MESSAGES_VIEWER_CONSTANTS.PAGE_TITLE;
    self.itemComponentName = 'otusIssueMessageItem';
    self.headerComponentName = 'otusIssueInfoHeader';

    self.$onInit = onInit;

    function onInit(){
      self.items = [];
      self.itemAttributes = {};//todo

      LoadingScreenService.start();

      self.issue = IssueMessagesViewerService.getCurrIssueInfo();
      // console.log(self.issue);

      IssueMessagesViewerService.getAllItems()
        .then(response => {
          self.items = response;
          LoadingScreenService.finish();
        })
        .catch(error => {
          console.log(error);
          LoadingScreenService.finish();
        });
    }

  }

}());