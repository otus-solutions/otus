describe('ParticipantMonitoringService Test Suite', function () {
  const CREATED = 'CREATED';
  const SAVED = 'SAVED';
  const FINALIZED = 'FINALIZED';
  const DOES_NOT_APPLY = 'DOES_NOT_APPLY';
  const UNDEFINED = 'UNDEFINED';
  const MULTIPLE = 'MULTIPLE';
  const AMBIGUITY = 'AMBIGUITY';
  const FINALIZED_PTBR = 'Finalizado';
  const RECRUITMENT_NUMBER = 123456;
  const OBSERVATION = {};
  var Mock = {};
  var service, monitoringCollectionService;

  beforeEach(function () {
    angular.mock.module('otusjs.otus.monitoring');
    /* Test data */
    mockDataSource();
  });

  beforeEach(angular.mock.inject(function (_$injector_) {
    service = _$injector_.get('otusjs.monitoring.business.ParticipantMonitoringService');
    monitoringCollectionService = _$injector_.get('otusjs.monitoring.repository.MonitoringCollectionService');

    spyOn(monitoringCollectionService, "getStatusOfActivities").and.callThrough();
    spyOn(monitoringCollectionService, "defineActivityWithDoesNotApplies").and.callThrough();
  }));

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  describe('ServiceInstance', function () {

    it('methodServiceExistence ckeck', function () {
      expect(service.getStatusOfActivities).toBeDefined();
      expect(service.defineActivityWithDoesNotApplies).toBeDefined();
      expect(service.buildActivityStatus).toBeDefined();
    });
  });

  describe('getStatusOfActivities method', function () {
    it('should call method', function () {
      service.getStatusOfActivities(RECRUITMENT_NUMBER);
      expect(monitoringCollectionService.getStatusOfActivities).toHaveBeenCalledTimes(1);
    });
  });


  describe('defineActivityWithDoesNotApplies method', function () {
    it('should call method', function () {
      service.defineActivityWithDoesNotApplies(RECRUITMENT_NUMBER, OBSERVATION, Mock.activity[3]);
      expect(monitoringCollectionService.defineActivityWithDoesNotApplies).toHaveBeenCalledTimes(1);
    });
  });

  describe('buildActivityStatus method', function () {
    it('should call method', function () {
      service.buildActivityStatus(Mock.activity[3]);
    });

    it('should return status with CREATED', function () {
      var result = service.buildActivityStatus(Mock.activity[3]);

      expect(result.status).toEqual(CREATED);
    });


    it('should return status with SAVED', function () {
      var result = service.buildActivityStatus(Mock.activity[4]);

      expect(result.status).toEqual(SAVED);
    });

    it('should return status with FINALIZED', function () {
      var result = service.buildActivityStatus(Mock.activity[5]);

      expect(result.status).toEqual(FINALIZED);
    });

    it('should return status with DOES_NOT_APPLY', function () {
      var result = service.buildActivityStatus(Mock.activity[2]);

      expect(result.status).toEqual(DOES_NOT_APPLY);
    });

    it('should return status with UNDEFINED', function () {
      var result = service.buildActivityStatus(Mock.activity[1]);

      expect(result.status).toEqual(UNDEFINED);
    });

    it('should return status with MULTIPLE', function () {
      var result = service.buildActivityStatus(Mock.activity[6]);

      expect(result.status).toEqual(MULTIPLE);
    });

    it('should return status with AMBIGUITY', function () {
      var result = service.buildActivityStatus(Mock.activity[0]);

      expect(result.status).toEqual(AMBIGUITY);
    });
  });

  describe('_buildStatusToPTbr method', function () {
    it('should return status in PTbr', function () {
      var result = service.buildActivityStatus(Mock.activity[6]);

      expect(result.information[0].status).toEqual(FINALIZED_PTBR);
      expect(result.information[1].status).toEqual(FINALIZED_PTBR);
    });
  });

  function mockDataSource() {
    Mock.activity = [
      {
        "_id": "5aff3edaaf11bb0d302be3c7",
        "activities": [
          {
            "_id": "5be45306e69a690064fb1e1c",
            "statusHistory": {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-11-08T15:15:45.810Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "otus@otus.com"
              }
            }
          },
          {
            "_id": "5be4533be69a690064fb1e1d",
            "statusHistory": {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-11-08T15:16:41.177Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "otus@otus.com"
              }
            }
          }
        ],
        "acronym": "CSJ",
        "name": "COLETA JEJUM",
        "doesNotApply": {
          "_id": "5be443ef4c43aa5319b3d1da",
          "rn": 7000312,
          "acronym": "CSJ",
          "observation": "Atividade está descartada, participante está com febre amarela."
        }
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e3",
        "activities": [],
        "acronym": "VOPC",
        "name": "VELOCIDADE DA ONDA DE PULSO"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f1",
        "activities": [],
        "acronym": "CSI",
        "name": "COLETA DE SANGUE INTERMEDIÁRIA",
        "doesNotApply": {
          "_id": "5be443ef4c43aa5319b3d1da",
          "rn": 7000312,
          "acronym": "CSJ",
          "observation": "Atividade está descartada, participante está com febre amarela."
        }
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f8",
        "activities": [
          {
            "_id": "5b8d773f086a5e5ee91527ff",
            "statusHistory": {
              "objectType": "ActivityStatus",
              "name": "CREATED",
              "date": "2018-09-03T18:02:39.755Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "otus@otus.com"
              }
            }
          }
        ],
        "acronym": "AFID",
        "name": "ATIVIDADE FÍSICA"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e6",
        "activities": [
          {
            "_id": "5b843716086a5e5ee961e05c",
            "statusHistory":
            {
              "objectType": "ActivityStatus",
              "name": "SAVED",
              "date": "2018-08-27T17:39:01.285Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "otus@otus.com"
              }
            }
          }
        ],
        "acronym": "DIEC",
        "name": "DIETA"
      },
      {
        "_id": "5b869bb3086a5e5ee91527f6",
        "activities": [
          {
            "_id": "5be07e20e69a690064fb1e1a",
            "statusHistory":
            {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-11-05T17:30:17.887Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "vianna.emanoel@gmail.com"
              }
            }
          }
        ],
        "acronym": "DQUOTETWO",
        "name": "teste"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e4",
        "activities": [
          {
            "_id": "5be45306e69a690064fb1e1c",
            "statusHistory":
            {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-11-08T15:15:45.810Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "vianna.emanoel@gmail.com"
              }
            }
          },
          {
            "_id": "5be4533be69a690064fb1e1d",
            "statusHistory":
            {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-09-08T15:16:41.177Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "vianna.emanoel@gmail.com"
              }
            }
          }
        ],
        "acronym": "USGC",
        "name": "ULTRASSONOGRAFIA DAS ARTÉRIAS CARÓTIDAS E FEMORAIS"
      },
    ];
  };
});





