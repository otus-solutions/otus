describe('ActivityAdderStateProvider_UnitTest_Suite', () => {
  let provider;
  let Injections = [];
  let Mock = {};
  let URL = '/activity-adder';
  let TEMPLATE = '<otus-activity-adder checkers="$resolve.listCheckers" layout="column" flex></otus-activity-adder>';

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $rootScope, $q) => {

      Mock.ParticipantContextService = $injector.get('otusjs.participant.core.ContextService');
      Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
      Mock.Application = $injector.get('otusjs.application.core.ModuleService');
      Mock.SessionContextService = $injector.get('otusjs.application.session.core.ContextService');
      Mock.ActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Mock.CheckerItemFactory = $injector.get('otusjs.otus.uxComponent.CheckerItemFactory');

      Injections.STATE = $injector.get('STATE');
      provider = $injector.get('otusjs.deploy.ActivityAdderState', Injections);

      Mock.scope = $rootScope.$new();
      Mock.deferred = $q.defer();
    });
  });

  it('providerExistence_check', () => {
    expect(provider).toBeDefined();
  });

  it('parent should be equal to "dashboard"', function () {
    expect(provider.state.parent).toEqual(Injections.STATE.PARTICIPANT_DASHBOARD);
  });

  it('name should be equal to "activity-adder"', function () {
    expect(provider.state.name).toEqual(Injections.STATE.ACTIVITY_ADDER);
  });

  it('url should be equal to "/activity-adder"', function () {
    expect(provider.state.url).toEqual(URL);
  });

  it('template should be defined', function () {
    expect(provider.state.template).toEqual(TEMPLATE);
  });

  it('onEnter should be defined', function () {
    expect(provider.state.onEnter).toBeDefined();
  });

  it('onEnter_method_should_invoke_restore_of_ contextServices', function () {
    spyOn(Mock.ParticipantContextService, 'restore');
    spyOn(Mock.SessionContextService, 'restore');
    spyOn(Mock.ActivityContextService, 'restore');
    spyOn(Mock.ActivityContextService, 'begin');
    spyOn(Mock.Application, 'isDeployed').and.returnValue(Mock.deferred.promise);

    provider.state.onEnter(
      Mock.ParticipantContextService,
      Mock.ActivityContextService,
      Mock.Application,
      Mock.SessionContextService);

    Mock.deferred.resolve();
    Mock.scope.$digest();

    expect(Mock.SessionContextService.restore).toHaveBeenCalledTimes(1);
    expect(Mock.ParticipantContextService.restore).toHaveBeenCalledTimes(1);
    expect(Mock.ActivityContextService.restore).toHaveBeenCalledTimes(1);
    expect(Mock.ActivityContextService.begin).toHaveBeenCalledTimes(0);
  });

  it('onEnter_method_should_verify_if_ActivityContext_is_invalid',() => {
      spyOn(Mock.ParticipantContextService, 'restore');
      spyOn(Mock.SessionContextService, 'restore');
      spyOn(Mock.ActivityContextService, 'restore').and.throwError();
      spyOn(Mock.ActivityContextService, 'begin');
      spyOn(Mock.Application, 'isDeployed').and.returnValue(Mock.deferred.promise);

      provider.state.onEnter(
        Mock.ParticipantContextService,
        Mock.ActivityContextService,
        Mock.Application,
        Mock.SessionContextService);

      Mock.deferred.resolve();
      Mock.scope.$digest();

      expect(Mock.ActivityContextService.begin).toHaveBeenCalledTimes(1);
  });

  it('listCheckers_method_should_return_array_of_checkers', () => {
    Mock.checker = Test.utils.data.checker;
    Mock.checkers = [Mock.checker, Mock.checker];
    spyOn(Mock.ActivityService, 'listActivityCheckers').and.returnValues(Mock.checkers);
    spyOn(Mock.CheckerItemFactory,'create');
    spyOn(Mock.Application, 'isDeployed').and.returnValue(Mock.deferred.promise);

    provider.state.resolve.listCheckers(
      Mock.ActivityService,
      Mock.CheckerItemFactory,
      Mock.Application).then(checkers => expect(checkers.length).toBe(2));

    Mock.deferred.resolve();
    Mock.scope.$digest();

    expect(Mock.ActivityService.listActivityCheckers).toHaveBeenCalledTimes(1);
    expect(Mock.CheckerItemFactory.create).toHaveBeenCalledTimes(2);
  });
});

