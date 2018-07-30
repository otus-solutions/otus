(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('aliquotsView', {
      templateUrl: 'app/ux-component/laboratory/main-panel/aliquots-view/aliquots-view-template.html',
      bindings: {
        participantLaboratory: '='
      },
      controller: "aliquotsViewCtrl as $ctrl"
    });

}());
