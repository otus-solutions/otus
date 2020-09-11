describe('ParticipantDashboardComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller) => {
      Injections.STATE = $injector.get('STATE');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.EventService = $injector.get('otusjs.otus.dashboard.core.EventService');
      Injections.DashboardService = $injector.get('otusjs.otus.dashboard.service.DashboardService');

      ctrl = $controller('participantDashboardCtrl', Injections);

      spyOn(Injections.ApplicationStateService, "getCurrentState").and.returnValue(Injections.STATE.PARTICIPANT_DASHBOARD);
      spyOn(Injections.EventService, "onParticipantSelected").and.callThrough();
      spyOn(Injections.DashboardService, "getSelectedParticipant").and.returnValue(Promise.resolve());
    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.getCurrentState).toBeDefined();
    expect(ctrl.getSelectedState).toBeDefined();
    expect(ctrl.selectParticipant).toBeDefined();
  });

  it('selectParticipantMethod_should_return_object', () => {
    Mock.selectedParticipant = { participant: 'test' };
    ctrl.selectParticipant(Mock.selectedParticipant)
    expect(ctrl.selectedParticipant).toEqual(Mock.selectedParticipant);
  });

  it('loadSelectedParticipantMethod_should_execute_onInit', () => {
    ctrl.$onInit();
    expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
    expect(Injections.DashboardService.getSelectedParticipant).toHaveBeenCalledTimes(1);
  });

  it('getCurrentStateMethod_should_return_state', () => {
    expect(ctrl.getCurrentState()).toEqual(Injections.STATE.PARTICIPANT_DASHBOARD);
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(1);
  });

  it('getSelectedStateMethod_should_return_boolean_true', () => {
    expect(ctrl.getSelectedState()).toBe(true);
  });

});

