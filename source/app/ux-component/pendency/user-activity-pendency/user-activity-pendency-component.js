(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserActivityPendency', {
      controller: 'userActivityPendencyCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency/user-activity-pendency/user-activity-pendency-template.html',
      bindings:{
        'selectedActivity' : '<'

      }
    }).controller('userActivityPendencyCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.UserActivityPendencyDialogService'
  ];

  function Controller(UserActivityPendencyDialogService) {
    const self = this;

    self.$onInit = onInit;
    self.openUserActivityPendencyDialog = openUserActivityPendencyDialog;

    function onInit() {}

    function openUserActivityPendencyDialog(){
      UserActivityPendencyDialogService.openUserActivityPendencyDialog(self.selectedActivity);
    }
  }



}());