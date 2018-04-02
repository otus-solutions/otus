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

  describe('precompile method ', function () {
    beforeEach(function () {
      mockReport();
    });
    it('should return valid structure', function (done) {
      // console.log(service.precompile);
      // console.log(Mock.Report);
      service.precompile(Mock.Report).then(function(returned) {
        console.log('ahhhhhhhhhh');
        console.log(returned);

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

  function mockScopeWithHelper() {
    Mock.ScopeWithHelper = {}
    service.fillScopeHelper(Mock.ScopeWithHelper);
  }

  function mockDate() {
    Mock.Date = new Date(2018, 3, 2, 12, 37, 55, 0);
  }

  function mockDateISOString() {
    if (!Mock.Date) mockDate();
    Mock.DateISOString = Mock.Date.toISOString();
  }

  function mockItensArray() {
    Mock.ItensArray = [
      { a: 1, b: 2, c: 3 },
      { a: 4, b: 5, c: 6 },
      { a: 7, b: 8, c: 9 }
    ];
  }

});
