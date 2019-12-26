(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusUserActivityPendency', {
      controller: 'userActivityPendencyCtrl as $ctrl',
      templateUrl: 'app/ux-component/pendency/user-activity-pendency/user-activity-pendency-template.html',
      bindings:{

      }
    }).controller('userActivityPendencyCtrl', Controller);

  Controller.$inject = [
    'otusjs.otus.uxComponent.UserActivityPendencyService',
    'otusjs.otus.uxComponent.UserActivityPendencyValue'
  ];

  function Controller(UserActivityPendencyService, VALUE) {
    const self = this;

    self.$onInit = onInit;
    self.createUserActivityPendency = createUserActivityPendency;

    function onInit() {}

    function createUserActivityPendency(){
      UserActivityPendencyService.createUserActivityPendency();
    }
  }



}());