describe('otusGenericListPaginator_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  const stuntmanSearchSettings = {
    currentQuantity: 0,
    quantityToGet: 10
  };
  const callValidationItemsLimits = function(vm, stuntmanSearchSettings, mode){ };

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');

      ctrl = $controller('genericListPaginatorCtrl', Injections, {
        callValidationItemsLimits: callValidationItemsLimits,
        stuntmanSearchSettings: stuntmanSearchSettings
      });

      spyOn(ctrl, "callValidationItemsLimits");
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

  it('getNextPage_method_should_evoke_callValidationItemsLimits_method_passed_by_bind', () => {
    ctrl.getNextPage(stuntmanSearchSettings);
    expect(ctrl.callValidationItemsLimits).toHaveBeenCalledTimes(1);
  });

  it('getPreviousPage_method_should_evoke_callValidationItemsLimits_method_passed_by_bind', () => {
    ctrl.getPreviousPage(stuntmanSearchSettings);
    expect(ctrl.callValidationItemsLimits).toHaveBeenCalledTimes(1);
  });

  it('runCustomPagination_method_should_evoke_callValidationItemsLimits_method_passed_by_bind', () => {
    ctrl.runCustomPagination(stuntmanSearchSettings);
    expect(ctrl.callValidationItemsLimits).toHaveBeenCalledTimes(1);
  });

});
