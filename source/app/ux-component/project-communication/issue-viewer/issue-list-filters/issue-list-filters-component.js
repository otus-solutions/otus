(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusIssuesListFilters', {
      controller: 'issueListFiltersCtrl as $ctrl',
      templateUrl: 'app/ux-component/project-communication/issue-viewer/issue-list-filters/issue-list-filters-template.html',
      bindings: {
        searchSettings: '=',
        itemAttributes: '<',
        paginatorActive: '='
      }
    }).controller('issueListFiltersCtrl', Controller);

  Controller.$inject = [
    'dragulaService',
    'otusjs.issueViewer.IssueViewerService'
  ];

  function Controller(dragulaService, IssueViewerService) {
    const self = this;
    const ISSUE_ORDER_FIELD = {
      CREATION_DATE: 'creationDate',
      RECRUITMENT_NUMBER: 'rn',
      CENTER: 'center'
    };

    self.LABELS = IssueViewerService.LABELS;

    self.chanceInputViewState = chanceInputViewState;
    self.clear = clear;
    self.clearAll = clearAll;
    self.allStatus = allStatus;
    self.chanceStateCriteria = chanceStateCriteria;
    self.resetCriteriaOrderCustomization = resetCriteriaOrderCustomization;
    self.changePaginationViewState = changePaginationViewState;

    clearAll(self.searchSettings);

    function clear(item) {
      delete self.searchSettings.filter[item.title];
      self.inputViewState[item.title] = false;
    }

    function clearAll(searchSettings) {
      if (searchSettings) searchSettings = null;
      self.inputViewState = IssueViewerService.getInputViewState();
      self.searchSettings = IssueViewerService.getSearchSettings();
    }

    function chanceInputViewState(item) {
      self.inputViewState[item.title] = true;
    }

    function allStatus() {
      delete self.searchSettings.filter.status;
    }

    function chanceStateCriteria() {
      if (self.inputViewState['sortingCriteria']) {
        self.inputViewState['sortingCriteria'] = !self.inputViewState['sortingCriteria'];
        self.searchSettings.order.fields = [ISSUE_ORDER_FIELD.CREATION_DATE];
      } else {
        self.inputViewState['sortingCriteria'] = true;
        _populateCriteriaOrder();
      }
    }

    function resetCriteriaOrderCustomization() {
      _populateCriteriaOrder();
    }

    function _populateCriteriaOrder() {
      self.searchSettings.order.fields = [
        ISSUE_ORDER_FIELD.CREATION_DATE,
        ISSUE_ORDER_FIELD.RECRUITMENT_NUMBER,
        ISSUE_ORDER_FIELD.CENTER
      ];
    }

    function changePaginationViewState() {
      self.paginatorActive = false;
    }
  }
}());
