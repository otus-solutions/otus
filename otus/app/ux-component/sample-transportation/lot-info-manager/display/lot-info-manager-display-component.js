(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLotInfoManagerDisplay', {
      controller: 'otusLotInfoManagerDisplayCtrl as $ctrl',
      templateUrl: 'app/ux-component/sample-transportation/lot-info-aliquot-manager/display/lot-info-aliquot-manager-display-template.html',
      bindings: {
        lot: '=',
        selectedAliquots: '=',
        lotDataSet: '<',
        fullAliquotsList: '<',
        setChartData: '&',
        onLotAlteration: '&'
      }
    });
}());
