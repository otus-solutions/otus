(function() {
  'use strict';

  angular
    .module('otusjs.otus.configuration.state')
    .provider('otusjs.otus.configuration.state.SignupResultState', Provider);

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
      name: STATE.SIGNUP_RESULT,
      url: '/' + STATE.SIGNUP_RESULT,
      templateUrl: 'app/access/signup/signup-result.html',
      controller: 'SignupController as $ctrl'
    };
  }
}());
