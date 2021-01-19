(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('dynamicDialog', {
      controller: "dynamicDialogCtrl as $ctrl",
      templateUrl: 'app/ux-component/dynamic-dialog/dynamic-dialog-template.html',
      bindings: {
        data: "=",
        callbackFunctions: "=",
        templateUrl: "=",
        buttonType: "=",
        buttonText: "="
      }
    });


}());