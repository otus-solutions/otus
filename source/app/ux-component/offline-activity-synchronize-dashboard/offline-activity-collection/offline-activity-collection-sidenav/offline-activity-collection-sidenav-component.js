(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('offlineActivityCollectionSidenav', {
      controller: Controller,
      templateUrl: 'app/ux-component/offline-activity-synchronize-dashboard/offline-activity-collection/offline-activity-collection-sidenav/offline-activity-collection-sidenav-template.html',
      bindings: {
        offlineCollectionData: '<'
      },
      require: {
        offlineActivitySynchronizeDashboard: '^offlineActivitySynchronizeDashboard'
      }
    });

  Controller.$inject = [
    '$mdSidenav'
  ];

  function Controller($mdSidenav) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public methods */
    self.show = show;

    function onInit() {
      self.offlineActivitySynchronizeDashboard.infoComponent = self;
    }

    function show() {
      $mdSidenav('right').toggle();
    }
  }
}());
