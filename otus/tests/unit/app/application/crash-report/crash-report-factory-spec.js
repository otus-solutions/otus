describe('CrashReportFactory', function () {

  var UNIT_NAME = 'otusjs.application.crash.CrashReportFactory';
  var Mock = {};
  var factory = {};

  beforeEach(function() {
    angular.mock.module('otusjs.application.crash');
  });
  beforeEach(function () {
    angular.mock.inject(function ( _$injector_) {
      mockUtils();
      factory = _$injector_.get(UNIT_NAME);
    });
  });

  describe('the creation methods', function () {
    var _object;
    beforeEach(function() {
      spyOn(factory, 'create').and.callThrough();
      _object = factory.create(Mock.exception,Mock.url,Mock.browserName, Mock.browserVersion, Mock.operatingSystemName);
    });
    it('should ErrorData created', function () {
      expect(_object).toBeDefined();
      expect(_object).not.toBeNull();
      expect(_object.exception).toEqual(Mock.ErroData.exception);
      expect(_object.cause).toEqual(Mock.ErroData.cause);
      expect(_object.url).toEqual(Mock.ErroData.url);
      expect(_object.date).not.toBeNull();
      expect(_object.browserOnline).toEqual(Mock.ErroData.browserOnline);
      expect(_object.browserName).toEqual(Mock.ErroData.browserName);
      expect(_object.browserVersion).toEqual(Mock.ErroData.browserVersion);
      expect(_object.cookiesEnabled).toEqual(Mock.ErroData.cookiesEnabled);
      expect(_object.plataform).toEqual(Mock.ErroData.plataform);
    });
  });

  function mockUtils() {
    Mock.exception = {
      stack: 'Falha conexão',
      message: 'Fail Connection'
    };
    Mock.url = 'otus.com';
    Mock.browserName = 'chrome';
    Mock.browserVersion = '52';
    Mock.operatingSystemName = 'Windows';
    Mock.ErroData = {
      exception : Mock.exception.message,
      cause : Mock.exception.stack,
      url : Mock.url,
      date : new Date(),
      browserOnline : true,
      browserName : Mock.browserName,
      browserVersion : Mock.browserVersion,
      cookiesEnabled : true,
      plataform : Mock.operatingSystemName
    };
   }

});
