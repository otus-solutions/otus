(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('laboratoryAliquotsManagerCtrl', Controller);

  Controller.$inject = [
    '$scope',
    '$element',
    'otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService',
    'otusjs.laboratory.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.business.participant.aliquot.AliquotValidationService',
    'otusjs.deploy.LocationPointRestService',
    'otusjs.model.locationPoint.LocationPointFactory',
    'otusjs.laboratory.business.participant.aliquot.AliquotMessagesService'
  ];

  function Controller(
                      $scope,
                      $element,
                      AliquotTubeService,
                      LaboratoryConfigurationService,
                      Validation,
                      LocationPointRestService,
                      LocationPointFactory,
                      AliquotMessagesService) {
    var self = this;

    self.$onInit = onInit

    self.now = new Date()
    self.processingDate = new Date()
    self.selectedLocationPoint = {};
    self.timeShowMsg = 3000;

    self.aliquotInputOnChange = aliquotInputOnChange;
    self.aliquotInputOnBlur = aliquotInputOnBlur;
    self.updateExamsProcessingDate = updateExamsProcessingDate;
    self.updateExamsLocationPoint = updateExamsLocationPoint;
    self.filterLocationPointsWithoutSelected = filterLocationPointsWithoutSelected;
    self.getConvertedHistory = getConvertedHistory;
    self.saveAliquots = saveAliquots;
    self.haveAliquotsChanged = haveAliquotsChanged
    self.setFocus = setFocus
    self.tubeInputOnChange = tubeInputOnChange
    self.aliquotInputOnKeyDown = aliquotInputOnKeyDown
    self.convertAliquot = convertAliquot
    self.deleteAliquot = deleteAliquot

    function onInit() {
      _buildMomentTypeList(self.participantLaboratory.tubes)

      const codeConfiguration = LaboratoryConfigurationService.getCodeConfiguration();

      self.aliquotLengths = LaboratoryConfigurationService.getAliquotLengths();
      self.aliquotMaxLength = Math.max.apply(null, self.aliquotLengths);

      self.participant = self.participantManager.getParticipant(
        self.participantLaboratory.recruitmentNumber.toString()
      )

      _getMomentTypeByTubeType()

      self.validations = {
        wave: {
          value: codeConfiguration.waveNumberToken,
          position: 0
        },
        center: {
          value: self.participant.fieldCenter.code,
          position: 1
        },
        tube: {
          value: codeConfiguration.tubeToken,
          position: 2
        },
        cryotube: {
          value: codeConfiguration.cryotubeToken,
          position: 2
        },
        pallet: {
          value: codeConfiguration.palletToken,
          position: 2
        }
      };
      fetchLocationPoints()
    }

    function deleteAliquot(aliquot) {
      AliquotMessagesService.showDeleteDialog().then(function() {
        return AliquotTubeService.deleteAliquot(aliquot.aliquotCode).then(function () {
          self.selectedMomentType.removeAliquot(aliquot);
        }).catch(function (err) {
          AliquotMessagesService.showNotRemovedDialog(err.data.CONTENT);
        });
      }).catch(function () {});
    }

    function _getMomentTypeByTubeType() {
      self.momentType = self.momentTypeList.find(moment =>
        moment.type == self.tube.type && moment.moment == self.tube.moment
      )
    }

    function saveAliquots() {
      if (AliquotTubeService.areFieldsChanged(self.selectedMomentType)) {
          AliquotMessagesService.showSaveDialog().then(function() {
            var updatedAliquots = AliquotTubeService.getNewAliquots(self.selectedMomentType);
            var persistanceStructure = self.selectedMomentType.getPersistanceStructure(updatedAliquots);
            AliquotTubeService.updateAliquotsWithRn(persistanceStructure, self.participantLaboratory.recruitmentNumber)
              .then(function(data) {
                self.selectedMomentType.updateTubes();
                self.participantLaboratory.updateTubeList();
                _setMomentType(self.selectedMomentType);
                AliquotMessagesService.showToast(Validation.validationMsg.savedSuccessfully, self.timeShowMsg);
              })
              .catch(function(e) {
                AliquotMessagesService.showToast(Validation.validationMsg.couldNotSave, self.timeShowMsg);
                var err = e.data;
                fillAliquotsErrors(err.CONTENT.conflicts, err.MESSAGE);
                fillTubesErrors(err.CONTENT.tubesNotFound, err.MESSAGE);
              });
          });
      } else {
        AliquotMessagesService.showToast(Validation.validationMsg.savedSuccessfully, self.timeShowMsg);
      }
    }

    function selectParticipantLocationPoint(){
      self.participantLocationPoint = self.locationPoints.filter(locationPoint =>
        locationPoint._id == self.participant.fieldCenter.locationPoint
      )
    }

    function filterLocationPointsWithoutParticipantLocation() {
      self.locationPointsWithoutParticipantLocation = self.userLocationPoints.filter( locationPoint =>
        locationPoint._id != self.participant.fieldCenter.locationPoint
      )
    }

    function filterLocationPointsWithoutSelected() {
      if(self.selectedLocationPoint.hasOwnProperty('name')){
        self.locationPointsWithouSelectedLocation = self.userLocationPoints.filter(userLocationPoint => {
          return userLocationPoint.name !== self.selectedLocationPoint.name
        })
      }
    }

    function fetchLocationPoints() {
      LocationPointRestService.getLocationPoints().then((response) => {
        self.locationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
      }).then(() => {
        selectParticipantLocationPoint();
      }).then (() => {
        fetchUserLocationPoints();
      })
    }

    function fetchUserLocationPoints() {
      LocationPointRestService.getUserLocationPoint().then(function (response) {
        self.userLocationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
      }).then(() =>{
        _setMomentType(self.momentType)
      }).then(() => {
        filterLocationPointsWithoutParticipantLocation()
        filterLocationPointsWithoutSelected()
      });
    }

    function _buildMomentTypeList(tube) {
      self.momentTypeList = AliquotTubeService.buildMomentTypeList(tube);
    }

    function _setMomentType(momentType) {
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType, self.userLocationPoints);

      _buildAvailableExamTypesArray(momentType);
      Validation.initialize(
        self.validations, self.tubeLength, self.aliquotLengths, clearAliquotError, clearTubeError, setAliquotError, setTubeError, self.selectedMomentType.exams, self.selectedMomentType.storages
      );

      completePlaceholder(self.selectedMomentType.exams);
      completePlaceholder(self.selectedMomentType.storages);

      setTimeout(function() {
        _defaultCustomValidation();
        _nextFocusNotFilled({
          index: -1,
          role: Validation.examIdentifier
        });
        _fillConvertedStoragesContainerLabels();
      }, 200);
    }

    function _buildAvailableExamTypesArray(momentType) {
      self.examTypeList = new Set();
      momentType.exams.forEach(exam => {
        self.examTypeList.add({label: exam.label, name: exam.name})
      })
    }

    function completePlaceholder(aliquots) {
      var lastPlaceholder = '';

      aliquots.forEach(function(aliquot) {
        aliquot.placeholder = lastPlaceholder;
        if (aliquot.tubeCode) lastPlaceholder = aliquot.tubeCode;
      });
    }

    function _defaultCustomValidation() {
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.storages);

      aliquotsArray.forEach(function(aliquot) {
        clearAliquotError(aliquot);
        clearTubeError(aliquot);

        $element.find('#' + aliquot.tubeId).blur();
        $element.find('#' + aliquot.aliquotId).blur();
      });
    }
    function tubeInputOnChange(aliquot) {
      var aliquotsArray = Validation.fieldIsExam(aliquot.role) ? self.selectedMomentType.exams : self.selectedMomentType.storages;
      $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', true);

      completePlaceholder(aliquotsArray);
      _callBlurTubes(aliquotsArray, aliquot);
    }

    function _callBlurTubes(aliquotsArray, currentAliquot) {
      aliquotsArray.forEach(function(aliquot) {
        if (aliquot == currentAliquot) {
          Validation.validateTubeRequired(aliquot);
        } else {
          $element.find('#' + aliquot.tubeId).blur();
        }
      });
    }

    function _nextFocus(aliquot) {
      _nextFocusNotFilled(aliquot);
    }

    function _nextFocusNotFilled(currentAliquot) {
      var newFocus = "";
      var aliquotArray = self.selectedMomentType.storages.concat(self.selectedMomentType.exams);
      var current = {
        index: currentAliquot.index + 1,
        role: currentAliquot.role,
        roleChanged: false
      };
      var aliquot;

      if (Validation.fieldIsExam(currentAliquot.role))
        aliquotArray = self.selectedMomentType.exams.concat(self.selectedMomentType.storages);

      for (var i = 0; i < aliquotArray.length; i++) {
        aliquot = aliquotArray[i];

        if (!Validation.fieldsAreEquals(current.role, aliquot.role) && current.roleChanged === false) {
          current.index = 0;
          current.role = aliquot.role;
          current.roleChanged = true;
        }

        if (current.index == aliquot.index && Validation.fieldsAreEquals(current.role, aliquot.role) && aliquot.isSaved === false && !aliquot.aliquotCode) {
          newFocus = aliquot.aliquotId;
          break;
        }
        if (current.index == aliquot.index) current.index++;
      }

      if (newFocus.length) {
        self.setFocus(newFocus);
      } else {
        if (aliquot && aliquot.aliquotId) $element.find('#' + aliquot.aliquotId).blur();
      }
    }

    function setFocus(id) {
      $element.find('#' + id).focus();
    }

    function clearAliquotError(aliquot) {
      aliquot.aliquotMessage = "";
      if($scope.formAliquot[aliquot.aliquotId]){
        $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', true);
      }
    }

    function clearTubeError(aliquot) {
      aliquot.tubeMessage = "";
      if($scope.formAliquot[aliquot.tubeId]) {
        $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', true);
      }
    }

    function _fillConvertedStoragesContainerLabels(){
      self.selectedMomentType.convertedStorages.forEach(aliquot => {
        _fillContainer(aliquot);
      })
    }

    function _fillContainer(aliquot) {
      aliquot.container = LaboratoryConfigurationService.getAliquotContainer(aliquot.aliquotCode);
      aliquot.label = LaboratoryConfigurationService.getAliquotDescriptor(aliquot.name).label;
      var label = Validation.isValidPallet(aliquot.aliquotCode) ? Validation.palletLabel : Validation.cryotubeLabel;

      aliquot.containerLabel = label + " de " + aliquot.label;
    }

    function setAliquotError(aliquot, msg) {
      aliquot.aliquotMessage = msg;
      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', false);
    }

    function setTubeError(aliquot, msg) {
      aliquot.tubeMessage = msg;
      $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', false);
    }

    function aliquotInputOnChange(aliquot) {
      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', true);
      _clearContainer(aliquot);
      if (!aliquot.processing) updateExamsProcessingDate();
      if (!aliquot.locationPoint) updateExamsLocationPoint();
      if (self.aliquotLengths.length === 1) {
        var aliquotsArray = Validation.fieldIsExam(aliquot.role) ? self.selectedMomentType.exams : self.selectedMomentType.storages;
        var runCompletePlaceholder = false;

        if (aliquot.aliquotCode && (aliquot.aliquotCode.length == self.aliquotMaxLength || aliquot.aliquotCode.length == self.tubeLength)) {
          if (aliquot.aliquotCode.length == self.tubeLength && Validation.isTube(aliquot.aliquotCode)) {
            aliquot.tubeCode = aliquot.aliquotCode;
            aliquot.aliquotCode = "";
            runCompletePlaceholder = true;
            $element.find('#' + aliquot.tubeId).blur();
          } else {
            if (aliquot.aliquotCode.length == self.aliquotMaxLength) _nextFocus(aliquot);
          }
        }
      }
    }

    function haveAliquotsChanged() {
      const hasChanged = AliquotTubeService.areFieldsChanged(self.selectedMomentType);

      return hasChanged;
    }

    function aliquotInputOnBlur(aliquot) {
      var msgAliquotUsed = Validation.validationMsg.aliquotAlreadyUsed;
      var msgAliquotInvalid = Validation.validationMsg.invalidAliquot;

      Validation.aliquotAlreadyUsed(aliquot, true);
      Validation.validateTubeRequired(aliquot);
      if (!Validation.validateIsNumber(aliquot, Validation.aliquotIdentifier)) return;
      if (!Validation.validateWave(aliquot, Validation.aliquotIdentifier)) return;
      if (!Validation.validateAliquotCenter(aliquot)) return;
      if (!Validation.validateAliquotLength(aliquot)) return;

      if (aliquot.aliquotCode) {
        if (Validation.isAliquot(aliquot.aliquotCode)) {
          _fillContainer(aliquot);
          clearAliquotError(aliquot);

          if (Validation.aliquotAlreadyUsed(aliquot, true)) {
            setAliquotError(aliquot, msgAliquotUsed);
            return;
          }
        } else {
          setAliquotError(aliquot, msgAliquotInvalid);
        }
      }
    }

    function aliquotInputOnKeyDown(event, aliquot) {
      var charCode = event.which || event.keyCode;

      if (self.aliquotLengths.length > 1) {
        if (charCode == '13') {
          //Enter pressed
          var aliquotsArray = Validation.fieldIsExam(aliquot.role) ? self.selectedMomentType.exams : self.selectedMomentType.storages;
          var runCompletePlaceholder = false;

          if (aliquot.aliquotCode.length == self.tubeLength && Validation.isTube(aliquot.aliquotCode)) {
            aliquot.tubeCode = aliquot.aliquotCode;
            aliquot.aliquotCode = "";
            runCompletePlaceholder = true;
            $element.find('#' + aliquot.tubeId).blur();
          } else {
            $element.find('#' + aliquot.aliquotId).blur();
            _nextFocus(aliquot);
          }

          if (runCompletePlaceholder) {
            completePlaceholder(aliquotsArray);
            _callBlurTubes(aliquotsArray, aliquot);
          }
        }
      }
    }

    function _clearContainer(aliquot) {
      if (aliquot.container != aliquot.containerLabel) {
        aliquot.container = "";
        aliquot.containerLabel = aliquot.label;
      }
    }

    function updateExamsProcessingDate() {
      self.selectedMomentType.exams.forEach(exam => {
        if(!exam.processing) {
          exam.processing = self.processingDate
        }
      })
      self.selectedMomentType.convertedStorages.forEach(storage => {
        if(!storage.processing) {
          storage.processing = self.processingDate
        }
      })
      self.selectedMomentType.storages.forEach(storage => {
        if(!storage.processing) {
          storage.processing = self.processingDate
        }
      })
    }

    function getConvertedHistory(aliquot) {
      var history = aliquot.getHistoryByType("CONVERTED_STORAGE");
      return history[0];
    }

    function fillAliquotsErrors(aliquotConflicts, msgErro) {
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.storages);

      aliquotConflicts.forEach(function(conflict) {
        aliquotsArray.forEach(function(aliquot) {
          if (aliquot.aliquotCode == conflict.code && !aliquot.isSaved) {
            setAliquotError(aliquot, Validation.transcribeErrorMessage(msgErro));
          }
        });
      });
    }

    function fillTubesErrors(tubeConflicts, msgErro) {
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.storages);
      tubeConflicts.forEach(function(tubeCode) {
        aliquotsArray.forEach(function(aliquot) {
          if (aliquot.tubeCode == tubeCode && !aliquot.isSaved) {
            setTubeError(aliquot, Validation.transcribeErrorMessage(msgErro));
          }
        });
      });
    }

    function updateExamsLocationPoint() {
      self.selectedMomentType.exams.forEach(exam => {
        if(!exam.locationPoint) {
          exam.locationPoint = self.selectedLocationPoint
        }
      })
      self.selectedMomentType.storages.forEach(exam => {
        if(!exam.locationPoint) {
          exam.locationPoint = self.selectedLocationPoint
        }
      })
      self.selectedMomentType.convertedStorages.forEach(exam => {
        if(!exam.locationPoint) {
          exam.locationPoint = self.selectedLocationPoint
        }
      })
    }

    function convertAliquot(aliquot) {
      var examLabels = [];
      self.examTypeList.forEach(examType => {
        examLabels.push(examType.label);
      });

      AliquotMessagesService.showConvertDialog(examLabels,$scope).then(function(result) {

        var examNameFound = "";
        self.examTypeList.forEach(exam => {
          if(exam.label === result.examName){
            examNameFound = exam.name;
          }
        });

        aliquot.convertStorage(self.participantLaboratory.getLoggedUser().email, result.observation, examNameFound);
        aliquot.code = aliquot.aliquotCode;
        aliquot.name = examNameFound;
        aliquot.role = "EXAM";

        self.participantLaboratory.convertStorageAliquot(aliquot).then(function () {
          self.selectedMomentType.removeStorage(aliquot.aliquotCode);
          _setMomentType(self.selectedMomentType);
          _fillConvertedStoragesContainerLabels()
        }).catch(function (err) {
          AliquotMessagesService.showNotConvertedDialog(err.data.CONTENT);
        });

      })
    }
  }
}());
