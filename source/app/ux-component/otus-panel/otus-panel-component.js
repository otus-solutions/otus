(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusPanel', {
      templateUrl: 'app/ux-component/otus-panel/otus-panel-template.html',
      bindings: {
        headerLabel: '<',
        colorLeft: '<',
        colorRight: '<',
        align: '<'
      },
      transclude: true,
      controller: Controller
    });

  function Controller() {
    var self = this;

    self.$onInit = onInit;

    function onInit(){
      self.title = self.title || '';
      self.align = self.align || 'center start';
      self.colorLeft = self.colorLeft || '#299288';
      self.colorRight = self.colorRight || '#24baaa';
    }
  }
}());
