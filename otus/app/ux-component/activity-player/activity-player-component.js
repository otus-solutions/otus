(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityPlayer', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-player/activity-player-template.html'
    });

  Controller.$inject = [
    'otusjs.activity.core.EventService'
  ];

  function Controller(EventService) {
    var self = this;

    /* Public methods */
    self.x = x;

    /* Lifecycle hooks */
    // self.$onInit = onInit;

    function x() {
    }
  }
}());
