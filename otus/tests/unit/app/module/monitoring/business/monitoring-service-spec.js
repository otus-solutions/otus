describe('MonitoringService Test', function() {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function() {
    mockInjections();
    angular.mock.module('otusjs.monitoring.business', function ($provide) {
      $provide.value('otusjs.monitoring.repository.MonitoringCollectionService', Mock.MonitoringCollectionService);
    });

    inject(function(_$injector_) {
      Injections = {
        MonitoringCollectionService: Mock.MonitoringCollectionService
      };

      service = _$injector_.get('otusjs.monitoring.business.MonitoringService', Injections);
    });

    spyOn(Mock.MonitoringCollectionService, "find").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "listAcronyms").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "listCenters").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "getActivitiesProgressReport").and.callThrough();
  });


  it('should call method find', function() {
    service.find("CISE");
    expect(Mock.MonitoringCollectionService.find).toHaveBeenCalledTimes(1);
    expect(Mock.MonitoringCollectionService.find).toHaveBeenCalledWith({acronym: "CISE"});
  });

  it('should call method listAcronyms', function() {
    service.listAcronyms();
    expect(Mock.MonitoringCollectionService.listAcronyms).toHaveBeenCalledTimes(1);
    expect(Mock.MonitoringCollectionService.listAcronyms).toHaveBeenCalled()
  });

  it('should call method listCenters', function() {
    service.listCenters();
    expect(Mock.MonitoringCollectionService.listCenters).toHaveBeenCalledTimes(1);
    expect(Mock.MonitoringCollectionService.listCenters).toHaveBeenCalled();
  });

  it('should call method getActivitiesProgressReport', function() {
    service.getActivitiesProgressReport("RS");
    expect(Mock.MonitoringCollectionService.getActivitiesProgressReport).toHaveBeenCalledTimes(1);
    expect(Mock.MonitoringCollectionService.getActivitiesProgressReport).toHaveBeenCalledWith({center: "RS"});
  });

  function mockInjections() {
    Mock.MonitoringCollectionService = {
      find: ()=>{},
      listAcronyms: ()=>{},
      listCenters: ()=>{},
      getActivitiesProgressReport: ()=>{}
    }
  }

});
