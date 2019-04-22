(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratoryFlagFilterComponent', {
      controller: "otusLaboratoryFlagFilterComponentCtrl as $ctrl",
      templateUrl: 'app/ux-component/flag-report/laboratory-flag-report/filter/laboratory-flag-filter-component.html',
      bindings: {
        activitiesStatus: '=',
        acronymsList: '=',
        centers: '=',
        onUpdate: '='
      }
    });
}());
