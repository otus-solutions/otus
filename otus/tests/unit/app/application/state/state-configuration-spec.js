xdescribe('State names configuration', function() {

  var ACCESS = 'access';
  var INSTALLER = 'installer';
  var SESSION = 'session';
  var DASHBOARD = 'dashboard';
  var LOGIN = 'login';
  var PARTICIPANT_ACTIVITY = 'activity';
  var SIGNUP = 'signup';
  var SIGNUP_RESULT = 'signup-result';

  var STATE = {};
  var Mock = {};

  beforeEach(function() {
    defineMockModule();
    defineServiceInjections();

    inject(function(_STATE_, LoginStateProvider) {
      STATE = _STATE_;
      Mock.LoginStateProvider = LoginStateProvider;
    });
  });

  describe('State names should be defined with right values', function() {

    it('ACCESS constant value should be equal to "access"', function() {
      expect(STATE.ACCESS).toEqual(ACCESS);
    });

    it('INSTALLER constant value should be equal to "installer"', function() {
      expect(STATE.INSTALLER).toEqual(INSTALLER);
    });

    it('SESSION constant value should be equal to "session"', function() {
      expect(STATE.SESSION).toEqual(SESSION);
    });

    it('DASHBOARD constant value should be equal to "dashboard"', function() {
      expect(STATE.DASHBOARD).toEqual(DASHBOARD);
    });

    it('LOGIN constant value should be equal to "login"', function() {
      expect(STATE.LOGIN).toEqual(LOGIN);
    });

    it('SIGNUP constant value should be equal to "signup"', function() {
      expect(STATE.SIGNUP).toEqual(SIGNUP);
    });

    it('SIGNUP_RESULT constant value should be equal to "signup-result"', function() {
      expect(STATE.SIGNUP_RESULT).toEqual(SIGNUP_RESULT);
    });

    it('PARTICIPANT_ACTIVITY constant value should be equal to "participant-activity"', function() {
      expect(STATE.PARTICIPANT_ACTIVITY).toEqual(PARTICIPANT_ACTIVITY);
    });

    it('$urlRouterProvider should register LoginStateProvider.state.url as default url', function() {
      expect(Mock.urlRouterProvider.otherwise).toHaveBeenCalledWith(Mock.LoginStateProvider.state.url);
    });

  });

  function defineMockModule() {
    angular
      .module('otusMock', ['ui.router'])
      .config(Configuration);

    function Configuration($urlRouterProvider) {
      Mock.urlRouterProvider = $urlRouterProvider;
      spyOn(Mock.urlRouterProvider, 'otherwise');
    };

    module('otusMock');
  }

  function defineServiceInjections() {
    module('otusjs..otus', function($provide, $injector) {
      var LoginStateProvider = $injector.get('otusjs.application.state.LoginStateProvider');
      var STATE = $injector.get('STATE');

      $provide.value('LoginStateProvider', LoginStateProvider);
      $provide.value('STATE', STATE);
    });
  }

});
