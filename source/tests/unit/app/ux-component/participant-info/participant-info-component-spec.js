describe('otusParticipantInfoCtrl_UnitTest_Suite', function () {
  var ctrl;
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector, $controller) {
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.EventService = $injector.get('otusjs.otus.dashboard.core.EventService');
      Injections.ParticipantEventService = $injector.get('otusjs.participant.core.EventService');
      Injections.DashboardService = $injector.get('otusjs.otus.dashboard.service.DashboardService');

      ctrl = $controller('otusParticipantInfoCtrl', Injections);
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

    ctrl.$onInit();

    expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
    expect(Injections.DashboardService.getSelectedParticipant).toHaveBeenCalledTimes(1);
  });

  it('updateParticipant_method_should_evoke_activateUpdateParticipant', function () {
    spyOn(Injections.ApplicationStateService, 'activateUpdateParticipant').and.returnValue(Promise.resolve(true));

    ctrl.updateParticipant();

    expect(Injections.ApplicationStateService.activateUpdateParticipant).toHaveBeenCalledTimes(1);
  });

});
