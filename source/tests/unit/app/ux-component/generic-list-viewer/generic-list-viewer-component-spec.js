describe('genericViewComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  const searchSettings = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $q, $rootScope, $controller) => {
      const viewerService = $injector.get('otusjs.genericListViewer.GenericListViewerService');
      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      ctrl = $controller('genericListViewerCtrl', Injections, {
        viewerService: viewerService
      });

      mockInitialize($rootScope);
      Mock.defer = $q.defer();
      Mock.defer.resolve(Mock.items);
    });
  });

  function mockInitialize($rootScope) {
    Mock = {
      searchSettings: {},
      scope: $rootScope.$new(),
    }
  }

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrl_methods_existence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.getAllItems).toBeDefined();
    expect(ctrl.showHelp).toBeDefined();
  });

  it('onInit_method_should_evoke_getAllItems_from_viewerService_passed_by_bind', () => {
    spyOn(ctrl.viewerService, "getAllItems").and.returnValue(Promise.resolve([{}]));
    spyOn(ctrl.viewerService, "getSearchSettings");
    spyOn(ctrl.viewerService, "getItemAttributes");
    ctrl.$onInit();
    Mock.scope.$digest();
    expect(ctrl.viewerService.getSearchSettings).toHaveBeenCalledTimes(1);
    expect(ctrl.viewerService.getItemAttributes).toHaveBeenCalledTimes(1);
  });

  it('getAllItems_method_should_evoke_getAllItems_from_viewerService_passed_by_bind', () => {
    spyOn(ctrl.viewerService, "getAllItems").and.returnValue(Promise.resolve([{}]));
    ctrl.$onInit();
    ctrl.getAllItems(searchSettings);
    Mock.scope.$digest();
    expect(ctrl.viewerService.getAllItems).toHaveBeenCalledTimes(2);
  });

  it('getAllItems_with_no_data_method_should_evoke_getAllItems_from_viewerService_passed_by_bind', () => {
    spyOn(ctrl.viewerService, "getAllItems").and.returnValue(Promise.resolve([{}]));
    ctrl.$onInit();
    ctrl.getAllItems(searchSettings);
    Mock.scope.$digest();
    expect(ctrl.viewerService.getAllItems).toHaveBeenCalledTimes(2);
  });

  it('showHelp_method_should_change_showingHelp_flag_and_helpButtom_object', () => {
    ctrl.showingHelp = false;
    ctrl.showHelp();
    expect(ctrl.showingHelp).toBeTruthy();
  });

});
