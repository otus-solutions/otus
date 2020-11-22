describe('laboratoryMaterialManagerDashboardCtrl_Test_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$mdDialog = $injector.get('$mdDialog');
      Injections.$filter = $injector.get('$filter');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');

      ctrl = $controller('laboratoryMaterialManagerDashboardCtrl', Injections);
    });

    _mockInitialize();
  });

  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrl_methods_existence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.isValidCode).toBeDefined();
    expect(ctrl.tubeHasCustomMetadata).toBeDefined();
    expect(ctrl.originalTubeHasCode).toBeDefined();
    expect(ctrl.saveChangedTubes).toBeDefined();
    expect(ctrl.cancelTube).toBeDefined();
    expect(ctrl.saveMetadata).toBeDefined();
    expect(ctrl.updateTubeCustomMetadata).toBeDefined();
    expect(ctrl.isEnterKey).toBeDefined();
  });

  describe('isValidCode_method', () => {

    beforeEach(() => {
      spyOn(Injections.ParticipantLaboratoryService, 'getTubeMedataDataByType').and.returnValue(_mockPromiseResolve(Mock.tube));
    });

  });


  function _mockInitialize() {
    Mock.tube = Test.utils.data.tube;
  }

  function _mockPromiseResolve(value){
    return Promise.resolve(value);

    // const deferredResolveObj = Injections.$q.defer();
    // deferredResolveObj.resolve(value);
    // return deferredResolveObj.promise;
  }

});
