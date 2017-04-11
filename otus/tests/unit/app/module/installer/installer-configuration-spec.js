xdescribe('Installer state configuration', function() {

  var Mock = {};
  var moduleDependencies = ['ui.router'];

  beforeEach(function() {
    defineMockModule();
    defineServiceInjections();

    inject(function(InstallerStateProvider) {
      Mock.InstallerStateProvider = InstallerStateProvider;
    });
  });

  describe('state registration', function() {

    it('$stateProvider should register InstallerStateProvider.state', function() {
      expect(Mock.stateProvider.state).toHaveBeenCalledWith(Mock.InstallerStateProvider.state);
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
      var InstallerStateProvider = $injector.get('otusjs.otus.application.state.InstallerStateProvider');

      $provide.value('InstallerStateProvider', InstallerStateProvider);
    });
  }

});
