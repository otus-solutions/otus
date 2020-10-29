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
    self.newLabels = {}
    self.tubePrintList = []

    self.$onInit = onInit;
    self.addTubeToPrintList = addTubeToPrintList;
    self.removeTube = removeTube;

    function onInit() {
      self.colsNumber = Array.from(Array(10).keys())
      createNewLabels()
      _subscribeLabels()
      self.labelMaker = $element.find("label-maker").children().children()
    }

    function createNewLabels() {
      self.newLabels = angular.copy(self.labels)
      self.newLabels.tubes = []
    }

    function addTubeToPrintList(tube) {
      if(tube.printStructure.selected){
        self.newLabels.tubes.push(tube)
      }
    }

    function removeTube(tube) {
      if(!tube.printStructure.selected) {
        self.newLabels.tubes = self.newLabels.tubes.filter(tubePrint => tubePrint.code != tube.code);
      }
    }

    function _labelsTubesToPrint(callback) {
      callback(
        self.newLabels
      )
    }

    function _subscribeLabels() {
      Publisher.unsubscribe('labelsTubes-to-print')
      Publisher.subscribe('labelsTubes-to-print', _labelsTubesToPrint)
    }
  }
}());