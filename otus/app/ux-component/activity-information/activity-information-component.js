(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityInformation', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-information/activity-information-template.html',
      require: {
        otusActivityManager: '^otusActivityManager'
      }
    });

  Controller.$inject = [
    '$mdSidenav',
    'otusjs.activity.core.ContextService',
    'otusjs.otus.uxComponent.ActivityStatusItemFactory'
  ];

  function Controller($mdSidenav, ContextService, ActivityStatusItemFactory) {
    var self = this;

    /* Public methods */
    self.show = show;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function onInit() {
      self.otusActivityManager.activityInfoComponent = self;
    }

    function show() {
      var activity = ContextService.getSelectedActivities()[0];
      self.activity = {};
      self.activity.details = activity.template.identity;
      self.activity.history = activity.statusHistory.getHistory().map(ActivityStatusItemFactory.create);
      self.activity.history.reverse();
      $mdSidenav('right').toggle();
    }
  }
}());
