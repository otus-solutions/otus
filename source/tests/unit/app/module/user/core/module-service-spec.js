xdescribe('ModuleService Test', function () {

  var service;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.user.core');
  });

  beforeEach(function () {
    Mock.ContextService = {
      configureContext: function () {
      },
      configureStorage: function () {
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.user.core.ContextService', Mock.ContextService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      service = $injector.get('otusjs.user.core.ModuleService', Injections);
    });
  });

  it('check existence of service', function () {
    expect(service).toBeDefined();
  });

  xit('check existence of methods', function () {
    expect(service.configureContext).toBeDefined();
    expect(service.configureStorage).toBeDefined();
    expect(service.configureUserDataSource).toBeDefined();
    expect(service.configureLoginProxy).toBeDefined();
    expect(service.configureUserPermissionRemoteStorage).toBeDefined();
  });

});