describe('otusParticipantHeatmap test', function() {
  var Mock = {};
  var ctrl;
  var Injections = {};

  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent');

    Mock.DashboardService = {
      getSelectedParticipant: function () {
        return Promise.resolve("{}");
      }
    };

    Mock.EventService = {
      onParticipantSelected: function () {
        return Promise.resolve();
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.otus.dashboard.core.EventService', Mock.EventService);
      $provide.value('otusjs.application.state.ApplicationStateService', {});
      $provide.value('otusjs.otus.dashboard.service.DashboardService', Mock.DashboardService);
      $provide.value('otusjs.monitoring.business.ParticipantMonitoringService', {});
      $provide.value('$scope', {});
    });

    inject(function(_$injector_, _$controller_) {

      Injections = {
        $scope: _$injector_.get('$scope'),
        $mdDialog: _$injector_.get('$mdDialog'),
        $mdToast: _$injector_.get('$mdToast'),
        EventService: _$injector_.get('otusjs.otus.dashboard.core.EventService'),
        ApplicationStateService: _$injector_.get('otusjs.application.state.ApplicationStateService'),
        DashboardService: _$injector_.get('otusjs.otus.dashboard.service.DashboardService'),
        ParticipantMonitoringService: _$injector_.get('otusjs.monitoring.business.ParticipantMonitoringService')
      };

      ctrl = _$controller_('otusParticipantHeatmapCtrl', Injections);
    });
  });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(Injections.EventService, 'onParticipantSelected').and.callThrough();
      spyOn(Injections.DashboardService, 'getSelectedParticipant').and.callThrough();
      ctrl.$onInit();
    });

    it('should onInit be defined', () => {
        expect(ctrl.$onInit).not.toBeNull();
        expect(ctrl.$onInit).toHaveBeenCalled();
    });

  });
});
