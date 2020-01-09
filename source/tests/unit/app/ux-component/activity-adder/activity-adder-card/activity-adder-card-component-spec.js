describe('ctrl_of_ActivityAdderCardComponent_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};
  let checker;

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $controller, $rootScope) => {
      Injections.$q = $injector.get('$q');
      Injections.$timeout = $injector.get('$timeout');
      ctrl = $controller('otusActivityAdderCardCtrl', Injections);

      Mock.scope = $rootScope.$new();
      Mock.deferred = Injections.$q.defer();
      spyOn(Injections.$q, 'defer').and.returnValue(Mock.deferred);

      checker = Test.utils.data.checker;
      ctrl.checkers = [checker, checker];
      ctrl.preActivity = Mock.createMockPreActivity();
      ctrl.checkerForm = Mock.createCheckerFormIDSimulator();
      ctrl.externalIdForm = Mock.createExternalIdFormSimulator();
    });
  });

  it('controllerExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('controllerMethodsExistence_check', () => {
    expect(ctrl.checkerQuerySearch).toBeDefined();
    expect(ctrl.getModeIcon).toBeDefined();
    expect(ctrl.checkerSelectedItemChange).toBeDefined();
    expect(ctrl.deletePreActivity).toBeDefined();
    expect(ctrl.getAcronym).toBeDefined();
    expect(ctrl.updateExternalID).toBeDefined();
    expect(ctrl.updateRealizationDate).toBeDefined();
    expect(ctrl.monitoringCheckerFormSearchTextChange).toBeDefined();
  });

  it('checkerQuerySearch_method_should_return_list_of_checkers_when_nullQuery', () => {
    let query = null;
    Mock.deferred.resolve(ctrl.checkers);
    ctrl.checkerQuerySearch(query).then(result => expect(result.length).toBe(2));
    Mock.scope.$digest();
  });

  it('checkerQuerySearch_method_should_to_filter_checker_when_fillQuery', () => {
    let query = 'user1';
    spyOn(ctrl.checkers, 'filter').and.returnValues(Mock.deferred.resolve([query]));
    ctrl.checkerQuerySearch(query).then(result => expect(result.length).toBe(1));
    Mock.scope.$digest();
  });

  it('checkerSelectedItemChange_method_ should_update_checkerData_and_validity_preActivity', () => {
    expect(ctrl.preActivity.paperActivityData.checker).toBeUndefined();
    ctrl.checkerSelectedItemChange(checker);
    expect(ctrl.preActivity.paperActivityData.checker.name).toBe("Otus");
    expect(ctrl.preActivity.updatePreActivityValid).toHaveBeenCalledTimes(1)
  });

  it('getModeIcon_method_should_select_icon_mode_of_preActivity', () => {
    ctrl.preActivity.mode = 'ONLINE';
    expect(ctrl.getModeIcon()).toBe("signal");
    ctrl.preActivity.mode = 'PAPER';
    expect(ctrl.getModeIcon()).toBe("file-document");
  });

  it('getAcronym_method_should_return_with_acronymName', () => {
    expect(ctrl.getAcronym()).toBe('CSJ');
  });

  it('deletePreActivity_method_should_delete_preactivity_by_index', () => {
    ctrl.preActivities = [];
    ctrl.preActivities.push(ctrl.preActivity);
    expect(ctrl.preActivities.length).toBe(1);
    ctrl.deletePreActivity();
    expect(ctrl.preActivities.length).toBe(0);
  });

  it('monitoringCheckerFormSearchTextChange_method_should_call_stateValidator', () => {
    ctrl.monitoringCheckerFormSearchTextChange()
    expect(ctrl.preActivity.updatePreActivityValid).toHaveBeenCalledTimes(1)
  });

  it('updateExternalID_method_should_update_attribute_externalID ', () => {
    expect(ctrl.preActivity.externalID).toBe(null);
    ctrl.updateExternalID('123456');
    expect(ctrl.preActivity.updatePreActivityValid).toHaveBeenCalledTimes(1)
    expect(ctrl.preActivity.externalID).toBe('123456')
  });

  it('updateRealizationDate_method_should', () => {
    ctrl.updateRealizationDate('Wed Dec 04 2019 15:43:24');
    expect(ctrl.realizationDate).toBe('Wed Dec 04 2019 15:43:24');
  });


  Mock.createMockPreActivity = () => {
    ctrl.preActivity = Test.utils.data.preActivity;
    ctrl.preActivity.updatePreActivityValid = jasmine.createSpy();
    ctrl.preActivity.updatePaperActivityData =
      (checkerData, realizationDate) => {
        if(!checkerData) Mock.preActivity.preActivityValid = false;
        else{
          ctrl.preActivity.paperActivityData = {};
          ctrl.preActivity.paperActivityData.checker = checkerData.checker;
          ctrl.preActivity.paperActivityData.realizationDate = realizationDate;
        }
      };
    return ctrl.preActivity;
  }

  Mock.createCheckerFormIDSimulator = () => {
    return {
      'autocompleteChecker': {
        '$setValidity': jasmine.createSpy()
      }
    }
  };

  Mock.createExternalIdFormSimulator = () => {
    return {
      'externalIdForm': {
        '$valid': true
      }
    }
  };

});

