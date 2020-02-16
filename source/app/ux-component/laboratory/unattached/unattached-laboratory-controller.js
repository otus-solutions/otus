(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('unattachedLaboratoryCtrl', Controller);

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
    self.attacheLaboratory = attacheLaboratory;
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

    function attacheLaboratory() {
      self.attacheError = null;
      LoadingScreenService.start();
      UnattachedLaboratoryService.attacheLaboratory(self.laboratoryIdentification).then(function () {
        LoadingScreenService.finish();
      }).catch(function (error) {
        self.attacheHaveErrors = true;
        if (error.data) {
          if (error.data.MESSAGE.match("Laboratory not found")) {
            self.attacheError = "Laboratório não encontrado";
          } else if (error.data.MESSAGE.match("Laboratory is already attached")) {
            self.attacheError = "Laboratório já foi vinculado a um participante";
          } else if (error.data.MESSAGE.match("Invalid configuration")) {
            if (error.data.CONTENT.laboratoryCollectGroup !== error.data.CONTENT.participantCollectGroup) {
              self.attacheError = "O laboratório e o participante devem pertencer ao mesmo grupo de controle de qualidade";
            }
            if (error.data.CONTENT.laboratoryFieldCenter !== error.data.CONTENT.participantFieldCenter) {
              if (self.attacheError) {
                self.attacheError += " e " + "ao mesmo centro"
              } else {
                self.attacheError = "O laboratório e o participante devem pertencer ao mesmo centro";
              }
            }
          } else {
            self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
          }
        } else {
          self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
        }
        LoadingScreenService.finish();
      });
    }
  }
}());
