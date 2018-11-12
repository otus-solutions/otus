describe('otus-flag-report-parse-data-factory Test', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
      angular.mock.module('otusjs.otus.uxComponent');

      inject(function(_$injector_) {

        factory = _$injector_.get('otusFlagReportParseDataFactory');
        mockData();
      });
    });
    it('should create a model for canvas', function() {
        expect(factory).toBeDefined();
      Mock.activitiesData = factory.create(Mock.data);
        expect(Mock.activitiesData.index).toBeDefined();
        expect(Mock.activitiesData.columns).toBeDefined();
        expect(Mock.activitiesData.data).toBeDefined();

    });


    function mockData() {
      Mock.data = JSON.parse('[{"rn":3019660,"activities":' +
        '[{"rn":3019660,"acronym":"ACTDC","status":2}]},' +
        '{"rn":3004950,"activities":' +
        '[{"rn":3004950,"acronym":"DIEC","status":2},' +
        '{"rn":3004950,"acronym":"MEDC","status":-1},' +
        '{"rn":3004950,"acronym":"USGC","status":-1},' +
        '{"rn":3004950,"acronym":"VOPC","status":2}]},' +
        '{"rn":3012464,"activities":' +
        '[{"rn":3012464,"acronym":"DIEC","status":2},' +
        '{"rn":3012464,"acronym":"MEDC","status":2}]},' +
        '{"rn":3051442,"activities":' +
        '[{"rn":3051442,"acronym":"CSJ","status":2},' +
        '{"rn":3051442,"acronym":"DIEC","status":2},' +
        '{"rn":3051442,"acronym":"MULC","status":-1},' +
        '{"rn":3051442,"acronym":"PSEC","status":-1},' +
        '{"rn":3051442,"acronym":"DISC","status":-1},' +
        '{"rn":3051442,"acronym":"HVSD","status":-1},' +
        '{"rn":3051442,"acronym":"AFID","status":2},' +
        '{"rn":3051442,"acronym":"CISE","status":1},' +
        '{"rn":3051442,"acronym":"RCPC","status":-1},' +
        '{"rn":3051442,"acronym":"HMPD","status":-1},' +
        '{"rn":3051442,"acronym":"EAIC","status":-1},' +
        '{"rn":3051442,"acronym":"SONC","status":-1},' +
        '{"rn":3051442,"acronym":"MEDC","status":2},' +
        '{"rn":3051442,"acronym":"ISG","status":-1},' +
        '{"rn":3051442,"acronym":"HOCC","status":-1},' +
        '{"rn":3051442,"acronym":"MEDC","status":1},' +
        '{"rn":3051442,"acronym":"CFUC","status":-1},' +
        '{"rn":3051442,"acronym":"CSJ","status":1},' +
        '{"rn":3051442,"acronym":"CSP","status":2}]},' +
        '{"rn":3036402,"activities":' +
        '[{"rn":3036402,"acronym":"DQUOTE","status":2},' +
        '{"rn":3036402,"acronym":"DQUOTETWO","status":2},' +
        '{"rn":3036402,"acronym":"SPPC","status":2},' +
        '{"rn":3036402,"acronym":"ACTDC","status":2},' +
        '{"rn":3036402,"acronym":"ANTC","status":2},' +
        '{"rn":3036402,"acronym":"AMAC","status":2},' +
        '{"rn":3036402,"acronym":"BIOC","status":2},' +
        '{"rn":3036402,"acronym":"AFID","status":2}]}]');
    }


});
