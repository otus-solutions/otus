(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotAddButton', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/manager-list/lot-add-button/lot-add-button-template.html',
      bindings:{
        onNewLot: "&"
      }
    });

  function Controller() {
    var self = this;
  }
}());
