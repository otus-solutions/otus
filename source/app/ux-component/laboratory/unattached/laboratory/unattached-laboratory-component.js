(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('unattachedLaboratory', {
      controller: 'unattachedLaboratoryCtrl as $ctrl',
      templateUrl: 'app/ux-component/laboratory/unattached/laboratory/unattached-laboratory-template.html',
      bindings: {
        laboratoryData: '<',
        reloadData: '&'
      }
    });
}());
