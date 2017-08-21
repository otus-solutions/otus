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
          AliquotMessagesService.showToast('Verifique os erros antes de salvar.', 2000);
        } else {
          AliquotMessagesService.showSaveDialog().then(function() {
            var updatedAliquots = AliquotTubeService.getNewAliquots(self.selectedMomentType);
            var persistanceStructure = self.selectedMomentType.getPersistanceStructure(updatedAliquots);
            AliquotTubeService.updateAliquots(persistanceStructure)
              .then(function(data) {
                self.selectedMomentType.updateTubes();
                self.participantLaboratory.updateTubeList();
                AliquotMessagesService.showToast('Salvo com sucesso!', 2000);
                 _setMomentType(self.selectedMomentType);
              })
              .catch(function(e) {
                AliquotMessagesService.showToast('Não foi possível salvar os dados.', 2000);
                var err = e.data;
                fillAliquotsErrors(err.CONTENT.conflicts, err.MESSAGE);
                fillTubesErrors(err.CONTENT.tubesNotFound, err.MESSAGE);
              });
          });
        }
      } else {
        AliquotMessagesService.showToast('Salvo com sucesso!', 2000);
      }

    }

    function transcribeMessage(msg) {
      var newMessage;

      switch (msg) {
        case "Data Validation Fail: Tube codes not found.": //O código do tube não foi encontrado na lista de tubos do participante, ou seja, código não existe
          newMessage = "Este código não pertence ao participante.";
          break;

        case "Data Validation Fail: There are repeated aliquots on Database.": //Código da aliquot já existe na base de dados
          newMessage = "Este código já foi utilizado em outra Aliquotagem.";
          break;

        case "Data Validation Fail: There are repeated aliquots on DTO.": //Código da aliquot duplicada na lista que deveria ser atualizada
          newMessage = "O código da aliquota está duplicado.";
          break;

        case "Data Validation Fail: There are repeated aliquots on Participant.": //Esta aliquota está duplicada.
          newMessage = "Esta aliquota está duplicada.";
          break;

        default:
          newMessage = "Erro ao salvar esse campo.";
          if(msg) console.log("Erro do servidor: " + msg);
          break;
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
          role: 'EXAM'
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
      var msgError = "Código de alíquota já utilizado.";

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
      var isTube = (tubeOrAliquot.toUpperCase() == "TUBE");
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var isNumber = !isNaN(value);
      var msgError = "Não é um código válido.";

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
      var isTube = (tubeOrAliquot.toUpperCase() == "TUBE");
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var msgTube = "Tubo não pertence à Onda atual.";
      var msgAliquot = "Aliquota não pertence à Onda atual.";

      var isValid = true;

      if (value.length > 0) isValid = (value.toString().substr(0, 1) == '3');

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
      var msg = "O código do Tubo é obrigatório.";
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
      return (value.length && value.length == 9 && value.toString().substr(2, 1) == '1');
    }

    function _isAliquot(value, nameField) {
      return (value.length === 0 || (value.length == 9 && (value.toString().substr(2, 1) == '2' || value.toString().substr(2, 1) == '3')));
    }

    function _fillContainer(aliquot) {
      aliquot.container = LaboratoryConfigurationService.getAliquotContainer(aliquot.aliquotCode);
      var label = aliquot.container.toUpperCase() == "PALLET" ? "Palheta" : "Criotubo";

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
      var msg = "Não pertence ao mesmo Centro do Tubo.";

      if(aliquot.aliquotCode) {
        if((aliquot.tubeCode.length >= 9 || aliquot.placeholder.length >= 9)
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
      var msgAliquotUsed = "Código de alíquota já utilizado.";
      var msgAliquotInvalid = "Não é uma Aliquota válida.";

      _aliquotAlreadyUsed(aliquot, true);
      _validateTubeRequired(aliquot);
      if (!_validateIsNumber(aliquot, "ALIQUOT")) return;
      if (!_validateWave(aliquot, "ALIQUOT")) return;
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
      var msgTubeNotCollected = "Tubo não coletado, não pode ser Aliquotado.";
      var msgTubeNotExists = "Este tubo não existe ou não pertence a este Tipo/Momento.";

      _validateCenterAliquot(aliquot);
      if (!_validateIsNumber(aliquot, "TUBE")) return;
      if (!_validateWave(aliquot, "TUBE")) return;
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
      var aliquotsArray = aliquot.role.toUpperCase() == "EXAM" ? self.selectedMomentType.exams : self.selectedMomentType.stores;
      var runCompletePlaceholder = false;

      $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation', true);
      _clearContainer(aliquot);
      if (aliquot.aliquotCode && aliquot.aliquotCode.length == 9) {
        if (_isTube(aliquot.aliquotCode)) {
          aliquot.tubeCode = aliquot.aliquotCode;
          aliquot.aliquotCode = "";
          runCompletePlaceholder = true;
          $element.find('#' + aliquot.tubeId).blur();
        } else {
          _nextFocus(aliquot);
        }
      }

      if (runCompletePlaceholder) {
        completePlaceholder(aliquotsArray);
        _callBlurTubes(aliquotsArray, aliquot);
      }
    }


    function inputOnChangeTube(aliquot, tubeOrAliquot) {
      var aliquotsArray = aliquot.role.toUpperCase() == "EXAM" ? self.selectedMomentType.exams : self.selectedMomentType.stores;
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

      if (currentAliquot.role.toUpperCase() == "EXAM")
        aliquotArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);

      for (var i = 0; i < aliquotArray.length; i++) {
        aliquot = aliquotArray[i];

        if (current.role.toUpperCase() != aliquot.role.toUpperCase() && current.roleChanged === false) {
          current.index = 0;
          current.role = aliquot.role;
          current.roleChanged = true;
        }

        if (current.index == aliquot.index && current.role.toUpperCase() == aliquot.role.toUpperCase() && aliquot.isSaved === false && !aliquot.aliquotCode) {
          newFocus = aliquot.aliquotId;
          break;
        }
        if (current.index == aliquot.index) current.index++;
      }

      if (newFocus.length) {
        self.setFocus(newFocus);
      } else {
        if (aliquot.aliquotId) $element.find('#' + aliquot.aliquotId).blur();
      }
    }

    function setFocus(id) {
      $element.find('#' + id).focus();
    }

  }
}());
