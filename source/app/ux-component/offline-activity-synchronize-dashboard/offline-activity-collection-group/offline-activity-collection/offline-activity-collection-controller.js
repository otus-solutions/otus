(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('offlineActivityCollectionCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    'otusjs.activity.business.OfflineActivityCollectionService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdToast, OfflineActivityCollectionService, LoadingScreenService) {
    var self = this;
    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {}
  }
}());
