fdescribe('otusResultVisualizerCtrl_UnitTest_Suite', () => {

  let controller;
  let Injections = [];
  let Mock = {};

  const ACTION = 'view';

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.core.project.ContextService', Mock.ProjectContextService);
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Mock.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller) {
      Injections.$filter = $injector.get('$filter');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.ProjectContextService = $injector.get('otusjs.laboratory.core.project.ContextService');
      Injections.DynamicTableSettingsFactory = $injector.get('otusjs.otus.uxComponent.DynamicTableSettingsFactory');
      Injections.SendingExamService = $injector.get('otusjs.laboratory.business.project.sending.SendingExamService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.THEME_CONSTANTS = $injector.get('THEME_CONSTANTS');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller =  $controller('otusResultVisualizerCtrl', Injections);
      controller.updateDataTable = Mock.updateDataTable;
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller__methods_existence_check', () => {
    expect(controller.dynamicDataTableChange).toBeDefined();
    expect(controller.changeResults).toBeDefined();
  });

  describe('onInit_method', () => {
    function _runOnInitAndCheckLaboratoryChecking(){
      spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
      controller.$onInit();
      expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
      expect(controller.laboratoryChecking).toBe(true);
    }

    it('should_call_SendingExamService_getSendedExamById_method_in_case_truthy_fileStructure_and_view_action', () => {
      spyOn(Injections.SendingExamService, 'getSendedExamById').and.returnValue(Promise.resolve({}));
      _runOnInitAndCheckLaboratoryChecking();
      expect(Injections.SendingExamService.getSendedExamById).toHaveBeenCalledTimes(1);
    });

    it('should_call_SendingExamService_loadExamSendingFromJson_method_in_case_truthy_fileStructure_and_not_view_action', () => {
      spyOn(Injections.SendingExamService, 'loadExamSendingFromJson').and.returnValue(Mock.sendingExam);
      spyOn(Injections.ProjectContextService, 'getExamSendingAction').and.returnValue(ACTION+'x');
      _runOnInitAndCheckLaboratoryChecking();
      expect(Injections.SendingExamService.loadExamSendingFromJson).toHaveBeenCalledTimes(1);
    });

    it('should_call_DialogShowService_showWarningDialog_method_in_case_falsy_fileStructure', () => {
      spyOn(Injections.ProjectContextService, 'getFileStructure').and.returnValue(null);
      spyOn(Injections.DialogShowService, 'showWarningDialog').and.returnValue(Promise.resolve());
      _runOnInitAndCheckLaboratoryChecking();
      expect(Injections.DialogShowService.showWarningDialog).toHaveBeenCalledTimes(1);
    });
  });

  describe('changeResults_method', () => {

    const RESULTS_TO_SHOW = {
      ALL:'all',
      WITH_ERRORS: 'resultsWithErrors',
      OTHER: ''
    };

    beforeEach(() => {
      spyOn(controller, 'updateDataTable');
    });

    function _changeResultsTest(resultsToShow, changedResults){
      controller.changeResults(resultsToShow);
      expect(controller.changedResults).toEqual(changedResults);
      expect(controller.updateDataTable).toHaveBeenCalledWith(changedResults);
    }

    it('should_set_changedResults_from_sendingExam_getExamList_in_case_ALL_as_resultsToShow', () => {
      controller.sendingExam = Mock.sendingExam;
      _changeResultsTest(RESULTS_TO_SHOW.ALL, Mock.sendingExam.getExamList());
    });

    it('should_set_changedResults_from_sendingExam_getExamList_in_case_resultsWithErrors_as_resultsToShow', () => {
      Mock.aliquotsWithProblems = {};
      controller.aliquotsWithProblems = Mock.aliquotsWithProblems;
      _changeResultsTest(RESULTS_TO_SHOW.WITH_ERRORS, Mock.aliquotsWithProblems);
    });

    it('should_not_set_changedResults_in_case_other_resultsToShow', () => {
      controller.changeResults(RESULTS_TO_SHOW.OTHER);
      expect(controller.updateDataTable).toHaveBeenCalledTimes(0);
    });

  });

  it('dynamicDataTableChange_method_should_do_nothing', () => {
    controller.dynamicDataTableChange();
  });


  function _mockInitialize(){
    Mock.ProjectContextService = {
      getExamSendingAction: function() { return ACTION; },
      getFileStructure: function() { return Mock.fileStructure; },
    };

    Mock.LaboratoryViewerService = Test.utils.data.LaboratoryViewerService;

    Mock.fileStructure = {
      examSendingLot: {
        _id: '1234',
        realizationDate: '2020-12-16'
      },
      exams: []
    };

    Mock.sendingExam = {
      getExamList: function() { return []; },
      examSendingLot: {}
    };

    Mock.updateDataTable = function(arg) {};
  }

});