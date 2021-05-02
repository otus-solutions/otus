(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPanel', {
      templateUrl: 'app/ux-component/otus-panel/otus-panel-template.html',
      bindings: {
        headerLabel: '<',
        panelAlign: '<'
      },
      transclude: true,
      controller: Controller
    });

  Controller.$inject = [
    '$mdColors'
  ];

  function Controller($mdColors) {
    const self = this;
    self.$onInit = onInit;

    function onInit(){
      self.title = self.title || '';
      self.align = self.align || 'center start';
      self.colorLeft = $mdColors.getThemeColor('primary-hue-3');
      self.colorRight= $mdColors.getThemeColor('primary-hue-1');
    }

  }
}());
