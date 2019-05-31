describe('otusDashboardHomeDisplayCtrl_UnitTest_Suite', function () {
  var Mock = {};
  var Injections = [];
  var ctrl;

  beforeEach(function () {
    mockInjections();

    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.module('otusjs.otus.dashboard');
    angular.mock.module(function ($provide) {
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
    });
    angular.mock.module('otusjs.laboratory');
    angular.mock.module('otusjs.otus.laboratory');
    angular.mock.module('otusjs.user');

    angular.mock.inject(function (_$controller_, _$injector_) {
      Injections.$q = _$injector_.get('$q');
      Injections.EventService = _$injector_.get('otusjs.otus.dashboard.core.EventService');
      Injections.ContextService = _$injector_.get('otusjs.otus.dashboard.core.ContextService');
      Injections.ApplicationStateService = _$injector_.get('otusjs.application.state.ApplicationStateService');
      Injections.UserAccessPermissionService = _$injector_.get('otusjs.user.business.UserAccessPermissionService');
      Injections.ParticipantLaboratoryService = _$injector_.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.LoadingScreenService = _$injector_.get('otusjs.deploy.LoadingScreenService');

      ctrl = _$controller_('otusDashboardHomeDisplayCtrl', Injections);

      spyOn(Injections.EventService, "onLogin").and.callThrough();
      spyOn(Injections.ContextService,"getLoggedUser").and.callThrough();
      spyOn(Injections.ParticipantLaboratoryService,"getCheckingExist").and.callThrough();
      spyOn(Injections.UserAccessPermissionService,"getCheckingLaboratoryPermission").and.callThrough();
      spyOn(Injections.ApplicationStateService, "activateMonitoring");
      spyOn(Injections.ApplicationStateService, "activateSampleTransportation");
      spyOn(Injections.ApplicationStateService, "activateParticipantsList");
      spyOn(Injections.ApplicationStateService, "activateExamsLotsManagerList");
      spyOn(Injections.ApplicationStateService, "activateActivityFlagsReport");
      spyOn(Injections.ApplicationStateService, "laboratoryActivityFlagsReport");
      spyOn(Injections.ApplicationStateService, "activateExamSending");
      spyOn(Injections.ApplicationStateService, "activateLaboratoryMonitoring");
      spyOn(Injections.LoadingScreenService, "start");
    });
  });

  it('ctrlExistence_check', function () {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', function () {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.setFocus).toBeDefined();
    expect(ctrl.sendingExam).toBeDefined();
    expect(ctrl.examsDashboard).toBeDefined();
    expect(ctrl.startMonitoring).toBeDefined();
    expect(ctrl.laboratoryMonitoring).toBeDefined();
    expect(ctrl.sampleTransportDashboard).toBeDefined();
    expect(ctrl.managerParticipantsDashboard).toBeDefined();
    expect(ctrl.activateActivityFlagsReport).toBeDefined();
    expect(ctrl.laboratoryActivityFlagsReport).toBeDefined();
  });

  it('onInit_method_should_evoke_internalMethods', function () {
    ctrl.$onInit();
    expect(Injections.EventService.onLogin).toHaveBeenCalledTimes(1);
    expect(Injections.ContextService.getLoggedUser).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantLaboratoryService.getCheckingExist).toHaveBeenCalledTimes(1);
    expect(Injections.UserAccessPermissionService.getCheckingLaboratoryPermission).toHaveBeenCalledTimes(1);
    expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
  });

  it('startMonitoring_method_should_evoke_internalMethods', function () {
    ctrl.startMonitoring();
    expect(Injections.ApplicationStateService.activateMonitoring).toHaveBeenCalledTimes(1);
  });

  it('sampleTransportDashboard_method_should_evoke_internalMethods', function () {
    ctrl.sampleTransportDashboard();
    expect(Injections.ApplicationStateService.activateSampleTransportation).toHaveBeenCalledTimes(1);
  });

  it('managerParticipantsDashboard_method_should_evoke_internalMethods', function () {
    ctrl.managerParticipantsDashboard();
    expect(Injections.ApplicationStateService.activateParticipantsList).toHaveBeenCalledTimes(1);
  });

  it('examsDashboard_method_should_evoke_internalMethods', function () {
    ctrl.examsDashboard();
    expect(Injections.ApplicationStateService.activateExamsLotsManagerList).toHaveBeenCalledTimes(1);
  });

  it('activateActivityFlagsReport_method_should_evoke_internalMethods', function () {
    ctrl.activateActivityFlagsReport();
    expect(Injections.ApplicationStateService.activateActivityFlagsReport).toHaveBeenCalledTimes(1);
  });

  it('laboratoryActivityFlagsReport_method_should_evoke_internalMethods', function () {
    ctrl.laboratoryActivityFlagsReport();
    expect(Injections.ApplicationStateService.laboratoryActivityFlagsReport).toHaveBeenCalledTimes(1);
  });

  it('sendingExam_method_should_evoke_internalMethods', function () {
    ctrl.sendingExam();
    expect(Injections.ApplicationStateService.activateExamSending).toHaveBeenCalledTimes(1);
  });

  it('laboratoryMonitoring_method_should_evoke_internalMethods', function () {
    ctrl.laboratoryMonitoring();
    expect(Injections.ApplicationStateService.activateLaboratoryMonitoring).toHaveBeenCalledTimes(1);
  });

  it('setFocus_method_should_execute', function () {
    spyOn(ctrl, "setFocus").and.callThrough();
    ctrl.setFocus();
    expect(ctrl.setFocus).toHaveBeenCalledTimes(1);
  });

  function mockInjections() {
    Mock.ApplicationStateService = {
      activateMonitoring: function () {
        return Promise.resolve();
      },
      activateSampleTransportation: function () {
        return Promise.resolve();
      },
      activateParticipantsList: function () {
        return Promise.resolve();
      },
      activateExamsLotsManagerList: function () {
        return Promise.resolve();
      },
      activateActivityFlagsReport: function () {
        return Promise.resolve();
      },
      laboratoryActivityFlagsReport: function () {
        return Promise.resolve();
      },
      activateExamSending: function () {
        return Promise.resolve();
      },
      activateLaboratoryMonitoring: function () {
        return Promise.resolve();
      }
    };
    Mock.LoadingScreenService = {
      start:function () {
        return Promise.resolve();
      }
    };
  }
});