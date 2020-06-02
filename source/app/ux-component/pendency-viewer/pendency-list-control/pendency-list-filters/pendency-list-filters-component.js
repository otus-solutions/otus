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
    'otusjs.pendencyViewer.PendencyViewerService'
  ];

  function Controller(dragulaService, PendencyViewerService) {
    const self = this;
    const PENDENCY_ORDER_FIELD = {
      DUEDATE: 'dueDate',
      RECRUITMENT_NUMBER: 'rn',
      ACRONYM: 'acronym',
      EXTERNAL_ID: 'externalID',
      REQUESTER: 'requester',
      RECEIVER: 'receiver'
    };

    self.LABELS = PendencyViewerService.LABELS;

    self.$onInit = onInit;
    self.getDefaultOrderFields = getDefaultOrderFields;
    self.chanceInputViewState = chanceInputViewState;
    self.clear = clear;
    self.clearAll = clearAll;
    self.allStatus = allStatus;
    self.changePaginationViewState = changePaginationViewState;

    self.viewerServiceGetChecker = PendencyViewerService.getChecker;

    function onInit(){
      clearAll();
    }

    function getDefaultOrderFields(){
      return Object.values(PENDENCY_ORDER_FIELD);
    }

    function clear(item) {
      delete self.searchSettings.filter[item.title];
      self.inputViewState[item.title] = false;
    }

    function clearAll() {
      self.inputViewState = PendencyViewerService.getInputViewState();
      self.searchSettings = PendencyViewerService.getSearchSettings();
    }

    function chanceInputViewState(item) {
      self.inputViewState[item.title] = true;
    }

    function allStatus() {
      delete self.searchSettings.filter.status;
    }

    function changePaginationViewState() {
      self.paginatorActive = false;
    }
  }
}());
