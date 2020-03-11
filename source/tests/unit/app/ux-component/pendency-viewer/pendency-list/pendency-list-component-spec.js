describe('otusPendencyListPaginator_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.inject(($injector,$controller) => {
      Injections.PENDENCY_VIEWER_TITLES = $injector.get('PENDENCY_VIEWER_TITLES');
      ctrl = $controller('pendencyListCtrl', Injections);
    });
  });

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

});
