describe('otusCheckerSearchComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  const CHECKERS_TEXT = "Otus Coruja";
  const CHECKERS_EMAIL = "otus.coruja@gmail.com";
  const VIEWER_NAME = 'some-viewer';

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.STATE = $injector.get('STATE');
      Injections.$q= $injector.get('$q');
      Injections.$timeout = $injector.get('$timeout');
      Injections.CheckerItemFactory = $injector.get('otusjs.otus.uxComponent.CheckerItemFactory');
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.GenericListViewerService = $injector.get('otusjs.genericListViewer.GenericListViewerService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      ctrl = $controller('otusCheckerSearchCtrl', Injections, {
        searchSettings: Mock.searchSettings,
        filterItem: Mock.filterItem
      });

      ctrl.searchSettings = Mock.searchSettings;
      ctrl.changeWatcher = jasmine.createSpy();
      ctrl.pendencyFilterItem = {};
      ctrl.pendencyFilterItem.title = CHECKERS_TEXT;
      ctrl.pendencyFilterItem.email = CHECKERS_EMAIL;

      spyOn(Injections.ParticipantActivityService, "listActivityCheckers").and.returnValue([{}]);
      spyOn(Injections.CheckerItemFactory, "create").and.returnValue(Mock.CHECKERS);
      spyOn(Injections.ApplicationStateService, "getCurrentState").and.returnValue(VIEWER_NAME);
      spyOn(Injections.ApplicationStateService, "currentStateIsListViewer").and.returnValue(true);
      spyOn(Injections.GenericListViewerService, "getChecker").and.callThrough();

      ctrl.$onInit();
    });
  });

  function _mockInitialize() {
    Mock.searchSettings = Test.utils.data.searchSettingsForGenericList;
    Mock.item = {
      checker : {
        title: CHECKERS_TEXT,
        email: CHECKERS_EMAIL
      }
    };
    Mock.filterItem = {
      item: 'x'
    };
    Mock.CHECKERS = Test.utils.data.checker;
  }


  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.querySearch).toBeDefined();
    expect(ctrl.selectedItemChange).toBeDefined();
    expect(ctrl.searchTextChange).toBeDefined();
  });

  it('onInitMethod_should_evoke_ParticipantActivityService_and_CheckerItemFactory_of_otusCheckerSearch', () => {
    expect(Injections.ParticipantActivityService.listActivityCheckers).toHaveBeenCalledTimes(1);
    expect(Injections.CheckerItemFactory.create).toHaveBeenCalledTimes(1);
  });

  it('querySearchMethod_should_return_promise', () => {
    expect(ctrl.querySearch(CHECKERS_TEXT)).toBePromise();
  });

  it('selectedItemChangeMethod_should_verify_state_and_evoke_GenericListViewerService', () => {
    ctrl.selectedItemChange(Mock.item);
    expect(Injections.ApplicationStateService.currentStateIsListViewer).toHaveBeenCalledTimes(1);
    expect(Injections.CheckerItemFactory.create).toHaveBeenCalledTimes(1);
  });

  it('searchTextChangeMethod_should_verify_state_and_filter_searchSettings', () => {
    ctrl.searchTextChange();
    expect(Injections.ApplicationStateService.currentStateIsListViewer).toHaveBeenCalledTimes(1);
  });

});
