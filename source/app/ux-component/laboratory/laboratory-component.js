(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratory', {
      controller: Controller,
      templateUrl: 'app/ux-component/laboratory/laboratory-start.html'
    });

  Controller.$inject = [
    '$q',
    '$mdDialog',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.core.EventService',
    'otusjs.otus.uxComponent.Publisher',
    'otusjs.model.participant.ParticipantFactory',
    '$scope',
    'otusjs.laboratory.storage.LaboratoryLocalStorageService'
  ];

  function Controller($q, $mdDialog, DialogShowService, ParticipantLaboratoryService, UnattachedLaboratoryService, LoadingScreenService, EventService, Publisher, ParticipantFactory, $scope) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.intializeLaboratory = intializeLaboratory;
    self.attacheLaboratory = attacheLaboratory;

    function onInit() {
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
      ParticipantLaboratoryService
        .hasLaboratory()
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
      ParticipantLaboratoryService
        .hasLaboratory()
        .then(function (hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          self.ready = true;
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
        .then(function (laboratory) {
          if (laboratory) {
            self.hasLaboratory = true;
            self.ready = true;
            _fetchLaboratory();
          }
          LoadingScreenService.finish();
        });
    }

    function _buildConfirmMessage(labCode, recruitmentNumber) {
      return 'Deseja realmente vincular o laboratório código <b>'.concat(labCode)
        .concat('</b> ao participante <b>')
        .concat(recruitmentNumber)
        .concat('</b><br />')
        .concat('<b>O vínculo não poderá ser desfeito.</b>');
    }

    function _showAttacheDialog(msg) {
      var message = _buildConfirmMessage(self.laboratoryIdentification, self.selectedParticipant.recruitmentNumber)
      var _attacheDialog = {
        dialogToTitle: 'Vincular Laboratório',
        titleToText: 'Confirmação de Vínculo',
        textDialog: message,
        ariaLabel: 'Confirmação de vínculo',
        buttons: [{
          message: 'Ok',
          action: function () {
            $mdDialog.hide()
          },
          class: 'md-raised md-primary'
        },
          {
            message: 'Voltar',
            action: function () {
              $mdDialog.cancel()
            },
            class: 'md-raised md-no-focus'
          }
        ]
      };

      return DialogShowService.showDialog(_attacheDialog);

    }

    function attacheLaboratory() {
      self.attacheError = null;
      _showAttacheDialog().then(function () {
        LoadingScreenService.start();
        UnattachedLaboratoryService.attacheLaboratory(self.laboratoryIdentification).then(function () {
          _refreshLaboratory();
          LoadingScreenService.finish();
        }).catch(function (error) {
          self.attacheHaveErrors = true;
          if (error.data) {
            if (error.data.MESSAGE.match("Laboratory not found")) {
              self.attacheError = "Laboratório não encontrado";
            } else if (error.data.MESSAGE.match("Laboratory is already attached")) {
              self.attacheError = "Laboratório já foi vinculado a um participante";
            } else if (error.data.MESSAGE.match("Invalid configuration")) {
              if (error.data.CONTENT.laboratoryCollectGroup !== error.data.CONTENT.participantCollectGroup) {
                self.attacheError = "O laboratório e o participante devem pertencer ao mesmo grupo de controle de qualidade";
              }
              if (error.data.CONTENT.laboratoryFieldCenter !== error.data.CONTENT.participantFieldCenter) {
                if (self.attacheError) {
                  self.attacheError += " e " + "ao mesmo centro"
                } else {
                  self.attacheError = "O laboratório e o participante devem pertencer ao mesmo centro";
                }
              }
            } else {
              self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
            }
          } else {
            self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
          }
          LoadingScreenService.finish();
        });
      }).catch(function () {
      });

    }

    function _fetchLaboratory(currentState) {
      var newState = currentState ? currentState : 'main';

      self.labels = ParticipantLaboratoryService.generateLabels();
      self.labels.tubes = _orderTubesWithLabelNullAlphabetically(self.labels.tubes);
      self.participantLaboratory = ParticipantLaboratoryService.getLaboratory();
      self.state = newState;
      _setSelectedPartLaboratoryData("lastSelectedLaboratory", ParticipantLaboratoryService.getLaboratory())
    }

    function _setSelectedPartLaboratoryData(dataKey, dataValue) {
      ParticipantLaboratoryService.setData(dataKey, dataValue)
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
