(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('issueViewerComponent', {
      controller: 'issueViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-viewer/issue-viewer-template.html',
      bindings: {}
    }).controller('issueViewerCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    'otusjs.issueViewer.IssueViewerService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdDialog, IssueViewerService, DialogService) {
    const self = this;

    self.paginatorActive = false;
    self.viewerTitle = IssueViewerService.LABELS.PAGE_TITLE;
    self.viewerService = IssueViewerService;
    self.itemComponentName = 'otusIssueItem';
    self.filtersComponentName = 'otusIssuesListFilters';
    self.showHelper = showHelper;


    function showHelper(){
      const data = Object.values(IssueViewerService.LABELS.ISSUE_ATTRIBUTES)
        .filter(obj => obj.TITLE !== IssueViewerService.LABELS.ISSUE_ATTRIBUTES.STATUS.TITLE);

      DialogService.showCustomizedDialog(data,
        'app/ux-component/project-communication/issue-viewer/issue-viewer-helper-template.html')
    }
  }

}());