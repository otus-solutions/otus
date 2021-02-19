(function () {
  'use strict';

  angular.module('otusjs.otus.uxComponent')
    .component('otusGenericListPaginator', {
      controller: 'genericListPaginatorCtrl as $ctrl',
      templateUrl: 'app/ux-component/generic-list-viewer/generic-list-paginator/generic-list-paginator.html',
      bindings: {
        callValidationItemsLimits: '=',
        stuntmanSearchSettings: '=',
        items: '=',
        paginatorActive: '<',
        searchSettingsParser: '='
      }
    }).controller('genericListPaginatorCtrl', Controller);

  Controller.$inject = [
    'GENERIC_LIST_VIEWER_LABELS',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(GENERIC_LIST_VIEWER_LABELS, LoadingScreenService) {
    const self = this;
    self.LABELS = GENERIC_LIST_VIEWER_LABELS.PAGINATOR;
    self.activeNextPage = true;
    self.activePreviousPage = false;

    self.getNextPage = getNextPage;
    self.getPreviousPage = getPreviousPage;
    self.runCustomPagination = runCustomPagination;


    function getNextPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.currentQuantity += stuntmanSearchSettings.quantityToGet;
      _getPage(stuntmanSearchSettings, 'next');
    }

    function getPreviousPage(stuntmanSearchSettings) {
      stuntmanSearchSettings.quantityToGet > stuntmanSearchSettings.currentQuantity ?
        stuntmanSearchSettings.currentQuantity = 0 :
        stuntmanSearchSettings.currentQuantity -= stuntmanSearchSettings.quantityToGet;

      _getPage(stuntmanSearchSettings, 'previous');
    }

    function runCustomPagination(stuntmanSearchSettings) {
      _getPage(stuntmanSearchSettings, 'refreshListByCurrentQuantity');
    }

    function _getPage(stuntmanSearchSettings, mode) {
      if(self.searchSettingsParser){
        LoadingScreenService.start();
        self.searchSettingsParser(stuntmanSearchSettings)
          .then(searchSettingsParsed => {
            self.callValidationItemsLimits(self, searchSettingsParsed, mode);
            LoadingScreenService.finish();
          })
          .catch((error) => {
            console.log(error);
            LoadingScreenService.finish();
          });
      }
      else{
        self.callValidationItemsLimits(self, stuntmanSearchSettings, mode);
      }
    }

  }
}());
