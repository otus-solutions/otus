(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .provider('otusjs.otus.configuration.state.SessionState', Provider);

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
      name: STATE.SESSION,
      template: '<div flex layout="column"><div ui-view="session-wrap" flex layout="row"></div></div>',
      resolve: {
        loggedUser: loggedUser
      }
    };

    loggedUser.$inject = ['RouteRulesResolver'];

    function loggedUser(RouteRulesResolver) {
      return RouteRulesResolver.loggedUser();
    }
  }
}());
