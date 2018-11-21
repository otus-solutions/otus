  describe('ParticipantMonitoringService Test Suite', function(){

    var service, monitoringCollectionService;

    //var dataT =  require('../../../utils/json-importer.json');
    //var activityStatusData = dataT.activityStatusData;

    const RN = 123456;
    const observation = {};
    const activity = {acronym: "ABCD"};
    const data = {activities: []};

    var Injections = {};

    beforeEach(function () {
      angular.mock.module('otusjs.otus.monitoring')

      // angular.mock.module('otusjs.otus.monitoring', function ($provide) {
      //   $provide.value('otusjs.monitoring.repository.MonitoringCollectionService', {})
      //
      // });
     });


    beforeEach(angular.mock.inject(function (_$injector_) {
      // Injections = {
      //    $filter: {},
      //    MonitoringCollectionService: _$injector_.get('otusjs.monitoring.repository.MonitoringCollectionService')
      // }
      //
      // service = _$injector_.get('otusjs.monitoring.business.ParticipantMonitoringService', Injections);

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

      it('getStatusOfActivitiesMethod ', function () {
        console.log(service.getStatusOfActivities(RN));
        expect(monitoringCollectionService.getStatusOfActivities).toHaveBeenCalledTimes(1);

      });

      it('defineActivityWithDoesNotAppliesMethod ', function () {
        console.log(service.defineActivityWithDoesNotApplies(RN, observation, activity));
        expect(monitoringCollectionService.defineActivityWithDoesNotApplies).toHaveBeenCalledTimes(1);

      });

      it('buildActivityStatusMethod ', function () {
        console.log(service.buildActivityStatus(data));

      });
    });

});

 var activityStatusData = [
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
    "_id": "5aff3edfaf11bb0d302be3e4",
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
        "date": "2018-09-08T15:16:41.177Z",
        "user": {
          "name": "Emanoel",
          "surname": "Vianna",
          "phone": "51999999999",
          "email": "otus@otus.com"
        }
      }
    }
  ],
    "acronym": "USGC",
    "name": "ULTRASSONOGRAFIA DAS ARTÉRIAS CARÓTIDAS E FEMORAIS"
  },
  {
    "_id": "5aff3edfaf11bb0d302be3e5",
    "activities": [],
    "acronym": "ANTC",
    "name": "ANTROPOMETRIA"
  },
  {
    "_id": "5aff3edfaf11bb0d302be3e6",
    "activities": [
    {
      "_id": "5b843716086a5e5ee961e05c",
      "statusHistory": {
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
    "_id": "5aff3edfaf11bb0d302be3e7",
    "activities": [],
    "acronym": "CFUC",
    "name": "CAPACIDADE FUNCIONAL"
  },
  {
    "_id": "5aff3ee0af11bb0d302be3ee",
    "activities": [],
    "acronym": "FORC",
    "name": "FORÇA ISOMÉTRICA"
  },
  {
    "_id": "5aff3ee0af11bb0d302be3ef",
    "activities": [
    {
      "_id": "5b8d773f086a5e5ee91527fe",
      "statusHistory": {
        "objectType": "ActivityStatus",
        "name": "CREATED",
        "date": "2018-09-03T18:02:39.750Z",
        "user": {
          "name": "Emanoel",
          "surname": "Vianna",
          "phone": "51999999999",
          "email": "otus@otus.com"
        }
      }
    }
  ],
    "acronym": "ACTDC",
    "name": "ACTIMETRIA DEVOLUÇÃO"
  },
  {
    "_id": "5aff3ee0af11bb0d302be3f0",
    "activities": [],
    "acronym": "RETC",
    "name": "RETINOGRAFIA"
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
    "_id": "5aff3ee0af11bb0d302be3f4",
    "activities": [],
    "acronym": "EAIC",
    "name": "EXPERIÊNCIAS ADVERSAS NA INFÂNCIA"
  },
  {
    "_id": "5aff3ee0af11bb0d302be3f5",
    "activities": [],
    "acronym": "FRC",
    "name": "Formulário Revisão Cardiovascular"
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
    "_id": "5aff3ee1af11bb0d302be3f9",
    "activities": [],
    "acronym": "MULC",
    "name": "MULHERES"
  },
  {
    "_id": "5aff3ee1af11bb0d302be3fa",
    "activities": [],
    "acronym": "SONC",
    "name": "SONO"
  },
  {
    "_id": "5b0c2eec086a5e1c77cd86f2",
    "activities": [],
    "acronym": "MOND",
    "name": "MONOFILAMENTO"
  },
  {
    "_id": "5b858dda086a5e5ee91527e9",
    "activities": [],
    "acronym": "DQUOTE",
    "name": "Testes"
  },
  {
    "_id": "5b869bb3086a5e5ee91527f6",
    "activities": [
    {
      "_id": "5be07e20e69a690064fb1e1a",
      "statusHistory": {
        "objectType": "ActivityStatus",
        "name": "FINALIZED",
        "date": "2018-11-05T17:30:17.887Z",
        "user": {
          "name": "Emanoel",
          "surname": "Vianna",
          "phone": "51999999999",
          "email": "otus@otus.com"
        }
      }
    }
  ],
    "acronym": "DQUOTETWO",
    "name": "teste"
  },
  {
    "_id": "5b9a98b0086a5e5ee9152806",
    "activities": [
    {
      "_id": "5b9a98e0086a5e5ee9152807",
      "statusHistory": {
        "objectType": "ActivityStatus",
        "name": "SAVED",
        "date": "2018-09-13T17:07:33.244Z",
        "user": {
          "name": "Emanoel",
          "surname": "Vianna",
          "phone": "51999999999",
          "email": "otus@otus.com"
        }
      }
    }
  ],
    "acronym": "MARAVILHA",
    "name": "funciona"
  },
  {
    "_id": "5b9acc72086a5e5ee9152808",
    "activities": [],
    "acronym": "TS",
    "name": "teste"
  }
  ]



