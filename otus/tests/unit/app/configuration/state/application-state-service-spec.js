describe('ApplicationStateService', function() {

  var UNIT_NAME = 'otusjs.otus.configuration.state.ApplicationStateService';
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otus');

    inject(function(_$injector_, _$state_, _STATE_) {
      injections.STATE = _STATE_;
      injections.$state = _$state_;
      service = _$injector_.get(UNIT_NAME, injections);
    });

    spyOn(injections.$state, 'go');
  });

  describe('activateInstaller method', function() {

    it('should activate the INSTALLER state', function() {
      service.activateInstaller();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.INSTALLER);
    });

  });

  describe('activateLogin method', function() {

    it('should activate the LOGIN state', function() {
      service.activateLogin();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.LOGIN);
    });

  });

  describe('activateDashboard method', function() {

    it('should activate the DASHBOARD state', function() {
      service.activateDashboard();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.DASHBOARD);
    });

  });

  describe('activateSignup method', function() {

    it('should activate the SIGNUP state', function() {
      service.activateSignup();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.SIGNUP);
    });

  });

  describe('activateSignupResult method', function() {

    it('should activate the SIGNUP_RESULT state', function() {
      service.activateSignupResult();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.SIGNUP_RESULT);
    });

  });

});
