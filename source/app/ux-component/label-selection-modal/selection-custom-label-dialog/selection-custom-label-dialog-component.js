(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('selectionCustomLabelDialog', {
      controller: "selectionCustomLabelDialogCtrl as $ctrl",
      templateUrl: 'app/ux-component/label-selection-modal/selection-label-custom-dialog-template.html',
      bindings: {
        participantButton: '=',
        unnatachedButton: '=',
        bioMaterialButton: '=',
        participant: '=',
        kit: '='
      }
    });


}());