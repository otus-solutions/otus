describe('otus-flag-report-parse-data-factory Test', function() {
  var Mock = {};
  var factory,ACRONYM, STATUS;

  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent');

    inject(function(_$injector_) {
      factory = _$injector_.get('otusFlagReportParseDataFactory');
      mockData();
    });
  });
  it('should return a same model flags', function() {
    expect(factory).toBeDefined();
    Mock.activitiesData = factory.create(Mock.json);

    expect(Mock.activitiesData.index).toBeDefined();
    expect(Mock.activitiesData.columns).toBeDefined();
    expect(Mock.activitiesData.data).toBeDefined();

    expect(Mock.activitiesData.index).toEqual(Mock.json.index);
    expect(Mock.activitiesData.columns).toEqual(Mock.json.columns);
    expect(Mock.activitiesData.data).toEqual(Mock.json.data);
    expect(Mock.activitiesData).toEqual(Mock.json);
  });

  it('should return a different model flags with filter by acronym', function() {
    expect(factory).toBeDefined();
    Mock.activitiesData = factory.create(Mock.json, ACRONYM);

    expect(Mock.activitiesData.index).toBeDefined();
    expect(Mock.activitiesData.columns).toBeDefined();
    expect(Mock.activitiesData.data).toBeDefined();

    expect(Mock.activitiesData.index).toEqual(Mock.json.index);
    expect(Mock.activitiesData.columns).not.toEqual(Mock.json.columns);
    expect(Mock.activitiesData.columns).toEqual(Mock.columnsFilterAcronym);
    expect(Mock.activitiesData.data).not.toEqual(Mock.json.data);
    expect(Mock.activitiesData.data).toEqual(Mock.dataFilterAcronym);
  });

  it('should return a different model flags with filter by status', function() {
    expect(factory).toBeDefined();
    Mock.activitiesData = factory.create(Mock.json, null, STATUS);

    expect(Mock.activitiesData.index).toBeDefined();
    expect(Mock.activitiesData.columns).toBeDefined();
    expect(Mock.activitiesData.data).toBeDefined();

    expect(Mock.activitiesData.index).toEqual(Mock.json.index);
    expect(Mock.activitiesData.columns).toEqual(Mock.json.columns);
    expect(Mock.activitiesData.data).not.toEqual(Mock.json.data);
    expect(Mock.activitiesData.data).toEqual(Mock.dataFilterStatus);
  });

  it('should return a different model flags with filter by acronym and status', function() {
    expect(factory).toBeDefined();
    Mock.activitiesData = factory.create(Mock.json, ACRONYM, STATUS);

    expect(Mock.activitiesData.index).toBeDefined();
    expect(Mock.activitiesData.columns).toBeDefined();
    expect(Mock.activitiesData.data).toBeDefined();

    expect(Mock.activitiesData.index).toEqual(Mock.json.index);
    expect(Mock.activitiesData.columns).not.toEqual(Mock.json.columns);
    expect(Mock.activitiesData.columns).toEqual(Mock.columnsFilterAcronym);
    expect(Mock.activitiesData.data).not.toEqual(Mock.json.data);
    expect(Mock.activitiesData.data).toEqual(Mock.dataFilterAcronymWithStatus);
  });


  function mockData() {
    ACRONYM = "MEDC";
    STATUS = 2;
    Mock.json = {
      "columns":[["C","CSJ"],["C","RCPC"],["C","ISG"],["C","CSP"],["C","MED2"],["C","MEDC"],["C","MED3"],["C","AMAC"],["C","CISE"],["C","DORC"],["C","BIOC"],["C","MSKC"],["C","RETCLQ"],["C","CCA"],["C","VOPC"],["C","USGC"],["C","ANTC"],["C","DIEC"],["C","CFUC"],["C","DISC"],["C","DSOC"],["C","HOCC"],["C","ACTA"],["C","MONC"],["C","B342"],["C","FORC"],["C","ACTDC"],["C","RETC"],["C","CSI"],["C","CURC"],["C","PSEC"],["C","EAIC"],["C","FRC"],["C","SPPC"],["C","FCOC"],["C","AFID"],["C","MULC"],["C","SONC"],["C","TVSC"],["C","HVSD"],["C","ECGC"],["C","TCLEC"],["C","HMPD"],["C","PASC"],["C","MOND"],["C","DQUOTE"],["C","DQUOTETWO"],["C","MARAVILHA"],["C","TS"]],
      "index":[3019660,3051442,3004950,3012464,3036402],
      "data":[[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[1,-1,-1,2,null,1,null,null,1,null,null,null,null,null,null,null,null,2,-1,-1,null,-1,null,null,null,null,null,null,null,null,-1,-1,null,null,null,2,-1,-1,null,-1,null,null,-1,null,null,null,null,null,null],[null,null,null,null,null,-1,null,null,null,null,null,null,null,null,2,-1,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,2,null,null,null,null,null,null,null,null,null,null,null,2,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,2,null,null,2,null,null,null,null,null,2,null,null,null,null,null,null,null,null,null,2,null,null,null,null,null,null,2,null,2,null,null,null,null,null,null,null,null,null,2,2,null,null]]};
    Mock.dataFilterStatus = [[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, 2, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, 2, null, null, 2, null, null, null, null, null, 2, null, null, null, null, null, null, null, null, null, 2, null, null, null, null, null, null, 2, null, 2, null, null, null, null, null, null, null, null, null, 2, 2, null, null]];
    Mock.dataFilterAcronym = [[null], [1], [-1], [2], [null]];
    Mock.columnsFilterAcronym = [["C", "MEDC"]];
    Mock.dataFilterAcronymWithStatus = [[null], [null], [null], [2], [null]];
  }


});
