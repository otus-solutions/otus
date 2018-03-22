fdescribe('ParticipantReportWidgetFactory', function () {

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

  describe('basic successful behavior', function () {
    it('should fetch data and build basic report list', function (done) {
      spyOn(Mock.ParticipantReportService, "fetchReportList")
        .and.returnValue(Promise.resolve(Mock.reportList));

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

    it('should be available gets a complete set of datasources', function (done) {
      let report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);

      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportComplete));

      let promise = report.getReportTemplate();


      promise.then(function () {
        expect(report.isAvailable).toBe(true);
        done();

      });


    });

    //ux properties
    it('should initiate the ux properties', function (done) {
      let report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportComplete));

      expect(report.hasError).toBe(false);
      expect(report.isAvailable).toBe(null);
      expect(report.loading).toBe(false);
      expect(report.statusColor).toEqual("gray");
      expect(report.statusIcon).toEqual("priority_high");


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
  });

  //missing dataSource behavior
  describe('missing datasource behavior', function () {
    it('should be unavailable when missing a datasource', function (done) {
      let report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);

      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.resolve(Mock.fullReportIncomplete));

      let promise = report.getReportTemplate();

      expect(report.loading).toBe(true);
      expect(report.hasError).toBe(false);


      promise.then(function () {
        expect(report.isAvailable).toBe(false);
        done();

      });


      done();

    });
  });

  describe('request error behavior', function () {


    //ux properties
    it('should initiate the ux properties', function (done) {
      let report = factory.fromJson(Mock.ParticipantReportService, Mock.reportList[0], Mock.selectedParticipant);
      spyOn(Mock.ParticipantReportService, "getFullReport").and.returnValue(Promise.reject());

      //requisition time
      let promise = report.getReportTemplate();

      //loading
      expect(report.loading).toBe(true);

      //solved promise
      promise.then(function () {
        expect(report.loading).toBe(false);
        expect(report.hasError).toBe(true);
        done();
      });
    });
  });

  //-----Mock Functions

  function mockInjections($injector, $q) {
    Mock.ParticipantReportService = $injector.get('otusjs.report.business.ParticipantReportService');
    Mock.$q = $q;

    Injections.ParticipantReportService = Mock.ParticipantReportService;
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