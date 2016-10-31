(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .provider('otusjs.otus.configuration.state.AccessState', Provider);

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
      abstract: true,
      name: STATE.ACCESS,
      template: '<div flex layout="column"><div ui-view flex layout="row"></div></div>',
      resolve: {
        initialConfiguration: initialConfiguration
      }
    };

    initialConfiguration.$inject = ['RouteRulesResolver'];

    function initialConfiguration(RouteRulesResolver) {
      return RouteRulesResolver.initialConfiguration();
    }
  }
}());
