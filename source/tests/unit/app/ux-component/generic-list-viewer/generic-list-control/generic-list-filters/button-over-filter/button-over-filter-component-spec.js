describe('otusButtonOverFilterCtrl_UnitTest_Suite', () => {
  let ctrl;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.inject(($injector,$controller) => {
      ctrl = $controller('buttonOverFilterCtrl', Injections, {
        filterItem: {},
        changeInputViewState: Mock.anyFunction,
        extraIcons: [{}]
      });
    });
  });

  function _mockInitialize(){
    Mock.anyFunction = function (obj) {};
  }


  it('ctrl_existence_check', () => {
    expect(ctrl).toBeDefined();
  });

});
