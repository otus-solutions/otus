(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('userLogin', {
      controller: 'otusjs.otus.uxComponent.LoginController as $ctrl',
      templateUrl: 'app/ux-component/user-login/login.html',
    });
}());