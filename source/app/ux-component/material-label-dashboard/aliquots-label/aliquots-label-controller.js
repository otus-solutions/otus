(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('aliquotsLabelCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$scope',
    '$element',
    '$window',
    'otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService',
    'otusjs.deploy.LocationPointRestService',
    'otusjs.model.locationPoint.LocationPointFactory',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.laboratory.business.participant.MaterialLabelDialog'
  ];

  function Controller(
    $mdToast,
    $scope,
    $element,
    $window,
    AliquotTubeService,
    LocationPointRestService,
    LocationPointFactory,
    ParticipantLaboratoryService,
    Publisher,
    MaterialLabelDialog) {
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
    self.backPage = backPage

    function onInit() {
      _fetchLocationPoints();
      _buildMomentTypeList();
      _subscribeLabels();
      _publishPrintStructure();
    }

    function backPage() {
      $window.history.back()
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
      return MaterialLabelDialog.showConfirmCancelDialog()
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

    function addAliquotToPrintList(aliquot, showErrorToast) {
      if(aliquot.isSaved){
        if(aliquot.printStructure.selected){
          self.aliquotsLabels.aliquots.push(aliquot)
        }
      }else {
        aliquot.printStructure.selected = false
        if(showErrorToast){
          _showToastMsg("Não é possível gerar etiquetas de aliquotas que ainda não foram coletadas")
        }
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

    function _showToastMsg(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(1000)
      );
    }
  }
}());