(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('flagFilterViewComponent', {
      controller: "flagFilterViewCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/activity-flag-report/filter/otus-flag-filter-view-template.html',
      bindings: {
        activitiesStatus: '=',
        acronymsList: '=',
        centers: '=',
        onUpdate: '='
      }
    });
}());
