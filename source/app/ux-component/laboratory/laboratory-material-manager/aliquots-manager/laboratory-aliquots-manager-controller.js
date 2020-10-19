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
    'otusjs.model.locationPoint.LocationPointFactory'
  ];

  function Controller(
                      $scope,
                      $element,
                      AliquotTubeService,
                      LaboratoryConfigurationService,
                      Validation,
                      LocationPointRestService,
                      LocationPointFactory) {
    var self = this;

    self.$onInit = onInit

    self.now = new Date()
    self.processingDate = new Date()
    self.selectedLocationPoint = {}

    self.aliquotInputOnChange = aliquotInputOnChange;
    self.aliquotInputOnBlur = aliquotInputOnBlur;
    self.updateExamsProcessingDate = updateExamsProcessingDate;
    self.updateExamsLocationPoint = updateExamsLocationPoint;


    function onInit() {
      _buildMomentTypeList(self.tube)

      const codeConfiguration = LaboratoryConfigurationService.getCodeConfiguration();

      self.aliquotLengths = LaboratoryConfigurationService.getAliquotLengths();
      self.aliquotMaxLength = Math.max.apply(null, self.aliquotLengths);


      const participant = self.participantManager.getParticipant(
        self.participantLaboratory.recruitmentNumber.toString()
      )

      self.validations = {
        wave: {
          value: codeConfiguration.waveNumberToken,
          position: 0
        },
        center: {
          value: participant.fieldCenter.code,
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
      _setMomentType(self.momentTypeList[0])
      fetchLocationPoints()
    }

    function fetchLocationPoints() {
      LocationPointRestService.getUserLocationPoint().then(function (response) {
        self.userLocationPoints = LocationPointFactory.fromArray(response.data.transportLocationPoints);
      });
    }

    function _buildMomentTypeList(tube) {
      self.momentTypeList = AliquotTubeService.buildMomentTypeList([tube]);
    }

    function _setMomentType(momentType) {
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType);
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

    function clearAliquotError(aliquot) {
      aliquot.aliquotMessage = "";
      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', true);
    }

    function clearTubeError(aliquot) {
      aliquot.tubeMessage = "";
      $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', true);
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
    }
    function updateExamsLocationPoint() {
      self.selectedMomentType.exams.forEach(exam => {
        if(!exam.locationPoint) {
          exam.locationPoint = self.selectedLocationPoint
        }
      })
    }
  }
}());
