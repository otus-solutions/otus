describe('otusDropdownFilterCtrl_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.inject(($injector,$controller) => {
      Injections.GENERIC_LIST_VIEWER_LABELS = $injector.get('GENERIC_LIST_VIEWER_LABELS');
      ctrl = $controller('dropdownFilterCtrl', Injections, {
        filterItem: {},
        searchSettings: {},
        clear: Mock.anyFunction,
        changeInputViewState: Mock.anyFunction,
        options: [{}],
        placeholder: 'text'
      });
    });
  });

  function _mockInitialize(){
    Mock.anyFunction = function (obj) {};
  }


  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

  it('ctrl_methods_existence_check', () => {
    expect(ctrl.changeSelectedOption).toBeDefined();
  });

});
