describe('ParticipantReportWidgetFactory', function () {

  var UNIT_NAME = 'otusjs.report.business.ParticipantReportWidgetFactory';
  var Mock = {};
  var Injections = {};
  var factory = {};
  var scope;


  beforeEach(angular.mock.module('otusjs.otus.report'));
  beforeEach(function () {

    inject(function (_$rootScope_, _$q_, _$injector_) {
      scope = _$rootScope_;
      mockUtils();

      // Injections
      mockInjections(_$injector_, _$q_);
      factory = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  //Factory Tests
  describe('the creation methods', function () {
    it('should fetch data and build basic report list', function (done) {
      spyOn(Mock.ParticipantReportService, "fetchReportList")
        .and.returnValue(Mock.$q.when(Mock.reportList));

      factory.getParticipantReportList(Mock.selectedParticipant)
        .then(function (data) {
          expect(Mock.reportList.length).toEqual(data.length);
        });
      done();
    });

    it('should create basic report', function () {
      let report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);

      expect(report.objectType).toEqual('ParticipantReport');
      expect(report.template).toEqual('');
      expect(report.dataSources).toEqual({});
      expect(report.missingDataSources.length).toEqual(0);
    });
  });

  //Participant Report Tests
  describe('the getFullReport method', function () {
    var report;
    var promise;

    beforeEach(function () {
      report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);
      spyOn(Mock.DynamicReportService, "precompile").and.returnValue(Promise.resolve());
    });

    it('should precompile when get the template', function () {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportComplete));

      promise = report.getReportTemplate();

      promise.then(function () {
        expect(Mock.DynamicReportService.precompile).toHaveBeenCalled();
        done();
      });
    });

    it('should should not fetch when already have a compiled template', function () {
      spyOn(Mock.ParticipantReportService, "getFullReport");

      report.compiledTemplate = "<span></span>";
      promise = report.getReportTemplate();

      promise.then(function () {
        expect(Mock.DynamicReportService.precompile).not.toHaveBeenCalled();
        done();
      });
    });

    it('should be available when get a complete set of datasources', function (done) {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportComplete));

      promise = report.getReportTemplate();

      promise.then(function () {
        expect(report.isAvailable).toBe(true);
        done();
      });
    });

    it('should be unavailable when missing a datasource', function (done) {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportIncomplete));

      promise = report.getReportTemplate();

      promise.then(function () {
        expect(report.isAvailable).toBe(false);
        done();

      });
      done();
    });

    it('should show error as true when getFullReport rejects', function (done) {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.reject());

      promise = report.getReportTemplate();

      promise.then(function () {
        expect(report.loading).toBe(false);
        expect(report.hasError).toBe(true);
        done();
      });
    });
  });

  describe('the reload report method', function () {


    it('should fetch even when already have a compiled template', function () {
      let report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);
      spyOn(Mock.DynamicReportService, "precompile").and.returnValue(Promise.resolve());
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportComplete));


      report.compiledTemplate = "<span></span>";

      let promise = report.reloadReport();

      promise.then(function () {
        expect(Mock.DynamicReportService.precompile).toHaveBeenCalled();
        done();
      });
    });

  });

  describe('the generateReport method', function () {
    it('should call DynamicReportService.openReportInNewTab', function () {
      let report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);
      spyOn(Mock.DynamicReportService, "openReportInNewTab");

      report.generateReport();

      expect(Mock.DynamicReportService.openReportInNewTab).toHaveBeenCalled();
    });
  });

  //ux properties
  describe('the ux properties', function () {
    var report;

    beforeEach(function () {
      report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);
      spyOn(Mock.DynamicReportService, "precompile").and.returnValue(Promise.resolve());
    });

    it('should be initiated', function () {
      expect(report.hasError).toBe(false);
      expect(report.isAvailable).toBe(false);
      expect(report.loading).toBe(false);
      expect(report.status.color).toEqual("#666666");
      expect(report.status.icon).toEqual("description");
      expect(report.status.expanded).toBeDefined();
      expect(report.status.expandAndCollapseIcon).toBeDefined();
    });

    it('should display loading while loading', function (done) {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportComplete));

      //requisition time
      let promise = report.getReportTemplate();
      //loading
      expect(report.loading).toBe(true);

      //solved promise
      promise.then(function () {
        expect(report.loading).toBe(false);
        done();
      });
    });

    it('should show available when get a complete report', function (done) {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportComplete));

      //requisition time
      let promise = report.getReportTemplate();

      //solved promise
      promise.then(function () {
        expect(report.isAvailable).toBe(true);
        expect(report.hasError).toBe(false);
        expect(report.status.color).toBeDefined();
        expect(report.status.icon).toBeDefined();
        expect(report.status.bottomIcon).toBeDefined();
        expect(report.status.bottomIconClass).toBeDefined();
        expect(report.status.tooltip).toBeDefined();
        expect(report.status.msg).toBeDefined();
        expect(report.status.buttonEnabled).toBeDefined();
        done();
      });
    });

    //datasource Missing
    it('should show unavailable when missing a datasource', function (done) {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportIncomplete));

      //requisition time
      let promise = report.getReportTemplate();

      //solved promise
      promise.then(function () {
        expect(report.isAvailable).toBe(false);
        expect(report.hasError).toBe(false);

        expect(report.status.color).toBeDefined();
        expect(report.status.icon).toBeDefined();
        expect(report.status.bottomIcon).toBeDefined();
        expect(report.status.bottomIconClass).toBeDefined();
        expect(report.status.tooltip).toBeDefined();
        expect(report.status.msg).toBeDefined();
        done();
      });
    });

    it('should show error when the getFullReport rejects', function (done) {
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.reject());

      //requisition time
      let promise = report.getReportTemplate();

      //solved promise
      promise.then(function () {
        expect(report.hasError).toBe(true);

        expect(report.status.color).toBeDefined();
        expect(report.status.icon).toBeDefined();
        expect(report.status.bottomIcon).toBeDefined();
        expect(report.status.bottomIconClass).toBeDefined();
        expect(report.status.tooltip).toBeDefined();
        expect(report.status.msg).toBeDefined();
        done();
      });
    });
  });

  //-----Mock Functions

  function mockInjections($injector, $q) {
    Mock.ParticipantReportService = $injector.get('otusjs.report.business.ParticipantReportService');
    Mock.DynamicReportService = $injector.get('otusjs.report.business.DynamicReportService');
    Mock.$q = $q;

    Injections.ParticipantReportService = Mock.ParticipantReportService;
    Injections.DynamicReportService = Mock.DynamicReportService;
    Injections.$q = Mock.$q;


  }

  function mockUtils() {
    mockParticipantInfo();
    mockBasicReportList();
    mockReportInfo();
  }

  function mockParticipantInfo() {
    Mock.selectedParticipant = {
      "recruitmentNumber": 123456,
      "name": "MARIA DA SILVA",
      "sex": "F",
      "birthdate": {"objectType": "ImmutableDate", "value": "1974-02-06 00:00:00.000"},
      "fieldCenter": {"name": "Rio Grande do Sul", "code": 5, "acronym": "RS"},
      "stringfiedRN": "5000966"
    };
  }

  function mockBasicReportList() {
    Mock.reportList = [
      {
        id: '1',
        label: 'Hemograma',
      },
      {
        id: '2',
        label: 'Glicemia',
      },
      {
        id: '3',
        label: 'Urina',
      },
      {
        id: '4',
        label: 'Data de coleta',
      }];
  }

  function mockReportInfo() {
    Mock.fullReportComplete = {
      label: 'Data de coleta',
      "template": "<span>{{dataSources.Participant.recruitmentNumber}}</span>",
      dataSources: [
        {
          key: "cabeçalho",
          label: "Informações básicas do Participante",
          dataSource: "Participant",
          result: [
            {
              "recruitmentNumber": 3051442,
              "name": "ANDRÃƒâ€°IA APARECIDA",
              "sex": "F",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1977-05-04 00:00:00.000"
              },
              "fieldCenter": {
                "acronym": "ES"
              }
            }
          ]
        },
        {
          "filters": {
            "acronym": "MED3",
            "category": "C0",
            "statusHistory": {
              "name": "FINALIZED",
              "position": -1
            }
          },
          "key": "HS",
          label: "Alguma atividade",
          "dataSource": "Activity",
          "result": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2018-03-05T21:59:13.027Z",
                  "user": {
                    "name": "Allister",
                    "surname": "Ramos",
                    "phone": "51982706037",
                    "email": "allistertr@hotmail.com"
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    Mock.fullReportIncomplete = {
      label: 'Hemograma',
      dataSources: [
        {
          key: "ultimo_rcpc",
          label: "Basófilos",
          dataSource: "Activity",
          result: [null]
        }
      ]
    };
  }
});