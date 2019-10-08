describe('the Dynamic Report Service ', function () {
  var Mock = {};
  var service = {};
  var Injections = [];
  var report = {};

  beforeEach(function () {
    mock();

    angular.mock.module('otusjs.otus');
    angular.mock.inject(function ($injector, $q, $window, $compile, $rootScope) {
      Injections.$q = $q;
      Injections.$window = $window;
      Injections.$compile = $compile;
      Injections.$rootScope = $rootScope;
      Injections.ScopeReportFactory = $injector.get(
        'otusjs.report.business.dynamicReport.scope.ScopeReportFactory'
      );
      service = $injector.get(
        'otusjs.report.business.dynamicReport.DynamicReportService',
        Injections
      );
    });
  });

  describe('setup unit test basic', function () {
    it('serviceExistence check ', function () {
      expect(service).toBeDefined();
    });

    it('service methodsExistence check', function () {
      expect(service.openReportInNewTab).toBeDefined();
    });
  });

  describe('openReportInNewTab method', function () {
    it('should open new window when called', function () {
      spyOn(Injections.$window, 'open').and.callThrough();
      service.openReportInNewTab(Mock.Report, Mock.callback);

      //expect(Injections.$window.open).toHaveBeenCalledTimes(1);
    });
  });

  function mock() {
    Mock.callback = {
      callback: function () { }
    };
    Mock.Report = {
      compiledTemplate: `
        <otus-script>
          {{data.participantName = ds.participant[0].name}}
          {{required('sexo', ds.participant[0].sex, 'é obrigatório')}}
        </otus-script>
      `,
      dataSources: {
        participant: [
          {
            name: 'João',
            sex: 'Custom',
          }
        ]
      }
    };
  }
});
