(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssueViewerComponent', {
      controller: 'issueViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-viewer/issue-viewer-template.html',
      bindings: {}
    }).controller('issueViewerCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    'otusjs.issueViewer.IssueViewerService'
  ];

  function Controller($mdDialog, IssueViewerService) {
    const self = this;

    self.paginatorActive = false;
    self.viewerTitle = IssueViewerService.LABELS.PAGE_TITLE;
    self.viewerService = IssueViewerService;
    self.itemComponentName = 'otusIssueItem';
    self.filtersComponentName = 'otusIssuesListFilters';

    self.$onInit = onInit;

    function onInit(){
      self.helpData = Object.values(IssueViewerService.LABELS.ISSUE_ATTRIBUTES)
        .filter(obj => obj.TITLE !== IssueViewerService.LABELS.ISSUE_ATTRIBUTES.STATUS.TITLE);
    }
  }

}());