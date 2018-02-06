(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusViewSendingExam', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-sending/sending-view/exam-sending-view-template.html'
    });

  Controller.$inject = [
    '$filter',
    '$mdToast',
    '$mdDialog',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.otus.dashboard.core.ContextService',
    'otusjs.laboratory.core.project.ContextService',
    'otusjs.laboratory.business.project.sending.SendingExamService',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Controller($filter, $mdToast, $mdDialog, ProjectFieldCenterService, DashboardContextService, ProjectContextService, SendingExamService, ApplicationStateService) {
    var self = this;
    var _confirmDeleteSelected;
    self.sendingList = [];
    self.listImmutable = [];
    self.selectedSendings = [];
    self.centers = [];
    self.realizationBeginFilter = "";
    self.realizationEndFilter = "";
    self.centerFilter = "";

    /* Public methods */
    self.$onInit = onInit;
    self.examSendingView = examSendingView;
    self.deleteSending = deleteSending;
    self.onFilter = onFilter;
    self.dynamicDataTableChange = dynamicDataTableChange;

    function onInit() {
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.lotDataSet = [];
        self.colorSet = [];
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        _setUserFieldCenter();
        _loadList();
      });
      _buildDialogs();
    }

    function examSendingView() {
      self.action = ProjectContextService.setExamSendingAction('view');
      ProjectContextService.setFileStructure(self.selectedSendings[0].toJSON());
      ApplicationStateService.activateExamResultsVisualizer();
      self.selectedSendings = [];
    }

    function _setUserFieldCenter() {
      DashboardContextService
        .getLoggedUser()
        .then(function (userData) {
          self.userHaveCenter = !!userData.fieldCenter.acronym;
          self.centerFilter = self.userHaveCenter ? userData.fieldCenter.acronym : ProjectContextService.getFieldCenterInSendingExam() ? ProjectContextService.getFieldCenterInSendingExam() : "";
          self.centerFilterDisabled = userData.fieldCenter.acronym ? "disabled" : "";
          if (!self.centerFilter) {
            self.centerFilter = self.centers[0];
          }
          ProjectContextService.setFieldCenterInSendingExam(self.centerFilter);
        });
    }

    function _buildDialogs() {
      _confirmDeleteSelected = $mdDialog.confirm()
        .title('Confirmação para exclusão de arquivos')
        .textContent('Atenção: Os arquivos selecionados serão excluídos')
        .ariaLabel('Confirmação de exclusão')
        .ok('Ok')
        .cancel('Voltar');
    }

    function deleteSending() {
      $mdDialog.show(_confirmDeleteSelected).then(function () {
        _removeRecursive(self.selectedSendings, function () {
          _loadList();
        });
      });
    }

    function _removeRecursive(array, callback) {
      SendingExamService.deleteSendedExams(array[0].examLot._id).then(function () {
        if (array.length == 1) {
          callback();
        } else {
          array.splice(0, 1);
          _removeRecursive(array, callback);
        }
      })
        .catch(function (e) {
          var msg = "Não foi possível excluir o envio " + array[0]._id + ".";
          $mdToast.show(
            $mdToast.simple()
              .textContent(msg)
              .hideDelay(3000)
          );
          callback();
        });
    }

    function dynamicDataTableChange(change) {
      if (change.type === 'select' || change.type === 'deselect') {
        _selectedSend(change.element);
      }
    }

    function _selectedSend(send) {
      var activityIndex = self.selectedSendings.indexOf(send);
      if (activityIndex > -1) {
        self.selectedSendings.splice(activityIndex, 1);
      } else {
        self.selectedSendings.push(send);
      }
    }

    function onFilter() {
      self.selectedSendings = [];
      _setSessionData();
      if (self.listImmutable.length) {
        self.sendingList = self.listImmutable
          .filter(function (filteredByCenter) {
            return _filterByCenter(filteredByCenter);
          })
          .filter(function (filteredByPeriod) {
            return _filterByPeriod(filteredByPeriod);
          });
      }
      if (self.updateDataTable) self.updateDataTable(self.sendingList);
    }

    function _filterByCenter(filteredByCenter) {
      return filteredByCenter.examLot.fieldCenter.acronym === self.centerFilter;
    }

    function _filterByPeriod(filteredByCenter) {
      var formattedData = $filter('date')(filteredByCenter.examLot.realizationDate, 'yyyyMMdd');
      if (self.realizationBeginFilter && self.realizationEndFilter) {
        var initialDateFormatted = $filter('date')(self.realizationBeginFilter, 'yyyyMMdd');
        var finalDateFormatted = $filter('date')(self.realizationEndFilter, 'yyyyMMdd');
        if (initialDateFormatted <= finalDateFormatted) {
          return (formattedData >= initialDateFormatted && formattedData <= finalDateFormatted);
        } else {
          var msgDataInvalida = "Filtro de datas com intervalo inválido";

          $mdToast.show(
            $mdToast.simple()
              .textContent(msgDataInvalida)
              .hideDelay(3000)
          );
          return filteredByCenter;
        }
      } else {
        return filteredByCenter;
      }
    }

    function _loadList() {
      self.sendingList = [];
      self.listImmutable = [];
      SendingExamService.getSendedExams().then(function (response) {
        response.forEach(function (lot) {
          self.sendingList.push(SendingExamService.loadExamSendingFromJson(lot, {}));
          self.listImmutable.push(SendingExamService.loadExamSendingFromJson(lot, {}));
        });
        self.onFilter();
      });
    }

    function _setSessionData() {
      if (self.centerFilter.length) {
        ProjectContextService.setFieldCenterInSendingExam(self.centerFilter);
      }
    }

  }
}());
