(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labMainPanel', {
      templateUrl: 'app/ux-component/laboratory/main-panel/main-panel-template.html',
      bindings: {
         participantLaboratory: '<',
         state: '<',
         callbackFunctions: '='
      },
      controller: controller
    });

  function controller() {
    var self = this;
  }
}());
