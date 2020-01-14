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
    'otusjs.otus.uxComponent.UserActivityPendencyDialogService',
    'otusjs.otus.uxComponent.UserActivityPendencyConstant'

  ];

  function Controller(UserActivityPendencyDialogService, Constant) {
    const self = this;
    self.Constant = Constant;

    self.openUserActivityPendencyDialog = openUserActivityPendencyDialog;

    function openUserActivityPendencyDialog(){
      UserActivityPendencyDialogService.openUserActivityPendencyDialog(self.selectedActivity);
    }
  }

}());