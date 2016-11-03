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

    self.state = {
      name: STATE.INSTALLER,
      url: '/' + STATE.INSTALLER,
      templateUrl: 'app/installer/initial-config.html',
      controller: 'InitialConfigController as controller',
      resolve: {
        onlyOneConfiguration: function(RouteRulesResolver) {
          return RouteRulesResolver.onlyOneConfiguration();
        }
      }
    };

    self.$get = [provider];

    function provider() {
      return self;
    }
  }
}());
