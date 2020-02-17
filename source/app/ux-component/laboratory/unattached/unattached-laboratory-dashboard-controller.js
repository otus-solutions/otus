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
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdToast, $filter, ProjectFieldCenterService, SessionContextService, UnattachedLaboratoryService, LaboratoryConfigurationService, laboratoryContextService, LoadingScreenService) {
    var self = this;
    self.centers = [];
    self.creationState = false;

    self.$onInit = onInit;
    self.onFilter = onFilter;
    self.createUnattachedLaboratory = createUnattachedLaboratory;
    self.reloadData = reloadData;
    self.changeCreation = changeCreation;
    self.getByIdentification = getByIdentification;

    function onInit() {
      LaboratoryConfigurationService.getLaboratoryDescriptors();
      LoadingScreenService.start();
      let unattachedGroupFilter = laboratoryContextService.getUnattachedGroupFilter();
      let unattachedCenterFilter = laboratoryContextService.getUnattachedCenterFilter();

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
      UnattachedLaboratoryService.getUnattachedByIdentification(self.identificationFilter).then(function (result) {
        self.haveErrors = false;
        self.unattachedLaboratoryList = [result];
        self.collectGroupsFilter=result.collectGroupName;
        self.centerFilter=result.fieldCenterAcronym;
        console.log(result)
      }).catch(function (error) {
        console.log(error)
      })
    }

    function changeCreation() {
      self.creationState = !self.creationState;
    }

    function createUnattachedLaboratory() {
      LoadingScreenService.start();
      UnattachedLaboratoryService.createUnattached(self.selectedCenter, self.selectedCollectGroup).then(function () {
        self.collectGroupsFilter=self.selectedCollectGroup;
        self.centerFilter=self.selectedCenter;
        onFilter();
        changeCreation();
        LoadingScreenService.finish();
      }).catch(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Ocorreu um erro, entre em contato com o administrador do sistema")
            .hideDelay(3000)
        );
        LoadingScreenService.finish();
      });
    }

    function onFilter() {
      laboratoryContextService.setUnattachedCenterFilter(self.centerFilter);
      laboratoryContextService.setUnattachedGroupFilter(self.collectGroupsFilter);
      self.identificationFilter = "";
      self.selectedSendings = [];
      LoadingScreenService.start();
      _loadData();
      if (self.updateDataTable)
        self.updateDataTable(self.sendingList);
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
      UnattachedLaboratoryService.listUnattached(self.collectGroupsFilter, self.centerFilter,1,100000).then(function (result) {
        self.haveErrors = false;
        self.unattachedLaboratoryList = result.unattachedLaboratoryList;
        LoadingScreenService.finish();
      }).catch(function (error) {
        self.haveErrors = true;
        if (error.data) {
          if (error.data.MESSAGE.match("There are no results")) {
            self.errorMessage = "Não há laboratórios criados para estas especificações";
          } else {
            self.errorMessage = "Ocorreu um erro, entre em contato com o administrador do sistema";
          }
        } else {
          self.errorMessage = "Ocorreu um erro, entre em contato com o administrador do sistema";
        }
        LoadingScreenService.finish();
      });
    }
  }
}());
