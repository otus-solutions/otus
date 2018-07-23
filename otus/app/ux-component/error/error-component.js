(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusError', {
      controller: Controller,
      templateUrl: 'app/ux-component/error/error-template.html'
    });

  Controller.$inject = [];

  function Controller() {
    console.log(666);

  }
})();
