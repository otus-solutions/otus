(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('offlineActivityCollectionGroupCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    '$mdToast',
    'otusjs.activity.business.OfflineActivityCollectionService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.application.dialog.DialogShowService'
  ];

  function Controller($mdDialog, $mdToast, OfflineActivityCollectionService, LoadingScreenService, DialogShowService) {
    var self = this;

    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";
    const BACKEND_ALREADY_SYNCHRONIZED_RESPONSE = "Offline collection is already synchronized";
    const ALREADY_SYNCHRONIZED_MESSAGE = "Coleta já foi sincronizada";
    const BACKEND_COLLECTION_DOES_NOT_BELONG_TO_USER_RESPONSE = "Offline collection does not belong to you";
    const COLLECTION_DOES_NOT_BELONG_TO_USER_MESSAGE = "Coleta já foi sincronizada";
    const BACKEND_PARTICIPANT_NOT_FOUND_RESPONSE = "Participant with recruitment number {";
    const PARTICIPANT_NOT_FOUND_MESSAGE = "Participante não encontrado";
    const BACKEND_COLLECTION_NOT_FOUND_RESPONSE = "Offline collection not found";
    const COLLECTION_NOT_FOUND_MESSAGE = "Coleta não encontrada";
    const SYNCHRONIZED_MESSAGE = "Coletas sincronizadas com sucesso";


    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.synchronizeOfflineActivities = synchronizeOfflineActivities;

    function onInit() {
    }

    function synchronizeOfflineActivities() {
      if (self.recruitmentNumber && self.recruitmentNumber !== ''){
        DialogShowService.showDialog({
          dialogToTitle: 'Vincular Coletas',
          textDialog: 'Deseja vinculas as coletas ao participante com numero de recrutamento:'+self.recruitmentNumber,
          ariaLabel: 'Confirmar Vinculo de Coletas',
          buttons: [
            {
              message: 'Confirmar',
              action: function () {
                $mdDialog.hide()
              },
              class: 'md-raised md-primary'
            },
            {
              message: 'Cancelar',
              action: function () {
                $mdDialog.cancel()
              },
              class: 'md-raised md-no-focus'
            }
          ]
        }).then(function () {
          _recursiveSynchronizer();
        })
      } else {
        _showToast("Número de recrutamento não pode ser vazio")
      }
    }

    function _recursiveSynchronizer(){
      LoadingScreenService.start();
      if (self.offlineCollectionGroupData.collections[0]) {
        OfflineActivityCollectionService.synchronizeOfflineActivities(self.recruitmentNumber, self.offlineCollectionGroupData.collections[0]._id).then(result => {
          self.offlineCollectionGroupData.removeCollection(0)
          _recursiveSynchronizer()
        }).catch(error => {
          if (error.data) {
            if (error.data.MESSAGE.match(BACKEND_ALREADY_SYNCHRONIZED_RESPONSE)) {
              self.reloadData();
              self.attacheError = ALREADY_SYNCHRONIZED_MESSAGE;
            } else if (error.data.MESSAGE.match(BACKEND_COLLECTION_DOES_NOT_BELONG_TO_USER_RESPONSE)) {
              self.reloadData();
              self.attacheError = COLLECTION_DOES_NOT_BELONG_TO_USER_MESSAGE;
            } else if (error.data.MESSAGE.match(BACKEND_PARTICIPANT_NOT_FOUND_RESPONSE)) {
              self.attacheError = PARTICIPANT_NOT_FOUND_MESSAGE;
            } else if (error.data.MESSAGE.match(BACKEND_COLLECTION_NOT_FOUND_RESPONSE)) {
              self.attacheError = COLLECTION_NOT_FOUND_MESSAGE;
            } else {
              self.attacheError = UNEXPECTED_ERROR_MESSAGE;
            }
          } else {
            self.attacheError = UNEXPECTED_ERROR_MESSAGE;
          }
          LoadingScreenService.finish();
          _showToast(self.attacheError);
        });
      } else {
        self.reloadData();
        LoadingScreenService.finish();
        _showToast(SYNCHRONIZED_MESSAGE)
      }
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
