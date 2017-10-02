(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant.aliquot')
    .service('otusjs.laboratory.business.participant.aliquot.AliquotValidationService', Service);

  Service.$inject = [

  ];

  function Service() {
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

    self.validationMsg = {
      checkErrorsBeforeSaving: "Verifique os erros antes de salvar.",
      savedSuccessfully: "Salvo com sucesso!",
      couldNotSave: "Não foi possível salvar os dados.",
      errorSavingField: "Erro ao salvar esse campo.",
      aliquotAlreadyUsed: "Código de alíquota já utilizado.",
      invalidCode: "Não é um código válido.",
      tubeFromAnotherWave: "Tubo não pertence à Onda atual.",
      aliquotFromAnotherWave: "Aliquota não pertence à Onda atual.",
      requiredTube: "O código do Tubo é obrigatório.",
      aliquotFromAnotherCenter: "Não pertence ao mesmo Centro do Participante.",
      invalidAliquotLength: "Tamanho inválido. A aliquota deve possuir * digitos." ,
      invalidAliquot: "Não é uma Aliquota válida.",
      uncollectedTube: "Tubo não coletado, não pode ser Aliquotado.",
      tubeNotFound: "Este tubo não existe ou não pertence a este Tipo/Momento.",
      serverError: "Erro do Servidor:"
    };

    self.tubeIdentifier = "TUBE";
    self.aliquotIdentifier = "ALIQUOT";
    self.examIdentifier = "EXAM";
    self.palletLabel = "Palheta";
    self.cryotubeLabel = "Criotubo";

    self.tubeLength;
    self.aliquotLengths;
    self.aliquotMaxLength;
    self.validations = {};
    self.exams = [];
    self.stores = [];
    self.repeatedAliquots = [];
    self.clearAliquotError;
    self.clearTubeError;
    self.setAliquotError;
    self.setTubeError;

    self.initialize = initialize;
    self.isValidWave = isValidWave;
    self.isValidCenter = isValidCenter;
    self.isValidTube = isValidTube;
    self.isValidCryotube = isValidCryotube;
    self.isValidPallet = isValidPallet;
    self.isTube = isTube;
    self.isAliquot = isAliquot;
    self.fieldsAreEquals = fieldsAreEquals;
    self.fieldIsTube = fieldIsTube;
    self.fieldIsExam = fieldIsExam;
    self.aliquotAlreadyUsed = aliquotAlreadyUsed;
    self.validateIsNumber = validateIsNumber;
    self.validateWave = validateWave;
    self.validateTubeRequired = validateTubeRequired;
    self.validateAliquotCenter = validateAliquotCenter;
    self.validateAliquotLength = validateAliquotLength;
    self.isValidAliquotLength = isValidAliquotLength;
    self.transcribeErrorMessage = transcribeErrorMessage;
    

    function initialize(validations
                        , tubeLength
                        , aliquotLengths
                        , clearAliquotError
                        , clearTubeError
                        , setAliquotError
                        , setTubeError
                        , exams
                        , stores
                       ) {
                         
      self.validations = validations;
      self.tubeLength = tubeLength;
      self.aliquotLengths = aliquotLengths;
      self.aliquotMaxLength = Math.max.apply(null,self.aliquotLengths);
      self.validationMsg.invalidAliquotLength = _fillMsgInvalidAliquotLength(self.aliquotLengths);
      
      self.clearAliquotError = clearAliquotError;
      self.clearTubeError = clearTubeError;
      self.setAliquotError = setAliquotError;
      self.setTubeError = setTubeError;

      self.exams = exams;
      self.stores = stores;

      self.repeatedAliquots = [];

    }

    function _fillMsgInvalidAliquotLength(lengthArray){
      return "Tamanho inválido. A aliquota deve possuir " + _convertArrayToStringInclusesLastPosition(lengthArray,' ou ') + " digitos.";
    }

    function _convertArrayToStringInclusesLastPosition(array, includes){
      var text = "";
      array.forEach(function(value, index) {
        if(index == 0){
          text = text + value;
        } else {
          if(index == array.length - 1){
            text = text + includes + value;
          } else {
            text = text + ', ' + value;
          }
        }
      }, this);
      
      return text;
    }

    function _isValidCode(validation, code){
      var isValid = false;
      
      if(code.toString().length >= validation.position + 1) {
        isValid =  (code.toString().substr(validation.position, 1) == validation.value);
      }
      
      return isValid;
    }

    function isValidWave(code){
      return _isValidCode(self.validations.wave,code);
    }
    
    function isValidCenter(code){
      return _isValidCode(self.validations.center,code);
    }

    function isValidTube(code){
      return _isValidCode(self.validations.tube,code);
    }
    
    function isValidCryotube(code){
      return _isValidCode(self.validations.cryotube,code);
    }

    function isValidPallet(code){
      return _isValidCode(self.validations.pallet,code);
    }

    function isTube(value) {
      return (value.length && value.length == self.tubeLength && self.isValidTube(value));
    }

    function isAliquot(value, nameField) {
      return (value.length === 0 || (self.isValidCryotube(value) || self.isValidPallet(value)));
    }

    function fieldsAreEquals(field, otherField){
      var ret = false;
      
      if(field && otherField) ret = (field.toUpperCase() == otherField.toUpperCase());

      return ret;
    }
    
    function fieldIsTube(field){
      return self.fieldsAreEquals(field, self.tubeIdentifier);
    }

    function fieldIsExam(field){
      return self.fieldsAreEquals(field, self.examIdentifier);
    }

    function _addAliquotInRepeatedAliquots(aliquot) {
      var newArray = self.repeatedAliquots.filter(function(currentAliquot) {
        return aliquot == currentAliquot;
      });

      if (newArray.length) {
        return false;
      } else {
        self.repeatedAliquots.push(aliquot);
        return true;
      }
    }

    function _removeRepeatedAliquots(aliquot) {
      self.repeatedAliquots = self.repeatedAliquots.filter(function(currentAliquot) {
        return JSON.stringify(currentAliquot) != JSON.stringify(aliquot);
      });
    }

    function aliquotAlreadyUsed(aliquot, validateRepeatedList) {
      var aliquotsArray = self.exams.concat(self.stores);
      var alreadyUsed = false;
      var msgError = self.validationMsg.aliquotAlreadyUsed;

      for(var i = 0; i < aliquotsArray.length; i++){
        var currentAliquot = aliquotsArray[i];

        if(currentAliquot.aliquotCode && currentAliquot != aliquot && currentAliquot.aliquotCode == aliquot.aliquotCode) {
          alreadyUsed = true;
          if(validateRepeatedList){
            _addAliquotInRepeatedAliquots(currentAliquot);
          }
        }
      }
      
      if(validateRepeatedList){
        if(alreadyUsed){
          _addAliquotInRepeatedAliquots(aliquot);
        } else {
          _removeRepeatedAliquots(aliquot);
        }

        self.repeatedAliquots.forEach(function(currentAliquot) {
          if(self.aliquotAlreadyUsed(currentAliquot)){
            if(currentAliquot.aliquotMessage === "") self.setAliquotError(currentAliquot, msgError);
          } else {
            if(currentAliquot.aliquotMessage == msgError) self.clearAliquotError(currentAliquot);
          }
        });
      }

      return alreadyUsed;
    }

    function validateIsNumber(aliquot, tubeOrAliquot) {
      var isTube = self.fieldIsTube(tubeOrAliquot);
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var isNumber = !isNaN(value);
      var msgError = self.validationMsg.invalidCode;

      if (isNumber) {
        if (isTube) {
          self.clearTubeError(aliquot);
        } else {
          self.clearAliquotError(aliquot);
        }
      } else {
        if (isTube) {
          self.setTubeError(aliquot, msgError);
        } else {
          self.setAliquotError(aliquot, msgError);
        }
      }

      return isNumber;
    }
    

    function validateWave(aliquot, tubeOrAliquot) {
      var isTube = self.fieldIsTube(tubeOrAliquot);
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var msgTube = self.validationMsg.tubeFromAnotherWave;
      var msgAliquot = self.validationMsg.aliquotFromAnotherWave;

      var isValid = true;

      if (value.length > 0 && !aliquot.isSaved) isValid = self.isValidWave(value);

      if (isValid) {
        if (isTube) {
          if (msgTube == aliquot.tubeMessage) {
            self.clearTubeError(aliquot);
          }
        } else {
          if (msgAliquot == aliquot.aliquotMessage) {
            self.clearAliquotError(aliquot);
          }
        }
      } else {
        if (isTube) {
          self.setTubeError(aliquot, msgTube);
        } else {
          self.setAliquotError(aliquot, msgAliquot);
        }
      }

      return isValid;
    }


    function validateTubeRequired(aliquot) {
      var isValid = true;
      var msg = self.validationMsg.requiredTube;
      
      if (aliquot.aliquotCode) {
        if (aliquot.tubeCode.length === 0 && aliquot.placeholder.length === 0) isValid = false;
      }

      if (isValid) {
        if (aliquot.tubeMessage == msg) {
          self.clearTubeError(aliquot);
        }
      } else {
        self.setTubeError(aliquot, msg);
      }

      return isValid;
    }


    function validateAliquotCenter(aliquot) {
      var isValid = true;
      var msg = self.validationMsg.aliquotFromAnotherCenter;

      if(aliquot.aliquotCode && !aliquot.isSaved) {
        isValid = self.isValidCenter(aliquot.aliquotCode);
      }

      if (isValid) {
        if (aliquot.aliquotMessage == msg) {
          self.clearAliquotError(aliquot);
        }
      } else {
        self.setAliquotError(aliquot, msg);
      }

      return isValid;
    }

    function isValidAliquotLength(currentLength){
      var lengthArray = self.aliquotLengths.filter(function(value){
        return value === currentLength;
      });

      return lengthArray.length ? true : false;
    }

    function validateAliquotLength(aliquot) {
      var isValid = true;
      var msg = self.validationMsg.invalidAliquotLength;

      if(aliquot.aliquotCode && !aliquot.isSaved) {
        isValid = self.isValidAliquotLength(aliquot.aliquotCode.length);
      }

      if (isValid) {
        if (aliquot.aliquotMessage == msg) {
          self.clearAliquotError(aliquot);
        }
      } else {
        self.setAliquotError(aliquot, msg);
      }

      return isValid;
    }

    function transcribeErrorMessage(msg) {
      var newMessage = "";

      msgErrors.forEach(function(currentMsg) {
        if(currentMsg.msgServer === msg) newMessage = currentMsg.msgShow;
      });

      if(newMessage === ""){
        newMessage = self.validationMsg.errorSavingField;
        if(msg) console.log(self.validationMsg.serverError,msg);
      }

      return newMessage;
    }
  }

}());
