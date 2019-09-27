(function() {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .component('tubeItemView', {
      templateUrl: 'app/ux-component/laboratory/main-panel/tube-list/tube-item-view/tube-item-view-template.html',
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
