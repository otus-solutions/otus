describe('otusLaboratoryFlagReportListManagerCtrl_UnitTest_Suite', function () {

  var controller;
  var Injections = [];
  var Mock = {};

  beforeEach(function () {
    _mockInjections();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.deploy.FieldCenterRestService', Mock.FieldCenterRestService);
      $provide.value('otusjs.monitoring.business.FlagReportFilterService', Mock.FlagReportFilterService);
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller) {
      Injections.$q = $injector.get('$q');
      Injections.$timeout = $injector.get('$timeout');
      Injections.$rootScope = $injector.get('$rootScope');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.FieldCenterRestService = $injector.get('otusjs.deploy.FieldCenterRestService');
      Injections.DashboardContextService = $injector.get('otusjs.otus.dashboard.core.ContextService');
      Injections.MonitoringService = $injector.get('otusjs.monitoring.business.MonitoringService');
      Injections.ExamStatusHistoryService = $injector.get('otusjs.application.exam.ExamStatusHistoryService');
      Injections.FlagReportFilterService = $injector.get('otusjs.monitoring.business.FlagReportFilterService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller = $controller('otusLaboratoryFlagReportListManagerCtrl', Injections);
    });

    spyOn(Injections.FieldCenterRestService, 'loadCenters').and.callThrough();
    spyOn(Injections.DashboardContextService, 'getLoggedUser').and.callThrough();
    spyOn(Injections.MonitoringService, 'getExamsName').and.callThrough();
    spyOn(Injections.ExamStatusHistoryService, 'listStatus').and.callThrough();
    spyOn(Injections.ExamStatusHistoryService, 'getColors').and.callThrough();
    spyOn(Injections.ExamStatusHistoryService, 'getLabels').and.callThrough();
    spyOn(Injections.MonitoringService, 'getExamsProgressReport').and.callThrough();
    spyOn(Injections.FlagReportFilterService, 'filter').and.callThrough();
    spyOn(Injections.LoadingScreenService, 'start').and.callThrough();
    spyOn(Injections.LoadingScreenService, 'finish').and.callThrough();

    spyOn(window, 'alasql');

    spyOn(controller, 'updatePage').and.callThrough();
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.updateData).toBeDefined();
    expect(controller.updatePage).toBeDefined();
    expect(controller.downloadCSV).toBeDefined();
  });

  it('OnInit_method_should_invoke_internal_methods', function (done) {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();

    controller.$onInit();

    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
    expect(controller.laboratoryExists).toBe(true);
    expect(controller.ready).toEqual(false);
    expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
    expect(Injections.FieldCenterRestService.loadCenters).toHaveBeenCalledTimes(1);
    expect(Injections.ExamStatusHistoryService.getColors).toHaveBeenCalledTimes(1);
    expect(Injections.ExamStatusHistoryService.getLabels).toHaveBeenCalledTimes(1);

    Injections.FieldCenterRestService.loadCenters().then(function () {
      expect(Injections.DashboardContextService.getLoggedUser).toHaveBeenCalledTimes(1);

      Injections.DashboardContextService.getLoggedUser().then(function () {
        expect(Injections.MonitoringService.getExamsName).toHaveBeenCalledTimes(1);
        Injections.MonitoringService.getExamsName().then(function () {
          expect(Injections.ExamStatusHistoryService.listStatus).toHaveBeenCalledTimes(1);
          expect(Injections.MonitoringService.getExamsProgressReport).toHaveBeenCalledTimes(0);

          Injections.MonitoringService.getExamsProgressReport().then(function () {
            expect(controller.ready).toEqual(true);
            expect(controller.error).toEqual(false);
          });
        });
      });
    });
    done();
  });

  describe('updateData_method', function () {
    beforeEach(function () {
      controller.selectedCenter = { acronym: 'RS' };
      controller.centers = [{ acronym: 'RS' }];
    });

    it('should_call_getExamsProgressReport_method', function () {
      controller.updateData(null, null, null, 'BA');
      expect(Injections.MonitoringService.getExamsProgressReport).toHaveBeenCalledTimes(1);
    });

    it('should_update_exams_with_other_exam', function () {
      controller.$onInit();
      controller.filteredExams = {};
      controller.updateData(null, 'EXAM_1', null, 'RS');
      expect(controller.selectedExamName).toEqual('EXAM_1');
    });

    it('should_update_exams_with_other_status', function () {
      Mock.RECEIVED = 1;
      controller.updateData(null, null, Mock.RECEIVED, 'RS');
      expect(controller.selectedStatus).toEqual(Mock.RECEIVED);
    });
  });


  function _mockInjections() {
    Mock.FieldCenterRestService = {
      loadCenters: () => {
        return Promise.resolve([{ name: 'São Paulo', acronym: 'SP' }]);
      }
    };

    Mock.FlagReportFilterService = {
      filter: () => { }
    };
  }

});
