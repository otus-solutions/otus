(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueInfoHeader', {
      controller: 'issueInfoHeaderCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-messages-viewer/issue-info-header/issue-info-header-template.html'
    }).controller('issueInfoHeaderCtrl', Controller);

  Controller.$inject = [
    'otusjs.issueMessagesViewer.IssueMessagesViewerService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller(IssueMessagesViewerService, ApplicationStateService) {
    const self = this;

    self.$onInit = onInit;
    self.goBack = goBack;
    self.refresh = refresh;


    function onInit(){
      self.issue = IssueMessagesViewerService.getCurrIssue();
      self.creationDate = IssueMessagesViewerService.formatDate(new Date(self.issue.creationDate));
      self.status = IssueMessagesViewerService.formatStatus(self.issue.status);
    }

    function goBack(){
      IssueMessagesViewerService.removeStoragedCurrentIssue();
      ApplicationStateService.activateIssueViewer();
    }

    function refresh(){
      self.onInit();
    }

  }

}());