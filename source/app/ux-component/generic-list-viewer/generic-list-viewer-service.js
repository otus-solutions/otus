(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.genericListViewer.GenericListViewerService', Service);

  Service.$inject = [
    'GENERIC_LIST_VIEWER_LABELS',
    '$window',
    '$q',
    'otusjs.application.dialog.DialogShowService',
    '$mdToast'
  ];

  function Service(GENERIC_LIST_VIEWER_LABELS, $window, $q, DialogShowService, $mdToast) {
    const CURR_SEARCH_SETTINGS_STORAGE_KEY = 'genericLisSearchSettings';

    const self = this;
    self.LABELS = {};
    self.initialCurrentQuantity = 0;
    self.initialQuantityToGet = 5;
    self.getAllItemsFromRepositoryService = null;
    self.GenericListFactory = null;
    self.childParseItemsMethod = null;
    self.currSearchSettings = null;

    self.init = init;
    self.getSearchSettings = getSearchSettings;
    self.getItemAttributes = getItemAttributes;
    self.getInputViewState = getInputViewState;
    self.getAllItems = getAllItems;
    self.checkStorageAndUpdateCurrSearchSettings = checkStorageAndUpdateCurrSearchSettings;
    self.storageCurrentSearchSettings = storageCurrentSearchSettings;
    self.callValidationItemsLimits = callValidationItemsLimits;
    self.formatDate = formatDate;
    self.capitalizeName = capitalizeName;
    self.getSelectedParticipantRN = getSelectedParticipantRN;
    self.getChecker = getChecker;

    const deferred = $q.defer();

    function init(CHILD_VIEWER_LABELS, initialCurrentQuantity, initialQuantityToGet,
      getAllItemsFromRepositoryService, GenericListFactory,
      childParseItemsMethod = null) {
      angular.extend(self.LABELS, GENERIC_LIST_VIEWER_LABELS, CHILD_VIEWER_LABELS);
      self.initialCurrentQuantity = initialCurrentQuantity;
      self.initialQuantityToGet = initialQuantityToGet;
      self.getAllItemsFromRepositoryService = getAllItemsFromRepositoryService;
      self.GenericListFactory = GenericListFactory;
      self.childParseItemsMethod = childParseItemsMethod ? childParseItemsMethod : _parseItems;
      self.initialized = true;
    }

    function getSearchSettings() {
      return {
        "currentQuantity": self.initialCurrentQuantity,
        "quantityToGet": self.initialQuantityToGet,
        "order": {
          "fields": [""],
          "mode": 1
        },
        "filter": {
          "status": ""
        }
      };
    }

    function getItemAttributes() {
      return {};
    }

    function getInputViewState() {
      return {};
    }

    function getAllItems(searchSettings) {
      return self.getAllItemsFromRepositoryService(searchSettings)
        .then(data => self.childParseItemsMethod(data))
        .catch(err => console.log("error:" + JSON.stringify(err)))
    }

    function _parseItems(genericListJsonArray) {
      let parsedItems = [];
      genericListJsonArray.forEach(item => {
        parsedItems.push(self.GenericListFactory.fromJsonObject(item));
      });
      return parsedItems;
    }

    function checkStorageAndUpdateCurrSearchSettings(searchSettings) {
      const storageSearchSettings = JSON.parse($window.sessionStorage.getItem(CURR_SEARCH_SETTINGS_STORAGE_KEY));
      if (storageSearchSettings) {
        self.currSearchSettings = angular.copy(storageSearchSettings);
        $window.sessionStorage.removeItem(CURR_SEARCH_SETTINGS_STORAGE_KEY);
        return storageSearchSettings;
      }

      self.currSearchSettings = searchSettings;
      return searchSettings;
    }

    function storageCurrentSearchSettings() {
      $window.sessionStorage.setItem(CURR_SEARCH_SETTINGS_STORAGE_KEY, JSON.stringify(self.currSearchSettings));
    }

    function formatDate(date) {
      return date.getUTCDate().toString(10).padStart(2, '0') + "/" +
        (date.getUTCMonth() + 1).toString(10).padStart(2, '0') + "/" +
        date.getUTCFullYear();
    }

    function capitalizeName(name) {
      return name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    function getSelectedParticipantRN(participant, genericListFilterItem, searchSettings) {
      searchSettings.filter[genericListFilterItem.title] = participant.recruitmentNumber;
    }

    function getChecker(user, genericListFilterItem, searchSettings) {
      searchSettings.filter[genericListFilterItem.title] = [user.checker.email];
    }

    function callValidationItemsLimits(vm, stuntmanSearchSettings, mode) {
      getAllItems(stuntmanSearchSettings)
        .then(items => _checkPaginatorLimit(items, stuntmanSearchSettings))
        .then(checkedData => _updatesScreenArtifacts(vm, checkedData))
        .catch(e => {
          _callMessage(e.msg);
          switch (mode) {
            case "next": {
              vm.activeNextPage = e.activePage;
              break;
            }
            case "previous": {
              vm.activePreviousPage = e.activePage;
              break;
            }
            case "refreshListByCurrentQuantity": {
              _restorePaginator(vm);
              break;
            }
          }
        });
    }

    function _checkPaginatorLimit(items, searchSettings) {
      const activeNextPage = true;
      const activePreviousPage = !(searchSettings.currentQuantity === 0);
      if (searchSettings.currentQuantity < 0 || items.length === 0) {
        deferred.reject({ msg: GENERIC_LIST_VIEWER_LABELS.NO_NEW_ITEMS, activePage: false });
        searchSettings.currentQuantity = searchSettings.currentQuantity - searchSettings.quantityToGet;
        return deferred.promise;
      }
      return { items, activePreviousPage, activeNextPage };
    }

    function _updatesScreenArtifacts(vm, checkedData) {
      vm.items = checkedData.items;
      vm.activePreviousPage = checkedData.activePreviousPage;
      vm.activeNextPage = checkedData.activeNextPage;
    }

    function _restorePaginator(vm) {

      DialogShowService.showDialog(GENERIC_LIST_VIEWER_LABELS.DIALOG.confirmRestore).then(function () {
        vm.stuntmanSearchSettings.currentQuantity = 0;
        vm.activePreviousPage = false;
        vm.activeNextPage = true;
        _callMessage(GENERIC_LIST_VIEWER_LABELS.PAGINATOR.RESTORE_CONTEXT_INVALID_CRITERION)
      });
    }

    function _callMessage(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .position("left bottom")
          .hideDelay(3000)
      );
    }

  }

}());
