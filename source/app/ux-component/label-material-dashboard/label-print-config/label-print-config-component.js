(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labelPrintConfig', {
      controller: "labelPrintConfigCtrl as $ctrl",
      templateUrl: 'app/ux-component/label-material-dashboard/label-print-config/label-print-config-template.html'
    });

}());
