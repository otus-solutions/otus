(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerDisplay', {
      controller: 'otusLotInfoManagerDisplayCtrl as $ctrl',
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/display/lot-info-manager-display-template.html',
      bindings: {
        lot: '=',
        selectedAliquots: '=',
        lotDataSet: '<',
        aliquotsInOtherLotsList: '<',
        fullAliquotsList: '<',
        setChartData: '&',
        onLotAlteration: '&'
      }
    });
}());
