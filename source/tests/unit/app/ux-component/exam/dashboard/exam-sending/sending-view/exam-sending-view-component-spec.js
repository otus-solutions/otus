describe('otusViewSendingExamCtrl_UnitTest_Suite',() => {

  let controller;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.core.project.ContextService', Test.utils.data.ProjectContextService);
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller) {
      Injections.$filter = $injector.get('$filter');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.ProjectFieldCenterService = $injector.get('otusjs.deploy.FieldCenterRestService');
      Injections.DashboardContextService = $injector.get('otusjs.otus.dashboard.core.ContextService');
      Injections.ProjectContextService = $injector.get('otusjs.laboratory.core.project.ContextService');
      Injections.SendingExamService = $injector.get('otusjs.laboratory.business.project.sending.SendingExamService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.DialogService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller =  $controller('otusViewSendingExamCtrl', Injections);
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.examSendingView).toBeDefined();
    expect(controller.deleteSending).toBeDefined();
    expect(controller.onFilter).toBeDefined();
    expect(controller.dynamicDataTableChange).toBeDefined();
  });

  it('onInit_method_should_invoke_internal_methods', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
    spyOn(Injections.ProjectFieldCenterService, 'loadCenters').and.returnValue(Promise.resolve(Mock.centers));
    spyOn(Injections.DashboardContextService, 'getLoggedUser').and.returnValue(Promise.resolve(Mock.userData));

    controller.$onInit();

    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
    expect(controller.laboratoryExists).toBe(true);
    expect(Injections.ProjectFieldCenterService.loadCenters).toHaveBeenCalledTimes(1);
  });

  it('examSendingView_method_should_invoke_services_methods', () => {
    spyOn(Injections.ProjectContextService, 'setExamSendingAction').and.callThrough();
    spyOn(Injections.ProjectContextService, 'setFileStructure').and.callThrough();
    spyOn(Injections.ApplicationStateService, 'activateExamResultsVisualizer').and.callThrough();

    controller.selectedSendings = [ Mock.selectedSending ];
    controller.examSendingView();

    expect(Injections.ProjectContextService.setExamSendingAction).toHaveBeenCalledWith('view');
    expect(Injections.ProjectContextService.setFileStructure).toHaveBeenCalledWith(Mock.selectedSending.toJSON());
    expect(Injections.ApplicationStateService.activateExamResultsVisualizer).toHaveBeenCalledTimes(1);
    expect(controller.selectedSendings.length).toBe(0);
  });

  it('deleteSending_method_should_call_DialogService_showConfirmationDialog', () => {
    spyOn(Injections.DialogService, 'showConfirmationDialog').and.returnValue(Promise.resolve());
    controller.selectedSendings = [ Mock.selectedSending ];
    controller.deleteSending();
    expect(Injections.DialogService.showConfirmationDialog).toHaveBeenCalledTimes(1);
  });


  function _mockInitialize(){
    Mock.centers = [
      { acronym: 'RS' }
    ];

    Mock.userData = {
      fieldCenter: { acronym: 'RS' }
    };

    Mock.selectedSending = {
      toJSON: function() { return '{}'; }
    };
  }

});