(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('labelSelectionModal', {
      controller: "labelSelectionModalCtrl as $ctrl",
      templateUrl: 'app/ux-component/label-selection-modal/label-selection-modal-template.html'
    });


}());