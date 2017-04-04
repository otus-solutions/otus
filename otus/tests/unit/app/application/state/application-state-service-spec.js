xdescribe('ApplicationStateService', function() {

  var UNIT_NAME = 'otusjs.application.state.ApplicationStateService';
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs..otus');

    inject(function(_$injector_, _$state_, _STATE_) {
      injections.STATE = _STATE_;
      injections.$state = _$state_;
      service = _$injector_.get(UNIT_NAME, injections);
    });

    spyOn(injections.$state, 'go');
  });

  describe('activateActivityAdder method', function() {

    it('should activate the INSTALLER state', function() {
      service.activateActivityAdder();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.ACTIVITY_ADDER);
    });

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

  describe('activateParticipantActivities method', function() {

    it('should activate the PARTICIPANT_ACTIVITY state', function() {
      service.activateParticipantActivities();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.PARTICIPANT_ACTIVITY);
    });

  });

  describe('activateParticipantReports method', function() {

    it('should activate the PARTICIPANT_REPORT state', function() {
      service.activateParticipantReports();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.PARTICIPANT_REPORT);
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
