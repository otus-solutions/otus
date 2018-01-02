(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusViewSendingExam', {
      controller: Controller,
      templateUrl: 'app/ux-component/sending-exam/view-sending-exam/view-sending-exam-template.html'
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

    /* Public methods */
    self.$onInit = onInit;
    self.changeSending = changeSending;
    self.newSending = newSending;
    self.deleteSending = deleteSending;
    self.selectSend = selectSend;

    //TODO: criado para realização de teste, depois deve ser removido!
    self.sendingList = [
      {
        "code": "0001",
        "name": "arquivo-exame-01",
        "realizationDate": {
          "objectType": "ImmutableDate",
          "value": "2017-09-20 00:00:00.000"
        },
        "operator": "vianna.emanoel@gmail.com"
      },
      {
        "code": "0002",
        "name": "arquivo-exame-02",
        "realizationDate": {
          "objectType": "ImmutableDate",
          "value": "2017-09-20 00:00:00.000"
        },
        "operator": "vianna.emanoel@gmail.com"
      }
    ]

    function onInit() {
      _buildDialogs();
    }

    function changeSending() {
      //TODO:
    }

    function newSending() {
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
        _removeLotRecursive(self.selectedLots, function () {
          self.updateLotListOnDelete();
          self.selectedLots = [];
        });
      });
    }

    function _removeLotRecursive(lotArray, callback) {
      SendingExamService.deleteLot(lotArray[0].code).then(function () {
        if (lotArray.length == 1) {
          callback();
        } else {
          lotArray.splice(0, 1);
          _removeLotRecursive(lotArray, callback);
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

    function selectSend(send) {
      var activityIndex = self.selectedSendings.indexOf(send);
      if (activityIndex > -1) {
        self.selectedSendings.splice(activityIndex, 1);
        send.isSelected = false;
      } else {
        self.selectedSendings.push(send);
        send.isSelected = true;
      }
    }

  }
}());
