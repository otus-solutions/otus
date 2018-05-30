describe('ParticipantReportWidgetFactory', function () {

  var UNIT_NAME = 'otusjs.report.business.datasource.DatasourceManagerFactory';
  var Mock = {};
  var Injections = {};
  var factory = {};
  var scope;

  beforeEach(angular.mock.module('otusjs.report.business'));
  beforeEach(function () {

    inject(function (_$rootScope_, _$injector_) {
      scope = _$rootScope_;
      mockUtils();

      // Injections
      mockInjections(_$injector_);
      factory = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  //Factory Tests
  describe('the manage handling', function () {
    it("should build the ActivityDatasource", function(){
      let participantDatasource = Mock.fullReportComplete.dataSources[0];
      let activityDatasource = Mock.fullReportComplete.dataSources[1];

      factory.manage(participantDatasource);
      factory.manage(activityDatasource);

      expect(participantDatasource.result[0].objectType).not.toEqual("ActivityDatasource");
      expect(activityDatasource.result[0].objectType).toEqual("ActivityDatasource");
    });
  });

  describe("the ActivityDatasourceManager", function () {
      let onlineActivityManager;
      let offlineActivityManager;

      beforeEach(function(){
        let activityDatasourceOnline = Mock.fullReportComplete.dataSources[1];
        let activityDatasourceOffline = Mock.fullReportComplete.dataSources[2];

        factory.manage(activityDatasourceOnline);
        factory.manage(activityDatasourceOffline);

        onlineActivityManager = activityDatasourceOnline.result[0];
        offlineActivityManager = activityDatasourceOffline.result[0];

        spyOn(onlineActivityManager, "getLastStatusByName").and.callThrough();
        spyOn(onlineActivityManager, "getStatusByName").and.callThrough();

        spyOn(offlineActivityManager, "getLastStatusByName").and.callThrough();
        spyOn(offlineActivityManager, "getStatusByName").and.callThrough();
      });

    describe("the getInterviewDate method", function(){

      it("should return the InitializedOffline date when the activity mode is ONLINE ", function () {
        onlineActivityManager.getInterviewDate();

        expect(onlineActivityManager.getLastStatusByName).toHaveBeenCalledWith("FINALIZED");
      });

      it("should return the InitializedOffline date when the activity mode is PAPER ", function () {
        offlineActivityManager.getInterviewDate();

        expect(offlineActivityManager.getStatusByName).toHaveBeenCalledWith("INITIALIZED_OFFLINE");
      });
    });

    describe("getLastStatusByName method", function () {
      it("should return the last name occurrence", function () {
        onlineActivityManager.statusHistory = [
          {name:'a', date:1},
          {name:'b', date:2},
          {name:'c', date:3},
          {name:'a', date:4},
          {name:'b', date:5}
        ];

        expect(onlineActivityManager.getLastStatusByName("b").date).toEqual(5);
      });
    });

    describe("getStatusByName method", function () {
      it("should return the first name occurrence", function () {
        onlineActivityManager.statusHistory = [
          {name:'a', date:1},
          {name:'b', date:2},
          {name:'c', date:3},
          {name:'a', date:4},
          {name:'b', date:5}
        ];

        expect(onlineActivityManager.getStatusByName("b").date).toEqual(2);
      });
    });

    describe("getLastStatus method", function () {
      it("should return the last status", function () {
        onlineActivityManager.statusHistory = [
          {name:'a', date:1},
          {name:'b', date:2},
          {name:'c', date:3},
          {name:'a', date:4},
          {name:'b', date:5}
        ];

        expect(onlineActivityManager.getLastStatus().date).toEqual(5);
      });
    });


  });

  //-----Mock Functions

  function mockInjections($injector) {}

  function mockUtils() {
    mockReportInfo();
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
            "acronym": "CSJ",
            "category": "C0",
            "statusHistory": {
              "name": "FINALIZED",
              "position": -1
            }
          },
          "key": "HS",
          label: "Alguma atividade",
          "dataSource": "Activity",
          "result": [{
            "mode": "ONLINE",
            "statusHistory": [{
              "objectType": "ActivityStatus",
              "name": "CREATED",
              "date": "2018-05-25T20:13:11.472Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "OPENED",
              "date": "2018-05-25T20:13:16.462Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "INITIALIZED_ONLINE",
              "date": "2018-05-25T20:13:17.524Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-05-25T20:13:54.094Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "OPENED",
              "date": "2018-05-28T19:59:39.329Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "INITIALIZED_ONLINE",
              "date": "2018-05-28T19:59:40.231Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "SAVED",
              "date": "2018-05-28T19:59:42.072Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "OPENED",
              "date": "2018-05-28T19:59:55.494Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "INITIALIZED_ONLINE",
              "date": "2018-05-28T19:59:56.567Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }, {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-05-28T19:59:59.851Z",
              "user": {
                "name": "Fulano",
                "surname": "DeTal",
                "phone": "5193034655",
                "email": "fulanodetal@gmail.com"
              }
            }]
          }]
        },
        {
          "filters": {
            "acronym": "CSJ",
            "category": "C0",
            "statusHistory": {
              "name": "FINALIZED",
              "position": -1
            }
          },
          "key": "HS",
          label: "Alguma atividade",
          "dataSource": "Activity",
          "result": [{
            "mode": "PAPER",
            "statusHistory": [ {
              "objectType" : "ActivityStatus",
              "name" : "CREATED",
              "date" : "2018-05-29T01:12:06.060Z",
              "user" : {
                "name" : "Fulano",
                "surname" : "DeTal",
                "phone" : "5193034655",
                "email" : "fulanodetal@gmail.com"
              }
            },
              {
                "objectType" : "ActivityStatus",
                "name" : "INITIALIZED_OFFLINE",
                "date" : "2018-05-29T01:11:56.803Z",
                "user" : {
                  "name" : "Fulano",
                  "surname" : "DeTal",
                  "phone" : "5193034655",
                  "email" : "fulanodetal@gmail.com"
                }
              },
              {
                "objectType" : "ActivityStatus",
                "name" : "OPENED",
                "date" : "2018-05-29T01:12:09.112Z",
                "user" : {
                  "name" : "Fulano",
                  "surname" : "DeTal",
                  "phone" : "5193034655",
                  "email" : "fulanodetal@gmail.com"
                }
              },
              {
                "objectType" : "ActivityStatus",
                "name" : "INITIALIZED_ONLINE",
                "date" : "2018-05-29T01:12:10.498Z",
                "user" : {
                  "name" : "Fulano",
                  "surname" : "DeTal",
                  "phone" : "5193034655",
                  "email" : "fulanodetal@gmail.com"
                }
              },
              {
                "objectType" : "ActivityStatus",
                "name" : "FINALIZED",
                "date" : "2018-05-29T01:12:26.786Z",
                "user" : {
                  "name" : "Fulano",
                  "surname" : "DeTal",
                  "phone" : "5193034655",
                  "email" : "fulanodetal@gmail.com"
                }
              }]
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
