describe('PendencyViewerService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.GenericListViewerService = $injector.get('otusjs.genericListViewer.GenericListViewerService');
      Injections.UserActivityPendencyRepositoryService = $injector.get('otusjs.pendency.repository.UserActivityPendencyRepositoryService');
      service = $injector.get('otusjs.pendencyViewer.PendencyViewerService', Injections);
      service.initialize();

      mockInitialize($rootScope);
      Mock.defer = Injections.$q.defer();
      Mock.defer.resolve(Mock.items);
    });
  });

  function mockInitialize($rootScope) {
    Mock = {
      searchSettings: {
        "currentQuantity": 0,
        "quantityToGet": 15,
        "order": {
          "fields": ["dueDate"],
          "mode": 1
        },
        "filter": {
          "status": "NOT_FINALIZED"
        }
      },
      itemAttributes: service.getItemAttributes(),
      inputViewState: service.getInputViewState(),
      items: [Test.utils.data.userActivityPendency],
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
    expect(service.getItemAttributes).toBeDefined();
    expect(service.getInputViewState).toBeDefined();
    expect(service.getAllItems).toBeDefined();
    expect(service.callValidationItemsLimits).toBeDefined();
    expect(service.formatDate).toBeDefined();
    expect(service.calculateRemainingDays).toBeDefined();
    expect(service.getSelectedParticipantRN).toBeDefined();
    expect(service.getChecker).toBeDefined();
  });

  it('getSearchSettingsMethod_should_returns_searchSettingsInitial', () => {
    const searchSettings = service.getSearchSettings();
    expect(searchSettings.currentQuantity).toBe(Mock.searchSettings.currentQuantity);
    expect(searchSettings.currentQuantity).toBe(Mock.searchSettings.currentQuantity);
    expect(searchSettings.order.fields[0]).toBe(Mock.searchSettings.order.fields[0]);
    expect(searchSettings.filter.status).toBe(Mock.searchSettings.filter.status);
  });

  it('getItemAttributes_method_should_returns_initialPendencyAttributes', () => {
    expect(Mock.itemAttributes.receiver.icon).toBe("assignment_ind");
  });

  it('getInputViewState_method_should_returns_inputViewStateInitial', () => {
    expect(Mock.inputViewState.receiver).toBeFalsy();
  });

  it('calculateRemainingDays_should_RemainingDays_between dates', () => {
    expect(service.calculateRemainingDays(new Date())).toBe(0);
  });

  xit('getAllItems_method_should_pendencyInstance_in_List_of_promiseResolve', () => {
    spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies").and.returnValue(Promise.resolve(Mock.items));
    service.getAllItems(Mock.searchSettings)
      .then(data => expect(data[0].objectType).toBe("userActivityPendency")); //TODO passa pra qualquer valor em toBe
    Mock.scope.$digest();
  });

  xit('callValidationItemsLimits_method_should_call_getAllItems_method', () => {
    console.log('test:', service.getAllItemsFromRepositoryService);
    const mode = '';
    const vm = {};
    // spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies").and.returnValue(Promise.resolve(Mock.items));
    spyOn(service, "getAllItemsFromRepositoryService").and.returnValue(Mock.defer.promise);
    spyOn(service, "getAllItems").and.returnValue(Promise.resolve(Mock.items));
    service.callValidationItemsLimits(vm, Mock.searchSettings, mode);
    Mock.scope.$digest();
    console.log('test result\n' + JSON.stringify(vm, null, 4));//.
    expect(vm.items).toBeDefined();
    expect(vm.items.length).toBe(Mock.items.length);
  });

  xdescribe("callValidationItemsLimits_method_should_handle_getAllItems_fail_Suite", () => {

    function callMethodAndGetError(mode, activePage, expectFunction){
      const vm = {};
      const rejectError = Promise.reject({
        activePage: activePage,
        msg: "something is wrong"
      });

      spyOn(Injections.UserActivityPendencyRepositoryService, "getAllPendencies").and.returnValue(rejectError);
      spyOn(service, "getAllItems").and.returnValue(rejectError);

      try{
        service.callValidationItemsLimits(vm, Mock.searchSettings, mode);
        Mock.scope.$digest();
      } catch (err) {
        expect(err.msg).toEqual("something is wrong");
        expectFunction(err);
      }
    }

    it('callValidationItemsLimits_method_should_handle_getAllItems_in_case_next_mode', () => {
      callMethodAndGetError('next', true, function(err){
        expect(err.activePage).toBeTruthy();
      });
    });

    it('callValidationItemsLimits_method_should_handle_getAllItems_in_case_previous_mode', () => {
      callMethodAndGetError('previous', false, function(err){
        expect(err.activePage).toBeFalsy();
      });
    });

    it('callValidationItemsLimits_method_should_handle_getAllItems_in_case_refreshListByCurrentQuantity_mode', () => {
      callMethodAndGetError('refreshListByCurrentQuantity', false, function(err){
        expect(err.activePage).toBeDefined();
      });
    });

  });

});
