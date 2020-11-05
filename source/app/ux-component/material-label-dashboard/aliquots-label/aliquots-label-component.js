(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('aliquotsLabel', {
      templateUrl: 'app/ux-component/material-label-dashboard/aliquots-label/aliquots-label-template.html',
      controller: "aliquotsLabelCtrl as $ctrl",
      bindings: {
        labels: '='
      }
    });

}());
