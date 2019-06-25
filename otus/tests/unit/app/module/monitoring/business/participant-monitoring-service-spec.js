describe('ParticipantMonitoringService Test Suite', function () {
  var service;
  var Injections = [];
  var Mock = {};
  const RECRUITMENT_NUMBER = 7000312;


  beforeEach(function () {
    angular.mock.module('otusjs.otus.monitoring');
    angular.mock.module('otusjs.model.monitoring');


    /* Test data */
    mockDataSource();

    angular.mock.inject(function (_$injector_, $rootScope) {
      Injections.$q = _$injector_.get('$q');
      Injections.MonitoringCollectionService = _$injector_.get('otusjs.monitoring.repository.MonitoringCollectionService');
      Injections.HeatMapActivityFactory = _$injector_.get('otusjs.model.monitoring.HeatMapActivityFactory');
      Injections.HeatMapExamFactory = _$injector_.get('otusjs.model.monitoring.HeatMapExamFactory');
      service = _$injector_.get('otusjs.monitoring.business.ParticipantMonitoringService', Injections);
      spyOn(Injections.MonitoringCollectionService, "getStatusOfActivities").and.callThrough();
      spyOn(Injections.MonitoringCollectionService, "defineActivityWithDoesNotApplies").and.callThrough();
      spyOn(Injections.MonitoringCollectionService, "deleteNotAppliesOfActivity").and.callThrough();
      spyOn(Injections.HeatMapActivityFactory, "fromJsonObject").and.callThrough();
      spyOn(Injections.HeatMapActivityFactory, "create").and.callThrough();
      spyOn(Injections.MonitoringCollectionService, "getStatusOfExams").and.callThrough();
      spyOn(Injections.HeatMapExamFactory, "fromJsonObject").and.callThrough();
      spyOn(Injections.HeatMapExamFactory, "create").and.callThrough();
      spyOn(Injections.MonitoringCollectionService, "defineExamWithDoesNotApplies").and.callThrough();
      spyOn(Injections.MonitoringCollectionService, "deleteNotAppliesOfExam").and.callThrough();

      Mock.scope = $rootScope.$new();
    });
  });

  function mockDataSource() {
    Mock.activity = Test.utils.data.activity;
    Mock.exam = Test.utils.data.participantExamStatusList;
    Mock.oldActivity = Test.utils.data.HeatMapActivity;
    Mock.observation = "unitTest";
    Mock.oldExam = Test.utils.data.HeatMapExam;
  };

  it('serviceExistence_check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.buildActivityStatusList).toBeDefined();
    expect(service.buildActivityStatus).toBeDefined();
    expect(service.defineActivityWithDoesNotApplies).toBeDefined();
    expect(service.deleteNotAppliesOfActivity).toBeDefined();
    expect(service.defineExamWithDoesNotApplies).toBeDefined();
    expect(service.buildExamStatusList).toBeDefined();
    expect(service.buildExamStatus).toBeDefined();
    expect(service.deleteNotAppliesOfExam).toBeDefined();
  });

  it('buildActivityStatusList_method_should_return_product_by_factory_of_HeatMapActivity_in_two_promises', function () {
    var EXPECTED_DATA = [];
    var deferred = Injections.$q.defer();
    deferred.resolve(Mock.activity);
    Injections.MonitoringCollectionService.getStatusOfActivities.and.returnValue(deferred.promise);

    service.buildActivityStatusList(RECRUITMENT_NUMBER).then(function (data) {
      EXPECTED_DATA = data;
    });
    Mock.scope.$digest();
    expect(EXPECTED_DATA[0].objectType).toBe("HeatMapActivity");
    expect(EXPECTED_DATA[0].acronym).toBe("CSJ");
    expect(EXPECTED_DATA[0].name).toBe("COLETA JEJUM");
    expect(Injections.HeatMapActivityFactory.fromJsonObject).toHaveBeenCalledTimes(1);
  });

  it('buildActivityStatusList_method_should_return_rejectPromise', function () {
    var EXPECTED_ERROR = "not reject";
    var deferred = Injections.$q.defer();
    deferred.reject();
    Injections.MonitoringCollectionService.getStatusOfActivities.and.returnValue(deferred.promise);
    service.buildActivityStatusList(RECRUITMENT_NUMBER).catch(function () {
      EXPECTED_ERROR = "rejectPromise";
    });
    Mock.scope.$digest();
    expect(EXPECTED_ERROR).toBe("rejectPromise");
    expect(Injections.HeatMapActivityFactory.fromJsonObject).toHaveBeenCalledTimes(0);
  });

  it('buildActivityStatus_method_should_evoke_createMethod_of_ HeatMapActivityFactory', function () {
    service.buildActivityStatus(Mock.activity[0].activities[0]);
    expect(Injections.HeatMapActivityFactory.create).toHaveBeenCalledTimes(1)
  });

  it('defineActivityWithDoesNotApplies_method_should_add_doesNotApply_in_activitity', function () {
    service.participantActivityStatusList = Test.utils.data.activity;
    var EXPECTED_ACTIVITY = {};
    var deferred = Injections.$q.defer();
    deferred.resolve();
    Injections.MonitoringCollectionService.defineActivityWithDoesNotApplies.and.returnValue(deferred.promise);

    service.defineActivityWithDoesNotApplies(RECRUITMENT_NUMBER, Mock.observation, Mock.oldActivity)
      .then(function (data) {
        EXPECTED_ACTIVITY = data;
      });
    Mock.scope.$digest();
    expect(EXPECTED_ACTIVITY.doesNotApply.observation).toBe(Mock.observation);
  });

  it('defineActivityWithDoesNotApplies_method_should_return_rejectPromise', function () {
    var EXPECTED_ERROR = "not reject";
    var deferred = Injections.$q.defer();
    deferred.reject();
    Injections.MonitoringCollectionService.defineActivityWithDoesNotApplies.and.returnValue(deferred.promise);

    service.defineActivityWithDoesNotApplies(RECRUITMENT_NUMBER, Mock.observation, Mock.oldActivity)
      .catch(function () {
        EXPECTED_ERROR = "rejectPromise";
      });
    Mock.scope.$digest();
    expect(EXPECTED_ERROR).toBe('rejectPromise');
  });

  it('deleteNotAppliesOfActivity_method_should_return_activity_without_doesNotApply ', function () {
    service.participantActivityStatusList = Test.utils.data.activity;
    var EXPECTED_ACTIVITY = {};
    var deferred = Injections.$q.defer();
    deferred.resolve();
    Injections.MonitoringCollectionService.deleteNotAppliesOfActivity.and.returnValue(deferred.promise);

    service.deleteNotAppliesOfActivity(RECRUITMENT_NUMBER, Mock.oldActivity)
      .then(function (data) {
        EXPECTED_ACTIVITY = data;
      });
    Mock.scope.$digest();
    expect(EXPECTED_ACTIVITY.acronym).toBe("CSI");
    expect(EXPECTED_ACTIVITY.doesNotApply).toBeUndefined();
  });

  it('deleteNotAppliesOfActivity_method_should_return_rejectPromise', function () {
    var EXPECTED_ERROR = "not reject";
    service.participantActivityStatusList = Test.utils.data.activity;
    var deferred = Injections.$q.defer();
    deferred.reject();
    Injections.MonitoringCollectionService.deleteNotAppliesOfActivity.and.returnValue(deferred.promise);

    service.deleteNotAppliesOfActivity(RECRUITMENT_NUMBER, Mock.oldActivity)
      .catch(function () {
        EXPECTED_ERROR = "rejectPromise";
      });
    Mock.scope.$digest();
    expect(EXPECTED_ERROR).toBe('rejectPromise');
  });

  it('buildExamStatusList_method_should_return_product_by_factory_of_HeatMapExam_in_two_promises', function () {
    var EXPECTED_DATA = [];
    var deferred = Injections.$q.defer();
    deferred.resolve(Mock.exam);
    Injections.MonitoringCollectionService.getStatusOfExams.and.returnValue(deferred.promise);

    service.buildExamStatusList(RECRUITMENT_NUMBER).then(function (data) {
      EXPECTED_DATA = data;
    });
    Mock.scope.$digest();
    expect(EXPECTED_DATA[0].objectType).toBe("HeatMapExam");
    expect(EXPECTED_DATA[0].name).toBe("CÁLCIO - URINA AMOSTRA ISOLADA");
    expect(Injections.HeatMapExamFactory.fromJsonObject).toHaveBeenCalledTimes(1);
  });

  it('buildExamStatusList_method_should_return_rejectPromise', function () {
    var EXPECTED_ERROR = "not reject";
    var deferred = Injections.$q.defer();
    deferred.reject();
    Injections.MonitoringCollectionService.getStatusOfExams.and.returnValue(deferred.promise);
    service.buildExamStatusList(RECRUITMENT_NUMBER).catch(function () {
      EXPECTED_ERROR = "rejectPromise";
    });
    Mock.scope.$digest();
    expect(EXPECTED_ERROR).toBe("rejectPromise");
    expect(Injections.HeatMapExamFactory.fromJsonObject).toHaveBeenCalledTimes(0);
  });

  it('buildExamStatus_method_should_evoke_createMethod_of_ HeatMapExamFactory', function () {
    service.buildExamStatus(Mock.exam[0]);
    expect(Injections.HeatMapExamFactory.create).toHaveBeenCalledTimes(1)
  });

  it('defineExamWithDoesNotApplies_method_should_add_doesNotApply_in_exam', function () {
    service.participantExamStatusList = Test.utils.data.participantExamStatusList.participantExams;

    Mock.observation = "unitTest";
    var EXPECTED_EXAM = {};
    var deferred = Injections.$q.defer();
    deferred.resolve();
    Injections.MonitoringCollectionService.defineExamWithDoesNotApplies.and.returnValue(deferred.promise);

    service.defineExamWithDoesNotApplies(RECRUITMENT_NUMBER, Mock.observation, Mock.oldExam)
      .then(function (data) {
        EXPECTED_EXAM = data;
      });
    Mock.scope.$digest();
    expect(EXPECTED_EXAM.doesNotApply.observation).toBe(Mock.observation);
  });

  it('defineExamWithDoesNotApplies_method_should_return_rejectPromise', function () {
    var EXPECTED_ERROR = "not reject";
    var deferred = Injections.$q.defer();
    deferred.reject();
    Injections.MonitoringCollectionService.defineExamWithDoesNotApplies.and.returnValue(deferred.promise);

    service.defineExamWithDoesNotApplies(RECRUITMENT_NUMBER, Mock.observation, Mock.oldExam)
      .catch(function () {
        EXPECTED_ERROR = "rejectPromise";
      });
    Mock.scope.$digest();
    expect(EXPECTED_ERROR).toBe('rejectPromise');
  });

  it('deleteNotAppliesOfExam_method_should_return_exam_without_doesNotApply', function () {
    service.participantExamStatusList = Test.utils.data.participantExamStatusList.participantExams;
    var EXPECTED_EXAM = {};
    var deferred = Injections.$q.defer();
    deferred.resolve();
    Injections.MonitoringCollectionService.deleteNotAppliesOfExam.and.returnValue(deferred.promise);

    service.deleteNotAppliesOfExam(RECRUITMENT_NUMBER, Mock.oldExam)
      .then(function (data) {
        EXPECTED_EXAM = data;
      });
    Mock.scope.$digest();
    expect(EXPECTED_EXAM.name).toBe("CÁLCIO - URINA AMOSTRA ISOLADA");
    expect(EXPECTED_EXAM.doesNotApply).toBeUndefined();
  });

  it('deleteNotAppliesOfExam_method_should_return_rejectPromise', function () {
    var EXPECTED_ERROR = "not reject";
    var deferred = Injections.$q.defer();
    deferred.reject();
    Injections.MonitoringCollectionService.deleteNotAppliesOfExam.and.returnValue(deferred.promise);

    service.deleteNotAppliesOfExam(RECRUITMENT_NUMBER, Mock.oldActivity)
      .catch(function () {
        EXPECTED_ERROR = "rejectPromise";
      });
    Mock.scope.$digest();
    expect(EXPECTED_ERROR).toBe('rejectPromise');
  });

});