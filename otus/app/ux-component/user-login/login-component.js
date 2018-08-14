(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLogin', {
      controller: 'otusLoginCtrl as $ctrl',
      templateUrl: 'app/ux-component/user-login/login-template.html'
    });
}());
