(function() {
  'use strict';
  angular
    .module('otusjs.otus.uxComponent')
    .component('fastCollection', {
      templateUrl: 'app/ux-component/laboratory/control-panel/fast-collection/fast-collection-template.html',
      bindings: {
        moments: '<',
        tubeList: '='
      },
      controller: controller
    });

  controller.$inject = [
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    '$element',
    '$mdToast'
  ];

  function controller(ParticipantLaboratoryService, $element, $mdToast) {
    var self = this;


    self.$onInit = onInit;
    self.fastCollection = fastCollection;

    function onInit() {
      $element.find('input').focus();
    }

    function toastError(tubeCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Tubo ' + tubeCode + ' não encontrado')
        .hideDelay(1000)
      );
    }

    function toastDuplicated(tubeCode) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Tubo ' + tubeCode + ' já coletado')
        .hideDelay(1000)
      );
    }

    function fastCollection(element, tubeCode) {
      if (tubeCode.length === 9) {
        var foundTube = _findTube(tubeCode);
        if (foundTube) {
          if (!foundTube.tubeCollectionData.isCollected) {
            foundTube.collect();
            ParticipantLaboratoryService.setList(foundTube);
          } else {
            toastDuplicated(tubeCode);
          }
        } else {
          toastError(tubeCode);
        }
        element.tube_code = '';
      }
    }

    function _findTube(code) {
      return self.tubeList.find(function(tube) {
        return tube.code == code;
      });
    }

  }




}());
