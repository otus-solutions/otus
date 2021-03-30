(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('materialReceipt', {
      controller: 'materialReceiptCtrl as $ctrl',
      templateUrl: 'app/ux-component/laboratory/laboratory-material-manager/material-receipt/material-receipt-template.html',
      bindings: {
        material: '='
      }
    });
}());
