describe('activity-player-service Test', function () {
  var Mock = {};
  var service, cookies, spyWindow;
  var Injections = {};

  beforeEach(function () {
    mockData();
    angular.mock.module('otusjs.otus');
    angular.mock.module(function ($provide) {
      $provide.value('$window', {location: {href: null}, sessionStorage: {getItem: () =>{}}})
      $provide.value('otusjs.application.session.core.ContextService', {getToken: {getItem: () =>{}}})
    });
    inject(function (_$injector_, _$cookies_, _$window_) {
      cookies = _$cookies_;
      spyWindow = _$window_;
      Injections = {
        ParticipantActivityService: _$injector_.get('otusjs.activity.business.ParticipantActivityService'),
        ModuleService: _$injector_.get('otusjs.activity.core.ModuleService'),
        ContextService: _$injector_.get('otusjs.activity.core.ContextService'),
        ContextUserService: _$injector_.get('otusjs.application.session.core.ContextService')
      };

      service = _$injector_.get('otusjs.activity.business.ActivityPlayerService', Injections);
    });
    spyOn(cookies, 'get').and.returnValue('http://teste.com');
    spyOn(Injections.ContextUserService, 'getToken');
    spyOn(Injections.ContextService, "getSelectedActivities").and.returnValue([{getID: () => {return '123';}}]);
    spyOn(Injections.ContextService, "selectActivities");
    spyOn(Injections.ContextService, "setActivityToPlay");
    spyOn(Injections.ParticipantActivityService, "getById").and.returnValue(Promise.resolve([{}]));
    spyOn(Injections.ModuleService, "whenActivityFacadeServiceReady").and.returnValue(Promise.resolve(Mock.ActivityFacadeService));
    spyOn(Mock.ActivityFacadeService, "useActivity");
    spyOn(Mock.ActivityFacadeService, "openSurveyActivity");

  });

  it('should create service', function () {
    expect(service).toBeDefined();
    expect(service.load).toBeDefined();
  });

  it('should execute load method', function () {
    service.load();
    expect(Injections.ContextUserService.getToken).toHaveBeenCalledTimes(1);
  });


  function mockData() {
    Mock.ActivityFacadeService = {
      useActivity: function () {
      },
      openSurveyActivity: function () {
      }
    };
  }

});

