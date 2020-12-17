describe('otusSampleTransportationManagerListCtrl_UnitTest_Suite', function () {

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
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.ContextService = $injector.get('otusjs.laboratory.core.ContextService');
      Injections.MaterialTransportationService = $injector.get('otusjs.laboratory.business.project.transportation.MaterialTransportationService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller = $controller('otusSampleTransportationManagerListCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.handleViewInfoAction).toBeDefined();
    expect(controller.handleDeleteAction).toBeDefined();
    expect(controller.handleChangeAction).toBeDefined();
    expect(controller.updateSelectedLots).toBeDefined();
    expect(controller.newLot).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.LaboratoryViewerService, "checkExistAndRunOnInitOrBackHome").and.callThrough();
    });

    it('onInitMethod should initialized the controller methods', function () {
      controller.$onInit();
      expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
      expect(controller.laboratoryExists).toEqual(true);
    });
  });

  function mock() {
    Mock.LaboratoryViewerService = Test.utils.data.LaboratoryViewerService;
  }
});
