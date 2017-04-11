xdescribe('Access state configuration', function() {

  var Mock = {};
  var moduleDependencies = ['ui.router'];

  beforeEach(function() {
    defineMockModule();
    defineServiceInjections();

    inject(function(AccessStateProvider, LoginStateProvider, SignupStateProvider, SignupResultStateProvider) {
      Mock.AccessStateProvider = AccessStateProvider;
      Mock.LoginStateProvider = LoginStateProvider;
      Mock.SignupStateProvider = SignupStateProvider;
      Mock.SignupResultStateProvider = SignupResultStateProvider;
    });
  });

  describe('state registration', function() {

    it('$stateProvider should register AccessStateProvider.state', function() {
      expect(Mock.stateProvider.state).toHaveBeenCalledWith(Mock.AccessStateProvider.state);
    });

    it('$stateProvider should register LoginStateProvider.state', function() {
      expect(Mock.stateProvider.state).toHaveBeenCalledWith(Mock.LoginStateProvider.state);
    });

    it('$stateProvider should register SignupStateProvider.state', function() {
      expect(Mock.stateProvider.state).toHaveBeenCalledWith(Mock.SignupStateProvider.state);
    });

    it('$stateProvider should register SignupResultStateProvider.state', function() {
      expect(Mock.stateProvider.state).toHaveBeenCalledWith(Mock.SignupResultStateProvider.state);
    });

  });

  function defineMockModule() {
    angular
      .module('otusMock', moduleDependencies)
      .config(Configuration);

    function Configuration($stateProvider) {
      Mock.stateProvider = $stateProvider;
      spyOn(Mock.stateProvider, 'state');
    };

    module('otusMock');
  }

  function defineServiceInjections() {
    module('otusjs..otus', function($provide, $injector) {
      var AccessStateProvider = $injector.get('otusjs.application.state.AccessStateProvider');
      var LoginStateProvider = $injector.get('otusjs.application.state.LoginStateProvider');
      var SignupStateProvider = $injector.get('otusjs.application.state.SignupStateProvider');
      var SignupResultStateProvider = $injector.get('otusjs.application.state.SignupResultStateProvider');

      $provide.value('AccessStateProvider', AccessStateProvider);
      $provide.value('LoginStateProvider', LoginStateProvider);
      $provide.value('SignupStateProvider', SignupStateProvider);
      $provide.value('SignupResultStateProvider', SignupResultStateProvider);
    });
  }

});
