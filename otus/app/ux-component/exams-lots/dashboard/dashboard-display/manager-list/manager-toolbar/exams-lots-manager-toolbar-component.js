(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamsLotsManagerToolbar', {
      controller: Controller,
      templateUrl: 'app/ux-component/exams-lots/dashboard/dashboard-display/manager-list/manager-toolbar/exams-lots-manager-toolbar-template.html',
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
