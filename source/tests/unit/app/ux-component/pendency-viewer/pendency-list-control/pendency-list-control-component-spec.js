describe('otusPendencyListControlComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {

      Injections.PENDENCY_VIEWER_TITLES = $injector.get('PENDENCY_VIEWER_TITLES');
      ctrl = $controller('pendencyListControlCtrl', Injections);

    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.openFilters).toBeDefined();
    expect(ctrl.closeFilters).toBeDefined();
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
