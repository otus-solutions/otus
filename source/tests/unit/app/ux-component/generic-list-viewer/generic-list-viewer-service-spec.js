describe('GenericListViewerService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  const RECRUITMENT_NUMBER = 1234567;
  const DATE = new Date("Sat Mar 07 2020 00:00:00");
  const FORMATTED_DATE = "7/3/2020";

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.$mdDialog = $injector.get('$mdDialog');
      Injections.$mdToast = $injector.get('$mdToast');
      service = $injector.get('otusjs.genericListViewer.GenericListViewerService', Injections);

      mockInitialize($rootScope);
      initializeService();
      Mock.defer = Injections.$q.defer();
      Mock.defer.resolve(Mock.items);
    });
  });

  function mockInitialize($rootScope) {
    const initialCurrentQuantity = 0, initialQuantityToGet = 5;
    Mock = {
      CHILD_VIEWER_LABELS: {},
      initialCurrentQuantity: initialCurrentQuantity,
      initialQuantityToGet: initialQuantityToGet,
      getAllItemsFromRepositoryService: function(searchSettings){ return {};},
      GenericListFactory: {
        fromJsonObject: function(item){return {}}
        },
      searchSettings: {
        "currentQuantity": initialCurrentQuantity,
        "quantityToGet": initialQuantityToGet,
        "order": {
          "fields": [""],
          "mode": 1
        },
        "filter": {
          "status": ""
        }
      },
      itemAttributes: {},
      inputViewState: {},
      items: [Test.utils.data.userActivityPendency],
      scope: $rootScope.$new(),
      date: DATE,
      participant: { recruitmentNumber: RECRUITMENT_NUMBER },
      filterItem: {title: "rn"}
    }
  }

  function initializeService(){
    service.init(Mock.CHILD_VIEWER_LABELS,
      Mock.initialCurrentQuantity, Mock.initialQuantityToGet,
      Mock.getAllItemsFromRepositoryService, Mock.GenericListFactory);
  }

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.init).toBeDefined();
    expect(service.getSearchSettings).toBeDefined();
    expect(service.getItemAttributes).toBeDefined();
    expect(service.getInputViewState).toBeDefined();
    expect(service.getAllItems).toBeDefined();
    expect(service.callValidationItemsLimits).toBeDefined();
    expect(service.formatDate).toBeDefined();
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

  it('getItemAttributes_method_should_returns_itemAttributesInitial', () => {
    expect(service.getItemAttributes()).toEqual(Mock.itemAttributes);
  });

  it('getInputViewState_method_should_returns_inputViewStateInitial', () => {
    expect(service.getInputViewState()).toEqual(Mock.inputViewState);
  });

  it('formatDate_method_should_returns_customDate', () => {
    expect(service.formatDate(Mock.date)).toBe(FORMATTED_DATE);
  });

  it('getSelectedParticipantRN_method_should_', () => {
    service.getSelectedParticipantRN(Mock.participant, Mock.filterItem, Mock.searchSettings);
    expect(Mock.searchSettings.filter.rn).toBe(RECRUITMENT_NUMBER);
  });

  it('getAllItems_method_should_itemInstance_in_List_of_promiseResolve', () => {
    spyOn(service.GenericListFactory, "fromJsonObject").and.returnValue(Mock.items[0]);
    spyOn(service, "getAllItemsFromRepositoryService").and.returnValue(Promise.resolve(Mock.items));
    service.getAllItems(Mock.searchSettings)
      .then(data => expect(data[0].objectType).toBe("userActivityPendency"));
    Mock.scope.$digest();
  });

  it('callValidationItemsLimits_method_should_call_getAllItems_method', () => {
    const mode = '';
    const vm = {};
    spyOn(service, "getAllItemsFromRepositoryService").and.returnValue(Mock.defer.promise);
    spyOn(service, "getAllItems").and.returnValue(Promise.resolve(Mock.items));
    service.callValidationItemsLimits(vm, Mock.searchSettings, mode);
    Mock.scope.$digest();
    expect(vm.items).toBeDefined();
    expect(vm.items.length).toBe(Mock.items.length);
  });

  describe("callValidationItemsLimits_method_should_handle_getAllItems_fail_Suite", () => {

    function callMethodAndGetError(mode, activePage, expectFunction){
      const vm = {};
      const rejectError = Promise.reject({
        activePage: activePage,
        msg: "something is wrong"
      });

      spyOn(service, "getAllItemsFromRepositoryService").and.returnValue(rejectError);
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
