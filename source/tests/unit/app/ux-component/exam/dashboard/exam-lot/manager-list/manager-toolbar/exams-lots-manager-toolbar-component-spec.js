describe('otusExamsLotsManagerToolbar_UnitTest_Suite', () => {

  let controller;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector, $controller) {
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.LaboratoryContextService = $injector.get('otusjs.laboratory.core.ContextService');
      Injections.ExamLotService = $injector.get('otusjs.laboratory.business.project.exams.ExamLotService');
      Injections.ExamLotService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.ExamLotService = $injector.get('otusjs.application.dialog.DialogShowService');

      controller =  $controller('otusExamsLotsManagerToolbarCtrl', Injections);
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.ChangeLot).toBeDefined();
    expect(controller.DeleteLots).toBeDefined();
    expect(controller.getCsvData).toBeDefined();
  });

  it('onInit_method', () => {
    controller.$onInit();
  });

  function _mockInitialize(){

  }

});