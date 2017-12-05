(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratory', {
      controller: Controller,
      templateUrl: 'app/ux-component/laboratory/laboratory-start.html'
    });

  Controller.$inject = [
    '$q',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.core.EventService',
    'otusjs.otus.uxComponent.Publisher',
    '$scope'
  ];

  function Controller($q, ParticipantLaboratoryService, LoadingScreenService, EventService, Publisher, $scope) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.intializeLaboratory = intializeLaboratory;

    function onInit() {
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.hasLaboratory = false;
      ParticipantLaboratoryService.onParticipantSelected(_setupLaboratory);
      Publisher.unsubscribe('refresh-laboratory-participant');
      Publisher.subscribe('refresh-laboratory-participant',_refreshLaboratory);
      _setupLaboratory();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = participantData;
      } else {
        ParticipantLaboratoryService
          .getSelectedParticipant()
          .then(function(participantData) {
            self.selectedParticipant = participantData;
          });
      }
    }

    function _refreshLaboratory(currentState) {
      LoadingScreenService.start();
      self.hasLaboratory = false;
      ParticipantLaboratoryService
        .hasLaboratory()
        .then(function(hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          if (hasLaboratory) {
            _fetchLaboratory(currentState);
          }
          LoadingScreenService.finish();
        });
    }

    function _setupLaboratory() {
      LoadingScreenService.start();
      self.hasLaboratory = false;
      ParticipantLaboratoryService
        .hasLaboratory()
        .then(function(hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          if (hasLaboratory) {
            _fetchLaboratory();
          }
          LoadingScreenService.finish();
        });
    }


    function intializeLaboratory() {
      LoadingScreenService.start();

      ParticipantLaboratoryService
        .initializeLaboratory()
        .then(function(laboratory) {
          if (laboratory) {
            self.hasLaboratory = true;
            _fetchLaboratory();
          }
          LoadingScreenService.finish();
        });
    }

    function _fetchLaboratory(currentState) {
      var newState = currentState ? currentState : 'main';

      self.labels = ParticipantLaboratoryService.generateLabels();
      self.labels.tubes = _orderTubesWithLabelNullAlphabetically(self.labels.tubes);
      self.participantLaboratory = ParticipantLaboratoryService.getLaboratory();
      self.state = newState;
    }

    function _orderTubesWithLabelNullAlphabetically(tubeList) {
      var sortedArrayOfNulls = _removeTubesWithOrderNull(tubeList).sort(_sortByTubeLabel);
      return _concatArrays(tubeList, sortedArrayOfNulls);
    }

    function _concatArrays(array1, array2) {
      return array1.concat(array2);
    }

    function _sortByTubeLabel(a, b) {
      // if label are equals
      if (a.label.toLowerCase() === b.label.toLowerCase()) {
        // sort by code
        return a.code > b.code;
      }
      return a.label.toLowerCase() > b.label.toLowerCase();
    }

    function _removeTubesWithOrderNull(tubeList) {
      var firstIndexOfOrderNull = tubeList.findIndex(function(tube) {
        return tube.order === null;
      });
      return tubeList.splice(firstIndexOfOrderNull, tubeList.length);
    }
  }
}());
