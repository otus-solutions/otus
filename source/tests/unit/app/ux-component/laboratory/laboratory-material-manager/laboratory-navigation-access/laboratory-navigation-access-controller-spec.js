describe('laboratoryMaterialManagerDashboardCtrl_UnitTest_Suite', () => {
  let controller;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(($injector, $controller) => {
      Injections.UserAccessPermissionService = $injector.get('otusjs.user.business.UserAccessPermissionService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller = $controller('laboratoryNavigationAccessCtrl', Injections);
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.$onInit).toBeDefined();
    expect(controller.sampleTransportDashboard).toBeDefined();
    expect(controller.unattachedLaboratory).toBeDefined();
    expect(controller.examsDashboard).toBeDefined();
    expect(controller.sendingExam).toBeDefined();
  });

  it('onInit_method_should_invoke_internal_methods', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
    spyOn(Injections.UserAccessPermissionService, 'getCheckingLaboratoryPermission').and.returnValue(Promise.resolve(true));
    controller.$onInit();
    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
  });

  it('sampleTransportDashboard_method_should_call_activateSampleTransportation_state', () => {
    spyOn(Injections.ApplicationStateService, 'activateSampleTransportation');
    controller.sampleTransportDashboard();
    expect(Injections.ApplicationStateService.activateSampleTransportation).toHaveBeenCalledTimes(1);
  });

  it('unattachedLaboratory_method_should_call_activateUnattachedLaboratory_state', () => {
    spyOn(Injections.ApplicationStateService, 'activateUnattachedLaboratory');
    controller.unattachedLaboratory();
    expect(Injections.ApplicationStateService.activateUnattachedLaboratory).toHaveBeenCalledTimes(1);
  });

  it('examsDashboard_method_should_call_activateExamsLotsManagerList_state', () => {
    spyOn(Injections.ApplicationStateService, 'activateExamsLotsManagerList');
    controller.examsDashboard();
    expect(Injections.ApplicationStateService.activateExamsLotsManagerList).toHaveBeenCalledTimes(1);
  });

  it('sendingExam_method_should_call_activateExamSending_state', () => {
    spyOn(Injections.ApplicationStateService, 'activateExamSending');
    controller.sendingExam();
    expect(Injections.ApplicationStateService.activateExamSending).toHaveBeenCalledTimes(1);
  });

});
