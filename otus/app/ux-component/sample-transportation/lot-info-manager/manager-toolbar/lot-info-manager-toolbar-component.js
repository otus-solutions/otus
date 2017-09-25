(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/manager-toolbar/lot-info-manager-toolbar-template.html',
      bindings: {
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
