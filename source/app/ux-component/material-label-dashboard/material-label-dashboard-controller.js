(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('materialLabelDashboardCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$scope',
    '$element',
    '$window',
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.participant.business.ParticipantManagerService',
    'otusjs.laboratory.storage.LaboratoryLocalStorageService',
    'otusjs.user.business.UserAccessPermissionService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller(
    $mdToast,
    $scope,
    $element,
    $window,
    Publisher,
    ParticipantLaboratoryService,
    ParticipantManagerService,
    LaboratoryLocalStorageService,
    UserAccessPermissionService,
    LaboratoryViewerService) {

    var self = this;

    self.userAccessToLaboratory = "";

    self.$onInit = onInit;
    self.changeState = changeState;

    function onInit() {
      self.laboratoryChecking = false;
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init);
    }

    function _init() {
      self.laboratoryChecking = true;
      _checkingLaboratoryPermission();
      self.labelsFound = LaboratoryLocalStorageService.find({})[0];
      if(self.labelsFound.type == "laboratoryParticipantLabel") {
        _setupLaboratory();
      }else {
        self.labels = self.labelsFound;
      }
      _subscribeLabels();
      changeState('tubes');
    }


    function _checkingLaboratoryPermission() {
      return UserAccessPermissionService.getCheckingLaboratoryPermission().then(response => {
        self.userAccessToLaboratory = response;
      });
    }

    function _setupLaboratory() {
      return ParticipantManagerService.setup()
        .then(() => {
          self.onReady = true;
          ParticipantLaboratoryService.getLaboratoryByParticipant(self.labelsFound.recruitment_number, ParticipantManagerService)
            .then(part => {
              self.participantLaboratory = part;
              _generateLabels();
              _subscribeLabels();
            })
        });
    }

    function _labelsToPrint(callback) {
      callback(self.labels);
    }

    function _subscribeLabels() {
      Publisher.unsubscribe('labels-to-print');
      Publisher.subscribe('labels-to-print', _labelsToPrint);
    }

    function changeState(state) {
      self.state = state;
    }

    function _generateLabels() {
      self.labels = ParticipantLaboratoryService.generateLabels();
      self.labels.type = "laboratoryParticipantLabel";
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
  }
}());