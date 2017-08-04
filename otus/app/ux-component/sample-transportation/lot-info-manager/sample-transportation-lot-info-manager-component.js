(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusSampleTransportationLotInfoManager', {
      controller: Controller,
      templateUrl: 'app/ux-component/sample-transportation/lot-info-manager/sample-transportation-lot-info-manager-template.html'
    });

  Controller.$inject = [
    '$stateParams',
     'otusjs.laboratory.business.project.transportation.AliquotTransportationService'
  ];


  function Controller($stateParams, AliquotTransportationService) {
    var self = this;

    self.$onInit = onInit;
    self.fastInsertion = fastInsertion;

    function onInit() {
      console.clear();
      console.log('teste');
      console.log($stateParams);

      self.lot = AliquotTransportationService.createAliquotLot();
      AliquotTransportationService.getFullAliquotsList()
        .then(function(response) {
          self.fullAliquotsList = response.data; // TODO: fix
          console.group('aliquots-list');
          self.fullAliquotsList.forEach(function(aliquot) {
            console.log(aliquot.code);
          });
          console.groupEnd('aliquots-list');
        });
      console.log(self.lot);
    }

    function fastInsertion(element, tubeCode) {
      if (tubeCode.length === 9) {
        var foundAliquot = _findAliquot(tubeCode);
        if (foundAliquot) {
          console.log(self.lot.insertAliquot(foundAliquot));
        }
        element.aliquot_code = '';
      }
    }

    function _findAliquot(code) {
      return self.fullAliquotsList.find(function(avaiableAliquot) {
        return avaiableAliquot.code == code;
      });
    }
  }
}());
