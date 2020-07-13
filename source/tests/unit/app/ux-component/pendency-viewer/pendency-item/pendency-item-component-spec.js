describe('otusPendencyItem_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      ctrl = $controller('pendencyItemCtrl', Injections, { item: Mock.item });
    });
  });

  function _mockInitialize(){
    Mock.item = {
      dueDate: new Date(),
      creationDate: new Date()
    };
  }

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrl_methods_existence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
  });

  it('onInit_method_should_evoke_methods_of_PendencyViewerService', () => {
    spyOn(Injections.PendencyViewerService, "formatDate");
    spyOn(Injections.PendencyViewerService, "calculateRemainingDays");
    ctrl.$onInit();
    expect(Injections.PendencyViewerService.formatDate).toHaveBeenCalledTimes(2);
    expect(Injections.PendencyViewerService.calculateRemainingDays).toHaveBeenCalledTimes(1);
  });

});
