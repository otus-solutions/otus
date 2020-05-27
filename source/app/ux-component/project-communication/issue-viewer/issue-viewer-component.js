(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('issueViewerComponent', {
      controller: 'issueViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-viewer/issue-viewer-template.html',
      bindings: {}
    }).controller('issueViewerCtrl', Controller);

  Controller.$inject = ['otusjs.issueViewer.IssueViewerService'];

  function Controller(IssueViewerService) {
    const self = this;
    self.items = [];
    self.paginatorActive = false;
    self.viewerTitle = IssueViewerService.LABELS.PAGE_TITLE;
    self.viewerService = IssueViewerService;
    self.itemComponentName = 'otusIssueItem';
    self.filtersComponentName = 'otusIssueListFilters';
  }

}());