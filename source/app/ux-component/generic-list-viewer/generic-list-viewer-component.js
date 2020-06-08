(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusGenericListViewer', {
      controller: 'genericListViewerCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-viewer-template.html',
      bindings: {
        viewerService: "=",
        viewerTitle: '<',
        itemComponentName: '<',
        filtersComponentName: '<',
        showHelper: '='
      }
    }).controller('genericListViewerCtrl', Controller);

  Controller.$inject = [
    'GENERIC_LIST_VIEWER_LABELS',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS, LoadingScreenService) {
    const self = this;
    self.items = [];
    self.paginatorActive = false;
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;
    self.callValidationItemsLimits = self.viewerService.callValidationItemsLimits;

    self.$onInit = onInit;
    self.getAllItems = getAllItems;

    function onInit() {
      console.log('GenericListViewer.onInit')

      self.searchSettings = self.viewerService.getSearchSettings();
      self.itemAttributes = self.viewerService.getItemAttributes();

      if(self.viewerService.needPreparations){
        LoadingScreenService.start();
        self.viewerService.prepareData()
          .then(() => {
            getAllItems(self.searchSettings);
            LoadingScreenService.finish();
          })
          .catch((error) => {
            console.log(error);
            LoadingScreenService.finish();
          });
      }
      else{
        getAllItems(self.searchSettings);
      }
    }

    function getAllItems(searchSettings) {
      console.log('GenericListViewer.getAllItems: searchSetting\n', JSON.stringify(searchSettings, null, 2))

      self.viewerService.getAllItems(searchSettings)
        .then(data => {
          self.items = data;
          self.paginatorActive = (self.items.length > 0);
          if(self.paginatorActive){
            _prepareParametersForPagination(searchSettings);
          }
          self.viewerService.items = self.items;
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