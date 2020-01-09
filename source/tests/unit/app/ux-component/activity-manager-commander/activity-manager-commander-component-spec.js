describe('otusActivityManagerCommander Test', function() {
  var UNIT_NAME = 'otusActivityManagerCommanderCtrl';
  var Injections = {};
  var controller = {};

  beforeEach(function() {

    angular.mock.module('otusjs.otus');

    inject(function(_$injector_, _$controller_) {
       Injections.ApplicationStateService = _$injector_.get('otusjs.application.state.ApplicationStateService');

       controller = _$controller_(UNIT_NAME, Injections);
    });

    spyOn(Injections.ApplicationStateService,"activateActivityAdder").and.callThrough();

  });

  it('should controller defined', function() {
    expect(controller).toBeDefined();
    expect(controller.goToActivityAdder).toBeDefined();
  });

  it('should call goToActivityAdder method', function () {
    controller.goToActivityAdder();
    expect(Injections.ApplicationStateService.activateActivityAdder).toHaveBeenCalledTimes(1);
  });

});
