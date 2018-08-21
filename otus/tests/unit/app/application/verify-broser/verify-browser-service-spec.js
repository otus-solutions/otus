describe('verifyBrowserService', function () {
  var service = {};
  var Injections = {};
  var Mock = {};

  beforeEach(angular.mock.module('otusjs.application.verifyBrowser'));

  beforeEach(function() {
    Mock.ApplicationStateServiceProvider = {};

    angular.mock.module(function($provide) {
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateServiceProvider);
    });
  });

  beforeEach(function () {
    inject(function ($injector) {
      mockInjections($injector);
      Injections = {
        "ApplicationStateService": Mock.ApplicationStateService
      }
      service = $injector.get('otusjs.application.verifyBrowser.verifyBrowserService', Injections);
    });
  });

  describe('persist exceptions test', function () {
    it('Sempre TRUE', function() {
      expect(true).toBe(true);
    });
  });

  function mockInjections($injector) { 
    Mock.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
  }
});
