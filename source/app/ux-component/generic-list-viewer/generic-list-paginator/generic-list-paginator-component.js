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
      self.items = [
        {
          "_id": "602699fcefc5ca1cb146be4a",
          "recruitmentNumber": 1234567,
          userName: 'Fulano',
          "creationDate": "2021-02-12T15:08:44.854Z",
          "lastUpdate": "2021-02-12T15:08:44.854Z",
          "editeded": false,
          "starred": false,
          "comment": "primeiro commentário",
          "userId": "5d1bbabe995e20d290d94e49"
        },
        {
          "_id": "602699fcefc5ca1cb146be4a",
          "recruitmentNumber": 1234567,
          userName: 'Fulano',
          "creationDate": "2021-02-12T15:08:44.854Z",
          "lastUpdate": "2021-02-12T15:08:44.854Z",
          "editeded": false,
          "starred": false,
          "comment": "primeiro commentário",
          "userId": "5d1bbabe995e20d290d94e49"
        },
        {
          "_id": "602699fcefc5ca1cb146be4a",
          "recruitmentNumber": 1234567,
          userName: 'Fulano',
          "creationDate": "2021-02-12T15:08:44.854Z",
          "lastUpdate": "2021-02-12T15:08:44.854Z",
          "editeded": false,
          "starred": false,
          "comment": "primeiro commentário",
          "userId": "5d1bbabe995e20d290d94e49"
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd',
          isCreate: true,
          starred: true
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdf',
          isCreate: true
        },
        {
          _id: '113234',
          recruitmentNumber: '132324',
          userName: 'Fulano',
          creationDate: '2020-12-18T16:59:41.188',
          edited: true,
          comment: 'primeiro teste de commentários cf4trehyrgwsfwartshdfhdseyhrdyhseedgsegsdgsdhdfhdfhrsdghsgsgdrfhgdghdghsdfghdfhfghjftujhgfjdshfd'
        }
      ];
    }

  }
}());
