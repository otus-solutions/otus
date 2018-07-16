(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/aliquot-manager-list/aliquot-manager-toolbar/sample-transportation-aliquot-manager-toolbar-template.html',
      bindings: {
        onViewInfo: '&',
        onDelete: '&',
        onChangeLot: '&',
        selectedLots: '<'
      }
    });

  function Controller() {
    var self = this;
  }
}());
