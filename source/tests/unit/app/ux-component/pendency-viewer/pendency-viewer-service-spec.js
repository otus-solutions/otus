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
      spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies")
        .and.returnValue(Mock.defer.promise);
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
  xit('should ', () => {
  });
  xit('should ', () => {
  });
  xit('should ', () => {
  });
  xit('should ', () => {
  });
  xit('should ', () => {
  });
  xit('should ', () => {
  });
  xit('should ', () => {
  });
});
