(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelAliquotsCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$element',
    'otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService',
    'otusjs.deploy.LocationPointRestService',
    'otusjs.model.locationPoint.LocationPointFactory'
  ];

  function Controller(
    $scope,
    $element,
    AliquotTubeService,
    LocationPointRestService,
    LocationPointFactory) {
    var self = this;

    self.newExams = []
    self.newConvertedStorages = []
    self.newStorages = []

    self.tubePrintList = []
    self.selectedMomentType = {}
    self.aliquotPrintList = []
    self.printStructure = {
      quantity: 1,
      selected: false
    }
    self.$onInit = onInit;
    self.selectMomentType = selectMomentType
    self.addAliquotToPrintList = addAliquotToPrintList;
    self.removeAliquotFromPrintList = removeAliquotFromPrintList;

    function onInit() {
      _buildMomentTypeList();
      _fetchLocationPoints();
      self.colsNumber = Array.from(Array(10).keys())
    }

    function _buildMomentTypeList() {
      console.info(self.participantLaboratory)
      self.momentTypeList = AliquotTubeService.buildMomentTypeList(self.labels.tubes);
    }

    function selectMomentType(momentType) {
      console.info(momentType)
      if (self.selectedMomentType) {
        if (momentType != self.selectedMomentType) {
          _setMomentType(momentType);
        }
      }
    }

    function _setMomentType(momentType) {
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType, self.locationPoints);
      addPrintStructureToAliquots();
    }

    function addPrintStructureToAliquots() {
      self.selectedMomentType.exams.map(exam => {
        self.newExams.push({...exam, printStructure: angular.copy(self.printStructure)})
      })
      self.selectedMomentType.convertedStorages.map(exam => {
        self.newConvertedStorages.push({...exam, printStructure: angular.copy(self.printStructure)})
      })
      self.selectedMomentType.storages.map(exam => {
        self.newStorages.push({...exam, printStructure: angular.copy(self.printStructure)})
      })
    }

    function _fetchLocationPoints() {
      LocationPointRestService.getLocationPoints().then((response) => {
        self.locationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
      })
    }

    function addAliquotToPrintList(aliquot) {
      if(tube.printStructure.selected){
        self.aliquotPrintList.push(aliquot)
      }
    }

    function removeAliquotFromPrintList(aliquot) {
      if(!aliquot.printStructure.selected) {
        self.aliquotPrintList = self.aliquotPrintList.filter(aliquotPrint => aliquotPrint.code != tube.code);
      }
    }

  }
}());