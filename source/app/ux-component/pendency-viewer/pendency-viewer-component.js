(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('pendencyViewComponent', {
      controller: 'pendencyViewCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency-viewer/pendency-viewer-template.html',
      bindings: {}
    }).controller('pendencyViewCtrl', Controller);

  Controller.$inject = ['otusjs.pendencyViewer.PendencyViewerService', 'PENDENCY_VIEWER_TITLES'];

  function Controller(PendencyViewerService, PENDENCY_VIEWER_TITLES) {
    const self = this;

    self.items = [];
    self.paginatorActive = false;
    self.PENDENCY_VIEWER_TITLES = PENDENCY_VIEWER_TITLES;
    self.callValidationItemsLimits = PendencyViewerService.callValidationItemsLimits;
    self.itemComponentName = 'otusPendencyItem';
    self.filtersComponentName = 'otusPendecyListFilters';

    self.$onInit = onInit;
    self.getAllItems = getAllItems;

    function onInit() {
      self.searchSettings = PendencyViewerService.getSearchSettings();
      self.itemAttributes = PendencyViewerService.getPendencyAttributes();
      getAllItems(self.searchSettings);
    }

    function getAllItems(searchSettings) {
      PendencyViewerService.getAllItems(searchSettings)
        .then(data => {
          self.items = data;
          self.paginatorActive = !!self.items.length;
          if(self.paginatorActive) {
            _prepareParametersForPagination(searchSettings);
          }
        });
    }

    function _prepareParametersForPagination(searchSettings) {
      if (self.stuntmanSearchSettings) {
        self.stuntmanSearchSettings = null;
      }
      self.stuntmanSearchSettings = angular.copy(searchSettings);
    }
  }

}());