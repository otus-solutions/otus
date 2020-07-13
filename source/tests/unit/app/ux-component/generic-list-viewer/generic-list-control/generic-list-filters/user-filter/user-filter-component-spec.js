describe('otusUserFilterCtrl_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.inject(($injector,$controller) => {
      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      ctrl = $controller('userFilterCtrl', Injections, {});
    });
  });


  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

});
