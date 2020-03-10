describe('otusParticipantSearchComponent_UnitTest_Suite', () => {
  let ctrl;
  let CHECKERS_TEXT = "Otus Coruja";
  let CHECKERS_EMAIL = "otus.coruja@gmail.com";
  let DASHBOARD = 'dashboard';
  let PENDENCY_VIEWER = 'pendency-viewer';
  let LABORATORY = 'laboratory-participant';
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.STATE = $injector.get('STATE');
      Injections.$q= $injector.get('$q');
      Injections.$mdDialog = $injector.get('$mdDialog');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.DashboardContextService = $injector.get('otusjs.otus.dashboard.core.ContextService');
      Injections.DialogService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.PendencyViewerService = $injector.get('otusjs.pendencyViewer.PendencyViewerService');
      ctrl = $controller('otusParticipantSearchCtrl', Injections);

      mock();

      Mock.CHECKERS = Test.utils.data.checker;
      ctrl.searchSettings = Mock.searchSettings;
      ctrl.showParticipants = jasmine.createSpy();
      ctrl.showParticipantsButton = jasmine.createSpy();
      ctrl.onSelect = jasmine.createSpy();
      ctrl.changeWatcher= jasmine.createSpy();
      ctrl.pendencyFilterItem = {};
      ctrl.pendencyFilterItem.title = CHECKERS_TEXT;
      ctrl.pendencyFilterItem.email = CHECKERS_EMAIL;

      spyOn(Injections.ParticipantManagerService, "setup").and.returnValue(Promise.resolve());
      spyOn(Injections.ParticipantManagerService, "filter").and.returnValue(Promise.resolve());

    });
  });

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.querySearch).toBeDefined();
    expect(ctrl.selectParticipant).toBeDefined();
    expect(ctrl.showParticipants).toBeDefined();
    expect(ctrl.showParticipantsButton).toBeDefined();
    expect(ctrl.searchTextChange).toBeDefined();
  });

  it('onInitMethod_should_evoke_ParticipantManagerService_and_ApplicationStateService_of_otusParticipantSearch', () => {
    spyOn(Injections.ApplicationStateService, "getCurrentState").and.callThrough();

    ctrl.$onInit();
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.setup).toHaveBeenCalledTimes(1);
  });

  it('querySearchMethod_should_return_promise', () => {
    expect(ctrl.querySearch()).toBePromise();
  });

  it('selectParticipantMethod_should_verify_state_and_evoke_DialogService_and_evoke_PendencyViewerService_return_DASHBOARD', () => {
    spyOn(Injections.ApplicationStateService, "getCurrentState").and.returnValue(DASHBOARD);
    spyOn(Injections.ParticipantManagerService, "selectParticipant");
    spyOn(Injections.ApplicationStateService, "activateParticipantDashboard");

    ctrl.$onInit();
    ctrl.selectedParticipant = true;
    ctrl.selectParticipant();
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(2);
    expect(Injections.ApplicationStateService.activateParticipantDashboard).toHaveBeenCalledTimes(1);
    expect(Injections.ApplicationStateService.getCurrentState()).toEqual(DASHBOARD)
  });

  it('selectParticipantMethod_should_verify_state_and_evoke_DialogService_and_evoke_PendencyViewerService_return_LABORATORY', () => {
    spyOn(Injections.ApplicationStateService, "getCurrentState").and.returnValue(LABORATORY);
    spyOn(Injections.ParticipantManagerService, "selectParticipant");
    spyOn(Injections.DashboardContextService, "getChangedState").and.returnValue(true);
    spyOn(Injections.DialogService, "showDialog").and.callThrough();

    ctrl.$onInit();
    ctrl.selectedParticipant = true;
    ctrl.selectParticipant();
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(3);
    expect(Injections.DashboardContextService.getChangedState).toHaveBeenCalledTimes(1);
    expect(Injections.DialogService.showDialog).toHaveBeenCalledTimes(1);
    expect(Injections.ApplicationStateService.getCurrentState()).toEqual(LABORATORY)
  });

  it('selectParticipantMethod_should_verify_state_and_evoke_DialogService_and_evoke_PendencyViewerService_return_PENDENCY_VIEWER', () => {
    spyOn(Injections.ApplicationStateService, "getCurrentState").and.returnValue(PENDENCY_VIEWER);
    spyOn(Injections.ParticipantManagerService, "selectParticipant");
    spyOn(Injections.PendencyViewerService, "getSelectedParticipantRN").and.callThrough();

    ctrl.$onInit();
    ctrl.selectedParticipant = true;
    ctrl.selectParticipant();
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(4);
    expect(Injections.PendencyViewerService.getSelectedParticipantRN).toHaveBeenCalledTimes(1);
    expect(Injections.ApplicationStateService.getCurrentState()).toEqual(PENDENCY_VIEWER)
  });

  it('searchTextChangeMethod_should_verify_state_and_filter_our_delete', () => {
    spyOn(Injections.ApplicationStateService, "getCurrentState").and.returnValue(PENDENCY_VIEWER);
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