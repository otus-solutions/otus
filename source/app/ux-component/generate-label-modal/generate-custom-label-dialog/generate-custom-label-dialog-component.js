(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('generateCustomLabelDialog', {
      controller: "generateCustomLabelDialogCtrl as $ctrl",
      templateUrl: 'app/ux-component/generate-label-modal/generate-custom-label-dialog/generate-custom-label-dialog-template.html',
      bindings: {
        labelPromise: '<',
        participantButton: '=',
        basicButton: '=',
        primaryButton: '=',
        identificationButton: '=',
        kitButton: '=',
        bioMaterialButton: '=',
        labelData: '=',
        labels: '<',
        kitId: '='
      }
    });


}());