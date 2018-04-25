describe('Lot info manager display component', function() {
  var Mock = {};
  var $controller;
  var ctrl;
  var bindings;
  var scope, element, component;
  var Injections = {};

  beforeEach(function() {
    angular.module('otusjs.otus.uxComponent');
  });

beforeEach(

  inject(function(_$injector_, _$controller_, _$rootScope_, _$compile_,_otusLotInfoManagerDisplayCtrl_) {
    $controller = _$controller_;

    Injections = {
      $mdDialog: {},
      $mdToast: {},
      $filter: {},
      AliquotTransportationService: {},
      DynamicTableSettingsFactory: {}
    };
    // Injections = {
    //
    //   DynamicTableSettingsFactory:_$injector_.get('otusjs.otus.uxComponent.DynamicTableSettingsFactory')
    // };
    // ctrl = $controller('otusLotInfoManagerDisplayCtrl', Injections);

    scope = _$rootScope_.$new();
    element = angular.element('<otus-lot-info-manager-display flex="80"></otus-lot-info-manager-display>');
    // element.scope().$apply();
    // angular.element($0).controller('otusLotInfoManagerDisplayCtrl')
    component = _$compile_(element)(scope);
    scope.$apply();
    console.log(ctrl);
  })
);

function createComponent(bindings = {}) {}

describe('Add some tests', () => {
  var teste
  beforeEach(() => {
    // createComponent();


  });

  it('should be defined', () => {
    expect(true).toEqual(true);
  });
});
});
