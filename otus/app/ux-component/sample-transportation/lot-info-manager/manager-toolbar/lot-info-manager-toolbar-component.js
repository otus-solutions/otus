(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-aliquot-manager/aliquot-manager-toolbar/lot-info-aliquot-manager-toolbar-template.html',
      bindings: {
        lot: '<',
        action: '<',
        onAddLot: '&',
        onCancel: '&',
        onAlterLot: '&',
        onRemoveAliquots: '&',
        selectedAliquots: '<'
      }
    });

  function Controller() {
    var self = this;
  }
}());
