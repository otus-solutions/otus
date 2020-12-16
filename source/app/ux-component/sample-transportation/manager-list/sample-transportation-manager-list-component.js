(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerList', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/sample-transportation-manager-list-template.html'
    }).controller('otusSampleTransportationManagerListCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.transportation.MaterialTransportationService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller(
    $mdToast,
    laboratoryContextService,
    MaterialTransportationService,
    ApplicationStateService,
    DialogService,
    LaboratoryViewerService) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.lots = [];

    /* Public methods */
    self.handleViewInfoAction = handleViewInfoAction;
    self.handleDeleteAction = handleDeleteAction;
    self.handleChangeAction = handleChangeAction;
    self.updateSelectedLots = updateSelectedLots;
    self.newLot = newLot;

    function onInit() {
      self.laboratoryExists = false;
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init);
    }

    function _init(){
      self.laboratoryExists = true;
      self.selectedLots = [];
    }

    function handleViewInfoAction() {
      self.lotInfoComponent.show();
    }

    function handleDeleteAction() {
      DialogService.showConfirmationDialog(
        'Confirmar exclusão de Lote(s):',
        'O(s) lote(s) será(ão) excluido(s).',
        'Confirmação de exclusão')
        .then(function() {
          _removeLotRecursive(self.selectedLots, function() {
            self.listComponent.updateOnDelete();
            self.selectedLots = [];
          });
        });
    }

    function _removeLotRecursive(lotArray,callback){
      MaterialTransportationService.deleteLot(lotArray[0].code).then(function(){
        if(lotArray.length === 1){
          callback();
        } else {
          lotArray.splice(0,1);
          _removeLotRecursive(lotArray,callback);
        }
      })
      .catch(function(e){
        var msgLots = "Não foi possível excluir o Lote " + lotArray[0].code + " o(s) Lote(s):"
          + lotArray.map(function(lot){return " " + lot.code;})
          + " não será(ão) excluído(s).";

        $mdToast.show(
          $mdToast.simple()
          .textContent(msgLots)
          .hideDelay(4000));
        callback();
      });
    }

    function handleChangeAction() {
      self.action = laboratoryContextService.setLotInfoManagerAction('alter');
      laboratoryContextService.selectLot(self.selectedLots[0].toJSON());
      ApplicationStateService.activateSampleTransportationLotInfoManager();
    }

    function updateSelectedLots(selectedLots) {
      self.selectedLots = selectedLots;
    }

    function newLot() {
      self.action = laboratoryContextService.setLotInfoManagerAction('create');
      ApplicationStateService.activateSampleTransportationLotInfoManager();
    }

  }
}());
