(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labelAliquots', {
      templateUrl: 'app/ux-component/label-material-dashboard/label-aliquots/label-aliquots-template.html',
      controller: "labelAliquotsCtrl as $ctrl",
      bindings: {
        labels: '='
      }
    });

}());
