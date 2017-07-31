(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-toolbar/sample-transportation-manager-toolbar-template.html',
    });

  function Controller() {
    var self = this;
  }
}());
