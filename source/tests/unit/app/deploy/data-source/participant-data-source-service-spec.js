fdescribe('ParticipantDataSourceService_UnitTest_Suite', () => {

  let service;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.$q = $injector.get('$q');
      Injections.ParticipantRestService = $injector.get('otusjs.deploy.ParticipantRestService');
      Injections.ParticipantFactory = $injector.get('otusjs.model.participant.ParticipantFactory');
      Injections.ProjectConfigurationRestService = $injector.get('otusjs.deploy.ProjectConfigurationRestService');
      Injections.ParticipantStorageService = $injector.get('otusjs.participant.storage.ParticipantStorageService');

      service = $injector.get('otusjs.deploy.ParticipantDataSourceService', Injections);

      spyOn(Injections.$q, 'defer').and.callThrough();
      spyOn(Injections.ParticipantRestService, 'list').and.returnValue(Promise.resolve());
      spyOn(Injections.ParticipantRestService, 'initialize').and.callThrough();
      spyOn(Injections.ParticipantRestService, 'create').and.callThrough();
      spyOn(Injections.ParticipantRestService, 'update').and.callThrough();
      spyOn(Injections.ParticipantRestService,'getFollowUps').and.callThrough();
      spyOn(Injections.ParticipantRestService,'activateFollowUpEvent').and.callThrough();
      spyOn(Injections.ParticipantRestService,'deactivateFollowUpEvent').and.callThrough();
      spyOn(Injections.ProjectConfigurationRestService, 'initialize').and.callThrough();
      spyOn(Injections.ProjectConfigurationRestService, 'getProjectConfiguration').and.callThrough();

    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.up).toBeDefined();
    expect(service.listIndexers).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.getAllowNewParticipants).toBeDefined();
    expect(service.getFollowUps).toBeDefined();
    expect(service.activateFollowUpEvent).toBeDefined();
    expect(service.deactivateFollowUpEvent).toBeDefined();
  });

  it('upMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    expect(service.up()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantRestService.initialize).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantRestService.list).toHaveBeenCalledTimes(1);
    expect(Injections.ProjectConfigurationRestService.initialize).toHaveBeenCalledTimes(1);
  });

  it('listIndexersMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    expect(service.listIndexers()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
  });

  it('createMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    service.up()
    expect(service.create()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(2);
    expect(Injections.ParticipantRestService.create).toHaveBeenCalledTimes(1);
  });

  it('updateMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    service.up()
    expect(service.update()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(2);
    expect(Injections.ParticipantRestService.update).toHaveBeenCalledTimes(1);
  });

  it('getAllowNewParticipantsMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    service.up()
    expect(service.getAllowNewParticipants()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(2);
    expect(Injections.ProjectConfigurationRestService.getProjectConfiguration).toHaveBeenCalledTimes(1);
  });

  it('getFollowUpsMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    service.up()
    expect(service.getFollowUps()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(2);
    expect(Injections.ParticipantRestService.getFollowUps).toHaveBeenCalledTimes(1);
  });

  it('activateFollowUpEventMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    service.up()
    expect(service.activateFollowUpEvent()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(2);
    expect(Injections.ParticipantRestService.activateFollowUpEvent).toHaveBeenCalledTimes(1);
  });

  it('deactivateFollowUpEventMethod_should_evoke_defer_by_$q_and_return_promise', () => {
    service.up()
    expect(service.deactivateFollowUpEvent()).toBePromise();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(2);
    expect(Injections.ParticipantRestService.deactivateFollowUpEvent).toHaveBeenCalledTimes(1);
  });

});