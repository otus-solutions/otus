(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('aliquotsViewCtrl', Controller);

  Controller.$inject = [
    'otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService',
    'otusjs.laboratory.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.business.participant.aliquot.AliquotMessagesService',
    'otusjs.laboratory.business.participant.aliquot.AliquotValidationService',
    'otusjs.otus.uxComponent.Publisher',
    '$scope',
    '$element',
    'mdcDefaultParams'
  ];

  function Controller(
    AliquotTubeService,
    LaboratoryConfigurationService,
    ParticipantLaboratoryService,
    AliquotMessagesService,
    Validation,
    Publisher,
    $scope,
    $element,
    mdcDefaultParams) {
    var self = this;

    mdcDefaultParams({ lang: 'pt-br', cancelText: 'cancelar', todayText: 'hoje', okText: 'ok' });

    const timeShowMsg = 3000;

    self.selectedLocationPoint = {}
    self.filledAliquots = []
    self.tubeLength = 9;
    self.aliquotLengths;
    self.aliquotMaxLength;
    self.validations;
    self.deleteAliquot = deleteAliquot;
    self.tubeList = self.participantLaboratory.tubes;
    self.$onInit = onInit;
    self.selectMomentType = selectMomentType;
    self.selectedMomentType = undefined;
    self.completePlaceholder = completePlaceholder;
    self.aliquotInputOnChange = aliquotInputOnChange;
    self.tubeInputOnChange = tubeInputOnChange;
    self.aliquotInputOnKeyDown = aliquotInputOnKeyDown;
    self.tubeInputOnBlur = tubeInputOnBlur;
    self.aliquotInputOnBlur = aliquotInputOnBlur;
    self.getConvertedHistory = getConvertedHistory;
    self.setFocus = setFocus;
    self.convertAliquot = convertAliquot;

    function onInit() {
      self.now = new Date();
      _buildMomentTypeList();

      var codeConfiguration = LaboratoryConfigurationService.getCodeConfiguration();

      self.aliquotLengths = LaboratoryConfigurationService.getAliquotLengths();
      self.aliquotMaxLength = Math.max.apply(null, self.aliquotLengths);

      self.validations = {
        wave: {
          value: codeConfiguration.waveNumberToken,
          position: 0
        },
        center: {
          value: ParticipantLaboratoryService.participant.fieldCenter.code,
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
      _publishLocationPoints()
      selectMomentType(self.momentTypeList[0]);
      Publisher.unsubscribe('have-aliquots-changed');
      Publisher.subscribe('have-aliquots-changed', _haveAliquotsChanged);
      Publisher.unsubscribe('save-changed-aliquots');
      Publisher.subscribe('save-changed-aliquots', _saveAliquots);
      Publisher.unsubscribe('aliquots-data');
      Publisher.subscribe('aliquots-data', _subscribeAliquots);
    }

    function _publishLocationPoints() {
      Publisher.publish('location-points', (locationPoints) => {
        self.locationPoints = locationPoints
      })
    }

    function _getFilteredLocationPoints() {
      Publisher.publish('filtered-location-points', (filteredLocationPoints) => {
        self.filteredLocationPoints = filteredLocationPoints;
        console.info(self.filteredLocationPoints)
      })
    }

    function _getSelectedLocationPoint(aliquot) {
      Publisher.publish('selected-location-point', (locationPoint) => {
        aliquot.locationPoint = locationPoint
      })
    }

    function _buildMomentTypeList() {
      self.momentTypeList = AliquotTubeService.buildMomentTypeList(self.participantLaboratory.tubes);
    }

    function _haveAliquotsChanged(callbackResult) {
      var hasChanged = AliquotTubeService.areFieldsChanged(self.selectedMomentType);

      if (callbackResult && typeof callbackResult === "function") {
        callbackResult(hasChanged);
      }

      return hasChanged;
    }

    function _saveAliquots() {
      if (AliquotTubeService.areFieldsChanged(self.selectedMomentType)) {
        if (AliquotTubeService.aliquotsWithErrors(self.selectedMomentType)) {
          AliquotMessagesService.showToast(Validation.validationMsg.checkErrorsBeforeSaving, timeShowMsg);
        } else {
          AliquotMessagesService.showSaveDialog().then(function() {
            var updatedAliquots = AliquotTubeService.getNewAliquots(self.selectedMomentType);
            var persistanceStructure = self.selectedMomentType.getPersistanceStructure(updatedAliquots);
            AliquotTubeService.updateAliquots(persistanceStructure)
              .then(function(data) {
                self.selectedMomentType.updateTubes();
                self.participantLaboratory.updateTubeList();
                _setMomentType(self.selectedMomentType);
                AliquotMessagesService.showToast(Validation.validationMsg.savedSuccessfully, timeShowMsg);
              })
              .catch(function(e) {
                AliquotMessagesService.showToast(Validation.validationMsg.couldNotSave, timeShowMsg);
                var err = e.data;
                fillAliquotsErrors(err.CONTENT.conflicts, err.MESSAGE);
                fillTubesErrors(err.CONTENT.tubesNotFound, err.MESSAGE);
              });
          });
        }
      } else {
        AliquotMessagesService.showToast(Validation.validationMsg.savedSuccessfully, timeShowMsg);
      }
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

    function selectMomentType(momentType) {
      var toChange = false;
      if (self.selectedMomentType) {
        if (momentType != self.selectedMomentType) {
          if (AliquotTubeService.areFieldsChanged(self.selectedMomentType)) {
            AliquotMessagesService.showExitDialog()
              .then(function() {
                toChange = true;
                _setMomentType(momentType);
              });
          } else {
            toChange = true;
          }
        }
      } else {
        toChange = true;
      }

      if (toChange) _setMomentType(momentType);
    }

    function _setMomentType(momentType) {
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType, self.locationPoints);

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

    function _defaultCustomValidation() {
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.storages);

      aliquotsArray.forEach(function(aliquot) {
        clearAliquotError(aliquot);
        clearTubeError(aliquot);

        $element.find('#' + aliquot.tubeId).blur();
        $element.find('#' + aliquot.aliquotId).blur();
      });
    }

    function completePlaceholder(aliquots) {
      var lastPlaceholder = '';

      aliquots.forEach(function(aliquot) {
        aliquot.placeholder = lastPlaceholder;
        if (aliquot.tubeCode) lastPlaceholder = aliquot.tubeCode;
      });
    }


    function clearAliquotError(aliquot) {
      aliquot.aliquotMessage = "";
      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', true);
    }

    function clearTubeError(aliquot) {
      aliquot.tubeMessage = "";
      $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', true);
    }

    function setAliquotError(aliquot, msg) {
      aliquot.aliquotMessage = msg;
      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', false);
    }

    function setTubeError(aliquot, msg) {
      aliquot.tubeMessage = msg;
      $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', false);
    }


    function _fillContainer(aliquot) {
      aliquot.container = LaboratoryConfigurationService.getAliquotContainer(aliquot.aliquotCode);
      aliquot.label = LaboratoryConfigurationService.getAliquotDescriptor(aliquot.name).label;
      var label = Validation.isValidPallet(aliquot.aliquotCode) ? Validation.palletLabel : Validation.cryotubeLabel;

      aliquot.containerLabel = label + " de " + aliquot.label;
    }

    function _clearContainer(aliquot) {
      if (aliquot.container != aliquot.containerLabel) {
        aliquot.container = "";
        aliquot.containerLabel = aliquot.label;
      }
    }

    function addAliquotsFilled(aliquot) {
      if(self.filledAliquots.indexOf(aliquot) === -1) {
        self.filledAliquots.push(aliquot)
      }
    }

    function _subscribeAliquots(callbackResult) {
      if (callbackResult && typeof callbackResult === "function") {
        callbackResult(self.filledAliquots);
      }

      return self.filledAliquots;
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
          addAliquotsFilled(aliquot)
          if (Validation.aliquotAlreadyUsed(aliquot, true)) {
            setAliquotError(aliquot, msgAliquotUsed);
            return;
          }
        } else {
          setAliquotError(aliquot, msgAliquotInvalid);
        }
      }
    }

    function _getDateTimeProcessing(aliquot) {
      Publisher.publish('datetime-processing', function(result) {
        aliquot.processing = result.date;
      });
    }

    function tubeInputOnBlur(aliquot) {
      var msgTubeNotCollected = Validation.validationMsg.uncollectedTube;
      var msgTubeNotExists = Validation.validationMsg.tubeNotFound;

      if (!Validation.validateIsNumber(aliquot, Validation.tubeIdentifier)) return;
      if (!Validation.validateWave(aliquot, Validation.tubeIdentifier)) return;
      if (!Validation.validateTubeRequired(aliquot)) return;


      if (aliquot.tubeCode) {
        var filterTube = self.selectedMomentType.tubeList.filter(function(tube) {
          return tube.code == aliquot.tubeCode;
        });

        if (filterTube.length > 0) {
          clearTubeError(aliquot);
          //Tube find
          if (!filterTube[0].tubeCollectionData.isCollected) {
            //Tube NOT collected
            setTubeError(aliquot, msgTubeNotCollected);
          }
        } else {
          //Tube NOT exist in this Moment Type
          setTubeError(aliquot, msgTubeNotExists);
        }
      }
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

    function aliquotInputOnChange(aliquot) {
      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', true);
      _clearContainer(aliquot);
      _getDateTimeProcessing(aliquot);
      if(!self.filteredLocationPoints) {
        _getFilteredLocationPoints();
      }
      _getSelectedLocationPoint(aliquot);
      self.oldSelectedLocationPoints = [aliquot.locationPoint]

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

      if (runCompletePlaceholder) {
        completePlaceholder(aliquotsArray);
        _callBlurTubes(aliquotsArray, aliquot);
      }
    }

    function tubeInputOnChange(aliquot) {
      var aliquotsArray = Validation.fieldIsExam(aliquot.role) ? self.selectedMomentType.exams : self.selectedMomentType.storages;

      $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', true);

      completePlaceholder(aliquotsArray);
      _callBlurTubes(aliquotsArray, aliquot);
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

    function deleteAliquot(aliquot) {
      AliquotMessagesService.showDeleteDialog().then(function() {
        return AliquotTubeService.deleteAliquot(aliquot.aliquotCode).then(function () {
          self.selectedMomentType.removeAliquot(aliquot);
        }).catch(function (err) {
           AliquotMessagesService.showNotRemovedDialog(err.data.CONTENT);
        });
      }).catch(function () {});
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

        aliquot.convertStorage(ParticipantLaboratoryService.getLoggedUser().email, result.observation, examNameFound);
        aliquot.code = aliquot.aliquotCode;
        aliquot.name = examNameFound;
        aliquot.role = "EXAM";
        aliquot.locationPoint = aliquot.locationPoint._id

        ParticipantLaboratoryService.convertStorageAliquot(aliquot).then(function () {
          self.selectedMomentType.removeStorage(aliquot.aliquotCode);
          _setMomentType(self.selectedMomentType);
          // _fillConvertedStoragesContainerLabels()
        }).catch(function (err) {
          console.info(err)
        });

      })
    }

    function getConvertedHistory(aliquot) {
      var history = aliquot.getHistoryByType("CONVERTED_STORAGE");
      return history[0];
    }

    function _fillConvertedStoragesContainerLabels(){
      self.selectedMomentType.convertedStorages.forEach(aliquot => {
        _fillContainer(aliquot);
      })
    }
  }
}());