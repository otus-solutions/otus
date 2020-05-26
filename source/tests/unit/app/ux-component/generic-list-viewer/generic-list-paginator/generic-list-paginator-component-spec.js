describe('otusPendencyListPaginator_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  const stuntmanSearchSettings = {
    currentQuantity: 0,
    quantityToGet: 10
  };

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      Injections.PENDENCY_VIEWER_TITLES = $injector.get('PENDENCY_VIEWER_TITLES');
      spyOn(Injections.PendencyViewerService, "callValidationPendenciesLimits");
      ctrl = $controller('pendencyListPaginatorCtrl', Injections, { stuntmanSearchSettings: stuntmanSearchSettings });
    });
  });

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrl_methods_existence_check', () => {
    expect(ctrl.getNextPage).toBeDefined();
    expect(ctrl.getPreviousPage).toBeDefined();
    expect(ctrl.runCustomPagination).toBeDefined();
  });

  it('getNextPage_method_should_evoke_callValidationPendenciesLimits_method_of_PendencyViewerService', () => {
    ctrl.getNextPage(stuntmanSearchSettings);
    expect(Injections.PendencyViewerService.callValidationPendenciesLimits).toHaveBeenCalledTimes(1);
  });

  it('getPreviousPage_method_should_evoke_callValidationPendenciesLimits_method_of_PendencyViewerService', () => {
    ctrl.getPreviousPage(stuntmanSearchSettings);
    expect(Injections.PendencyViewerService.callValidationPendenciesLimits).toHaveBeenCalledTimes(1);
  });
  
  it('runCustomPagination_method_should_evoke_callValidationPendenciesLimits_method_of_PendencyViewerService', () => {
    ctrl.runCustomPagination(stuntmanSearchSettings);
    expect(Injections.PendencyViewerService.callValidationPendenciesLimits).toHaveBeenCalledTimes(1);
  });

});
