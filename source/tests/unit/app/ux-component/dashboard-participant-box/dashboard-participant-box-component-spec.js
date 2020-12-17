describe('otusParticipantBoxCtrl_UnitTest_Suite', function () {
  var Mock = {};
  var Injections = [];
  var ctrl;

  beforeEach(function () {
    mockInjections();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
    });

    angular.mock.inject(function ($controller, $injector) {
      Injections.EventService = $injector.get('otusjs.otus.dashboard.core.EventService');
      Injections.DashboardService = $injector.get('otusjs.otus.dashboard.service.DashboardService');
      Injections.UserAccessPermissionService = $injector.get('otusjs.user.business.UserAccessPermissionService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');

      ctrl = $controller('otusParticipantBoxCtrl', Injections, Mock.onClose);
    });
  });

  it('ctrlExistence_check', function () {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', function () {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.loadParticipantActivities).toBeDefined();
    expect(ctrl.loadParticipantReports).toBeDefined();
    expect(ctrl.loadLaboratory).toBeDefined();
    expect(ctrl.home).toBeDefined();
    expect(ctrl.onClose).toBeDefined();
  });

  it('onInit_method_should_evoke_internalMethods', function () {
    spyOn(Injections.EventService, "onParticipantSelected").and.callThrough();
    spyOn(Injections.DashboardService,"getSelectedParticipant").and.returnValue(Promise.resolve({}));
    spyOn(Injections.ParticipantLaboratoryService,"getCheckingExist").and.returnValue(Promise.resolve(true));
    spyOn(Injections.UserAccessPermissionService,"getCheckingLaboratoryPermission").and.returnValue(Promise.resolve(true));

    ctrl.$onInit();

    expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
    expect(Injections.DashboardService.getSelectedParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantLaboratoryService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

  it('home_method_should_evoke_internalMethods', function () {
    spyOn(Injections.ApplicationStateService, "activateParticipantDashboard");
    ctrl.home();
    expect(Injections.ApplicationStateService.activateParticipantDashboard).toHaveBeenCalledTimes(1);
  });

  it('loadParticipantActivities_method_should_evoke_internalMethods', function () {
    spyOn(Injections.ApplicationStateService, "activateParticipantActivities");
    ctrl.loadParticipantActivities();
    expect(Injections.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledTimes(1);
  });

  it('loadParticipantReports_method_should_evoke_internalMethods', function () {
    spyOn(Injections.ApplicationStateService, "activateParticipantReports");
    ctrl.loadParticipantReports();
    expect(Injections.ApplicationStateService.activateParticipantReports).toHaveBeenCalledTimes(1);
  });

  it('loadLaboratory_method_should_evoke_internalMethods', function () {
    spyOn(Injections.ApplicationStateService, "activateLaboratory");
    ctrl.loadLaboratory();
    spyOn(document, "querySelector").and.returnValue({focus:function(){}});
    expect(Injections.ApplicationStateService.activateLaboratory).toHaveBeenCalledTimes(1);
  });

  function mockInjections() {
    Mock.ApplicationStateService = {
      activateParticipantDashboard: function () {
        return Promise.resolve();
      },
      activateParticipantActivities: function () {
        return Promise.resolve();
      },
      activateParticipantReports: function () {
        return Promise.resolve();
      },
      activateLaboratory: function () {
        return Promise.resolve();
      }
    };
    Mock.onClose = {
      onClose: function () {
        return Promise.resolve();
      }
    }
  }
});
