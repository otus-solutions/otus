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
    Mock.activity = Test.utils.data.activity;
   };
});





