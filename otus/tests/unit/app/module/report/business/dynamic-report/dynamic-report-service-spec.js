xdescribe('the Dynamic Report Service ', function () {
  var Mock = {};
  var service = {};
  var scope;

  beforeEach(function () {
    angular.mock.module('otusjs.otus.report');
    inject(function (_$injector_, _$q_, _$window_, _$compile_, _$rootScope_) {
      var injections = {
        '$q': _$q_,
        '$window': _$window_,
        '$compile': _$compile_,
        '$rootScope': _$rootScope_,
        'ScopeReportFactory': _$injector_.get(
          'otusjs.report.business.dynamicReport.scope.ScopeReportFactory'
        )
      };
      service = _$injector_.get(
        'otusjs.report.business.dynamicReport.DynamicReportService',
        injections
      );
    });
  });

  xdescribe('precompile method ', function () {
    beforeEach(function () {
      mockReport();
    });
    it('should return valid structure', function (done) {
      service.precompile(Mock.Report).then(function(returned) {
        //The promise is never resolved
        //The $compile never change scope
        //This problem only occurs in test
        expect(returned).not.toBe(undefined);
        done()
      });
    });
  });

  function mockReport() {
    Mock.Report = {
      template: `
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
