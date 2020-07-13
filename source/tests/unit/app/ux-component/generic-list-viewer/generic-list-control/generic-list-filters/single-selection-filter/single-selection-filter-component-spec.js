describe('otusSingleSelectionFilterCtrl_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.inject(($injector,$controller) => {
      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      ctrl = $controller('singleSelectionFilterCtrl', Injections, {
        filterItem: Mock.filterItem,
        searchSettings: Mock.searchSettings,
        clear: Mock.anyFunction,
        changePaginationViewState: Mock.anyFunction,
        options: [{}],
        placeholder: 'text'
      });
    });
  });

  function _mockInitialize(){
    Mock.filterItem = {title: 'title'};
    Mock.searchSettings = Test.utils.data.searchSettingsForGenericList;
    Mock.anyFunction = function (obj) {};
  }


  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrl_methods_existence_check', () => {
    expect(ctrl.changeSelectedOption).toBeDefined();
  });

  it('changeSelectedOption_method_calls_changePaginationViewState_method', () => {
    spyOn(ctrl, 'changePaginationViewState');
    ctrl.changeSelectedOption();
    expect(ctrl.changePaginationViewState).toHaveBeenCalledTimes(1);
  });

});
