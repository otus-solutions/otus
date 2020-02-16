(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('unattachedLaboratoryDashboardCtrl', Controller);

  Controller.$inject = [
    '$filter',
    'otusjs.deploy.FieldCenterRestService',
    'otusjs.application.session.core.ContextService',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.laboratory.business.configuration.LaboratoryConfigurationService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($filter, ProjectFieldCenterService, SessionContextService, UnattachedLaboratoryService, LaboratoryConfigurationService, LoadingScreenService) {
    var self = this;
    self.centers = [];

    self.$onInit = onInit;
    self.onFilter = onFilter;

    function onInit() {
      SessionContextService.restore();
      LoadingScreenService.start();
      ProjectFieldCenterService.loadCenters().then(function (result) {
        self.centers = $filter('orderBy')(self.centers);
        result.forEach(function (fieldCenter) {
          self.centers.push(fieldCenter.acronym)
        });
        LaboratoryConfigurationService.getQualityControlGroupNames().then(function (result) {
          self.collectGroups = result;
          self.collectGroupsFilter = result[0];
          _setUserFieldCenter();
          _loadData();
        });
      });
    }

    function onFilter() {
      self.selectedSendings = [];
      LoadingScreenService.start();
      _loadData();
      if (self.updateDataTable)
        self.updateDataTable(self.sendingList);
      LoadingScreenService.finish();
    }

    function _setUserFieldCenter() {
      LoadingScreenService.finish();
      self.userHaveCenter = !!self.user.fieldCenter.acronym;
      self.centerFilter = self.centers[0];
      self.centerFilterDisabled = self.user.fieldCenter.acronym ? "disabled" : "";
    }

    function _loadData() {
      UnattachedLaboratoryService.listUnattached(self.collectGroupsFilter, self.centerFilter,1,100000).then(function (result) {
        self.unattachedLaboratoryList = result.unattachedLaboratoryList;
        LoadingScreenService.finish();
      }).catch(function (error) {

      });
    }
  }
}());
