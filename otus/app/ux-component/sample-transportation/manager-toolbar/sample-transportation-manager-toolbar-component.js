(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-toolbar/sample-transportation-manager-toolbar-template.html',
      bindings: {
        selectedLots: '<'
      }
    });


  function Controller() {
    var self = this;

    self.$onInit = onInit;

    self.details = details;

    function onInit() {
    }

    function details() {
      console.log(self.selectedLots);
    }
  }
}());
