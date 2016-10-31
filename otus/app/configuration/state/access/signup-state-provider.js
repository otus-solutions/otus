(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .provider('otusjs.otus.configuration.state.SignupState', Provider);

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
      name: STATE.SIGNUP,
      url: '/' + STATE.SIGNUP,
      templateUrl: 'app/access/signup/signup.html',
      controller: 'SignupController as $ctrl'
    };
  }
}());
