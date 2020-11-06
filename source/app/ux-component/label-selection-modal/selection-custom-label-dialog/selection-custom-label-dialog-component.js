(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('selectionCustomLabelDialog', {
      controller: "selectionCustomLabelDialogCtrl as $ctrl",
      templateUrl: 'app/ux-component/label-selection-modal/selection-custom-label-dialog/selection-custom-label-dialog-template.html',
      bindings: {
        participantButton: '=',
        unnatachedButton: '=',
        bioMaterialButton: '=',
        participant: '=',
        kit: '='
      }
    });


}());