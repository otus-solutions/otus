describe('PendencyViewerService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.UserActivityPendencyRepositoryService = $injector.get('otusjs.pendency.repository.UserActivityPendencyRepositoryService');
      service = $injector.get('otusjs.pendencyViewer.PendencyViewerService', Injections);

      mockInitialize($rootScope);
      Mock.defer = Injections.$q.defer();
      Mock.defer.resolve(Mock.pendencies);
    });
  });

  function mockInitialize($rootScope) {
    Mock = {
      searchSettings: service.getSearchSettings(),
      pendencyAttributes: service.getPendencyAttributes(),
      inputViewState: service.getInputViewState(),
      pendencies: [Test.utils.data.userActivityPendency],
      scope: $rootScope.$new(),
      date: new Date("Sat Mar 07 2020 00:00:00"),
      participant: { recruitmentNumber: 1234567 },
      pendencyFilterItem: {title: "rn"}
    }
  }

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getSearchSettings).toBeDefined();
    expect(service.getPendencyAttributes).toBeDefined();
    expect(service.getInputViewState).toBeDefined();
    expect(service.getAllPendencies).toBeDefined();
    expect(service.callValidationPendenciesLimits).toBeDefined();
    expect(service.formatDate).toBeDefined();
    expect(service.calculateRemainingDays).toBeDefined();
    expect(service.getSelectedParticipantRN).toBeDefined();
    expect(service.getChecker).toBeDefined();
  });

  it('getSearchSettingsMethod_should_returns_searchSettingsInitial', () => {
    expect(Mock.searchSettings.order.fields[0]).toBe("dueDate");
  });

  it('getPendencyattributes_method_should_returns_initialPendencyAttributes', () => {
    expect(Mock.pendencyAttributes.receiver.icon).toBe("assignment_ind");
  });

  it('getInputViewState_method_should_returns_inputViewStateInitial', () => {
    expect(Mock.inputViewState.receiver).toBeFalsy();
  });

  it('getAllPendencies_method_should_pendencyInstance_in_List_of_promiseResolve', () => {
    spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies")
      .and.returnValue(Mock.defer.promise);
    service.getAllPendencies(Mock.searchSettings)
      .then(data => expect(data[0].objectType).toBe("userActivityPendency"));
    Mock.scope.$digest();
  });

  it('formatDate_method_should_returns_customDate', () => {
    expect(service.formatDate(Mock.date)).toBe("7/3/2020")
  });

  it('calculateRemainingDays_should_RemainingDays_between dates', () => {
    expect(service.calculateRemainingDays(new Date())).toBe(0)
  });
  it('getSelectedParticipantRN_method_should_', () => {
    service.getSelectedParticipantRN(Mock.participant, Mock.pendencyFilterItem, Mock.searchSettings);
    expect(Mock.searchSettings.filter.rn).toBe(1234567)

  });

  it('callValidationPendenciesLimits_method_should_call_getAllPendencies_method', () => {
    const mode = '';
    const vm = {};
    spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies").and.returnValue(Mock.defer.promise);
    spyOn(service, "getAllPendencies").and.returnValue(Promise.resolve( Mock.defer.resolve(Mock.pendencies)));
    service.callValidationPendenciesLimits(vm, Mock.searchSettings, mode);
    service.getAllPendencies(Mock.searchSettings)
      .then(data => expect(data.length).toBe(Mock.pendencies.length));
    Mock.scope.$digest();
  });

  describe("callValidationPendenciesLimits_method_should_handle_getAllPendencies_fail_Suite", () => {

    it('callValidationPendenciesLimits_method_should_handle_getAllPendencies_in_case_next_mode', () => {
      const mode = 'next';
      const vm = {};
      const rejectError = Promise.reject({
        activePage: true,
        msg: "something is wrong"
      });
      spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies").and.returnValue(rejectError);
      spyOn(service, "getAllPendencies").and.returnValue(rejectError);
      service.callValidationPendenciesLimits(vm, Mock.searchSettings, mode);
      service.getAllPendencies(Mock.searchSettings)
        .catch(e =>  expect(e.activePage).toBeTruthy());
      Mock.scope.$digest();
    });

    it('callValidationPendenciesLimits_method_should_handle_getAllPendencies_in_case_previous_mode', () => {
      const mode = 'previous';
      const vm = {};
      const rejectError = Promise.reject({
        activePage: false,
        msg: "something is wrong"
      });
      spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies").and.returnValue(rejectError);
      spyOn(service, "getAllPendencies").and.returnValue(rejectError);
      service.callValidationPendenciesLimits(vm, Mock.searchSettings, mode);
      service.getAllPendencies(Mock.searchSettings)
        .catch(e =>  expect(e.activePage).toBeFalsy());
      Mock.scope.$digest();
    });

    it('callValidationPendenciesLimits_method_should_handle_getAllPendencies_in_case_refreshListByCurrentQuantity_mode', () => {
      const mode = 'refreshListByCurrentQuantity';
      const vm = {};
      const rejectError = Promise.reject({
        activePage: false,
        msg: "something is wrong"
      });
      spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies").and.returnValue(rejectError);
      spyOn(service, "getAllPendencies").and.returnValue(rejectError);
      service.callValidationPendenciesLimits(vm, Mock.searchSettings, mode);
      service.getAllPendencies(Mock.searchSettings)
        .catch(e =>  expect(e).toBeDefined());
    });
  });

});
