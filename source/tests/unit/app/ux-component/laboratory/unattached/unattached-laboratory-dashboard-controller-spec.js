describe('unattachedLaboratoryDashboardCtrl_UnitTest_Suite', function () {

  let Mock = {};
  let Injections = [];
  let controller = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    mock();

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Mock.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller) {
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$filter = $injector.get('$filter');
      Injections.ProjectFieldCenterService = $injector.get('otusjs.deploy.FieldCenterRestService');
      Injections.SessionContextService = $injector.get('otusjs.application.session.core.ContextService');
      Injections.UnattachedLaboratoryService = $injector.get('otusjs.laboratory.business.unattached.UnattachedLaboratoryService');
      Injections.LaboratoryConfigurationService = $injector.get('otusjs.laboratory.business.configuration.LaboratoryConfigurationService');
      Injections.LaboratoryContextService = $injector.get('otusjs.laboratory.core.ContextService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller = $controller('unattachedLaboratoryDashboardCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.onFilter).toBeDefined();
    expect(controller.createUnattachedLaboratory).toBeDefined();
    expect(controller.reloadData).toBeDefined();
    expect(controller.changeCreation).toBeDefined();
    expect(controller.getByIdentification).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.LaboratoryViewerService, "checkExistAndRunOnInitOrBackHome").and.callThrough();
      spyOn(Injections.LaboratoryConfigurationService, "getLaboratoryDescriptors").and.callThrough();
      spyOn(Injections.LaboratoryContextService, "getUnattachedGroupFilter");
      spyOn(Injections.LaboratoryContextService, "getUnattachedCenterFilter");
      spyOn(Injections.ProjectFieldCenterService, "loadCenters").and.returnValue(Promise.resolve());
      spyOn(Injections.LaboratoryConfigurationService, "getQualityControlGroupNames").and.returnValue(Promise.resolve());
      spyOn(Injections.LoadingScreenService, "start").and.callThrough();
      spyOn(Injections.LoadingScreenService, "finish");
    });

    it('onInitMethod should initialized the controller methods', function () {
      controller.$onInit();

      expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
      expect(Injections.LaboratoryConfigurationService.getLaboratoryDescriptors).toHaveBeenCalledTimes(1);
      expect(Injections.LaboratoryContextService.getUnattachedGroupFilter).toHaveBeenCalledTimes(1);
      expect(Injections.LaboratoryContextService.getUnattachedCenterFilter).toHaveBeenCalledTimes(1);
      expect(Injections.ProjectFieldCenterService.loadCenters).toHaveBeenCalledTimes(1);
      expect(controller.laboratoryExists).toEqual(true);
    });

  });

  function mock() {
    Mock.LaboratoryViewerService = Test.utils.data.LaboratoryViewerService;
  }
});
