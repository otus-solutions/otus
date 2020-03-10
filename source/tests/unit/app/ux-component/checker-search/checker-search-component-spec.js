describe('otusCheckerSearchComponent_UnitTest_Suite', () => {
  let ctrl;
  let CHECKERS_TEXT = "Otus Coruja";
  let CHECKERS_EMAIL = "otus.coruja@gmail.com";
  let PENDENCY_VIEWER = 'pendency-viewer';
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.STATE = $injector.get('STATE');
      Injections.$q= $injector.get('$q');
      Injections.$timeout = $injector.get('$timeout');
      Injections.CheckerItemFactory = $injector.get('otusjs.otus.uxComponent.CheckerItemFactory');
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      ctrl = $controller('otusCheckerSearchCtrl', Injections);

      mock();

      Mock.CHECKERS = Test.utils.data.checker;
      ctrl.searchSettings = Mock.searchSettings;
      ctrl.changeWatcher = jasmine.createSpy();
      ctrl.pendencyFilterItem = {};
      ctrl.pendencyFilterItem.title = CHECKERS_TEXT;
      ctrl.pendencyFilterItem.email = CHECKERS_EMAIL;

      spyOn(Injections.ParticipantActivityService, "listActivityCheckers").and.returnValue([{}]);
      spyOn(Injections.CheckerItemFactory, "create").and.returnValue(Mock.CHECKERS);
      spyOn(Injections.ApplicationStateService, "getCurrentState").and.returnValue(PENDENCY_VIEWER);
      spyOn(Injections.PendencyViewerService, "getChecker").and.callThrough();

      ctrl.$onInit();
    });
  });

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

  it('selectedItemChangeMethod_should_verify_state_and_evoke_PendencyViewerService', () => {
    ctrl.selectedItemChange(Mock.item);
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(1);
    expect(Injections.CheckerItemFactory.create).toHaveBeenCalledTimes(1);
  });

  it('searchTextChangeMethod_should_verify_state_and_filter_searchSettings', () => {
    ctrl.searchTextChange();
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(1);
  });

  function mock() {
    Mock.searchSettings = {
      "currentQuantity": 0,
      "quantityToGet": 10,
      "order": {
        "fields": ["dueDate"],
        "mode": 1
      },
      "filter": {
        "status": "NOT_FINALIZED"
      }
    };
    Mock.item = {
      checker : {
        title: CHECKERS_TEXT,
        email: CHECKERS_EMAIL
      }
    }
  }
});
