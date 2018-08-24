(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.UserAccessRecovery', Provider);

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
      name: STATE.ACCESS_RECOVERY,
      url: '/' + STATE.ACCESS_RECOVERY + '/:token',
      templateUrl: 'app/ux-component/user-login-access-recovery/user-login-access-recovery-template.html',
      controller: 'otusUserAccessRecoveryCtrl as $ctrl'
    };
  }
}());
