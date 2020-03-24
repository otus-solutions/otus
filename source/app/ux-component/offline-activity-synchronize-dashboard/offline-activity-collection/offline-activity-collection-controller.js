(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('offlineActivityCollectionCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.showInfo = showInfo;

    function onInit() {
    }

    function showInfo() {
      self.showInfo(self.offlineCollectionData);
    }
  }
}());
