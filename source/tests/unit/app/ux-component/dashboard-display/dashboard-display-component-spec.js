describe('otusDashboardDisplay_UnitTest_Suite', function () {
  var ctrl;
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector, $controller) {
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.UserAccessPermissionService = $injector.get('otusjs.user.business.UserAccessPermissionService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.EventService = $injector.get('otusjs.otus.dashboard.core.EventService');
      Injections.DashboardService = $injector.get('otusjs.otus.dashboard.service.DashboardService');
      Injections.ParticipantLabelFactory = $injector.get('otusjs.participant.business.ParticipantLabelFactory');
      Injections.Publisher = $injector.get('otusjs.otus.uxComponent.Publisher');
      Injections.ParticipantFactory = $injector.get('otusjs.model.participant.ParticipantFactory');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');

      ctrl =  $controller('otusDashboardDisplayCtrl', Injections);
    });
  });

  it('ctrlExistence_check', function () {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', function () {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.updateParticipant).toBeDefined();
  });

  it('onInit_method_should_evoke_internalMethods', function () {
    spyOn(Injections.EventService, 'onParticipantSelected').and.callThrough();
    spyOn(Injections.DashboardService, 'getSelectedParticipant').and.returnValue(Promise.resolve({}));
    spyOn(Injections.ParticipantLaboratoryService, 'getCheckingExist').and.returnValue(Promise.resolve(true));
    spyOn(Injections.UserAccessPermissionService, 'getCheckingLaboratoryPermission').and.returnValue(Promise.resolve(true));

    ctrl.$onInit();

    expect(Injections.DashboardService.getSelectedParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantLaboratoryService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

  it('updateParticipant_method_should_evoke_activateUpdateParticipant', function () {
    spyOn(Injections.ApplicationStateService, 'activateUpdateParticipant').and.returnValue(Promise.resolve(true));

    ctrl.updateParticipant();

    expect(Injections.ApplicationStateService.activateUpdateParticipant).toHaveBeenCalledTimes(1);
  });

});
