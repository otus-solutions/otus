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
    '$mdDialog',
    'otusjs.laboratory.core.ContextService',
    'otusjs.laboratory.business.project.exams.ExamLotService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.application.dialog.DialogShowService'
  ];


  function Controller($mdToast, $mdDialog, laboratoryContextService, ExamLotService, ApplicationStateService, DialogService) {
    var self = this;
    var _confirmDeleteSelectedLots;
    var _csvExported;

    self.$onInit = onInit;
    self.ChangeLot = ChangeLot;
    self.DeleteLots = DeleteLots;
    self.getCsvData = getCsvData;

    function onInit() {
      _buildDialogs();
    }

    function getCsvData() {
      if(!self.selectedLots[0].aliquotList){
        ExamLotService.getLotAliquots(self.selectedLots[0]._id).then(aliquotList => {
          self.selectedLots[0].aliquotList = aliquotList;
          _exportCsv()
        });
      } else {
        _exportCsv()
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
          self.action = laboratoryContextService.setLotInfoManagerAction('alter');
          laboratoryContextService.setSelectedExamLot(self.selectedLots[0].toJSON());
          ApplicationStateService.activateExamsLotInfoManager();
        });
      } else {
        self.action = laboratoryContextService.setLotInfoManagerAction('alter');
        laboratoryContextService.setSelectedExamLot(self.selectedLots[0].toJSON());
        ApplicationStateService.activateExamsLotInfoManager();
      }
    }

    function DeleteLots() {
      DialogService.showDialog(_confirmDeleteSelectedLots).then(function() {
        _removeLotRecursive(self.selectedLots, function() {
          self.updateLotListOnDelete();
          self.selectedLots = [];
        });
      });
    }

    function _buildDialogs() {
      _confirmDeleteSelectedLots = {
        dialogToTitle:'Exclusão',
        titleToText:'Confirmar exclusão de Lote(s):',
        textDialog:'O(s) lote(s) será(ão) excluido(s).',
        ariaLabel:'Confirmação de exclusão',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          },
          {
            message:'Voltar',
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };
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
