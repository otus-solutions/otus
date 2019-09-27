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
      template: '<user-login flex></user-login>'
    };
  }
}());
