(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .provider('otusjs.otus.configuration.state.InstallerState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }

    self.state = {
      name: STATE.INSTALLER,
      url: '/' + STATE.INSTALLER,
      templateUrl: 'app/installer/initial-config.html',
      controller: 'InitialConfigController as controller',
      resolve: {
        onlyOneConfiguration: _onlyOneConfiguration
      }
    };

    _onlyOneConfiguration.$inject = ['RouteRulesResolver']

    function _onlyOneConfiguration(RouteRulesResolver) {
      return RouteRulesResolver.onlyOneConfiguration();
    }
  }
}());
