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
            if (error.data.MESSAGE.match("Offline collection is already synchronized")) {
              self.reloadData();
              self.attacheError = "Coleta já foi sincronizada";
            } else if (error.data.MESSAGE.match("Offline collection does not belong to you")) {
              self.reloadData();
              self.attacheError = "Coleta não pertence ao usuário logado";
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
      } else {
        self.reloadData();
        LoadingScreenService.finish();
        _showToast("Coletas sincronizadas com sucesso")
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
