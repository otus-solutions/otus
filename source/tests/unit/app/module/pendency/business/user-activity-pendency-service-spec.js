describe('UserActivityPendencyService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.UserActivityPendencyRepositoryService = $injector.get('otusjs.pendency.repository.UserActivityPendencyRepositoryService');
      service = $injector.get('otusjs.pendency.business.UserActivityPendencyService', Injections);
      spyOn(Injections.UserActivityPendencyRepositoryService, 'createUserActivityPendency');
      spyOn(Injections.UserActivityPendencyRepositoryService, 'getPendencyByActivityId');
      spyOn(Injections.UserActivityPendencyRepositoryService, 'updateUserActivityPendency');
      spyOn(Injections.UserActivityPendencyRepositoryService, 'deleteUserActivityPendency');

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

  it('createUserActivityPendencyMethod_should_evoke_create_by_repositoryService', () => {
    service.createUserActivityPendency(Mock.userActivityPendency);
    expect(Injections.UserActivityPendencyRepositoryService.createUserActivityPendency).toHaveBeenCalledTimes(1)
  });

  it('getPendencyByActivityIdMethod_should_evoke_getPendency_by_repositoryService', () => {
    service.getPendencyByActivityId(Mock._id);
    expect(Injections.UserActivityPendencyRepositoryService.getPendencyByActivityId).toHaveBeenCalledTimes(1)
  });

  it('updateUserActivityPendencyMethod_should_evoke_updatePendency_by_repositoryService', () => {
    service.updateUserActivityPendency(Mock._id, Mock.userActivityPendency);
    expect(Injections.UserActivityPendencyRepositoryService.updateUserActivityPendency).toHaveBeenCalledTimes(1)
  });

  it('deleteUserActivityPendencyMethod_should_evoke_deletePendency_by_repositoryService', () => {
    service.deleteUserActivityPendency(Mock._id);
    expect(Injections.UserActivityPendencyRepositoryService.deleteUserActivityPendency).toHaveBeenCalledTimes(1)
  });

});
