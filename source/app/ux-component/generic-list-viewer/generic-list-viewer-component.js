(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericListViewComponent', {
      controller: 'genericListViewCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-viewer-template.html',
      bindings: {
        viewerService: "="
      }
    }).controller('genericListViewCtrl', Controller);

  Controller.$inject = [
    // 'otusjs.genericListViewer.GenericListViewerService',
    'GENERIC_LIST_VIEWER_LABELS'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS) {
    const self = this;
    self.items = [];
    self.paginatorActive = false;
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;

    self.$onInit = onInit;
    self.getAllItems = getAllItems;

    let GenericListViewerService = self.viewerService;// TODO replace GenericListViewerService by self.viewerService

    function onInit() {
      self.searchSettings = GenericListViewerService.getSearchSettings();
      self.itemAttributes = GenericListViewerService.getGenericListAttributes();
      getAllItems(self.searchSettings);
    }

    function getAllItems(searchSettings) {
      GenericListViewerService.getAllItems(searchSettings)
        .then(data => {
          self.items = data;
          self.paginatorActive = (self.items.length > 0);
          if(self.paginatorActive){
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