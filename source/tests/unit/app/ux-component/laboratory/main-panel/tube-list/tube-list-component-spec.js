describe('tubeListCtrl_UnitTest_Suite', () => {

  let controller;
  let Injections = [];
  let Bindings = {};
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller) {
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.Publisher = $injector.get('otusjs.otus.uxComponent.Publisher');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      Bindings.tubeList = Mock.tubeList;
      Bindings.tubeConfiguration = {};
      Bindings.state = 'state';

      controller =  $controller('tubeListCtrl', Injections, Bindings);
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.$onInit).toBeDefined();
    expect(controller.fillOriginalTubeList).toBeDefined();
    expect(controller.haveTubesChanged).toBeDefined();
    expect(controller.getChangedTubes).toBeDefined();
  });

  it('onInit_method_should_invoke_internal_methods', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
    controller.$onInit();
    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
  });

  it('haveTubesChanged_method_should_return_true', () => {
    spyOn(controller, 'getChangedTubes').and.returnValue([{}]);
    Mock.callbackResult = function(arg){};
    expect(controller.haveTubesChanged(Mock.callbackResult)).toBe(true);
  });

  it('getChangedTubes_method_should_return_true', () => {
    controller.fillOriginalTubeList(Mock.tubeList);
    Mock.callbackResult = function(arg){};
    expect(controller.getChangedTubes(Mock.callbackResult).length).toBe(0);
  });

  function _mockInitialize(){
    Mock.tubeList = [
      {
        tubeCollectionData: angular.copy(Test.utils.data.tubeCollectionData)
      }
    ]
  }
});