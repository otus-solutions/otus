(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserAccessRecovery', {
      controller: 'otusUserAccessRecoveryCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-access-recovery/user-access-recovery-template.html',
    });
}());