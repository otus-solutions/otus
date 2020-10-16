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
          recruitmentNumber : 1074830,
          tube: {
            objectType : "Tube",
            type : "GEL",
            moment : "FASTING",
            code : "361122646",
            groupName : "DEFAULT",
            aliquots : [],
            order : 1,
            tubeCollectionData : {
              objectType : "TubeCollectionData",
              isCollected : false,
              metadata : "",
              operator : "erick@otus-solutions.com.br",
              time : "2020-09-24T16:51:22.973Z"
            }
          }
        }
      ]
    }

    function selectTube(tube) {
      self.selectedTube = tube
    }

    function isValidCode() {
      if(self.tubeCode.length === 9) {
        const foundTube = self.tubeListMock.find(tube => tube.tube.code == self.tubeCode)
        console.info(foundTube);
        if(foundTube) {
          if(!foundTube.tube.tubeCollectionData.isCollected) {
            foundTube.tube.tubeCollectionData.isCollected = true
            self.collectedTubes.push(foundTube)
          } else {
            toastDuplicated(foundTube.tube.code)
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
