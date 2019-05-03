describe('otusParticipantHeatmap test', function () {
  var Mock = {};
  var ctrl;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');

    Mock.LoadingScreenService = {
      start: function () { },
      finish: function () { }
    };

    Mock.$mdDialog = {
      show: function () {
        return Promise.resolve({ doesNotApply: true })
      }
    };

    Mock.DashboardService = {
      getSelectedParticipant: function () {
        return Promise.resolve();
      }
    };

    Mock.EventService = {
      onParticipantSelected: function () {
        return Promise.resolve();
      }
    };

    Mock.ParticipantMonitoringService = {
      defineActivityWithDoesNotApplies: function () {
        if (ctrl.selectedParticipant.recruitmentNumber === 122346) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      deleteNotAppliesOfActivity: function () {
        if (ctrl.selectedParticipant.recruitmentNumber === 122346) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      buildActivityStatusList: function () {
        if (ctrl.selectedParticipant.recruitmentNumber === 122346) {
          return Promise.resolve([]);
        } else {
          return Promise.reject();
        }
      },
      buildActivityStatus: function () {
        return [];
      }
    };

    Mock.ApplicationStateService = {
      getCurrentState: function () { }
    };

    angular.mock.module(function ($provide) {
      $provide.value('$q', Mock.$q);
      $provide.value('$timeout', Mock.$timeout);
      $provide.value('otusFlagReportParseDataFactory', Mock.FlagReportParseData);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('otusjs.deploy.FieldCenterRestService', Mock.FieldCenterRestService);
      $provide.value('otusjs.otus.dashboard.core.ContextService', Mock.DashboardContextService);
      $provide.value('otusjs.application.exam.ExamStatusHistoryService', Mock.ExamStatusHistoryService);
      $provide.value('otusjs.monitoring.repository.FlagReportMonitoringService', Mock.FlagReportMonitoringService);
    });

    inject(function (_$injector_, _$controller_) {

      Injections = {
        $q: _$injector_.get('$q'),
        $timeout: _$injector_.get('$timeout'),
        FlagReportParseData: _$injector_.get('otusFlagReportParseDataFactory'),
        LoadingScreenService: _$injector_.get('otusjs.deploy.LoadingScreenService'),
        FieldCenterRestService: _$injector_.get('otusjs.deploy.FieldCenterRestService'),
        DashboardContextService: _$injector_.get('otusjs.otus.dashboard.core.ContextService'),
        ExamStatusHistoryService: _$injector_.get('otusjs.application.exam.ExamStatusHistoryService'),
        FlagReportMonitoringService: _$injector_.get('otusjs.monitoring.repository.FlagReportMonitoringService'),
      };

      ctrl = _$controller_('otusParticipantHeatmapCtrl', Injections);
    });
  });

});

