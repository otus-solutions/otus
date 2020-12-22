(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratory', {
      controller: 'otusLaboratoryCtrl as $ctrl',
      templateUrl: 'app/ux-component/laboratory/laboratory-start.html'
    })
    .controller('otusLaboratoryCtrl', Controller);

  Controller.$inject = [
    '$q',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.core.EventService',
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.model.participant.ParticipantFactory',
    '$scope',
    'otusjs.laboratory.storage.LaboratoryLocalStorageService',
    'otusjs.laboratoryViewerService.LaboratoryViewerService'
  ];

  function Controller($q, DialogShowService,
                      ParticipantLaboratoryService, UnattachedLaboratoryService,
                      LoadingScreenService, EventService, Publisher, ParticipantFactory, $scope, LaboratoryLocalStorageService,
                      LaboratoryViewerService) {
    var self = this;

    const UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";

    /* Public methods */
    self.$onInit = onInit;
    self.initializeLaboratory = initializeLaboratory;

    self.attacheLabTitle = "Vincular laboratório do participante";
    self.attacheLabText = "Utilize o função vincular laboratório para\n" +
      "            atribuir um conjunto de tubos previamente criados\n" +
      "            ao participante selecionado, para isso utilize o id do laboratório.";

    function onInit() {
      LaboratoryViewerService.checkExistAndRunOnInitOrBackHome(_init);
    }

    function _init(){
      _loadSelectedParticipant();
      EventService.onParticipantSelected(_loadSelectedParticipant);
      self.hasLaboratory = false;
      self.ready = false;
      self.attacheHasErrors = false;
      ParticipantLaboratoryService.onParticipantSelected(_setupLaboratory);
      Publisher.unsubscribe('refresh-laboratory-participant');
      Publisher.subscribe('refresh-laboratory-participant', _refreshLaboratory);
      _setupLaboratory();
    }

    function _loadSelectedParticipant(participantData) {
      if (participantData) {
        self.selectedParticipant = ParticipantFactory.fromJson(participantData);
      } else {
        ParticipantLaboratoryService
          .getSelectedParticipant()
          .then(function (participantData) {
            self.selectedParticipant = ParticipantFactory.fromJson(participantData);
          });
      }
    }

    function _refreshLaboratory(currentState) {
      LoadingScreenService.start();
      self.ready = false;
      self.hasLaboratory = false;
      ParticipantLaboratoryService.hasLaboratory()
        .then(function (hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          self.ready = true;
          if (hasLaboratory) {
            _fetchLaboratory(currentState);
          }
          LoadingScreenService.finish();
        });
    }

    function _setupLaboratory() {
      LoadingScreenService.start();
      self.hasLaboratory = false;
      ParticipantLaboratoryService.hasLaboratory()
        .then(function (hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          self.ready = true;
          if (hasLaboratory) {
            _fetchLaboratory();
          }
          LoadingScreenService.finish();
        });
    }


    function initializeLaboratory() {
      LoadingScreenService.start();

      ParticipantLaboratoryService.initializeLaboratory()
        .then(function (laboratory) {
          if (laboratory) {
            self.hasLaboratory = true;
            self.ready = true;
            _fetchLaboratory();
          }
          LoadingScreenService.finish();
        });
    }


    function _fetchLaboratory(currentState) {
      self.labels = ParticipantLaboratoryService.generateLabels();
      self.labels.tubes = _orderTubesWithLabelNullAlphabetically(self.labels.tubes);
      self.labels.type = "laboratoryParticipantLabel";
      self.participantLaboratory = ParticipantLaboratoryService.getLaboratory();
      self.state = currentState ? currentState : 'main';
      LaboratoryLocalStorageService.findAndDeleteLabels({"type": "laboratoryParticipantLabel"});
      LaboratoryLocalStorageService.findAndDeleteLabels({"type": "laboratoryUnattachedLabel"});
      LaboratoryLocalStorageService.insert(self.labels);
    }

    function _orderTubesWithLabelNullAlphabetically(tubeList) {
      var sortedArrayOfNulls = _removeTubesWithOrderNull(tubeList).sort(_sortByTubeLabel);
      return _concatArrays(tubeList, sortedArrayOfNulls);
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

    function _removeTubesWithOrderNull(tubeList) {
      var firstIndexOfOrderNull = tubeList.findIndex(function (tube) {
        return tube.order === null;
      });
      return tubeList.splice(firstIndexOfOrderNull, tubeList.length);
    }
  }
}());
