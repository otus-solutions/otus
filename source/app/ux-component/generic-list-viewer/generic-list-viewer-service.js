(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.genericListViewer.GenericListViewerService', Service);

  Service.$inject = [
    'GENERIC_LIST_VIEWER_LABELS',
    '$q',
    '$mdDialog',
    '$mdToast'
  ];

  function Service(GENERIC_LIST_VIEWER_LABELS, $q, $mdDialog, $mdToast) {
    const self = this;
    self.LABELS = {};
    self.initialCurrentQuantity = 0;
    self.initialQuantityToGet = 5;
    self.getAllItemsFromRepositoryService = null;
    self.GenericListFactory = null;

    self.init = init;
    self.getSearchSettings = getSearchSettings;
    self.getItemAttributes = getItemAttributes;
    self.getInputViewState = getInputViewState;
    self.getAllItems = getAllItems;
    self.callValidationItemsLimits = callValidationItemsLimits;
    self.formatDate = formatDate;
    self.getSelectedParticipantRN = getSelectedParticipantRN;
    self.getChecker = getChecker;

    const deferred = $q.defer();

    function init(CHILD_VIEWER_LABELS, initialCurrentQuantity, initialQuantityToGet,
                  getAllItemsFromRepositoryService, GenericListFactory){
      angular.extend(self.LABELS, GENERIC_LIST_VIEWER_LABELS, CHILD_VIEWER_LABELS);
      self.initialCurrentQuantity = initialCurrentQuantity;
      self.initialQuantityToGet = initialQuantityToGet;
      self.getAllItemsFromRepositoryService = getAllItemsFromRepositoryService;
      self.GenericListFactory = GenericListFactory;
    }

    function getSearchSettings() { // TODO defined at child?
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
        .then(data => _parseItems(data))
        .catch(err => console.log("error:" + err))
    }

    function _parseItems(genericListJsonArray) {
      let parsedItems = [];
      genericListJsonArray.forEach(item => {
        parsedItems.push(self.GenericListFactory.fromJsonObject(item));
      });
      return parsedItems;
    }

    function formatDate(date) {
      return date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
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
      const activePreviousPage = true;
      if (searchSettings.currentQuantity < 0 || items.length === 0) {
        _callRejectionPromise(activePreviousPage);
        return deferred.promise;
      }
      return {items, activePreviousPage, activeNextPage};
    }

    function _callRejectionPromise() {
      deferred.reject({msg: GENERIC_LIST_VIEWER_LABELS.NO_NEW_ITEMS, activePage: false});
    }

    function _updatesScreenArtifacts(vm, checkedData) {
      vm.items = checkedData.items;
      vm.activePreviousPage = checkedData.activePreviousPage;
      vm.activeNextPage = checkedData.activeNextPage;
    }

    function _restorePaginator(vm) {
      let confirm = $mdDialog.confirm()
        .title(GENERIC_LIST_VIEWER_LABELS.INVALID_CRITERION)
        .textContent(GENERIC_LIST_VIEWER_LABELS.PAGINATOR.CONTEXT_INVALID_CRITERION)
        .ariaLabel(GENERIC_LIST_VIEWER_LABELS.INVALID_CRITERION)
        .ok(GENERIC_LIST_VIEWER_LABELS.PAGINATOR.RESTORE_BUTTON);

      $mdDialog.show(confirm).then(function () {
        vm.stuntmanSearchSettings.currentQuantity = 0;
        vm.activePreviousPage = true;
        vm.activeNextPage = true;
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