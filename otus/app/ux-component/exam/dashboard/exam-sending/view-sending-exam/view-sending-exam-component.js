(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusViewSendingExam', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/view-sending-exam/view-sending-exam-template.html'
    });

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'otusjs.laboratory.business.project.sending.SendingExamService'
  ];

  function Controller($mdToast, $mdDialog, SendingExamService) {
    var self = this;
    var _confirmDeleteSelected;
    self.sendingList = [];
    self.selectedSendings = [];
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";

    /* Public methods */
    self.$onInit = onInit;
    self.viewSendingExam = viewSendingExam;
    self.createSendExam = createSendExam;
    self.deleteSending = deleteSending;
    self.onFilter = onFilter;
    self.dynamicDataTableChange = dynamicDataTableChange;


    //TODO: criado para realização de teste, depois deve ser removido!
    self.sendingList = [
      {
        "code": "0001",
        "name": "arquivo-exame-01",
        "typeExam": "SORO BIOCHIMICO",
        "realizationDate": {
          "objectType": "ImmutableDate",
          "value": "2017-09-20 00:00:00.000"
        },
        "size": "1024kb",
        "operator": "vianna.emanoel@gmail.com"
      },
      {
        "code": "0002",
        "name": "arquivo-exame-02",
        "typeExam": "SORO BIOCHIMICO",
        "realizationDate": {
          "objectType": "ImmutableDate",
          "value": "2017-09-20 00:00:00.000"
        },
        "size": "1024kb",
        "operator": "vianna.emanoel@gmail.com"
      }
    ]

    function onInit() {
      _buildDialogs();
    }

    function viewSendingExam() {
      //TODO:
    }

    function createSendExam() {
      //TODO:
    }

    function _buildDialogs() {
      _confirmDeleteSelected = $mdDialog.confirm()
        .title('Confirmar exclusão de envio(s):')
        .textContent('O(s) envio(s) será(ão) excluido(s)')
        .ariaLabel('Confirmação de exclusão')
        .ok('Ok')
        .cancel('Voltar');
    }

    function deleteSending() {
      $mdDialog.show(_confirmDeleteSelected).then(function () {
        _removeRecursive(self.selectedSendings, function () {
          self.updateLotListOnDelete();
          self.selectedSendings = [];
        });
      });
    }

    function _removeRecursive(lotArray, callback) {
      SendingExamService.deleteSendingExam(lotArray[0].code).then(function () {
        if (lotArray.length == 1) {
          callback();
        } else {
          lotArray.splice(0, 1);
          _removeRecursive(lotArray, callback);
        }
      })
        .catch(function (e) {
          var msgLots = "Não foi possível excluir o envio " + lotArray[0].code + ".";

          $mdToast.show(
            $mdToast.simple()
              .textContent(msgLots)
              .hideDelay(4000)
          );
          callback();
        });
    }

    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        _selectSend(change.element);
      }
    }

    function _selectSend(send) {
      var activityIndex = self.selectedSendings.indexOf(send);
      if (activityIndex > -1) {
        self.selectedSendings.splice(activityIndex, 1);
        send.isSelected = false;
      } else {
        self.selectedSendings.push(send);
        send.isSelected = true;
      }
    }

    function onFilter() {
      self.selectedLots = [];
      _setSessionData();
      if (self.lotsListImutable.length) {
        self.lotsList = self.lotsListImutable
          .filter(function (FilteredByCenter) {
            return _filterByPeriod(FilteredByCenter);
          })
      }
    }

    function _filterByPeriod(FilteredByCenter) {
      var lotFormattedData = $filter('date')(FilteredByCenter.realizationDate, 'yyyyMMdd');
      if (self.realizationBeginFilter && self.realizationEndFilter) {
        var initialDateFormatted = $filter('date')(self.realizationBeginFilter, 'yyyyMMdd');
        var finalDateFormatted = $filter('date')(self.realizationEndFilter, 'yyyyMMdd');
        if (initialDateFormatted <= finalDateFormatted) {
          return (lotFormattedData >= initialDateFormatted && lotFormattedData <= finalDateFormatted);
        } else {
          var msgDataInvalida = "Datas invalidas";

          $mdToast.show(
            $mdToast.simple()
              .textContent(msgDataInvalida)
              .hideDelay(4000)
          );
          return FilteredByCenter;
        }
      } else {
        return FilteredByCenter;
      }
    }

    function _setSessionData() {
      if (self.centerFilter.length) {
        laboratoryContextService.setSelectedExamLotFieldCenter(self.centerFilter);
      }
      if (self.centerFilter.length) {
        laboratoryContextService.setSelectedExamType(self.examFilter);
      }
    }

  }
}());
