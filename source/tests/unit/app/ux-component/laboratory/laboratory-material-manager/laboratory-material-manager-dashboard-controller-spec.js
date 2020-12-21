describe('laboratoryMaterialManagerDashboardCtrl_Test_Suite', () => {
  let controller;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(($injector, $controller, $rootScope) => {
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$filter = $injector.get('$filter');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.DialogService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.UserAccessPermissionService = $injector.get('otusjs.user.business.UserAccessPermissionService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller = $controller('laboratoryMaterialManagerDashboardCtrl', Injections);

      Mock.$scope = $rootScope.$new();
    });

    _mockInitialize();
    spyOn(Injections.$mdToast, 'show').and.callThrough();
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.$onInit).toBeDefined();
    expect(controller.isValidCode).toBeDefined();
    expect(controller.tubeHasCustomMetadata).toBeDefined();
    expect(controller.originalTubeHasCode).toBeDefined();
    expect(controller.saveChangedTubes).toBeDefined();
    expect(controller.cancelTube).toBeDefined();
    expect(controller.saveMetadata).toBeDefined();
    expect(controller.updateTubeCustomMetadata).toBeDefined();
    expect(controller.isEnterKey).toBeDefined();
  });

  it('onInit_method_should_invoke_internal_methods', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
    spyOn(Injections.ParticipantManagerService, 'setup').and.returnValue(Promise.resolve(true));
    spyOn(Injections.UserAccessPermissionService, 'getCheckingLaboratoryPermission').and.returnValue(Promise.resolve(true));
    controller.$onInit();
    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
    expect(controller.laboratoryExists).toBe(true);
  });

  describe('isValidCode_method', () => {

    xit('should_show_toast_error_in_case_ParticipantLaboratoryService_getLaboratoryByTube_return_rejected_promise', () => {
      spyOn(Injections.ParticipantLaboratoryService, 'getLaboratoryByTube').and.returnValue(Mock.reject);
      controller.isValidCode(Mock.tube.code);
      Mock.$scope.$digest();
      _expectShowToastError();
    });

    describe('ParticipantLaboratoryService_getLaboratoryByTube_return_resolved_promise', () => {
      beforeEach(() => {
        spyOn(Injections.ParticipantLaboratoryService, 'getLaboratoryByTube').and.returnValue(_mockPromiseResolve(Mock.tube));
      });
    });

  });

  describe('tubeHasCustomMetadata_method', () => {

    it('should_return_false_in_case_tubeCustomMetadataOptions_not_defined', () => {
      controller.tubeCustomMetadataOptions = null;
      expect(controller.tubeHasCustomMetadata()).toBeFalsy();
    });

    it('should_return_false_in_case_tubeCustomMetadataOptions_is_empty_array', () => {
      controller.tubeCustomMetadataOptions = [];
      expect(controller.tubeHasCustomMetadata()).toBe(false);
    });

    it('should_return_true_in_case_tubeCustomMetadataOptions_is_not_empty_array', () => {
      controller.tubeCustomMetadataOptions = [{}];
      expect(controller.tubeHasCustomMetadata()).toBe(true);
    });
  });

  it('originalTubeHasCode_method_should_return_true', () => {
    expect(controller.originalTubeHasCode()).toBe(true);
  });

  describe('updateTubeCustomMetadata_method', () => {

    it('should_call_originalTube_pushCustomMetadata_method_in_case_customMetadata_is_selected', () => {
      spyOn(controller.originalTube, 'pushCustomMetadata');
      controller.updateTubeCustomMetadata(Mock.customMetadataOption);
      expect(controller.originalTube.pushCustomMetadata).toHaveBeenCalledWith(Mock.customMetadataOption._id);
    });

    it('should_call_originalTube_removeCustomMetadata_method_in_case_customMetadata_is_selected', () => {
      spyOn(controller.originalTube, 'removeCustomMetadata');
      Mock.customMetadataOption.selected = false;
      controller.updateTubeCustomMetadata(Mock.customMetadataOption);
      expect(controller.originalTube.removeCustomMetadata).toHaveBeenCalledWith(Mock.customMetadataOption._id);
    });

    it('should_do_nothing_in_case_ParticipantLaboratoryService_updateTubeCustomMetadata_return_resolved_promise', () => {
      spyOn(Injections.ParticipantLaboratoryService, 'updateTubeCustomMetadata').and.returnValue(Mock.resolve);
      controller.updateTubeCustomMetadata(Mock.customMetadataOption);
      Mock.$scope.$digest();
    });

    xit('should_show_toast_error_in_case_ParticipantLaboratoryService_updateTubeCustomMetadata_return_rejected_promise', () => {
      spyOn(Injections.ParticipantLaboratoryService, 'updateTubeCustomMetadata').and.returnValue(Mock.reject);
      controller.updateTubeCustomMetadata(Mock.customMetadataOption);
      Mock.$scope.$digest();
      _expectShowToastError();
    });

  });



  function _mockInitialize() {
    Mock.resolve = Promise.resolve({});
    Mock.reject = Promise.reject('some error');

    Mock.tube = angular.copy(Test.utils.data.tube);
    Mock.tube.hasOwnProperty = function(propertyName){ return true };
    Mock.tube.pushCustomMetadata = function(x) { };
    Mock.tube.removeCustomMetadata = function(x) { };
    controller.originalTube = Mock.tube;

    Mock.customMetadataOption = {
      _id: 'abc',
      selected: true
    }
  }

  function _mockPromiseResolve(value){
    return Promise.resolve(value);
  }

  function _expectShowToastError(){
    expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
  }

});
