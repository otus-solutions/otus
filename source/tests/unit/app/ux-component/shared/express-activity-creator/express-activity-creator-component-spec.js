describe('OtusExpressActivityCreator_UnitTest_Suite', () => {
  const ACRONYM = 'TCLEC'
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller) => {
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      ctrl = $controller('otusExpressActivityCreatorCtrl', Injections);
      mockInitialize();

      spyOn(Injections.DialogShowService, 'showExpressActivityCreationDialog');
    });
  });

  function mockInitialize(){
    ctrl.acronym = ACRONYM;
    ctrl.$onInit();
  }

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.$onInit)
    expect(ctrl.saveActivity).toBeDefined();
  });

  it('$onInit method should prepare artifacts of preActivity', () => {
    expect(ctrl.preActivityArtefacts.acronym).toBe(ACRONYM);
  });

  it('saveActivity method should evoke showExpressActivityCreationDialog by DialogShowService ', () => {
    ctrl.saveActivity();
    expect(Injections.DialogShowService.showExpressActivityCreationDialog).toHaveBeenCalledTimes(1)
  });
});
