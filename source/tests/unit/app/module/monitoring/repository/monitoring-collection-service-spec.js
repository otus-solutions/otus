describe("MonitoringCollectionService_Suite", function () {
  var service;
  var Injections = [];
  var Mock = {};
  const RECRUITMENT_NUMBER = 7000312;
  const ACRONYM = "ANTC";

  beforeEach(function () {
    angular.mock.module('otusjs.otus.monitoring');

    angular.mock.inject(function (_$injector_, $rootScope) {
      Injections.$q = _$injector_.get('$q')
      Injections.ModuleService = _$injector_.get('otusjs.monitoring.core.ModuleService');
      Injections.MonitoringLocalStorageService = _$injector_.get('otusjs.monitoring.storage.MonitoringLocalStorageService');

      service = _$injector_.get('otusjs.monitoring.repository.MonitoringCollectionService', Injections);
      Mock.scope = $rootScope.$new();
      mockInitialize();

      //compulsory bootstrap simulation to control the promises
      Injections.ModuleService.configureRemoteStorage(Mock.remoteStorage);
    });
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodExistence check', function () {
    expect(service.find).toBeDefined();
    expect(service.listCenters).toBeDefined();
    expect(service.listAcronyms).toBeDefined();
    expect(service.getStatusOfActivities).toBeDefined();
    expect(service.getActivitiesProgressReport).toBeDefined();
    expect(service.defineActivityWithDoesNotApplies).toBeDefined();
    expect(service.deleteNotAppliesOfActivity).toBeDefined();
    expect(service.getDataOfPendingResultsByAliquots).toBeDefined();
    expect(service.getDataQuantitativeByTypeOfAliquots).toBeDefined();
    expect(service.getDataOrphanByExams).toBeDefined();
    expect(service.getDataOfStorageByAliquots).toBeDefined();
    expect(service.getDataByExam).toBeDefined();
    expect(service.getDataToCSVOfPendingResultsByAliquots).toBeDefined();
    expect(service.getDataToCSVOfOrphansByExam).toBeDefined();
    expect(service.getStatusOfExams).toBeDefined();
    expect(service.defineExamWithDoesNotApplies).toBeDefined();
    expect(service.deleteNotAppliesOfExam).toBeDefined();
  });

  it('listAcronyms_method_should_return_acronyms_by_promises ', function () {
    Mock.response = {
      data: Test.utils.data.Acronyms
    };

    //mock to resolve the external promise
    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    //mock to resolve the internal promise
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(Mock.response);
    spyOn(Mock.remoteStorage, "listAcronyms").and.returnValue(Mock.deferredInternal.promise);

    service.listAcronyms().then(function (data) {
      Mock.EXPECTED = data;
    });

    //mandatory call to resolve the promises
    Mock.scope.$digest();
    expect(Mock.EXPECTED.length).toBe(27);
    expect(Mock.EXPECTED[2]).toBe("ISG");
  });

  it('listAcronyms_method_should_return_rejectPromise', function () {
    Mock.EXPECTED_ERROR = "not reject";

    //mock to resolve the external promise
    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    //mock to resolve the internal promise
    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject();
    spyOn(Mock.remoteStorage, "listAcronyms").and.returnValue(Mock.deferredInternal.promise);

    service.listAcronyms().catch(function () {
      Mock.EXPECTED_ERROR = "rejectPromise";
    });

    //mandatory call to resolve the promises
    Mock.scope.$digest();
    expect(Mock.EXPECTED_ERROR).toBe("rejectPromise");
  });

  it('getStatusOfActivities_method_should_return_list_of_StatusOfActivity', function () {
    Mock.response = {
      data: Test.utils.data.StatusOfActivities
    };

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(Mock.response);
    spyOn(Mock.remoteStorage, "getStatusOfActivities").and.returnValue(Mock.deferredInternal.promise);

    service.getStatusOfActivities(RECRUITMENT_NUMBER).then(function (data) {
      Mock.EXPECTED = data;
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED.length).toBe(2);
    expect(Mock.EXPECTED[1].acronym).toBe("FRC");
  });

  it('getStatusOfActivities_method_should_return_rejectPromise', function () {
    Mock.EXPECTED_ERROR = "not reject";

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject();
    spyOn(Mock.remoteStorage, "getStatusOfActivities").and.returnValue(Mock.deferredInternal.promise);

    service.getStatusOfActivities(RECRUITMENT_NUMBER).catch(function () {
      Mock.EXPECTED_ERROR = "rejectPromise";
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED_ERROR).toBe("rejectPromise");
  });

  it('defineActivityWithDoesNotApplies_method_should_return_promise_resolve_valid', function () {
    Mock.deferred = Injections.$q.defer();
    Mock.deferred.resolve(true);
    Mock.response = {
      data: Mock.deferred.promise
    };

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(Mock.response);
    spyOn(Mock.remoteStorage, "defineActivityWithDoesNotApplies").and.returnValue(Mock.deferredInternal.promise);

    service.defineActivityWithDoesNotApplies(Mock.activityData).then(function (data) {
      Mock.EXPECTED = data;
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED).toBeTruthy();
  });

  it('defineActivityWithDoesNotApplies_method_should_return_rejectPromise', function () {
    Mock.EXPECTED_ERROR = "not reject";

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject();
    spyOn(Mock.remoteStorage, "defineActivityWithDoesNotApplies").and.returnValue(Mock.deferredInternal.promise);

    service.defineActivityWithDoesNotApplies(Mock.activityData).catch(function () {
      Mock.EXPECTED_ERROR = "rejectPromise";
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED_ERROR).toBe("rejectPromise");
  });

  it('deleteNotAppliesOfActivity_method_should_return_promise_resolve_valid', function () {
    Mock.deferred = Injections.$q.defer();
    Mock.deferred.resolve(true);
    Mock.response = {
      data: Mock.deferred.promise
    };

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(Mock.response);
    spyOn(Mock.remoteStorage, "deleteNotAppliesOfActivity").and.returnValue(Mock.deferredInternal.promise);

    service.deleteNotAppliesOfActivity(RECRUITMENT_NUMBER, ACRONYM).then(function (data) {
      Mock.EXPECTED = data;
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED).toBeTruthy();
  });

  it('deleteNotAppliesOfActivity_method_should_return_rejectPromise', function () {
    Mock.EXPECTED_ERROR = "not reject";

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject();
    spyOn(Mock.remoteStorage, "deleteNotAppliesOfActivity").and.returnValue(Mock.deferredInternal.promise);

    service.deleteNotAppliesOfActivity(RECRUITMENT_NUMBER, ACRONYM).catch(function () {
      Mock.EXPECTED_ERROR = "rejectPromise";
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED_ERROR).toBe("rejectPromise");
  });

  it('getStatusOfExams_method_should_return_list_of_StatusOfExam', function () {
    Mock.response = {
      data: Test.utils.data.Exam
    };

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(Mock.response);
    spyOn(Mock.remoteStorage, "getStatusOfExams").and.returnValue(Mock.deferredInternal.promise);

    service.getStatusOfExams(RECRUITMENT_NUMBER).then(function (data) {
      Mock.EXPECTED = data;
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED.length).toBe(2);
    expect(Mock.EXPECTED[1].name).toBe('ELSA TURBIURINA');
  });

  it('getStatusOfExams_method_should_return_rejectPromise', function () {
    Mock.EXPECTED_ERROR = "not reject";

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject();
    spyOn(Mock.remoteStorage, "getStatusOfExams").and.returnValue(Mock.deferredInternal.promise);

    service.getStatusOfExams(RECRUITMENT_NUMBER).catch(function () {
      Mock.EXPECTED_ERROR = "rejectPromise";
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED_ERROR).toBe("rejectPromise");
  });

  it('defineExamWithDoesNotApplies_method_should_return_promise_resolve_valid', function () {
    Mock.deferred = Injections.$q.defer();
    Mock.deferred.resolve(true);
    Mock.response = {
      data: Mock.deferred.promise
    };

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(Mock.response);
    spyOn(Mock.remoteStorage, "defineExamWithDoesNotApplies").and.returnValue(Mock.deferredInternal.promise);

    service.defineExamWithDoesNotApplies(Mock.examData).then(function (data) {
      Mock.EXPECTED = data;
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED).toBeTruthy();
  });

  it('defineExamWithDoesNotApplies_method_should_return_rejectPromise', function () {
    Mock.EXPECTED_ERROR = "not reject";

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject();
    spyOn(Mock.remoteStorage, "defineExamWithDoesNotApplies").and.returnValue(Mock.deferredInternal.promise);

    service.defineExamWithDoesNotApplies(Mock.examData).catch(function () {
      Mock.EXPECTED_ERROR = "rejectPromise";
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED_ERROR).toBe("rejectPromise");
  });

  it('deleteNotAppliesOfExam_method_should_return_promise_resolve_valid', function () {
    Mock.deferred = Injections.$q.defer();
    Mock.deferred.resolve(true);
    Mock.response = {
      data: Mock.deferred.promise
    };

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.resolve(Mock.response);
    spyOn(Mock.remoteStorage, "deleteNotAppliesOfExam").and.returnValue(Mock.deferredInternal.promise);

    service.deleteNotAppliesOfExam(Mock.examData).then(function (data) {
      Mock.EXPECTED = data;
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED).toBeTruthy();
  });

  it('deleteNotAppliesOfExam_method_should_return_rejectPromise', function () {
    Mock.EXPECTED_ERROR = "not reject";

    Mock.deferredExternal = Injections.$q.defer();
    Mock.deferredExternal.resolve(Mock.remoteStorage);
    spyOn(Mock._remoteStorage, "whenReady").and.returnValue(Mock.deferredExternal.promise);

    Mock.deferredInternal = Injections.$q.defer();
    Mock.deferredInternal.reject();
    spyOn(Mock.remoteStorage, "deleteNotAppliesOfExam").and.returnValue(Mock.deferredInternal.promise);

    service.deleteNotAppliesOfExam(Mock.examData).catch(function () {
      Mock.EXPECTED_ERROR = "rejectPromise";
    });

    Mock.scope.$digest();
    expect(Mock.EXPECTED_ERROR).toBe("rejectPromise");
  });

  function mockInitialize() {
    Mock._remoteStorage = Injections.ModuleService.getMonitoringRemoteStorage();
    Mock._laboratoryMonitoringStorage = Injections.ModuleService.getLaboratoryMonitoringRemoteStorage();
    Mock.remoteStorage = {
      listAcronyms: jasmine.anything(),
      getStatusOfActivities: jasmine.anything(),
      defineActivityWithDoesNotApplies: jasmine.anything(),
      deleteNotAppliesOfActivity: jasmine.anything(),
      getStatusOfExams: jasmine.anything(),
      defineExamWithDoesNotApplies: jasmine.anything(),
      deleteNotAppliesOfExam: jasmine.anything()
    };
    Mock.activityData = Test.utils.data.ActivityWithDoesNotAppliesData;
    Mock.examData = Test.utils.data.ExamWithDoesNotAppliesData;
  }
});