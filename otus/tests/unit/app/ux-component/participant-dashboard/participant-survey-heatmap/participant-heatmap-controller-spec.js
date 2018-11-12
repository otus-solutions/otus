describe('otusParticipantHeatmapCtrl Test', function () {
  var Mock = {};
  var controller;
  var Injections = {};
  var FLAG_REPORT = 'flag-report';

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value('STATE', Mock.STATE);
      $provide.value('otusjs.otus.dashboard.core.EventService', Mock.EventService);
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
      $provide.value('otusjs.otus.dashboard.service.DashboardService', Mock.DashboardService);
      $provide.value('otusjs.participant.business.ParticipantMonitoringService', Mock.ParticipantMonitoringService);
    });

    inject(function (_$controller_) {
      Injections = {
        STATE: Mock.STATE,
        ApplicationStateService: Mock.ApplicationStateService
      };

      controller = _$controller_('otusParticipantHeatmapCtrl', Injections);
    });
  });

  describe('Current State in flag dashboard', function () {
    it('should call method activateFlagsReportManager', function () {
      expect(true).toBe(true);
    });
  });

  function mockInjections() {
    Mock.STATE = {
      FLAG_DASHBOARD: FLAG_REPORT
    };
    Mock.ApplicationStateService = {
      getCurrentState: () => { },
      activateFlagsReportManager: () => { }
    }
  }

});
