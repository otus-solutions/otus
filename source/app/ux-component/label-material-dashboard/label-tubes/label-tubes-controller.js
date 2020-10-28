(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelTubesCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$element',
    'otusjs.otus.uxComponent.Publisher'
  ];

  function Controller(
    $scope,
    $element,
    Publisher) {
    var self = this;

    self.newTubes = []
    self.tubePrintList = []

    self.$onInit = onInit;
    self.addTubeToPrintList = addTubeToPrintList;
    self.removeTube = removeTube;

    function onInit() {
      self.colsNumber = Array.from(Array(10).keys())
      addPrintStructureToTubes()
    }

    function addPrintStructureToTubes() {
      self.labels.tubes.map(tube => {
        self.newTubes.push({...tube, printStructure: angular.copy(self.printStructure)})
      })
    }

    function addTubeToPrintList(tube) {
      if(tube.printStructure.selected){
        self.tubePrintList.push(tube)
      }
    }

    function removeTube(tube) {
      if(!tube.printStructure.selected) {
        self.tubePrintList = self.tubePrintList.filter(tubePrint => tubePrint.code != tube.code);
      }
    }

    self.printStructure = {
      quantity: 1,
      selected: false
    }

  }
}());