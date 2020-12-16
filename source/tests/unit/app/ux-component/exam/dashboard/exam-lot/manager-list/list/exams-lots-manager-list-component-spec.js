describe('otusExamsLotsManagerList_UnitTest_Suite', () => {

  let controller;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Mock.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller) {
      Injections.ProjectFieldCenterService = $injector.get('otusjs.deploy.FieldCenterRestService');
      Injections.ExamLotService = $injector.get('otusjs.laboratory.business.project.exams.ExamLotService');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.LaboratoryContextService = $injector.get('otusjs.laboratory.core.ContextService');
      Injections.DashboardContextService = $injector.get('otusjs.otus.dashboard.core.ContextService');
      Injections.$filter = $injector.get('$filter');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller =  $controller('otusExamsLotsManagerListCtrl', Injections);
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller__methods_existence_check', () => {
    expect(controller.selectLot).toBeDefined();
    expect(controller.updateOnDelete).toBeDefined();
    expect(controller.onFilter).toBeDefined();
    expect(controller.changeCenter).toBeDefined();
    expect(controller.loadExamDescriptors).toBeDefined();
  });

  it('onInit_method', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
    spyOn(Injections.ProjectFieldCenterService, 'loadCenters').and.returnValue(Promise.resolve(Mock.centers));
    spyOn(Injections.DashboardContextService, 'getLoggedUser').and.returnValue(Promise.resolve(Mock.userData));

    controller.otusExamsLotsManager = {};
    controller.$onInit();

    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
    expect(controller.laboratoryExists).toBe(true);
    expect(Injections.ProjectFieldCenterService.loadCenters).toHaveBeenCalledTimes(1);
  });

  function _mockInitialize(){
    Mock.LaboratoryViewerService = Test.utils.data.LaboratoryViewerService;

    Mock.centers = [
      { acronym: 'RS' }
    ];

    Mock.userData = {
      fieldCenter: { acronym: 'RS' }
    };
  }

});