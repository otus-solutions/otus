(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueInfoHeader', {
      controller: 'issueInfoHeaderCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-messages-viewer/issue-info-header/issue-info-header-template.html',
      bindings: {
        changeStatus: '=',
        statusOptions: '<'
      }
    }).controller('issueInfoHeaderCtrl', Controller);

  Controller.$inject = [
    'otusjs.issueMessagesViewer.IssueMessagesViewerService'
  ];

  function Controller(IssueMessagesViewerService) {
    const self = this;

    self.$onInit = onInit;
    self.changeStatusTo = changeStatusTo;
    self.refresh = refresh;

    function onInit(){
      self.issue = IssueMessagesViewerService.getCurrIssue();
      self.creationDate = IssueMessagesViewerService.formatDate(new Date(self.issue.creationDate));
      self.status = IssueMessagesViewerService.formatStatus(self.issue.status);

      console.log('issueInfoHeaderCtrl.onInit')
      console.log(JSON.stringify(self.status, null, 4))
      console.log(JSON.stringify(self.statusOptions, null, 4))
    }

    function refresh(){
      self.onInit();
    }

    function changeStatusTo(statusValue){
      self.changeStatus(statusValue)
        .then(() => onInit())
        .catch(e => {
          console.log(e);
        });
    }

  }

}());