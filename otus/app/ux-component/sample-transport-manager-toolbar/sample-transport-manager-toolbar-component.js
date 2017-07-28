(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transport-manager-toolbar/sample-transport-manager-toolbar-template.html',
    });

  function Controller() {
    var self = this;
  }
}());
