(function() {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .component('tubeItem', {
      templateUrl: 'app/ux-component/laboratory/main-panel/tube-list/tube-item/tube-item-template.html',
      bindings: {
        tube: '<',
        color: '<'
      },
      transclude: true,
      controller: controller
    });

  function controller() {
    var self = this;
  }
}());
