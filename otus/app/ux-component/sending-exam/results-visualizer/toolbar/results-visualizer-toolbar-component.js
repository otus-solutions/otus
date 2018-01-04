(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/manager-toolbar/lot-info-manager-toolbar-template.html',
      bindings: {
        onLotDelete: '&'
      }
    });

  function Controller() {
    var self = this;
  }
}());
