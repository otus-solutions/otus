(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('printConfigLabel', {
      controller: "printConfigLabelCtrl as $ctrl",
      templateUrl: 'app/ux-component/material-label-dashboard/print-config-label/print-config-label-template.html'
    });

}());
