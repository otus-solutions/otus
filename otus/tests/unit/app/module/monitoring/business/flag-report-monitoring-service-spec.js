describe('FlagReportMonitoringService Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.monitoring.business', function ($provide) {
      $provide.value('otusjs.monitoring.repository.FlagReportMonitoringService', Mock.FlagReportMonitoringService);
    });

    inject(function (_$injector_) {
      Injections = {
        FlagReportMonitoringService: Mock.FlagReportMonitoringService
      };

      service = _$injector_.get('otusjs.monitoring.repository.FlagReportMonitoringService', Injections);
    });

    spyOn(Mock.FlagReportMonitoringService, "find").and.callThrough();
    spyOn(Mock.FlagReportMonitoringService, "listAcronyms").and.callThrough();
    spyOn(Mock.FlagReportMonitoringService, "listCenters").and.callThrough();
    spyOn(Mock.FlagReportMonitoringService, "getActivitiesProgressReport").and.callThrough();
    spyOn(Mock.FlagReportMonitoringService, "getExamsName").and.callThrough();
    spyOn(Mock.FlagReportMonitoringService, "getExamsProgressReport").and.callThrough();
  });


  it('should call method find', function () {
    service.find("CISE");
    expect(Mock.FlagReportMonitoringService.find).toHaveBeenCalledTimes(1);
    expect(Mock.FlagReportMonitoringService.find).toHaveBeenCalledWith("CISE");
  });

  it('should call method listAcronyms', function () {
    service.listAcronyms();
    expect(Mock.FlagReportMonitoringService.listAcronyms).toHaveBeenCalledTimes(1);
    expect(Mock.FlagReportMonitoringService.listAcronyms).toHaveBeenCalled()
  });

  it('should call method listCenters', function () {
    service.listCenters();
    expect(Mock.FlagReportMonitoringService.listCenters).toHaveBeenCalledTimes(1);
    expect(Mock.FlagReportMonitoringService.listCenters).toHaveBeenCalled();
  });

  it('should call method getActivitiesProgressReport', function () {
    service.getActivitiesProgressReport("RS");
    expect(Mock.FlagReportMonitoringService.getActivitiesProgressReport).toHaveBeenCalledTimes(1);
    expect(Mock.FlagReportMonitoringService.getActivitiesProgressReport).toHaveBeenCalledWith("RS");
  });

  it('should call method getExamsName', function () {
    service.getExamsName();
    expect(Mock.FlagReportMonitoringService.getExamsName).toHaveBeenCalledTimes(1);
    expect(Mock.FlagReportMonitoringService.getExamsName).toHaveBeenCalled()
  });

  it('should call method getExamsProgressReport', function () {
    service.getExamsProgressReport("RS");
    expect(Mock.FlagReportMonitoringService.getExamsProgressReport).toHaveBeenCalledTimes(1);
    expect(Mock.FlagReportMonitoringService.getExamsProgressReport).toHaveBeenCalledWith("RS");
  });

  function mockInjections() {
    Mock.FlagReportMonitoringService = {
      find: () => { },
      listAcronyms: () => { },
      listCenters: () => { },
      getActivitiesProgressReport: () => { },
      getExamsName: () => { },
      getExamsProgressReport: () => { }
    }
  }

});
