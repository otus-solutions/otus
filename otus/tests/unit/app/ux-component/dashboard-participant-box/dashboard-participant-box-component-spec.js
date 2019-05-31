describe('otusParticipantBoxCtrl_UnitTest_Suite', function () {
  var Mock = {};
  var Injections = [];
  var ctrl;

  beforeEach(function () {
    mockInjections();

    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.module('otusjs.otus.dashboard');
    angular.mock.module(function ($provide) {
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
    });
    angular.mock.module('otusjs.laboratory');
    angular.mock.module('otusjs.otus.laboratory');
    angular.mock.module('otusjs.user');

    angular.mock.inject(function (_$controller_, _$injector_) {
      Injections.EventService = _$injector_.get('otusjs.otus.dashboard.core.EventService');
      Injections.DashboardService = _$injector_.get('otusjs.otus.dashboard.service.DashboardService');
      Injections.ApplicationStateService = _$injector_.get('otusjs.application.state.ApplicationStateService');
      Injections.UserAccessPermissionService = _$injector_.get('otusjs.user.business.UserAccessPermissionService');
      Injections.ParticipantLaboratoryService = _$injector_.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');

      ctrl = _$controller_('otusParticipantBoxCtrl', Injections, Mock.onClose);

      spyOn(Injections.EventService, "onParticipantSelected").and.callThrough();
      spyOn(Injections.DashboardService,"getSelectedParticipant").and.callThrough();
      spyOn(Injections.ParticipantLaboratoryService,"getCheckingExist").and.callThrough();
      spyOn(Injections.UserAccessPermissionService,"getCheckingLaboratoryPermission").and.callThrough();
      spyOn(Injections.ApplicationStateService, "activateParticipantDashboard");
      spyOn(Injections.ApplicationStateService, "activateParticipantActivities");
      spyOn(Injections.ApplicationStateService, "activateParticipantReports");
      spyOn(Injections.ApplicationStateService, "activateLaboratory");
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
    ctrl.$onInit();
    expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
    expect(Injections.DashboardService.getSelectedParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantLaboratoryService.getCheckingExist).toHaveBeenCalledTimes(1);
    expect(Injections.UserAccessPermissionService.getCheckingLaboratoryPermission).toHaveBeenCalledTimes(1);
  });

  it('home_method_should_evoke_internalMethods', function () {
    ctrl.home();
    expect(Injections.ApplicationStateService.activateParticipantDashboard).toHaveBeenCalledTimes(1);
  });

  it('loadParticipantActivities_method_should_evoke_internalMethods', function () {
    ctrl.loadParticipantActivities();
    expect(Injections.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledTimes(1);
  });

  it('loadParticipantReports_method_should_evoke_internalMethods', function () {
    ctrl.loadParticipantReports();
    expect(Injections.ApplicationStateService.activateParticipantReports).toHaveBeenCalledTimes(1);
  });

  it('loadLaboratory_method_should_evoke_internalMethods', function () {
    ctrl.loadLaboratory();
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