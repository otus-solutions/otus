describe('pendencyViewComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  const searchSettings = {
    currentQuantity: 0,
    quantityToGet: 10
  };

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      Injections.PENDENCY_VIEWER_TITLES = $injector.get('PENDENCY_VIEWER_TITLES');
      ctrl = $controller('pendencyViewCtrl', Injections);
    });
  });

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrl_methods_existence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.getAllPendencies).toBeDefined();
  });

  it('onInit_method_should_evoke_getAllPendencies_from_PendencyViewerService', () => {
    spyOn(Injections.PendencyViewerService, "getSearchSettings");
    spyOn(Injections.PendencyViewerService, "getPendencyAttributes");
    ctrl.$onInit();
    expect(Injections.PendencyViewerService.getSearchSettings).toHaveBeenCalledTimes(1);
    expect(Injections.PendencyViewerService.getPendencyAttributes).toHaveBeenCalledTimes(1);
  });

  it('getAllPendencies_method_should_evoke_getAllPendencies_from_PendencyViewerService', () => {
    spyOn(Injections.PendencyViewerService, "getAllPendencies").and.returnValue(Promise.resolve());
    ctrl.$onInit();
    ctrl.getAllPendencies(searchSettings);
    expect(Injections.PendencyViewerService.getAllPendencies).toHaveBeenCalledTimes(2);
  });

  it('getAllPendencies_with_no_data_method_should_evoke_getAllPendencies_from_PendencyViewerService', () => {
    spyOn(Injections.PendencyViewerService, "getAllPendencies").and.returnValue(Promise.resolve([{}]));
    ctrl.$onInit();
    ctrl.getAllPendencies(searchSettings);
    expect(Injections.PendencyViewerService.getAllPendencies).toHaveBeenCalledTimes(2);
  });

});
