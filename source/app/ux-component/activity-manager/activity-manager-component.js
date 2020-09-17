(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusActivityManager', {
      controller: 'otusActivityManagerCtrl as $ctrl',
      templateUrl: 'app/ux-component/activity-manager/activity-manager-template.html'
    })
    .controller('otusActivityManagerCtrl', Controller);

  function Controller() {
    var self = this;

    self.$onInit = onInit;
    self.updateList = updateList;
    self.handleViewInfoAction = handleViewInfoAction;

    
    function onInit() {
      self.listComponent = {};
      self.activityInfoComponent = {};
    }

    function updateList() {
      self.listComponent.update();
    }

    function handleViewInfoAction() {
      self.activityInfoComponent.show();
    }

  }
}());
