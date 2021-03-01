describe('otusPendecyListFiltersComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  const VIEW_TEXT = "rn";

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.dragulaService = $injector.get('dragulaService');
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      ctrl = $controller('pendencyListFiltersCtrl', Injections, {
        itemAttributes: [],
        paginatorActive: true
      });

      Injections.PendencyViewerService.initialize();
    });
  });

  function _mockInitialize() {
    Mock.searchSettings = Test.utils.data.searchSettingsForGenericList;
    Mock.item = {
      title: VIEW_TEXT
    };
  }


  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.clearAll).toBeDefined();
    expect(ctrl.clear).toBeDefined();
    expect(ctrl.allStatus).toBeDefined();
    expect(ctrl.getDefaultOrderFields).toBeDefined();
    expect(ctrl.changeInputViewState).toBeDefined();
    expect(ctrl.changePaginationViewState).toBeDefined();
  });

  it('$onInit_should_evoke_clearAll', () => {
    spyOn(ctrl, 'clearAll');
    ctrl.$onInit();
    expect(ctrl.clearAll).toHaveBeenCalledTimes(1);
  });

  it('clearMethod_should_delete_searchSettings_and_attribute_inputViewState', () => {
    ctrl.$onInit();
    ctrl.clear(Mock.item);
    expect(ctrl.inputViewState[Mock.item.title]).toBeFalsy();
    expect(ctrl.searchSettings.filter[Mock.item.title]).toBeUndefined();
  });

  it('clearAllMethod_should_evoke_PendencyViewerService', () => {
    spyOn(Injections.PendencyViewerService, "getInputViewState").and.callThrough();
    spyOn(Injections.PendencyViewerService, "getSearchSettings").and.callThrough();
    ctrl.clearAll();
    expect(Injections.PendencyViewerService.getInputViewState).toHaveBeenCalledTimes(1);
    expect(Injections.PendencyViewerService.getSearchSettings).toHaveBeenCalledTimes(1);
  });

  it('changeInputViewStateMethod_should_attribute_inputViewState', () => {
    ctrl.clearAll();
    ctrl.changeInputViewState(Mock.item);
    expect(ctrl.inputViewState[Mock.item.title]).toBeTruthy();
  });

  it('allStatusMethod_should_delete_attribute', () => {
    ctrl.$onInit();
    ctrl.allStatus();
    expect(ctrl.searchSettings.filter.status).toBeUndefined();
  });

  it('getDefaultOrderFields_method_should_return_array_values', () => {
    expect(ctrl.getDefaultOrderFields().length).toBeGreaterThan(0);
  });

  it('changePaginationViewStateMethod_should_attribute', () => {
    ctrl.changePaginationViewState();
    expect(ctrl.paginatorActive).toBeFalsy();
  });


});
