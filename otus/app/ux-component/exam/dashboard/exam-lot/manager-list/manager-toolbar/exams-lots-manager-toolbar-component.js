(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamsLotsManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/aliquot-manager-list/aliquot-manager-toolbar/exams-lots-aliquot-manager-toolbar-template.html',
      bindings: {
        onViewInfo: '&',
        updateLotListOnDelete: '&',
        selectedLots: '<',
        csvData: '<'
      }
    });


  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.exams.ExamLotService',
    'otusjs.application.state.ApplicationStateService'
  ];


  function Controller($mdToast, $mdDialog, laboratoryContextService, ExamLotService,ApplicationStateService) {
    var self = this;
    var _confirmDeleteSelectedLots;

    self.$onInit = onInit;
    self.ChangeLot = ChangeLot;
    self.DeleteLots = DeleteLots;

    function onInit() {
      _buildDialogs();
    }

    function ChangeLot() {
      self.action = laboratoryContextService.setLotInfoManagerAction('alter');
      laboratoryContextService.setSelectedExamLot(self.selectedLots[0].toJSON());
      ApplicationStateService.activateExamsLotInfoManager();
    }

    function DeleteLots() {
      $mdDialog.show(_confirmDeleteSelectedLots).then(function() {
        _removeLotRecursive(self.selectedLots, function() {
          self.updateLotListOnDelete();
          self.selectedLots = [];
        });
      });
    }

    function _buildDialogs() {
      _confirmDeleteSelectedLots = $mdDialog.confirm()
        .title('Confirmar exclusão de Lote(s):')
        .textContent('O(s) lote(s) será(ão) excluido(s)')
        .ariaLabel('Confirmação de exclusão')
        .ok('Ok')
        .cancel('Voltar');
    }

    function _removeLotRecursive(lotArray,callback){
      ExamLotService.deleteLot(lotArray[0].code).then(function(){
        if(lotArray.length == 1){
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
              .hideDelay(4000)
          );
          callback();
        });
    }
  }
}());
