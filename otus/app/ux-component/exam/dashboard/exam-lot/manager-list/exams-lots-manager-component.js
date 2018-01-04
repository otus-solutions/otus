(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusExamsLotsManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/exam/dashboard/exam-lot/manager-list/exams-lots-manager-template.html',
      bindings: {
        lots: "<"
      }
    });

  function Controller() {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.handleViewInfoAction = handleViewInfoAction;

    function onInit() {
      self.dataToCsv = [];
      self.selectedLots = [];
    }

    function handleViewInfoAction() {
      self.lotInfoComponent.show();
    }
  }
}());
