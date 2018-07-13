  (function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.SignupResultState', Provider);

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
      templateUrl: 'app/ux-component/user-signup/signup-result.html',
      controller: 'otusjs.otus.uxComponent.SignupController as $ctrl'
    };
  }
}());
