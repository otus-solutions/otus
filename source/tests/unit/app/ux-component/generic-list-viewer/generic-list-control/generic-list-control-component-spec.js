describe('otusGenericListControlComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  const FILTERS_COMPONENT_NAME = 'filtersComponentName';
  const FILTERS_TEMPLATE_TAG = 'filters-component-name';

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {

      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      Injections.HtmlBuilderService = $injector.get('otusjs.utils.HtmlBuilderService');
      ctrl = $controller('genericListControlCtrl', Injections, {
        filtersComponentName: FILTERS_COMPONENT_NAME
      });

    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.openFilters).toBeDefined();
    expect(ctrl.closeFilters).toBeDefined();
  });

  it('onInitMethod_should_set_filtersTemplate', () => {
    ctrl.$onInit();
    expect(ctrl.filtersTemplate).toBeDefined();
    expect(ctrl.filtersTemplate.includes('<'+FILTERS_TEMPLATE_TAG)).toBeTruthy();
  });

  it('openFiltersMethod_should_attribute', () => {
    ctrl.openFilters();
    expect(ctrl.filtersViewEnable).toBeTruthy();
  });

  it('closeFiltersMethod_should_attribute', () => {
    ctrl.closeFilters();
    expect(ctrl.filtersViewEnable).toBeFalsy();
  });

});
