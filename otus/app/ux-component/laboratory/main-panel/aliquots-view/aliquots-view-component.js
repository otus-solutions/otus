(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('aliquotsView', {
      templateUrl: 'app/ux-component/laboratory/main-panel/aliquots-view/aliquots-view-template.html',
      bindings: {
        participantLaboratory: '=',
        callbackFunctions: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService',
    'otusjs.laboratory.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.business.participant.aliquot.AliquotMessagesService',
    'otusjs.laboratory.business.participant.aliquot.AliquotValidationService',
    '$scope',
    '$element'
  ];

  function Controller(AliquotTubeService, LaboratoryConfigurationService, AliquotMessagesService, AliquotValidationService, $scope, $element) {
    var self = this;
    
    const msgErrors = [
      {
        msgServer: "Data Validation Fail: Tube codes not found.",
        msgShow: "Este código não pertence ao participante."
      },
      {
        msgServer: "Data Validation Fail: There are repeated aliquots on Database.",
        msgShow: "Este código já foi utilizado em outra Aliquotagem."
      },
      {
        msgServer: "Data Validation Fail: There are repeated aliquots on DTO.",
        msgShow: "O código da aliquota está duplicado."
      },
      {
        msgServer: "Data Validation Fail: There are repeated aliquots on Participant.",
        msgShow: "Esta aliquota está duplicada."
      }
    ];
    const validationMsg = {
      checkErrorsBeforeSaving: "Verifique os erros antes de salvar.",
      savedSuccessfully: "Salvo com sucesso!",
      couldNotSave: "Não foi possível salvar os dados.",
      errorSavingField: "Erro ao salvar esse campo.",
      aliquotAlreadyUsed: "Código de alíquota já utilizado.",
      invalidCode: "Não é um código válido.",
      tubeFromAnotherWave: "Tubo não pertence à Onda atual.",
      aliquotFromAnotherWave: "Aliquota não pertence à Onda atual.",
      requiredTube: "O código do Tubo é obrigatório.",
      aliquotFromAnotherCenter: "Não pertence ao mesmo Centro do Tubo.",
      invalidAliquot: "Não é uma Aliquota válida.",
      uncollectedTube: "Tubo não coletado, não pode ser Aliquotado.",
      tubeNotFound: "Este tubo não existe ou não pertence a este Tipo/Momento.",
      serverError: "Erro do Servidor:"
    };
    const tubeIdentifier = "TUBE";
    const aliquotIdentifier = "ALIQUOT";
    const examIdentifier = "EXAM";
    const palletLabel = "Palheta";
    const cryotubeLabel = "Criotubo";
    const timeShowMsg = 2000;

    self.tubeLength = 9;
    self.aliquotLength = 9;

    self.validations = {
      wave:{
        value: "",
        position: 0
      },
      tube:{
        value: "",
        position: 2
      },
      cryotube:{
        value: "",
        position: 2
      },
      pallet:{
        value: "",
        position: 2
      }
    };
    
    
    self.tubeList = self.participantLaboratory.tubes;

    self.$onInit = onInit;
    self.selecMomentType = selecMomentType;
    self.selectedMomentType = undefined;
    self.completePlaceholder = completePlaceholder;
    self.inputOnChangeAliquot = inputOnChangeAliquot;
    self.inputOnChangeTube = inputOnChangeTube;
    self.validateTube = validateTube;
    self.validateAliquot = validateAliquot;
    self.setFocus = setFocus;

    function onInit() {
      _buildMomentTypeList();
      selecMomentType(self.momentTypeList[0]);
      self.callbackFunctions.cancelAliquots = _cancelAliquots;
      self.callbackFunctions.saveAliquots = _saveAliquots;
      
      var codeConfiguration = LaboratoryConfigurationService.getCodeConfiguration();

      self.aliquotLength = LaboratoryConfigurationService.getAliquotLength();

      self.validations.wave.value = codeConfiguration.waveNumberToken;
      self.validations.tube.value = codeConfiguration.tubeToken;
      self.validations.cryotube.value = codeConfiguration.cryotubeToken;
      self.validations.pallet.value = codeConfiguration.palletToken;
    }

    function _isValidCode(validation, code){
      var isValid = false;
      
      if(code.toString().length >= validation.position + 1) {
        isValid =  (code.toString().substr(validation.position, 1) == validation.value);
      }
      
      return isValid;
    }

    function _isValidWave(code){
      return _isValidCode(self.validations.wave,code);
    }
    
    function _isValidTube(code){
      return _isValidCode(self.validations.tube,code);
    }
    
    function _isValidCryotube(code){
      return _isValidCode(self.validations.cryotube,code);
    }

    function _isValidPallet(code){
      return _isValidCode(self.validations.pallet,code);
    }

    function _fieldsAreEquals(field, otherField){
      var ret = false;
      
      if(field && otherField) ret = (field.toUpperCase() == otherField.toUpperCase());

      return ret;
    }
    
    function _fieldIsTube(field){
      return _fieldsAreEquals(field,tubeIdentifier);
    }

    function _fieldIsExam(field){
      return _fieldsAreEquals(field, examIdentifier);
    }

    function _buildMomentTypeList() {
      self.momentTypeList = AliquotTubeService.buildMomentTypeList(self.participantLaboratory.tubes);
    }

    function _cancelAliquots() {
      return AliquotTubeService.fieldsChanged(self.selectedMomentType);
    }
    
    function _saveAliquots() {
      if (AliquotTubeService.fieldsChanged(self.selectedMomentType)) {
        if (AliquotTubeService.aliquotsWithErrors(self.selectedMomentType)) {
          AliquotMessagesService.showToast(validationMsg.checkErrorsBeforeSaving, timeShowMsg);
        } else {
          AliquotMessagesService.showSaveDialog().then(function() {
            var updatedAliquots = AliquotTubeService.getNewAliquots(self.selectedMomentType);
            var persistanceStructure = self.selectedMomentType.getPersistanceStructure(updatedAliquots);
            AliquotTubeService.updateAliquots(persistanceStructure)
              .then(function(data) {
                self.selectedMomentType.updateTubes();
                self.participantLaboratory.updateTubeList();
                AliquotMessagesService.showToast(validationMsg.savedSuccessfully, timeShowMsg);
                 _setMomentType(self.selectedMomentType);
              })
              .catch(function(e) {
                AliquotMessagesService.showToast(validationMsg.couldNotSave, timeShowMsg);
                var err = e.data;
                fillAliquotsErrors(err.CONTENT.conflicts, err.MESSAGE);
                fillTubesErrors(err.CONTENT.tubesNotFound, err.MESSAGE);
              });
          });
        }
      } else {
        AliquotMessagesService.showToast(validationMsg.savedSuccessfully, timeShowMsg);
      }

    }

    function transcribeMessage(msg) {
      var newMessage = "";

      msgErrors.forEach(function(currentMsg) {
        if(currentMsg.msgServer === msg) newMessage = currentMsg.msgShow;
      });

      if(newMessage === ""){
        newMessage = validationMsg.errorSavingField;
        if(msg) console.log(validationMsg.serverError,msg);
      }

      return newMessage;
    }

    function fillAliquotsErrors(aliquotConflicts, msgErro){
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);

      aliquotConflicts.forEach(function(conflict) {
        aliquotsArray.forEach(function(aliquot) {
          if(aliquot.aliquotCode == conflict.code && !aliquot.isSaved){
            setAliquotError(aliquot,transcribeMessage(msgErro));
          }
        });
      });
    }

    function fillTubesErrors(tubeConflicts, msgErro){
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);

      tubeConflicts.forEach(function(tubeCode) {
        aliquotsArray.forEach(function(aliquot) {
          if(aliquot.tubeCode == tubeCode && !aliquot.isSaved){
            setTubeError(aliquot,transcribeMessage(msgErro));
          }
        });
      });
    }

    function selecMomentType(momentType) {
      var toChange = false;

      if (self.selectedMomentType) {
        if (momentType != self.selectedMomentType) {
          if (AliquotTubeService.fieldsChanged(self.selectedMomentType)) {
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
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType);

      completePlaceholder(self.selectedMomentType.exams);
      completePlaceholder(self.selectedMomentType.stores);

      setTimeout(function() {
        _defaultCustomValidation();
        _nextFocusNotFilled({
          index: -1,
          role: examIdentifier
        });
      }, 200);
    }

    function _defaultCustomValidation() {
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);

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

    function _addAliquotInRepeatedAliquots(aliquot) {
      var newArray = self.selectedMomentType.repeatedAliquots.filter(function(currentAliquot) {
        return aliquot == currentAliquot;
      });

      if (newArray.length) {
        return false;
      } else {
        self.selectedMomentType.repeatedAliquots.push(aliquot);
        return true;
      }
    }

    function _removeRepeatedAliquots(aliquot) {
      self.selectedMomentType.repeatedAliquots = self.selectedMomentType.repeatedAliquots.filter(function(currentAliquot) {
        return JSON.stringify(currentAliquot) != JSON.stringify(aliquot);
      });
    }

    function _aliquotAlreadyUsed(aliquot, validateRepeatedList) {
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);
      var alreadyUsed = false;
      var msgError = validationMsg.aliquotAlreadyUsed;

      for (var i = 0; i < aliquotsArray.length; i++) {
        var currentAliquot = aliquotsArray[i];

        if (currentAliquot.aliquotCode && currentAliquot != aliquot && currentAliquot.aliquotCode == aliquot.aliquotCode) {
          alreadyUsed = true;
          if (validateRepeatedList) {
            _addAliquotInRepeatedAliquots(currentAliquot);
          }
          //break;
        }
      }

      if (alreadyUsed) {
        if (validateRepeatedList) _addAliquotInRepeatedAliquots(aliquot);
      } else {
        if (validateRepeatedList) _removeRepeatedAliquots(aliquot);
      }

      if (validateRepeatedList) {
        self.selectedMomentType.repeatedAliquots.forEach(function(currentAliquot) {
          if (_aliquotAlreadyUsed(currentAliquot)) {
            if (currentAliquot.aliquotMessage === "") setAliquotError(currentAliquot, msgError);
          } else {
            if (currentAliquot.aliquotMessage == msgError) clearAliquotError(currentAliquot);
          }
        });
      }

      return alreadyUsed;
    }

    function _validateIsNumber(aliquot, tubeOrAliquot) {
      var isTube = _fieldIsTube(tubeOrAliquot);
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var isNumber = !isNaN(value);
      var msgError = validationMsg.invalidCode;

      if (isNumber) {
        if (isTube) {
          clearTubeError(aliquot);
        } else {
          clearAliquotError(aliquot);
        }
      } else {
        if (isTube) {
          setTubeError(aliquot, msgError);
        } else {
          setAliquotError(aliquot, msgError);
        }
      }

      return isNumber;
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

    function _validateWave(aliquot, tubeOrAliquot) {
      var isTube = _fieldIsTube(tubeOrAliquot);
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var msgTube = validationMsg.tubeFromAnotherWave;
      var msgAliquot = validationMsg.aliquotFromAnotherWave;

      var isValid = true;

      if (value.length > 0) isValid = _isValidWave(value);

      if (isValid) {
        if (isTube) {
          if (msgTube == aliquot.tubeMessage) {
            clearTubeError(aliquot);
          }
        } else {
          if (msgAliquot == aliquot.aliquotMessage) {
            clearAliquotError(aliquot);
          }
        }
      } else {
        if (isTube) {
          setTubeError(aliquot, msgTube);
        } else {
          setAliquotError(aliquot, msgAliquot);
        }
      }

      return isValid;
    }


    function _validateTubeRequired(aliquot) {
      var isValid = true;
      var msg = validationMsg.requiredTube;
      
      if (aliquot.aliquotCode) {
        if (aliquot.tubeCode.length === 0 && aliquot.placeholder.length === 0) isValid = false;
      }

      if (isValid) {
        if (aliquot.tubeMessage == msg) {
          clearTubeError(aliquot);
        }
      } else {
        setTubeError(aliquot, msg);
      }

      return isValid;
    }

    function _isTube(value) {
      return (value.length && value.length == self.tubeLength && _isValidTube(value));
    }

    function _isAliquot(value, nameField) {
      return (value.length === 0 || (value.length == self.aliquotLength && (_isValidCryotube(value) || _isValidPallet(value))));
    }

    function _fillContainer(aliquot) {
      aliquot.container = LaboratoryConfigurationService.getAliquotContainer(aliquot.aliquotCode);
      var label = _isValidPallet(aliquot.aliquotCode) ? palletLabel : cryotubeLabel;
      
      aliquot.containerLabel = label + " de " + aliquot.label;
    }

    function _clearContainer(aliquot) {
      if (aliquot.container != aliquot.containerLabel) {
        aliquot.container = "";
        aliquot.containerLabel = aliquot.label;
      }
    }

    function _validateCenterAliquot(aliquot) {
      var isValid = true;
      var tubeCode = aliquot.tubeCode ? aliquot.tubeCode : aliquot.placeholder;
      var msg = validationMsg.aliquotFromAnotherCenter;

      if(aliquot.aliquotCode) {
        if((aliquot.tubeCode.length >= self.tubeLength || aliquot.placeholder.length >= self.tubeLength)
            && tubeCode.toString().substr(1, 1) != aliquot.aliquotCode.toString().substr(1, 1)) {
              isValid = false;
          }
      }

      if (isValid) {
        if (aliquot.aliquotMessage == msg) {
          clearAliquotError(aliquot);
        }
      } else {
        setAliquotError(aliquot, msg);
      }

      return isValid;
    }

    function validateAliquot(aliquot) {
      var msgAliquotUsed = validationMsg.aliquotAlreadyUsed;
      var msgAliquotInvalid = validationMsg.invalidAliquot;

      _aliquotAlreadyUsed(aliquot, true);
      _validateTubeRequired(aliquot);
      if (!_validateIsNumber(aliquot, aliquotIdentifier)) return;
      if (!_validateWave(aliquot, aliquotIdentifier)) return;
      if (!_validateCenterAliquot(aliquot)) return;

      if (aliquot.aliquotCode) {
        if (_isAliquot(aliquot.aliquotCode)) {
          _fillContainer(aliquot);

          clearAliquotError(aliquot);

          if (_aliquotAlreadyUsed(aliquot, true)) {
            setAliquotError(aliquot, msgAliquotUsed);
            return;
          }
        } else {
          setAliquotError(aliquot, msgAliquotInvalid);
        }
      }
    }

    function validateTube(aliquot) {
      var msgTubeNotCollected = validationMsg.uncollectedTube;
      var msgTubeNotExists = validationMsg.tubeNotFound;

      _validateCenterAliquot(aliquot);
      if (!_validateIsNumber(aliquot, tubeIdentifier)) return;
      if (!_validateWave(aliquot, tubeIdentifier)) return;
      if (!_validateTubeRequired(aliquot)) return;


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
          _validateTubeRequired(aliquot);
        } else {
          $element.find('#' + aliquot.tubeId).blur();
        }
      });
    }


    function inputOnChangeAliquot(aliquot) {
      var aliquotsArray = _fieldIsExam(aliquot.role) ? self.selectedMomentType.exams : self.selectedMomentType.stores;
      var runCompletePlaceholder = false;

      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', true);
      _clearContainer(aliquot);
      if (aliquot.aliquotCode && (aliquot.aliquotCode.length == self.aliquotLength || aliquot.aliquotCode.length == self.tubeLength)) {
        if (aliquot.aliquotCode.length == self.tubeLength && _isTube(aliquot.aliquotCode)) {
          aliquot.tubeCode = aliquot.aliquotCode;
          aliquot.aliquotCode = "";
          runCompletePlaceholder = true;
          $element.find('#' + aliquot.tubeId).blur();
        } else {
          if(aliquot.aliquotCode.length == self.aliquotLength) _nextFocus(aliquot);
        }
      }

      if (runCompletePlaceholder) {
        completePlaceholder(aliquotsArray);
        _callBlurTubes(aliquotsArray, aliquot);
      }
    }


    function inputOnChangeTube(aliquot, tubeOrAliquot) {
      var aliquotsArray = _fieldIsExam(aliquot.role) ? self.selectedMomentType.exams : self.selectedMomentType.stores;
      var runCompletePlaceholder = false;

      runCompletePlaceholder = true;
      $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation', true);

      completePlaceholder(aliquotsArray);
      _callBlurTubes(aliquotsArray, aliquot);
    }

    function _nextFocus(aliquot) {
      _nextFocusNotFilled(aliquot);
    }

    function _nextFocusNotFilled(currentAliquot) {
      var newFocus = "";
      var aliquotArray = self.selectedMomentType.stores.concat(self.selectedMomentType.exams);
      var current = {
        index: currentAliquot.index + 1,
        role: currentAliquot.role,
        roleChanged: false
      };
      var aliquot;

      if (_fieldIsExam(currentAliquot.role))
        aliquotArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);

      for (var i = 0; i < aliquotArray.length; i++) {
        aliquot = aliquotArray[i];

        if (!_fieldsAreEquals(current.role, aliquot.role) && current.roleChanged === false) {
          current.index = 0;
          current.role = aliquot.role;
          current.roleChanged = true;
        }

        if (current.index == aliquot.index && _fieldsAreEquals(current.role, aliquot.role) && aliquot.isSaved === false && !aliquot.aliquotCode) {
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

  }
}());
