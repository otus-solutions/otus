describe('UserActivityPendencyRepositoryService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.UserActivityPendencyCollectionService = $injector.get('otusjs.pendency.repository.UserActivityPendencyCollectionService');
      service = $injector.get('otusjs.pendency.repository.UserActivityPendencyRepositoryService', Injections);

      spyOn(Injections.UserActivityPendencyCollectionService, 'createUserActivityPendency');
      spyOn(Injections.UserActivityPendencyCollectionService, 'getPendencyByActivityId');
      spyOn(Injections.UserActivityPendencyCollectionService, 'updateUserActivityPendency');
      spyOn(Injections.UserActivityPendencyCollectionService, 'deleteUserActivityPendency');

      Mock.userActivityPendencyFactory = $injector.get('otusjs.model.pendency.UserActivityPendencyFactory');
      Mock.UserActivityPendencyDocument = JSON.stringify(Test.utils.data.userActivityPendency);
      Mock.userActivityPendency = Mock.userActivityPendencyFactory.fromJsonObject(Mock.UserActivityPendencyDocument);
      Mock._id = Mock.userActivityPendency.getID();
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.createUserActivityPendency).toBeDefined();
    expect(service.getPendencyByActivityId).toBeDefined();
    expect(service.updateUserActivityPendency).toBeDefined();
    expect(service.deleteUserActivityPendency).toBeDefined();
  });

  it('createUserActivityPendencyMethod_should_evoke_create_byUserActivityPendencyCollectionService', () => {
    service.createUserActivityPendency(Mock.userActivityPendency)
    expect(Injections.UserActivityPendencyCollectionService.createUserActivityPendency).toHaveBeenCalledTimes(1)
  });

  it('getPendencyByActivityIdMethod_should_evoke_getPendency_byUserActivityPendencyCollectionService', () => {
    service.getPendencyByActivityId(Mock._id);
    expect(Injections.UserActivityPendencyCollectionService.getPendencyByActivityId).toHaveBeenCalledTimes(1)
  });

  it('updateUserActivityPendencyMethod_should_evoke_updatePendency_byUserActivityPendencyCollectionService', () => {
    service.updateUserActivityPendency(Mock._id, Mock.userActivityPendency)
    expect(Injections.UserActivityPendencyCollectionService.updateUserActivityPendency).toHaveBeenCalledTimes(1)
  });

  it('deleteUserActivityPendencyMethod_should_evoke_deletePendency_byUserActivityPendencyCollectionService', () => {
    service.deleteUserActivityPendency(Mock._id)
    expect(Injections.UserActivityPendencyCollectionService.deleteUserActivityPendency).toHaveBeenCalledTimes(1)
  });
});
