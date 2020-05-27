describe('pendencyViewComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      ctrl = $controller('pendencyViewCtrl', Injections);
    });
  });

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

});
