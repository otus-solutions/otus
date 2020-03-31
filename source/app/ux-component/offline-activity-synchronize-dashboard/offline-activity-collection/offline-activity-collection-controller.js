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
    self.synchronizeOfflineActivities = synchronizeOfflineActivities;

    function onInit() {}

    function synchronizeOfflineActivities() {
      LoadingScreenService.start();
      OfflineActivityCollectionService.synchronizeOfflineActivities(self.recruitmentNumber,self.offlineCollectionData._id).then(result => {
        self.reloadData();
        LoadingScreenService.finish();
      }).catch(error => {
        if (error.data) {
          if (error.data.MESSAGE.match("Offline collection is already synchronized")) {
            self.attacheError = "Esta coleta já foi sincronizada";
          } else if (error.data.MESSAGE.match("Offline collection does not belong to you")) {
            self.attacheError = "Esta coleta não pertence ao usuário logado";
          } else if (error.data.MESSAGE.match("Participant with recruitment number {")) {
            self.attacheError = "Participante não encontrado";
          } else if (error.data.MESSAGE.match("Offline collection not found")) {
            self.attacheError = "Coleta não encontrada";
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
