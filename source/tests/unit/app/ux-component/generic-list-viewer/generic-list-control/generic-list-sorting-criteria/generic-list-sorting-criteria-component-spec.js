describe('otusListSortingCriteria_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  let SORTING_CRITERIA_KEY_NAME;

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector,$controller) => {
      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      ctrl = $controller('genericListSortingCriteriaCtrl', Injections, {
        searchSettings: Mock.searchSettings,
        itemAttributes: [],
        inputViewState: Mock.inputViewState,
        getDefaultOrderFields: Mock.getDefaultOrderFields
      });
    });

    SORTING_CRITERIA_KEY_NAME = Injections.GENERIC_LIST_VIEWER_LABELS.INPUT_VIEW_STATE_NAMES.SORTING_CRITERIA;
  });

  function _mockInitialize(){
    Mock.searchSettings = {
      order: {
        fields: ['a'],
        mode: 1
      }
    };
    Mock.inputViewState = {
      'field': false
    };
    Mock.getDefaultOrderFields = function() { return ['a'] };
  }

  it('ctrlExistence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', () => {
    expect(ctrl.isVisible).toBeDefined();
    expect(ctrl.chanceStateCriteria).toBeDefined();
    expect(ctrl.resetCriteriaOrderCustomization).toBeDefined();
  });

  it('isVisible_method_should_return_false', () => {
    expect(ctrl.isVisible()).toBeFalsy();
  });

  it('chanceStateCriteria_method_should_change_inputViewState_to_true_if_was_false_and_call_resetCriteriaOrderCustomization_method', () => {
    spyOn(ctrl, 'resetCriteriaOrderCustomization');
    ctrl.chanceStateCriteria();
    expect(ctrl.inputViewState[SORTING_CRITERIA_KEY_NAME]).toBeTruthy();
    expect(ctrl.resetCriteriaOrderCustomization).toHaveBeenCalledTimes(1);
  });

  it('chanceStateCriteria_method_should_change_inputViewState_to_false_if_was_true', () => {
    ctrl.inputViewState[SORTING_CRITERIA_KEY_NAME] = true;
    ctrl.chanceStateCriteria();
    expect(ctrl.inputViewState[SORTING_CRITERIA_KEY_NAME]).toBeFalsy();
  });

});
