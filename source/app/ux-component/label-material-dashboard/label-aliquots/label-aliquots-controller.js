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
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.laboratory.business.participant.LabelMaterialDialog'
  ];

  function Controller(
    $scope,
    $element,
    AliquotTubeService,
    LocationPointRestService,
    LocationPointFactory,
    ParticipantLaboratoryService,
    Publisher,
    LabelMaterialDialog) {
    var self = this;

    self.newExams = []
    self.newConvertedStorages = []
    self.newStorages = []
    self.tubePrintList = []
    self.aliquotPrintList = []
    self.isAllSelected = false
    self.aliquotsLabels = {}

    self.$onInit = onInit;
    self.selectMomentType = selectMomentType
    self.addAliquotToPrintList = addAliquotToPrintList;
    self.removeAliquotFromPrintList = removeAliquotFromPrintList;
    self.selectAll = selectAll

    function onInit() {
      _buildMomentTypeList();
      _fetchLocationPoints();
      _subscribeLabels();
      selectMomentType(self.momentTypeList[0]);
      _publishPrintStructure();
    }

    function _buildMomentTypeList() {
      self.momentTypeList = AliquotTubeService.buildMomentTypeList(self.labels.tubes);
    }

    function selectMomentType(momentType) {
      if (self.selectedMomentType) {
        if (momentType != self.selectedMomentType) {
          if(self.aliquotsLabels.aliquots.length != 0){
            changeMomentDialog().then(() => {
              _setMomentType(momentType);
            })
          }else {
            _setMomentType(momentType)
          }
        }
      }else {
        _setMomentType(momentType)
      }
    }

    function changeMomentDialog() {
      return LabelMaterialDialog.showConfirmCancelDialog()
    }

    function _setMomentType(momentType) {
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType, self.locationPoints);
      self.aliquotsLabels = ParticipantLaboratoryService.generateLabelsAliquots();
      self.isAllSelected = false
      _publishPrintStructure();
    }

    function _fetchLocationPoints() {
      LocationPointRestService.getLocationPoints().then((response) => {
        self.locationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
      })
    }

    function selectAll() {
      if(self.isAllSelected){
        self.selectedMomentType.exams.forEach(exam => {
          exam.printStructure.selected = true
          addAliquotToPrintList(exam)
        })
        self.selectedMomentType.convertedStorages.forEach(exam => {
          exam.printStructure.selected = true
          addAliquotToPrintList(exam)
        })
        self.selectedMomentType.storages.forEach(exam => {
          exam.printStructure.selected = true
          addAliquotToPrintList(exam)
        })
      }else {
        self.selectedMomentType.exams.forEach(exam => {
          exam.printStructure.selected = false
        })
        self.selectedMomentType.convertedStorages.forEach(exam => {
          exam.printStructure.selected = false
        })
        self.selectedMomentType.storages.forEach(exam => {
          exam.printStructure.selected = false
        })
        self.aliquotsLabels.aliquots = []
      }
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

    function _publishPrintStructure() {
      Publisher.publish("default-print-structure", (defaultPrintStructure) => {
        self.aliquotsLabels.printStructure = defaultPrintStructure
      })
    }
  }
}());