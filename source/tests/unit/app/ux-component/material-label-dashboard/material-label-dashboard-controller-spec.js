describe('materialLabelDashboardCtrl_UnitTest_Suite', function () {

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
      Injections.Publisher = $injector.get('otusjs.otus.uxComponent.Publisher');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.LaboratoryLocalStorageService = $injector.get('otusjs.laboratory.storage.LaboratoryLocalStorageService');
      Injections.UserAccessPermissionService = $injector.get('otusjs.user.business.UserAccessPermissionService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller = $controller('materialLabelDashboardCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.changeState).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.LaboratoryViewerService, "checkExistAndRunOnInitOrBackHome").and.callThrough();
      spyOn(Injections.LaboratoryLocalStorageService, "find").and.returnValue([Mock.LaboratoryLocalStorageServiceFind]);
      spyOn(Injections.UserAccessPermissionService, "getCheckingLaboratoryPermission").and.returnValue(Promise.resolve());
      spyOn(Injections.ParticipantManagerService, "setup").and.returnValue(Promise.resolve());
      spyOn(Injections.ParticipantLaboratoryService,"getLaboratoryByParticipant").and.returnValue(Promise.resolve());
    });

    it('onInitMethod should initialized the controller methods', function () {
      controller.$onInit();
      expect(Injections.UserAccessPermissionService.getCheckingLaboratoryPermission).toHaveBeenCalledTimes(1);
      expect(Injections.LaboratoryLocalStorageService.find).toHaveBeenCalledTimes(1);
      expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
      expect(Injections.ParticipantManagerService.setup).toHaveBeenCalledTimes(1);

      expect(controller.laboratoryChecking).toEqual(true);
    });

  });

  function mock() {
    Mock.LaboratoryViewerService = Test.utils.data.LaboratoryViewerService;
    Mock.LaboratoryLocalStorageServiceFind = {
      type: 'laboratoryParticipantLabel'
    }
  }
});
