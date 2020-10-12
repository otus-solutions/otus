(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('laboratoryMaterialManagerDashboardCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$filter',
    'otusjs.deploy.LoadingScreenService'
  ];

  function Controller($mdToast, $filter, LoadingScreenService) {
    var self = this;
    self.tubeCode = "";
    self.collectedTubes = [];
    self.selectedTube = {}

    self.$onInit = onInit;

    self.isValidCode = isValidCode;
    self.selectTube = selectTube;

    function onInit() {
      self.tubeListMock = [
        {
          code: 554433221,
          type: "Gel",
          collected: false,
          metadata: false,
          exams: [
            {
              isSaved: false,
              aliquotId: "",
              aliquotCode: "",
              tubeMessage: "",
              date: "20/12/2020",
              processing: "20/12/2020"
            }
          ]
        },
        {
          code: 445566332,
          type: "Gel",
          collected: false,
          metadata: false
        }
      ]
    }

    function selectTube(tube) {
      self.selectedTube = tube
    }

    function isValidCode() {
      if(self.tubeCode.length === 9) {
        const foundTube = self.tubeListMock.find(tube => tube.code == self.tubeCode)
        if(foundTube) {
          if(!foundTube.collected) {
            foundTube.collected = true
            self.collectedTubes.push(foundTube)
          } else {
            toastDuplicated(foundTube.code)
          }
        } else {
          toastError(self.tubeCode)
        }
        self.tubeCode = "";
      }
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
  }
}());
