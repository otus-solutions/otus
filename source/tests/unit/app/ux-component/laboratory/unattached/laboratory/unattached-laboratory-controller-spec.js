describe('unattachedLaboratoryCtrl_UnitTest_Suite', function () {

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
      Injections.$q = $injector.get('$q');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$timeout = $injector.get('$timeout');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.UnattachedLaboratoryService = $injector.get('otusjs.laboratory.business.unattached.UnattachedLaboratoryService');
      Injections.LaboratoryLabelFactory = $injector.get('otusjs.laboratory.business.participant.LaboratoryLabelFactory');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.LaboratoryConfigurationService = $injector.get('otusjs.laboratory.configuration.LaboratoryConfigurationService');
      Injections.LaboratoryLocalStorageService = $injector.get('otusjs.laboratory.storage.LaboratoryLocalStorageService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller = $controller('unattachedLaboratoryCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.attacheLaboratory).toBeDefined();
    expect(controller.generateLabels).toBeDefined();
    expect(controller.discardUnattached).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.LaboratoryViewerService, "checkExistAndRunOnInitOrBackHome").and.callThrough();
    });

    it('onInitMethod should initialized the controller methods', function () {
      controller.$onInit();

      expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
    });

  });

  function mock() {
    Mock.LaboratoryViewerService = Test.utils.data.LaboratoryViewerService;
  }
});
