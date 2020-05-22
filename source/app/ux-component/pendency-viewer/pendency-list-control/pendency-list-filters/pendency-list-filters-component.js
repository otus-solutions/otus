(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPendecyListFilters', {
      controller: 'pendencyListFiltersCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-list-control/pendency-list-filters/pendency-list-filters-template.html',
      bindings: {
        searchSettings: '=',
        itemAttributes: '<',
        paginatorActive: '='
      }
    }).controller('pendencyListFiltersCtrl', Controller);

  Controller.$inject = [
    'dragulaService',
    'otusjs.pendencyViewer.PendencyViewerService',
    'PENDENCY_VIEWER_TITLES'

  ];

  function Controller(dragulaService, PendencyViewerService, PENDENCY_VIEWER_TITLES) {
    const self = this;
    const PENDENCY_ORDER_FIELD = {
      DUEDATE: 'dueDate',
      RECRUITMENT_NUMBER: 'rn',
      ACRONYM: 'acronym',
      EXTERNAL_ID: 'externalID',
      REQUESTER: 'requester',
      RECEIVER: 'receiver'
    };
    self.PENDENCY_VIEWER_TITLES = PENDENCY_VIEWER_TITLES;

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
      self.inputViewState = PendencyViewerService.getInputViewState();
      self.searchSettings = PendencyViewerService.getSearchSettings();
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
        self.searchSettings.order.fields = ["dueDate"];
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
        PENDENCY_ORDER_FIELD.DUEDATE,
        PENDENCY_ORDER_FIELD.RECRUITMENT_NUMBER,
        PENDENCY_ORDER_FIELD.ACRONYM,
        PENDENCY_ORDER_FIELD.EXTERNAL_ID,
        PENDENCY_ORDER_FIELD.REQUESTER,
        PENDENCY_ORDER_FIELD.RECEIVER
      ];
    }

    function changePaginationViewState() {
      self.paginatorActive = false;
    }
  }
}());
