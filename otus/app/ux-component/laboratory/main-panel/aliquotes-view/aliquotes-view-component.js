(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('aliquotesView', {
      templateUrl: 'app/ux-component/laboratory/main-panel/aliquotes-view/aliquotes-view-template.html',
      bindings: {
         tubeList: '=',
         callbackFunctions: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.laboratory.aliquot.AliquotTubeService',
    'otusjs.laboratory.aliquot.MomentType',
    '$mdDialog',
    '$mdToast',
    '$scope',
    '$element'
  ];
  
  function Controller(AliquotTubeService,MomentType, $mdDialog, $mdToast, $scope, $element) {
    var self = this;
    
    //self.momentTypeList = MomentType.createListMomentType(self.tubeList);
    self.momentTypeList = AliquotTubeService.getMomentTypeList()

    self.$onInit = onInit;

    self.selecMomentType = selecMomentType;
    self.selectedMomentType;
    //self.aliquotList = {};

    self.completePlaceholder = completePlaceholder; 
    self.inputChange = inputChange;
    
    self.validateTube = validateTube;
    self.validateAliquot = validateAliquot;
    self.setFocus = setFocus; 

    
    function selecMomentType(momentType){
      var toChange = false
      var confirmCancel = $mdDialog.confirm()
          .title('Descartar Alterações?')
          .textContent('Alíquotas ateradas serão descartadas')
          .ariaLabel('Confirmação de cancelamento')
          .ok('Continuar')
          .cancel('Cancelar');

      if(self.selectedMomentType){
        if(momentType != self.selectedMomentType) {
          if(AliquotTubeService.fieldsChanged(self.selectedMomentType)){
            $mdDialog.show(confirmCancel).then(function() {
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

      if(toChange) _setMomentType(momentType);
    }

    function _setMomentType(momentType){
      self.selectedMomentType = AliquotTubeService.populateAliquotsArray(momentType);

      completePlaceholder(self.selectedMomentType.exams);
      completePlaceholder(self.selectedMomentType.stores);

      setTimeout(function(){
        //console.log('Começando');
        _defaultCustomValidation();
        _nextFocusNotSave({index:-1, role: 'EXAM'})
      },200);
    }

    function _defaultCustomValidation(){
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);

      aliquotsArray.forEach(function(aliquot) {
        $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
        $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',true);

        $element.find('#'+ aliquot.tubeId).blur();
        $element.find('#'+ aliquot.aliquotId).blur();
      }); 
    }

    function completePlaceholder(aliquots,currentAliquot){
      var lastPlaceholder = '';
      var tubeIdList = [];

      aliquots.forEach(function(aliquot) {
        aliquot.placeholder = lastPlaceholder;
        if(lastPlaceholder){
          //aliquot.tubeMessage = "";
        }
        if(currentAliquot){
          tubeIdList.push(aliquot.tubeId);
          if($scope.formAliquot 
            && (aliquot.tubeCode.length || aliquot.tubeCode.length == 9)
            //currentAliquot != aliquot
          ){
            if(currentAliquot == aliquot){
              //_validateTubeRequired(aliquot);
            } else {
              //$element.find('#'+ aliquot.tubeId).blur();
            }
            //
          } 
        }

        if(aliquot.tubeCode) lastPlaceholder = aliquot.tubeCode;
      });

      //if($scope.formAliquot && currentAliquot != aliquot) $element.find('#'+ aliquot.tubeId).blur();
    };

    function _addAloquotInRepeatedAliquots(aliquot){
      var newArray = self.selectedMomentType.repeatedAliquots.filter(function(currentAliquot){ 
        return aliquot == currentAliquot; 
      });

      if(newArray.length){
        return false;
      } else {
        self.selectedMomentType.repeatedAliquots.push(aliquot);
        return true;
      }
    }

    function _removeRepeatedAliquots(aliquot){
      self.selectedMomentType.repeatedAliquots = self.selectedMomentType.repeatedAliquots.filter(function(currentAliquot){
        return JSON.stringify(currentAliquot) != JSON.stringify(aliquot);
      });
    }

    function _aliquotAlreadyUsed(aliquot, validateRepeatedList){
      var aliquotsArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);
      var alreadyUsed = false;

      for (var i = 0; i < aliquotsArray.length; i++) {
        var currentAliquot = aliquotsArray[i];
        
        if(currentAliquot.aliquotCode && currentAliquot != aliquot && currentAliquot.aliquotCode == aliquot.aliquotCode){
          alreadyUsed = true;
          if(validateRepeatedList) {
            _addAloquotInRepeatedAliquots(currentAliquot);
          } 
          //break;
        }
      }
      
      if(alreadyUsed){
        if(validateRepeatedList) _addAloquotInRepeatedAliquots(aliquot);
      } else {
        console.log("Chamou:");
        if(validateRepeatedList) _removeRepeatedAliquots(aliquot);
      }

      if(validateRepeatedList){
        self.selectedMomentType.repeatedAliquots.forEach(function(currentAliquot) {
          if(_aliquotAlreadyUsed(currentAliquot)){
            currentAliquot.aliquotMessage = "Código de alíquota já utilizado.";
            $scope.formAliquot[currentAliquot.aliquotId].$setValidity('customValidation',false);
          } else {
            currentAliquot.aliquotMessage = "";
            $scope.formAliquot[currentAliquot.aliquotId].$setValidity('customValidation',true);
          }
        });
      }

      return alreadyUsed;
    }

    function _validateIsNumber(aliquot,tubeOrAliquot){
      var isTube = (tubeOrAliquot.toUpperCase() == "TUBE");
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var isNumber = !isNaN(value);

      if(isNumber){
        if(isTube){
          aliquot.tubeMessage = "";
          $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
        } else {
          aliquot.aliquotMessage = "";
          $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',true);
        }
      } else {
        if(isTube){
          aliquot.tubeMessage = "Não é um código válido.";
          $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',false);
        } else {
          aliquot.aliquotMessage = "Não é um código válido.";
          $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',false);
        }
      }
      
      return isNumber;
    }


    function _validateWave(aliquot,tubeOrAliquot){
      var isTube = (tubeOrAliquot.toUpperCase() == "TUBE");
      var value = isTube ? aliquot.tubeCode : aliquot.aliquotCode;
      var msgTube = "Não é um código válido.";
      var msgAliquot = "Não é um código válido.";
      
      var isValid = true;

      if(value.length > 0) isValid = (value.toString().substr(0,1) == '3');

      if(isValid){
        if(isTube){
          if(msgTube == aliquot.tubeMessage){
            aliquot.tubeMessage = "";
            $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
          }
        } else {
          if(msgAliquot == aliquot.aliquotMessage){
            aliquot.aliquotMessage = "";
            $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',true);
          }
        }
      } else {
        if(isTube){
          aliquot.tubeMessage = msgTube;
          $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',false);
        } else {
          aliquot.aliquotMessage = msgAliquot;
          $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',false);
        }
      }

      return isValid;
    }


    function _validateTubeRequired(aliquot){
      var isValid = true;
      var msg = "O código do Tubo é obrigatório.";
      if(aliquot.aliquotCode){
        if(aliquot.tubeCode.length == 0 && aliquot.placeholder.length == 0) isValid = false;
      }

      if(isValid){
        if(aliquot.tubeMessage == msg){
          console.log("Apagando?");
          aliquot.tubeMessage = "";
          $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
        }
      } else {
        aliquot.tubeMessage = msg;
        $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',false);
      }

      return isValid;
    }


    function _isTube(value){
      return (value.length && value.length == 9 && value.toString().substr(2,1) == '1');
    }

    function _isAliquot(value, nameField){
      return (value.length == 0 || (value.length == 9 && (value.toString().substr(2,1) == '2' || value.toString().substr(2,1) == '3')));
    }


    function validateAliquot(aliquot){
      _aliquotAlreadyUsed(aliquot,true);
      _validateTubeRequired(aliquot);
      if(!_validateIsNumber(aliquot,"ALIQUOT")) return;
      if(!_validateWave(aliquot,"ALIQUOT")) return;

      if(aliquot.aliquotCode){
        if(_isAliquot(aliquot.aliquotCode)){
          aliquot.aliquotMessage = "";
          $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',true);
          
          if(_aliquotAlreadyUsed(aliquot,true)){
            aliquot.aliquotMessage = "Código de alíquota já utilizado.";
            $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',false);
            return;
          }
        } else {
          aliquot.aliquotMessage = "Não é uma Aliquota válida.";
          $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',false);
        }
      }
    }

    function validateTube(aliquot){
      if(!_validateIsNumber(aliquot,"TUBE")) return;
      if(!_validateWave(aliquot,"TUBE")) return;
      if(!_validateTubeRequired(aliquot)) return;

      if(aliquot.tubeCode){
        var filterTube = self.selectedMomentType.tubeList.filter(function(tube){
          return tube.code == aliquot.tubeCode;
        });
        
        if(filterTube.length > 0){
          $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
          //Tube find
          if(!filterTube[0].tubeCollectionData.isCollected){
            //Tube NOT collected
            aliquot.tubeMessage = "Tubo não coletado, não pode ser Aliquotado.";
            $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',false);  
          }
        } else {
          //Tube NOT exist to this Moment Type
          aliquot.tubeMessage = "Este tubo não existe, ou, não pertence a este Tipo/Momento.";
          $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',false);
        }
      }
    }

    function _blurTubeOfAliquotsArray(aliquotsArray,currentAliquot){
      aliquotsArray.forEach(function(aliquot) {
        if(aliquot == currentAliquot){
          _validateTubeRequired(aliquot);
        } else{
          $element.find('#' + aliquot.tubeId).blur();
        }
      });
    }

    function inputChange(aliquot, tubeOrAliquot){
      var aliquotsArray = aliquot.role.toUpperCase() == "EXAM" ? self.selectedMomentType.exams : self.selectedMomentType.stores;
      var runCompletePlaceholder = false;

      if(tubeOrAliquot.toUpperCase() == 'ALIQUOT'){
        $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',true);
        if(aliquot.aliquotCode && aliquot.aliquotCode.length==9){
          if(_isTube(aliquot.aliquotCode)){
            aliquot.tubeCode = aliquot.aliquotCode;
            aliquot.aliquotCode = "";
            runCompletePlaceholder = true;
            //$element.find('#' + aliquot.tubeId).blur();
          } else {
            _nextFocus(aliquot);
          }
        }
      } else {
        runCompletePlaceholder = true;
        console.log('Alterado Tubo');
        $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
      }

      if(runCompletePlaceholder){
        completePlaceholder(aliquotsArray, aliquot);
        _blurTubeOfAliquotsArray(aliquotsArray,aliquot);
      }
    }  
   
   

    function _nextFocus(aliquot){
      // var newFocus = ""
      // if(aliquot.role.toUpperCase() == "EXAM"){
      //   if(aliquot.index < self.selectedMomentType.exams.length - 1){
      //     newFocus = self.selectedMomentType.exams[aliquot.index + 1].aliquotId;
      //   } else {
      //     newFocus = self.selectedMomentType.stores[0].aliquotId;
      //   }
      // } else {
      //   if(aliquot.index < self.selectedMomentType.stores.length - 1){
      //     newFocus = self.selectedMomentType.stores[aliquot.index + 1].aliquotId;
      //   } else {
      //     newFocus = self.selectedMomentType.exams[0].aliquotId;
      //   }
      // }
      // if(newFocus) self.setFocus(newFocus);
      _nextFocusNotSave(aliquot);
    }


    function _nextFocusNotSave(currentAliquot){
      var newFocus = "";
      var aliquotArray = self.selectedMomentType.stores.concat(self.selectedMomentType.exams);
      var current = {
        index:currentAliquot.index + 1,
        role: currentAliquot.role,
        roleChanged: false
      };
      
      if(currentAliquot.role.toUpperCase() == "EXAM") 
        aliquotArray = self.selectedMomentType.exams.concat(self.selectedMomentType.stores);

      for (var i = 0; i < aliquotArray.length; i++) {
        var aliquot = aliquotArray[i];
        
        if(current.role.toUpperCase() != aliquot.role.toUpperCase() && current.roleChanged == false) {
          current.index = 0;
          current.role = aliquot.role;
          current.roleChanged = true;
        }
        
        if(current.index == aliquot.index && current.role.toUpperCase() == aliquot.role.toUpperCase() && aliquot.isSaved == false && !aliquot.aliquotCode){
          newFocus = aliquot.aliquotId;
          break;
        }
        if(current.index == aliquot.index) current.index++;
      }

      if(newFocus.length) {
        self.setFocus(newFocus);
      } else {
        if(aliquot.aliquotId) $element.find('#'+ aliquot.aliquotId).blur();
      };
    }


    
    function setFocus(id){
      //console.log('#'+id);
      $element.find('#'+id).focus();
    }

    self.teste = function(msg){
      //Remove this method
      console.log(msg);
    }

    function onInit() {
      selecMomentType(self.momentTypeList[0]);
      console.log('Teste');
      console.log(AliquotTubeService.getMomentTypeList());

      self.callbackFunctions.cancelAliquots = function(){
        return AliquotTubeService.fieldsChanged(self.selectedMomentType);
      }


      self.callbackFunctions.saveAliquots = function(){
        if(AliquotTubeService.fieldsChanged(self.selectedMomentType)){
          if(AliquotTubeService.aliquotsWithErrors(self.selectedMomentType)){
            $mdToast.show(
              $mdToast.simple()
                .textContent('Verifique os erros antes de salvar.')
                .hideDelay(2000)
            );
          } else {
            var confirmFinish = $mdDialog.confirm()
                .title('Confirmar Aliquotagem')
                .textContent('Deseja salvar as alterações?')
                .ariaLabel('Confirmação de finalização')
                .ok('Ok')
                .cancel('Voltar');
            
            $mdDialog.show(confirmFinish).then(function() {
              if(1 == 1){
                console.log(AliquotTubeService.getNewAliquots(self.selectedMomentType));
                
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Salvo com sucesso! (Teste)')
                    .hideDelay(2000)
                );
              } else {
                $mdToast.show(
                  $mdToast.simple()
                    .textContent('Não foi possível salvar os dados.')
                    .hideDelay(2000)
                );
              }
            });
          }
        } else {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Salvo com sucesso! (Já salvo)')
              .hideDelay(2000)
          );
        }
        
      };

    }


  }
}());
