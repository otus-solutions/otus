xdescribe('Session state configuration', function() {

  var Mock = {};
  var moduleDependencies = ['ui.router'];

  beforeEach(function() {
    defineMockModule();
    defineServiceInjections();

    inject(function(SessionStateProvider, DashboardStateProvider) {
      Mock.SessionStateProvider = SessionStateProvider;
      Mock.DashboardStateProvider = DashboardStateProvider;
    });
  });

  describe('state registration', function() {

    it('$stateProvider should register SessionStateProvider.state', function() {
      expect(Mock.stateProvider.state).toHaveBeenCalledWith(Mock.SessionStateProvider.state);
    });

    it('$stateProvider should register DashboardStateProvider.state', function() {
      expect(Mock.stateProvider.state).toHaveBeenCalledWith(Mock.DashboardStateProvider.state);
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
    module('otusjs.otus', function($provide, $injector) {
      var DashboardStateProvider = $injector.get('otusjs.otus.application.state.DashboardStateProvider');
      var SessionStateProvider = $injector.get('otusjs.otus.application.state.SessionStateProvider');

      $provide.value('SessionStateProvider', SessionStateProvider);
      $provide.value('DashboardStateProvider', DashboardStateProvider);
    });
  }

});
