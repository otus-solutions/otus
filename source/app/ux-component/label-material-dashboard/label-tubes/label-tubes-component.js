(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labelTubes', {
      templateUrl: 'app/ux-component/label-material-dashboard/label-tubes/label-tubes-template.html',
      controller: "labelTubesCtrl as $ctrl",
      bindings: {
        labels : '='
      }
    });

}());
