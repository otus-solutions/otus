(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('laboratoryAliquotsManager', {
      controller: 'laboratoryAliquotsManagerCtrl as $ctrl',
      templateUrl: 'app/ux-component/laboratory/laboratory-material-manager/aliquots-manager/laboratory-aliquots-manager-template.html',
      bindings: {
        participantLaboratory:'=',
        participantManager:'=',
        originalTube:'=',
        tube: '=',
        updateAliquots:'='
      }
    });
}());
