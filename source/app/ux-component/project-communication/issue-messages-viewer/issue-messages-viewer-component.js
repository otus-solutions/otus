(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueMessagesViewerComponent', {
      controller: 'issueMessagesViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-messages-viewer/issue-messages-viewer-template.html'
    }).controller('issueMessagesViewerCtrl', Controller);

  Controller.$inject = [
    'otusjs.issueViewer.IssueViewerService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller(IssueViewerService, DialogService) {
    const self = this;

    console.log('ddddddddddddd')

    // self.paginatorActive = false;
    // self.viewerTitle = IssueViewerService.LABELS.PAGE_TITLE;
    // self.viewerService = IssueViewerService;
    // self.itemComponentName = 'otusIssueItem';
    // self.filtersComponentName = 'otusIssuesListFilters';

  }

}());