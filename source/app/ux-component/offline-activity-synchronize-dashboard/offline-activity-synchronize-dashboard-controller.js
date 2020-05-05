(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('offlineActivitySynchronizeDashboardCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    'otusjs.model.activity.GroupOfflineActivityCollection',
    'otusjs.activity.business.OfflineActivityCollectionService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdToast, GroupOfflineActivityCollectionFactory, OfflineActivityCollectionService, LoadingScreenService) {
    var self = this;
    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";
    const BACKEND_USER_DO_NOT_HAVE_COLLECTION_RESPONSE = "User do not have any offline collection";

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.loadOfflineCollections = loadOfflineCollections;

    function onInit() {
      loadOfflineCollections();
    }

    function loadOfflineCollections() {
      LoadingScreenService.start();
      OfflineActivityCollectionService.getOfflineActivityCollections().then((result)=>{
        self.offlineActivityCollectionGroups = GroupOfflineActivityCollectionFactory.fromArray(result);
        LoadingScreenService.finish();
      }).catch((error)=>{
        self.offlineActivityCollectionGroups = [];
        LoadingScreenService.finish();
        if (error.data) {
          if (error.data.MESSAGE.match(BACKEND_USER_DO_NOT_HAVE_COLLECTION_RESPONSE)) {
            self.offlineActivityCollectionGroups = [];
          } else {
            _showToast(UNEXPECTED_ERROR_MESSAGE);
          }
        } else {
          _showToast(UNEXPECTED_ERROR_MESSAGE);
        }
      });
    }

    function _showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(10000)
      );
    }
  }
}());
