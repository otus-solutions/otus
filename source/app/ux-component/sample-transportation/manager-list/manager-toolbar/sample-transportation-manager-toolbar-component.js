(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/manager-toolbar/sample-transportation-manager-toolbar-template.html',
      bindings: {
        onViewInfo: '&',
        onDelete: '&',
        onChangeLot: '&',
        onReceipt: '&',
        selectedLots: '<'
      }
    });

  function Controller() {
    var self = this;
  }
}());
