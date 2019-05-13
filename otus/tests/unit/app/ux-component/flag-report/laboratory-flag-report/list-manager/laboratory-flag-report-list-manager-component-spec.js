describe('otusLaboratoryFlagReportListManagerCtrl Test', function () {
  var Mock = {};
  var controller;
  var Injections = {};

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value('otusjs.deploy.FieldCenterRestService', Mock.ProjectFieldCenterService);
      $provide.value('otusjs.monitoring.business.MonitoringService', Mock.MonitoringService);
      $provide.value('otusjs.application.exam.ExamStatusHistoryService', Mock.StatusHistoryService);
      $provide.value('otusjs.otus.dashboard.core.ContextService', Mock.dashboardContextService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('otusjs.monitoring.business.FlagReportFilterService', Mock.FlagReportFilterService);
      $provide.value('$q', Mock.$q);
      $provide.value('$timeout', Mock.$timeout);
    });

    inject(function (_$controller_) {
      controller = _$controller_('otusLaboratoryFlagReportListManagerCtrl');
    });

    spyOn(Mock.ProjectFieldCenterService, 'loadCenters').and.callThrough();
    spyOn(Mock.dashboardContextService, 'getLoggedUser').and.callThrough();
    spyOn(Mock.MonitoringService, 'getExamsName').and.callThrough();
    spyOn(Mock.StatusHistoryService, 'listStatus').and.callThrough();
    spyOn(Mock.StatusHistoryService, 'getColors').and.callThrough();
    spyOn(Mock.StatusHistoryService, 'getLabels').and.callThrough();
    spyOn(Mock.MonitoringService, 'getExamsProgressReport').and.callThrough();
    spyOn(Mock.FlagReportFilterService, 'filter').and.callThrough();
    spyOn(Mock.LoadingScreenService, 'start').and.callThrough();
    spyOn(Mock.LoadingScreenService, 'finish').and.callThrough();

    spyOn(window, 'alasql');

    spyOn(controller, 'updatePage').and.callThrough();
  });

  it('should initialize the component', function (done) {
    controller.$onInit();
    expect(controller.ready).toEqual(false);
    expect(Mock.LoadingScreenService.start).toHaveBeenCalledTimes(1);
    expect(Mock.ProjectFieldCenterService.loadCenters).toHaveBeenCalledTimes(1);
    expect(Mock.StatusHistoryService.getColors).toHaveBeenCalledTimes(1);
    expect(Mock.StatusHistoryService.getLabels).toHaveBeenCalledTimes(1);

    Mock.ProjectFieldCenterService.loadCenters().then(function () {

      expect(Mock.dashboardContextService.getLoggedUser).toHaveBeenCalledTimes(1);

      Mock.dashboardContextService.getLoggedUser().then(function () {

        expect(Mock.MonitoringService.getExamsName).toHaveBeenCalledTimes(1);

        Mock.MonitoringService.getExamsName().then(function () {
          expect(Mock.StatusHistoryService.listStatus).toHaveBeenCalledTimes(1);
          expect(Mock.MonitoringService.getExamsProgressReport).toHaveBeenCalledTimes(1);

          Mock.MonitoringService.getExamsProgressReport().then(function () {
            expect(controller.ready).toEqual(true);
            expect(controller.error).toEqual(false);
          });
        });
      });
    });
    done();
  });

  describe('updateData method', function () {
    beforeEach(function () {
      controller.selectedCenter = { acronym: 'RS' };
      controller.centers = [{ acronym: 'RS' }];
    });

    it('should call getExamsProgressReport function', function () {
      controller.updateData(null, null, null, 'BA');
      expect(Mock.MonitoringService.getExamsProgressReport).toHaveBeenCalledTimes(2);
    });

    it('should update exams with other exam', function () {
      controller.updateData(null, 'EXAM_1', null, 'RS');

      expect(controller.selectedExamName).toEqual('EXAM_1');
    });

    it('should update exams with other status', function () {
      controller.updateData(null, null, Mock.RECEIVED, 'RS');

      expect(controller.selectedStatus).toEqual(Mock.RECEIVED);
    });
  });


  function mockInjections() {

    Mock.UNREALIZED = 0;
    Mock.RECEIVED = 1;

    Mock.ProjectFieldCenterService = {
      loadCenters: () => {
        return Promise.resolve([{ name: 'São Paulo', acronym: 'SP' }]);
      }
    };

    Mock.StatusHistoryService = {
      getColors: () => {
        return [];
      },
      getLabels: () => {
        return [];
      },
      listStatus: () => {
        return [];
      }
    };

    Mock.MonitoringService = {
      getExamsName: () => {
        return Promise.resolve([]);
      },
      getExamsProgressReport: (center) => {
        return Promise.resolve({
          columns: [["C", "EXAM_1"], ["C", "EXAM_2"]],
          data: [[1, 1], [1, 0]],
          index: [123456, 123457]
        });
      }
    };

    Mock.dashboardContextService = {
      getLoggedUser: () => {
        return Promise.resolve({ fieldCenter: { acronym: 'SP' } });
      }
    };

    Mock.LoadingScreenService = {
      start: () => { },
      finish: () => { }
    };

    Mock.FlagReportFilterService = {
      filter: () => { }
    }

  }

});
