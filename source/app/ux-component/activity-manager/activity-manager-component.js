(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-manager/activity-manager-template.html'
    });

  function Controller() {
    var self = this;

    /* Public methods */
    self.handleDeleteAction = handleDeleteAction;
    self.handleViewInfoAction = handleViewInfoAction;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function handleDeleteAction() {
      self.listComponent.update();
    }

    function handleViewInfoAction() {
      self.activityInfoComponent.show();
    }

    function onInit() {
      self.listComponent = {};
      self.activityInfoComponent = {};
    }
  }
}());
