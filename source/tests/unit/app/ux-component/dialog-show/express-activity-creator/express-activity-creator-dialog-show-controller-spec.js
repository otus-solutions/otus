describe('otusExpressActivityCreatorDialogController_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller, $q, $rootScope) => {
      Injections.ExpressActivityCreatorDialogShowService = $injector.get('otusjs.otus.uxComponent.ExpressActivityCreatorDialogShowService');
      Injections.ExpressActivityCreatorDialogValues = $injector.get('otusjs.otus.uxComponent.ExpressActivityCreatorDialogValues');
      Injections.CheckerItemFactory = $injector.get('otusjs.otus.uxComponent.CheckerItemFactory');
      Injections.ACTIVITY_MANAGER_LABELS = $injector.get('ACTIVITY_MANAGER_LABELS');
      ctrl = $controller('otusExpressActivityCreatorDialogController', Injections);
      mockInitialize($injector, $q, $rootScope);
      ctrl.$onInit();

      ctrl.preActivityArtefacts = Mock.createMockPreActivity();

      spyOn(Injections.ExpressActivityCreatorDialogShowService, "loadCategories").and.callThrough();
      spyOn(Injections.ExpressActivityCreatorDialogShowService, "getSurveyByAcronym").and.callThrough();
      spyOn(Injections.ExpressActivityCreatorDialogShowService, "createActivity")
        .and.callFake(() => Mock.deferred.promise);
    });
  });

  function mockInitialize($injector, $q, $rootScope) {
    ctrl.data = {
      cancel: jasmine.createSpy(),
      preActivityArtefacts: {
        actionRefreshCallback: jasmine.createSpy()
      }
    }
    Mock.deferred = $q.defer();
    Mock.deferred.resolve({data: true});
    Mock.scope = $rootScope.$new();
    Mock.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService')
  }

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.createActivity).toBeDefined();
    expect(ctrl.updateRealizationDate).toBeDefined();
    expect(ctrl.validateExternalIdTruthy).toBeDefined();
    expect(ctrl.validateExternalIdFalsy).toBeDefined();
  });

  it('$onit method should prepare context', () => {
    expect(Injections.ExpressActivityCreatorDialogShowService.loadCategories()).toBePromise();
    expect(Injections.ExpressActivityCreatorDialogShowService.getSurveyByAcronym()).toBePromise();
    expect(ctrl.optionModes.length).toBe(3);
  });

  it('createActivity method should simulate the return of the creation of an activity, close the dialog and execute the external callback', () => {
    ctrl.activityCreationForm = { $invalid: false };
    ctrl.createActivity();
    Mock.scope.$digest();
    expect(Injections.ExpressActivityCreatorDialogShowService.createActivity).toHaveBeenCalledTimes(1)
    expect(ctrl.data.cancel).toHaveBeenCalledTimes(1)
    expect(ctrl.data.preActivityArtefacts.actionRefreshCallback).toHaveBeenCalledTimes(1)
  });


  it('updateRealizationDate method should to update date and clear the checkerField', () => {
    expect(ctrl.realizationDate).toBeUndefined();
    expect(ctrl.checkerSearchText).toBeUndefined();
    ctrl.updateRealizationDate(new Date());
    expect(ctrl.realizationDate).toBeDefined();
    expect(ctrl.checkerSearchText).toBeDefined();
  });

  it('validateExternalIdTruthy_method_should_valid_attribute_externalID', () => {
    ctrl.preActivityArtefacts.mode = 'ONLINE';
    expect(ctrl.validateExternalIdTruthy()).toBeTruthy();
  });

  it('validateExternalIdFalsy_method_should_valid_attribute_externalID', () => {
    ctrl.preActivityArtefacts.mode = 'ONLINE';
    expect(ctrl.validateExternalIdFalsy()).toBeFalsy();
  });

  Mock.createMockPreActivity = () => {
    ctrl.preActivityArtefacts = Test.utils.data.preActivity;
    ctrl.preActivityArtefacts.updatePreActivityValid = jasmine.createSpy();
    ctrl.preActivityArtefacts.surveyForm.isRequiredExternalID = function () {
      return true;
    };
    return ctrl.preActivityArtefacts;
  }

});
