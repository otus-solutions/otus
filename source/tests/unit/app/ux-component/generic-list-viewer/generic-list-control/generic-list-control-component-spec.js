describe('otusGenericListControlComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  const FILTERS_COMPONENT_NAME = 'filtersComponentName';
  const FILTERS_TEMPLATE_TAG = 'filters-component-name';

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      Injections.HtmlBuilderService = $injector.get('otusjs.utils.HtmlBuilderService');
      ctrl = $controller('genericListControlCtrl', Injections, {
        filtersComponentName: Mock.filtersComponentName,
        searchSettings: Mock.searchSettings
      });
    });
  });

  function _mockInitialize(){
    Mock.searchSettings = { order: {mode: -1 }};
    Mock.filtersComponentName = FILTERS_COMPONENT_NAME;
  }

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.showOrHideFilters).toBeDefined();
    expect(ctrl.updateOrderModeArrow).toBeDefined();
  });

  it('onInitMethod_should_set_filtersTemplate', () => {
    ctrl.$onInit();
    expect(ctrl.filtersTemplate).toBeDefined();
    expect(ctrl.filtersTemplate.includes('<'+FILTERS_TEMPLATE_TAG)).toBeTruthy();
  });

  it('showOrHideFilters_should_change_filtersViewEnable_to_true', () => {
    ctrl.showOrHideFilters();
    expect(ctrl.filtersViewEnable).toBeTruthy();
  });

  it('showOrHideFilters_should_change_filtersViewEnable_to_false', () => {
    ctrl.filtersViewEnable = true;
    ctrl.showOrHideFilters();
    expect(ctrl.filtersViewEnable).toBeFalsy();
  });

  it('updateOrderModeArrow_method_should_change_orderModeIcon_object', () => {
    ctrl.$onInit();
    expect(ctrl.orderModeIcon).toBeDefined();
    let prevOrderModeIcon = {};
    prevOrderModeIcon = Object.assign(prevOrderModeIcon, ctrl.orderModeIcon);
    ctrl.updateOrderModeArrow();
    expect(ctrl.orderModeIcon).not.toEqual(prevOrderModeIcon);
  });

});
