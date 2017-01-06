(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.LoginState', Provider);

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
      templateUrl: 'app/ux-component/user-login/login.html',
      controller: 'otusjs.otus.uxComponent.LoginController as $ctrl'
    };
  }
}());
