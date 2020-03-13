describe('otusPendencyItem_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      spyOn(Injections.PendencyViewerService, "formatDate");
      spyOn(Injections.PendencyViewerService, "calculateRemainingDays");
      let item = {
        dueDate: new Date(),
        creationDate: new Date()
      };
      ctrl = $controller('pendencyItemCtrl', Injections, { item: item });
    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('constructor_should_evoke_methods_of_PendencyViewerService', () => {
    expect(Injections.PendencyViewerService.formatDate).toHaveBeenCalledTimes(2);
    expect(Injections.PendencyViewerService.calculateRemainingDays).toHaveBeenCalledTimes(1);
  });

});
