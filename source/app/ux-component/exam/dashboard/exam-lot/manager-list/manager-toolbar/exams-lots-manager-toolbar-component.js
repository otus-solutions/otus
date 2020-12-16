(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamsLotsManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/manager-list/manager-toolbar/exams-lots-manager-toolbar-template.html',
      bindings: {
        onViewInfo: '&',
        updateLotListOnDelete: '&',
        selectedLots: '<'
      }
    });


  Controller.$inject = [
    '$mdToast',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.exams.ExamLotService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService'
  ];


  function Controller($mdToast, LaboratoryContextService, ExamLotService, ApplicationStateService, DialogService) {
    var self = this;
    var _csvExported;

    self.$onInit = onInit;
    self.ChangeLot = ChangeLot;
    self.DeleteLots = DeleteLots;
    self.getCsvData = getCsvData;

    function onInit() {}

    function getCsvData() {
      if(!self.selectedLots[0].aliquotList){
        ExamLotService.getLotAliquots(self.selectedLots[0]._id).then(aliquotList => {
          self.selectedLots[0].aliquotList = aliquotList;
          _exportCsv();
        });
      } else {
        _exportCsv();
      }
    }

    function _exportCsv(){
      self.csvData =  self.selectedLots[0].getAliquotsToCsv().reverse();
      alasql('SELECT * INTO CSV("report.csv",{headers:true}) FROM ?', [self.csvData]);
      _toastCsvExported();
    }

    function ChangeLot() {
      if(!self.selectedLots[0].aliquotList) {
        ExamLotService.getLotAliquots(self.selectedLots[0]._id).then(aliquotList => {
          self.selectedLots[0].aliquotList = aliquotList;
          self.action = LaboratoryContextService.setLotInfoManagerAction('alter');
          LaboratoryContextService.setSelectedExamLot(self.selectedLots[0].toJSON());
          ApplicationStateService.activateExamsLotInfoManager();
        });
      } else {
        self.action = LaboratoryContextService.setLotInfoManagerAction('alter');
        LaboratoryContextService.setSelectedExamLot(self.selectedLots[0].toJSON());
        ApplicationStateService.activateExamsLotInfoManager();
      }
    }

    function DeleteLots() {
      DialogService.showConfirmationDialog(
        'Confirmar exclusão de Lote(s):',
        'O(s) lote(s) será(ão) excluido(s).',
        'Confirmação de exclusão')
        .then(function() {
          _removeLotRecursive(self.selectedLots, function() {
            self.updateLotListOnDelete();
            self.selectedLots = [];
          });
        });
    }


    function _toastCsvExported() {
      $mdToast.show(
        $mdToast.simple()
          .position("bottom right")
          .textContent('CSV exportado com sucesso!')
          .hideDelay(3000))
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
