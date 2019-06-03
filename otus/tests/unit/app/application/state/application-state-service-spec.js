xdescribe('ApplicationStateService', function () {

  var UNIT_NAME = 'otusjs.application.state.ApplicationStateService';
  var service = {};
  var injections = {};

  beforeEach(function () {
    module('otusjs.application.state');

    inject(function (_$injector_, _$state_, _STATE_) {
      injections.STATE = _$injector_.get('STATE');
      injections.$state = _$injector_.get('$state');
      service = _$injector_.get(UNIT_NAME, injections);
    });

    spyOn(injections.$state, 'go');
  });

  xdescribe('activateActivityAdder method', function () {

    it('should activate the INSTALLER state', function () {
      service.activateActivityAdder();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.ACTIVITY_ADDER);
    });

  });

  xdescribe('activateInstaller method', function () {

    it('should activate the INSTALLER state', function () {
      service.activateInstaller();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.INSTALLER);
    });

  });

  xdescribe('activateLogin method', function () {

    it('should activate the LOGIN state', function () {
      service.activateLogin();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.LOGIN);
    });

  });

  xdescribe('activateDashboard method', function () {

    it('should activate the DASHBOARD state', function () {
      service.activateDashboard();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.PARTICIPANT_DASHBOARD);
    });

  });

  xdescribe('activateParticipantActivities method', function () {

    it('should activate the PARTICIPANT_ACTIVITY state', function () {
      service.activateParticipantActivities();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.PARTICIPANT_ACTIVITY);
    });

  });

  xdescribe('activateParticipantReports method', function () {

    it('should activate the PARTICIPANT_REPORT state', function () {
      service.activateParticipantReports();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.PARTICIPANT_REPORT);
    });

  });

  xdescribe('activateSignup method', function () {

    it('should activate the SIGNUP state', function () {
      service.activateSignup();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.SIGNUP);
    });

  });

  xdescribe('activateSignupResult method', function () {

    it('should activate the SIGNUP_RESULT state', function () {
      service.activateSignupResult();

      expect(injections.$state.go).toHaveBeenCalledWith(injections.STATE.SIGNUP_RESULT);
    });

  });

  describe('activateActivityViewer method', function () {
    it('should call go method', function () {
      service.activateActivityViewer();

      expect(injections.$state.go).toHaveBeenCalled();
    });

    it('should activate the ACTIVITY_VIEWER state', function () {

    });
  });

});
