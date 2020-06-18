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
    self.clearAll = clearAll;
    self.clear = clear;
    self.allStatus = allStatus;
    self.getDefaultOrderFields = getDefaultOrderFields;
    self.changeInputViewState = changeInputViewState;
    self.changePaginationViewState = changePaginationViewState;

    function onInit(){
      self.clearAll();
      if(!PendencyViewerService.initialized){
        PendencyViewerService.initialize();
      }
      self.viewerServiceGetChecker = PendencyViewerService.getChecker;
    }

    function clearAll() {
      self.inputViewState = PendencyViewerService.getInputViewState();
      self.searchSettings = PendencyViewerService.getSearchSettings();
    }

    function clear(item) {
      delete self.searchSettings.filter[item.title];
      self.inputViewState[item.title] = false;
    }

    function allStatus() {
      delete self.searchSettings.filter.status;
    }

    function getDefaultOrderFields(){
      return Object.values(PENDENCY_ORDER_FIELD);
    }

    function changeInputViewState(item) {
      self.inputViewState[item.title] = true;
    }

    function changePaginationViewState() {
      self.paginatorActive = false;
    }
  }
}());
