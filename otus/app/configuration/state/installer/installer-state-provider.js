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
      resolve: {
        onlyOneConfiguration: function(RouteRulesResolver) {
          return RouteRulesResolver.onlyOneConfiguration();
        }
      },
      views: {
        'system-wrap': {
          templateUrl: 'app/installer/initial/initial-config.html',
          controller: 'InitialConfigController as controller'
        }
      }
    };

    self.$get = [provider];

    function provider() {
      return self;
    }
  }
}());
