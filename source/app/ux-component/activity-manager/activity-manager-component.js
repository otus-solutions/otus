(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/activity-manager/activity-manager-template.html',
      bindings: {
        testFour: '=?'
      }
    });

  function Controller() {
    var self = this;

    /* Public methods */
    self.handleDeleteAction = handleDeleteAction;
    self.handleViewInfoAction = handleViewInfoAction;
    self.tst = tst;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    function handleDeleteAction() {
      self.listComponent.update();
    }

    function handleViewInfoAction() {
      self.activityInfoComponent.show();
    }

    function tst() {
      // self.data();
      console.log(self.data)
    }

    function onInit() {
      self.listComponent = {};
      self.activityInfoComponent = {};
      self.testFour =  self.data;
    }
  }
}());
