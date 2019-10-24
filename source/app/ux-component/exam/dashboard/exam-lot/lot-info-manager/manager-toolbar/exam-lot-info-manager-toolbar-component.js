(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamLotInfoManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/lot-info-manager/manager-toolbar/exam-lot-info-manager-toolbar-template.html',
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
