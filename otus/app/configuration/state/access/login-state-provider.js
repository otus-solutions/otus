(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .provider('otusjs.otus.configuration.state.LoginState', Provider);

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
      parent: STATE.ACCESS,
      name: STATE.LOGIN,
      url: '/' + STATE.LOGIN,
      templateUrl: 'app/access/login/login.html',
      controller: 'LoginController as $ctrl',
      resolve: {
        alreadyLogged: alreadyLogged
      }
    };

    alreadyLogged.$inject = ['RouteRulesResolver'];

    function alreadyLogged(RouteRulesResolver) {
      return RouteRulesResolver.alreadyLogged();
    }
  }
}());
