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
      ctrl.preActivity = createMockPreActivity()
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


  xit('checkerSelectedItemChange_method_ should_update_checkerData', () => {
    ctrl.checkerForm = createCheckerFormIDSimulator();
    expect(ctrl.preActivity.paperActivityData.checker).toBeUndefined();
    ctrl.checkerSelectedItemChange(checker);
    expect(ctrl.preActivity.paperActivityData.checker.name).toBe("Otus");
  });



  // it('should ', () => { });
  // it('should ', () => { });
  // it('should ', () => { });
  // it('should ', () => { });

  function createMockPreActivity(){
    ctrl.preActivity = Test.utils.data.preActivity;
    ctrl.preActivity.updatePaperActivityData =
      (checkerData, realizationDate) => {
        if(!checkerData) Mock.preActivity.preActivityValid = false;
        else{
          ctrl.preActivity.paperActivityData = {};
          ctrl.preActivity.paperActivityData.checker = checkerData.checker;
          ctrl.preActivity.paperActivityData.realizationDate = realizationDate;
        }
      };

    ctrl.preActivity.updatePreActivityValid = (state) => {
      ctrl.preActivity.preActivityValid = state;
    };
    return ctrl.preActivity;
  }

  function createCheckerFormIDSimulator() {
    return {
      'autocompleteChecker': {
        '$setValidity': jasmine.createSpy()
      }
    }
  }

});

