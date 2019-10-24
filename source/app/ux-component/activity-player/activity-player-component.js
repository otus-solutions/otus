(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityPlayer', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-player/activity-player-template.html'
    });

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {

    }
  }
}());
