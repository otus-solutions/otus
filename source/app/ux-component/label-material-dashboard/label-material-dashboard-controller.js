(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('labelMaterialDashboardCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$element',
    '$window',
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function Controller(
    $scope,
    $element,
    $window,
    Publisher,
    ParticipantLaboratoryService,
    ParticipantManagerService) {

    var self = this;

    self.$onInit = onInit;
    self.changeState = changeState;

    function onInit() {
      _getParticipantLaboratoryData();
      _setupLaboratory();
      changeState('tubes');
    }

    function _setupLaboratory() {
      return ParticipantManagerService.setup().then(() => {
        self.onReady = true;
        ParticipantLaboratoryService.getLaboratoryByParticipant(self.participantLaboratory.recruitmentNumber, ParticipantManagerService)
          .then(part => {
            self.participantLaboratory = part
            _generateLabels();
            _subscribeLabels();
          })
      });
    }

    function _labelsToPrint(callback) {
      callback(
        self.labels
      )
    }

    function _subscribeLabels() {
      Publisher.unsubscribe('labels-to-print')
      Publisher.subscribe('labels-to-print', _labelsToPrint)
    }

    function changeState(state) {
      self.state = state
    }

    function _generateLabels() {
      self.labels = ParticipantLaboratoryService.generateLabels()
      self.labels.tubes = _orderTubesWithLabelNullAlphabetically(self.labels.tubes)
    }

    function _orderTubesWithLabelNullAlphabetically(tubeList) {
      var sortedArrayOfNulls = _removeTubesWithOrderNull(tubeList).sort(_sortByTubeLabel);
      return _concatArrays(tubeList, sortedArrayOfNulls);
    }

    function _removeTubesWithOrderNull(tubeList) {
      var firstIndexOfOrderNull = tubeList.findIndex(function (tube) {
        return tube.order === null;
      });
      return tubeList.splice(firstIndexOfOrderNull, tubeList.length);
    }

    function _concatArrays(array1, array2) {
      return array1.concat(array2);
    }

    function _sortByTubeLabel(a, b) {
      if (a.label.toLowerCase() === b.label.toLowerCase()) {
        return a.code > b.code;
      }
      return a.label.toLowerCase() > b.label.toLowerCase();
    }

    function _getParticipantLaboratoryData() {
      const laboratorySessionStorage = angular.fromJson($window.sessionStorage.getItem("laboratory_context"))
      self.participantLaboratory = laboratorySessionStorage.lastSelectedLaboratory
    }
  }
}());