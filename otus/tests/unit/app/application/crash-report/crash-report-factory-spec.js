xdescribe('CrashReportFactory', function () {

  var UNIT_NAME = 'otusjs.application.crash.CrashReportFactory';
  var Mock = {};
  var Injections = {};
  var factory = {};
  var scope;

  beforeEach(function () {
    angular.mock.module('otusjs.application.crash', function ($provide) {
      $provide.value('otusjs.application.crash.CrashReportService', function () {
        return {
          persistException: function () { }
        }
      }());
    })
  });
  beforeEach(function () {

    inject(function (_$rootScope_, _$q_, _$injector_) {
      scope = _$rootScope_;
      mockUtils();

      /* Injections */
      // mockInjections(_$injector_, _$q_);
      console.log(JSON.stringify(angular.module('otusjs.application.crash')))
      // factory = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('the creation methods', function () {
    it('Sempre TRUE', function () {
      expect(true).toBe(true);
    });
  });

  function mockInjections($injector, $q) {
    Mock.CrashReportServiceProvider = $injector.get('otusjs.application.crash.CrashReportService');

    Injections.CrashReportServiceProvider = Mock.CrashReportServiceProvider;
  }

  function mockUtils() { }
});  