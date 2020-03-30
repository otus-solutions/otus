(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('offlineActivitySynchronizeDashboardCtrl', Controller);

  Controller.$inject = [
    'otusjs.model.activity.OfflineActivityCollection',
    'otusjs.activity.business.OfflineActivityCollectionService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller(OfflineActivityCollectionFactory, OfflineActivityCollectionService, LoadingScreenService) {
    var self = this;
    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.loadOfflineCollections = loadOfflineCollections;

    function onInit() {
      loadOfflineCollections();
    }

    function loadOfflineCollections() {
      LoadingScreenService.start();
      OfflineActivityCollectionService.getOfflineActivityCollections().then((result)=>{
        self.offlineActivityCollections = OfflineActivityCollectionFactory.fromArray(result);
        LoadingScreenService.finish();
      }).catch((error)=>{
        self.offlineActivityCollections = [];
        if (error.data) {
          if (error.data.MESSAGE.match("User do not have any offline collection")) {
            self.attacheError = "Esta coleta já foi sincronizada";
          } else {
            self.attacheError = UNEXPECTED_ERROR_MESSAGE;
          }
        } else {
          self.attacheError = UNEXPECTED_ERROR_MESSAGE;
        }
        LoadingScreenService.finish();
        _showToast(self.attacheError);
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
