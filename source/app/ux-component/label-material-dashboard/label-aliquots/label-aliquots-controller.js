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
    'otusjs.model.locationPoint.LocationPointFactory',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.otus.uxComponent.Publisher'
  ];

  function Controller(
    $scope,
    $element,
    AliquotTubeService,
    LocationPointRestService,
    LocationPointFactory,
    ParticipantLaboratoryService,
    Publisher) {
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
    self.aliquotsLabels = {}

    self.$onInit = onInit;
    self.selectMomentType = selectMomentType
    self.addAliquotToPrintList = addAliquotToPrintList;
    self.removeAliquotFromPrintList = removeAliquotFromPrintList;

    function onInit() {
      _buildMomentTypeList();
      _fetchLocationPoints();
      _subscribeLabels();
      selectMomentType(self.momentTypeList[0]);
      self.colsNumber = Array.from(Array(10).keys())
    }

    function _buildMomentTypeList() {
      self.momentTypeList = AliquotTubeService.buildMomentTypeList(self.labels.tubes);
    }

    function selectMomentType(momentType) {
      if (self.selectedMomentType) {
        if (momentType != self.selectedMomentType) {
          _setMomentType(momentType);
        }
      }
    }

    function _setMomentType(momentType) {
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType, self.locationPoints);
      self.aliquotsLabels = ParticipantLaboratoryService.generateLabelsAliquots();
    }

    function _fetchLocationPoints() {
      LocationPointRestService.getLocationPoints().then((response) => {
        self.locationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
      })
    }

    function addAliquotToPrintList(aliquot) {
      if(aliquot.printStructure.selected){
        self.aliquotsLabels.aliquots.push(aliquot)
      }
    }

    function removeAliquotFromPrintList(aliquot) {
      if(!aliquot.printStructure.selected) {
        self.aliquotsLabels.aliquots = self.aliquotsLabels.aliquots.filter(aliquotPrint => aliquotPrint.code != tube.code);
      }
    }

    function _labelsAliquotsToPrint(callback) {
      callback(
        self.aliquotsLabels
      )
    }

    function _subscribeLabels() {
      Publisher.unsubscribe('labelsAliquots-to-print')
      Publisher.subscribe('labelsAliquots-to-print', _labelsAliquotsToPrint)
    }
  }
}());