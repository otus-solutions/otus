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
        helpData: '<',
        searchSettingsParser: '='
      }
    }).controller('genericListViewerCtrl', Controller);

  Controller.$inject = [
    'GENERIC_LIST_VIEWER_LABELS',
    'otusjs.genericListViewer.GenericListViewerService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS, GenericListViewerService, LoadingScreenService) {
    const self = this;
    const HELP_BUTTON = {
      'true': {
        icon: 'help',
        tooltip: 'Ocultar Ajuda'
      },
      'false': {
        icon: 'help_outline',
        tooltip: 'Mostrar Ajuda'
      }
    };

    self.items = [];
    self.paginatorActive = false;
    self.GENERIC_LIST_VIEWER_LABELS = GENERIC_LIST_VIEWER_LABELS;
    self.callValidationItemsLimits = self.viewerService.callValidationItemsLimits;

    self.$onInit = onInit;
    self.getAllItems = getAllItems;
    self.showHelp = showHelp;

    function onInit() {
      self.searchSettings = self.viewerService.getSearchSettings();
      self.itemAttributes = self.viewerService.getItemAttributes();
      self.showingHelp = false;
      self.helpButton = HELP_BUTTON[self.showingHelp.toString()];

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
      searchSettings = GenericListViewerService.checkStorageAndUpdateCurrSearchSettings(searchSettings);
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

    function showHelp(){
      self.showingHelp = !self.showingHelp;
      self.helpButton = HELP_BUTTON[self.showingHelp.toString()];
    }
  }

}());