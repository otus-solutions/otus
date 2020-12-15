(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('unattachedLaboratoryDashboardCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$filter',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.application.session.core.ContextService',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.laboratory.business.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.core.ContextService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller($mdToast, $filter, ProjectFieldCenterService, SessionContextService,
                      UnattachedLaboratoryService, LaboratoryConfigurationService, LaboratoryContextService, LoadingScreenService, LaboratoryViewerService) {
    var self = this;
    const LABORATORY_NOT_FOUND_MESSAGE = "Laboratório não encontrado";
    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";
    self.centers = [];
    self.creationState = false;

    self.$onInit = onInit;
    self.onFilter = onFilter;
    self.createUnattachedLaboratory = createUnattachedLaboratory;
    self.reloadData = reloadData;
    self.changeCreation = changeCreation;
    self.getByIdentification = getByIdentification;

    function onInit() {
      self.laboratoryExists = false;
      LoadingScreenService.start();
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init, LoadingScreenService.finish);
    }

    function _init(){
      self.laboratoryExists = true;
      LaboratoryConfigurationService.getLaboratoryDescriptors();
      let unattachedGroupFilter = LaboratoryContextService.getUnattachedGroupFilter();
      let unattachedCenterFilter = LaboratoryContextService.getUnattachedCenterFilter();

      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        LaboratoryConfigurationService.getQualityControlGroupNames().then(function (result) {
          self.collectGroups = result;
          self.collectGroupsFilter = unattachedGroupFilter ? unattachedGroupFilter : result[0];
          _setUserFieldCenter(unattachedCenterFilter);
          _loadData();
        });
      });
    }

    function reloadData(){
      _loadData();
    }

    function getByIdentification() {
      if(!self.identificationFilter) {
        _showToast('O campo idenficação do laboratório está vazio');
        return;
      }
      UnattachedLaboratoryService.getUnattachedByIdentification(self.identificationFilter).then(function (result) {
        let currentStatus = result.actionHistory[result.actionHistory.length-1].action;
        if (currentStatus === "DISCARDED") {
          self.error = "O laboratório " + result.identification + " foi removido do sistema";
          _showToast(self.error);
        } else if (currentStatus === "ATTACHED") {
          self.error = "O laboratório " + result.identification + " já foi vinculado a um participante";
          _showToast(self.error);
        } else {
          self.haveErrors = false;
          self.unattachedLaboratoryList = [result];
          self.collectGroupsFilter = result.collectGroupName;
          self.centerFilter = result.fieldCenterAcronym;
        }
      }).catch(function (error) {
        self.error = (error.data ? LABORATORY_NOT_FOUND_MESSAGE : UNEXPECTED_ERROR_MESSAGE);
        LoadingScreenService.finish();
        _showToast(self.error);
      });
    }

    function changeCreation() {
      self.creationState = !self.creationState;
    }

    function createUnattachedLaboratory() {
      LoadingScreenService.start();
      let center = self.userHaveCenter ? self.centerFilter : self.selectedCenter;
      UnattachedLaboratoryService.createUnattached(center, self.selectedCollectGroup).then(function () {
        self.collectGroupsFilter = self.selectedCollectGroup;
        self.centerFilter = center;
        onFilter();
        changeCreation();
        LoadingScreenService.finish();
      }).catch(function () {
        _showToast(UNEXPECTED_ERROR_MESSAGE);
        LoadingScreenService.finish();
      });
    }

    function onFilter() {
      LaboratoryContextService.setUnattachedCenterFilter(self.centerFilter);
      LaboratoryContextService.setUnattachedGroupFilter(self.collectGroupsFilter);
      self.identificationFilter = "";
      self.selectedSendings = [];
      LoadingScreenService.start();
      _loadData();
      if (self.updateDataTable){
        self.updateDataTable(self.sendingList);
      }
      LoadingScreenService.finish();
    }

    function _setUserFieldCenter(unattachedCenterFilter) {
      LoadingScreenService.finish();
      self.userHaveCenter = !!self.user.fieldCenter.acronym;
      if (self.user.fieldCenter.acronym){
        self.centerFilter = self.user.fieldCenter.acronym;
      } else {
        self.centerFilter = unattachedCenterFilter ? unattachedCenterFilter : self.centers[0];
      }
      self.centerFilterDisabled = self.user.fieldCenter.acronym ? "disabled" : "";
    }

    function _loadData() {
      UnattachedLaboratoryService.listUnattached(self.collectGroupsFilter, self.centerFilter, 1, 100000)
        .then(function (result) {
          self.haveErrors = false;
          self.unattachedLaboratoryList = result.unattachedLaboratoryList;
          LoadingScreenService.finish();
        })
        .catch(function (error) {
          self.haveErrors = true;
          self.errorMessage = (error.data && error.data.MESSAGE.match("There are no results") ?
            LABORATORY_NOT_FOUND_MESSAGE :
            UNEXPECTED_ERROR_MESSAGE);
          LoadingScreenService.finish();
        });
    }

    function _showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(5000)
      );
    }
  }


}());
