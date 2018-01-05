(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusViewSendingExam', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/view-sending-exam/view-sending-exam-template.html'
    });

  Controller.$inject = [
    '$filter',
    '$mdToast',
    '$mdDialog',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.laboratory.business.project.sending.SendingExamService'
  ];

  function Controller($filter, $mdToast, $mdDialog, FieldCenterRestService, DashboardContextService, ProjectContextService, SendingExamService) {
    var self = this;
    var _confirmDeleteSelected;
    self.sendingList = [];
    self.lotsListImutable = [];
    self.selectedSendings = [];
    self.centers = [];
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";

    /* Public methods */
    self.$onInit = onInit;
    self.viewSendingExam = viewSendingExam;
    self.deleteSending = deleteSending;
    self.onFilter = onFilter;
    self.dynamicDataTableChange = dynamicDataTableChange;


    //TODO: criado para realização de teste, depois deve ser removido!
    self.fakeResponse = [
      {
        "code": "0001",
        "name": "arquivo-exame-01",
        "typeExam": "SORO BIOCHIMICO",
        "realizationDate": {
          "objectType": "ImmutableDate",
          "value": "2017-09-20 00:00:00.000"
        },
        "fieldCenter": {
          "acronym": "SP"
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
          "value": "2017-08-20 00:00:00.000"
        },
        "fieldCenter": {
          "acronym": "SP"
        },
        "size": "1024kb",
        "operator": "vianna.emanoel@gmail.com"
      }
    ]

    function onInit() {
      FieldCenterRestService.loadCenters().then(function (result) {
        self.lotDataSet = [];
        self.colorSet = [];
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        _setUserFieldCenter();
      });

      _buildDialogs();
    }

    function viewSendingExam() {
      //TODO:
    }

    function _setUserFieldCenter() {
      DashboardContextService
        .getLoggedUser()
        .then(function (userData) {
          self.userHaveCenter = !!userData.fieldCenter.acronym;
          self.centerFilter = self.userHaveCenter ? userData.fieldCenter.acronym : ProjectContextService.getFieldCenterInSendingExam() ? ProjectContextService.getFieldCenterInSendingExam() : "";
          ProjectContextService.setFieldCenterInSendingExam(self.centerFilter);
          self.centerFilterSelectedIndex = self.centers.indexOf(self.centerFilter) >= 0 ? self.centers.indexOf(self.centerFilter) : 0;
          self.centerFilterDisabled = userData.fieldCenter.acronym ? "disabled" : "";
          _LoadList();
        });
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
        self.sendingList = self.lotsListImutable
          .filter(function (lot) {
            return _filterByCenter(lot);
          })
          .filter(function (FilteredByCenter) {
            return _filterByPeriod(FilteredByCenter);
          });
      }
      if(self.updateDataTable) self.updateDataTable();
    }

    function _filterByCenter(lot) {
      if (self.centerFilter.length) {
        return lot.fieldCenter.acronym == self.centerFilter;
      } else {
        return lot;
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

    function _LoadList() {
      /*
      SendingExamService.getSendedExams().then(function (response) {
        self.sendingList = response;
        self.lotsListImutable = response;
      });
      */
      self.sendingList = self.fakeResponse;
      self.lotsListImutable = self.fakeResponse;
      self.onFilter();
    }

    function _setSessionData() {
      if (self.centerFilter.length) {
        ProjectContextService.setFieldCenterInSendingExam(self.centerFilter);
      }
    }

  }
}());
