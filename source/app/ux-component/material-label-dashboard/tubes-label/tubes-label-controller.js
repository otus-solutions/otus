(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('tubesLabelCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$element',
    'otusjs.otus.uxComponent.Publisher',
  ];

  function Controller(
    $scope,
    $element,
    Publisher) {
    var self = this;

    self.newTubes = []
    self.newLabels = {}
    self.tubePrintList = []
    self.selectedMoments = []
    self.$onInit = onInit;
    self.addTubeToPrintList = addTubeToPrintList;
    self.removeTube = removeTube;
    self.filterTubesByMoment = filterTubesByMoment

    function onInit() {
      createNewLabels()
      _subscribeLabels()
      _publishPrintStructure()
      _removeDuplicatedMoments();
    }

    function createNewLabels() {
      self.labels.tubes.forEach(tube => tube.printStructure = {
        selected: false,
        quantity: 1
      })
      self.newLabels = angular.copy(self.labels)
      self.newLabels.tubes = []
    }

    function addTubeToPrintList(tube) {
      if(tube.printStructure.selected){
        self.newLabels.tubes.push(tube)
        console.info(self.newLabels.tubes)
      }
    }

    function removeTube(tube) {
      if(!tube.printStructure.selected) {
        self.newLabels.tubes = self.newLabels.tubes.filter(tubePrint => tubePrint.code != tube.code);
      }
    }

    function filterTubesByMoment() {
      if(self.selectedMoments.includes("TODOS")){
        self.selectedMoments = self.moments
        self.newLabels.tubes = self.labels.tubes
        self.labels.tubes.forEach(tube => {
          tube.printStructure.selected = true
        })
        return;
      }
      const filteredTubes = self.labels.tubes.filter(tube => {
        return self.selectedMoments.includes(tube.momentLabel);
      })
      self.labels.tubes.forEach(tube => {
        if(self.selectedMoments.includes(tube.momentLabel)){
          tube.printStructure.selected = true
        }else {
          tube.printStructure.selected = false
        }
      })
      self.newLabels.tubes = filteredTubes
    }

    function _removeDuplicatedMoments(){
      const tubesMoments = self.labels.tubes.map((tube)=>
        tube.momentLabel
      )
      self.moments = ["TODOS", ...new Set(tubesMoments)]
    }

    function _publishPrintStructure() {
      Publisher.publish("default-print-structure", (defaultPrintStructure) => {
        self.newLabels.printStructure = defaultPrintStructure
      })
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