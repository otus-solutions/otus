(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('tubesLabel', {
      templateUrl: 'app/ux-component/material-label-dashboard/tubes-label/tubes-label-template.html',
      controller: "tubesLabelCtrl as $ctrl",
      bindings: {
        labels : '='
      }
    });

}());
