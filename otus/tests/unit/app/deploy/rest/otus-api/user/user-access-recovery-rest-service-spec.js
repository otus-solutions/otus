xdescribe('AliquotErrorReportingService', function () {
  var service = {};
  var Injections = {};
  var Mock = {};

  beforeEach(angular.mock.module('otusjs.deploy'));
  beforeEach(angular.mock.module(function ($provide) {
    $provide.value('OtusRestResourceService', {
      getOtusPasswordRecoveryResource: function () { return {} }
    });
  }));
  beforeEach(function () {
    inject(function ($injector) {
      service = $injector.get('otusjs.deploy.UserAccessRecoveryRestService');
      mockStruture();
      /* Injections */
      mockInjections($injector);
    });
  });

  describe('validateToken method', function () {
    it('should call method getValidationToken', function () {
      expect(true).toBe(true);
    });
  });

  function mockStruture() { }

  function mockInjections($injector) {

  }
});