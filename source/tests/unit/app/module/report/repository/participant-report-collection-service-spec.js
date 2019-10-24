describe('ParticipantReportCollectionService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $rootScope) => {
      Injections.ModuleService = $injector.get('otusjs.report.core.ModuleService');
      Injections.$q = $injector.get('$q');
      Mock.id = "123456";
      Mock.scope = $rootScope.$new();
      spyOn(Injections.ModuleService, "getParticipantReportRemoteStorage").and.returnValue(_mockRemoteStorage(Injections.$q));

      service = $injector.get('otusjs.report.repository.ParticipantReportCollectionService');
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getParticipantReportList).toBeDefined();
    expect(service.getFullReport).toBeDefined();
    expect(service.getActivityReport).toBeDefined();
  });

  it('getActivityReport_should_return_ActivityReport_through_3_promises_resolved_simulating_client/BD', () => {
    service.getActivityReport(Mock.id).then(data => {
      expect(data.dataSources[0].dataSource).toBe('ActivityReport');
    });
    Mock.scope.$digest();
  });
});

function _mockRemoteStorage($q) {
  let remoteStorage = {
    getActivityReport: () => {
      let deferredInternal = $q.defer();
      deferredInternal.resolve({data: Test.utils.data.anwserFilling});
      return deferredInternal.promise;
    }
  };

  return {
    whenReady: () => {
      let deferred = $q.defer();
      deferred.resolve(remoteStorage);
      return deferred.promise;
    }
  };
}