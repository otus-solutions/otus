(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericListFilters', {
      controller: 'genericListFiltersCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-control/generic-list-filters/generic-list-filters-template.html',
      bindings: {
        searchSettings: '=',
        itemAttributes: '<',
        paginatorActive: '='

      }
    }).controller('genericListFiltersCtrl', Controller);

  Controller.$inject = [
    'dragulaService',
    'otusjs.genericListViewer.GenericListViewerService',
    'GENERIC_LIST_VIEWER_LABELS'

  ];

  function Controller(dragulaService, GenericListViewerService, GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    const PENDENCY_ORDER_FIELD = { // TODO depend
      DUEDATE: 'dueDate',
      RECRUITMENT_NUMBER: 'rn',
      ACRONYM: 'acronym',
      EXTERNAL_ID: 'externalID',
      REQUESTER: 'requester',
      RECEIVER: 'receiver'
    };
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;

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
      self.inputViewState = GenericListViewerService.getInputViewState();
      self.searchSettings = GenericListViewerService.getSearchSettings();
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
