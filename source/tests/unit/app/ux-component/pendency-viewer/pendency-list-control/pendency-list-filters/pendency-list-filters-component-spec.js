describe('otusPendecyListFiltersComponent_UnitTest_Suite', () => {
  let ctrl;
  let VIEW_TEXT = "rn";
  let VIEW_TEXT_CRITERIA = "sortingCriteria";
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.PENDENCY_VIEWER_TITLES = $injector.get('PENDENCY_VIEWER_TITLES');
      Injections.dragulaService = $injector.get('dragulaService');
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      ctrl = $controller('pendencyListFiltersCtrl', Injections);

      mock();

      Mock.CHECKERS = Test.utils.data.checker;
      ctrl.searchSettings = Mock.searchSettings;

      spyOn(Injections.PendencyViewerService, "getInputViewState").and.callThrough();
      spyOn(Injections.PendencyViewerService, "getSearchSettings").and.callThrough();
    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.chanceInputViewState).toBeDefined();
    expect(ctrl.clear).toBeDefined();
    expect(ctrl.clearAll).toBeDefined();
    expect(ctrl.allStatus).toBeDefined();
    expect(ctrl.chanceStateCriteria).toBeDefined();
    expect(ctrl.resetCriteriaOrderCustomization).toBeDefined();
    expect(ctrl.changePaginationViewState).toBeDefined();
  });

  it('clearMethod_should_delete_searchSettings_and_attribute_inputViewState', () => {
    ctrl.clear(Mock.item);
    expect(ctrl.inputViewState[Mock.item.title]).toBeFalsy();
  });

  it('clearAllMethod_should_evoke_PendencyViewerService', () => {
    ctrl.clearAll(Mock.searchSettings);
    expect(Injections.PendencyViewerService.getInputViewState).toHaveBeenCalledTimes(1);
    expect(Injections.PendencyViewerService.getSearchSettings).toHaveBeenCalledTimes(1);
  });

  it('chanceInputViewStateMethod_should_attribute_inputViewState', () => {
    ctrl.chanceInputViewState(Mock.item);
    expect(ctrl.inputViewState[Mock.item.title]).toBeTruthy();
  });

  it('allStatusMethod_should_delete_attribute', () => {
    ctrl.allStatus();
    expect(ctrl.searchSettings.filter.status).toBeUndefined()
  });

  it('chanceStateCriteriaMethod_should_inputViewState', () => {
    ctrl.chanceStateCriteria();
    expect(ctrl.inputViewState[VIEW_TEXT_CRITERIA]).toBeTruthy();
  });

  it('resetCriteriaOrderCustomizationMethod_should_evoke_populateCriteriaOrder', () => {
    ctrl.resetCriteriaOrderCustomization();
    expect(ctrl.searchSettings.order.fields).toEqual(Mock.searchSettings.order.fields);
  });

  it('changePaginationViewStateMethod_should_attribute', () => {
    ctrl.changePaginationViewState();
    expect(ctrl.paginatorActive).toBeFalsy();
  });

  function mock() {
    Mock.searchSettings = {
      "currentQuantity": 0,
      "quantityToGet": 10,
      "order": {
        "fields": ["dueDate"],
        "mode": 1
      },
      "filter": {
        "status": "NOT_FINALIZED"
      }
    };
    Mock.item = {
        title: VIEW_TEXT
      }
  }
});
