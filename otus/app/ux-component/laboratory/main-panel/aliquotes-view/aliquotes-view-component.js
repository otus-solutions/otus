(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('aliquotesView', {
      templateUrl: 'app/ux-component/laboratory/main-panel/aliquotes-view/aliquotes-view-template.html',
      bindings: {
         tubeList: '='
      },
      controller: Controller
    });

  Controller.$inject = [
    'otusjs.laboratory.aliquot.AliquotTubeService',
    'otusjs.laboratory.aliquot.MomentType',
    
    '$scope',
    '$element'
  ];
  
  function Controller(AliquotTubeService,MomentType, $scope, $element) {
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
      self.selectedMomentType = momentType;
      
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

    function completePlaceholder(aliquots){
      var lastPlaceholder = '';

      aliquots.forEach(function(aliquot) {
        aliquot.placeholder = lastPlaceholder;
        if(aliquot.tubeCode) lastPlaceholder = aliquot.tubeCode;
      });
    };


    function _isTube(value){
      return (value.length && value.length == 9 && value.toString().substr(2,1) == '1');
    }

    function _isAliquot(value, nameField){
      return (value.length && value.length == 9 && (value.toString().substr(2,1) == '2' || value.toString().substr(2,1) == '3'));
    }

    function validateAliquot(aliquot){
      if(aliquot.aliquotCode){
        if(_isAliquot(aliquot.aliquotCode)){
          aliquot.aliquotMessage = "";
          $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',true);
        } else {
          aliquot.aliquotMessage = "Não é uma Aliquota válida.";
          $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',false);
        }
      }
    }

    function validateTube(aliquot){
      if(aliquot.tubeCode){
        var filterTube = self.selectedMomentType.tubeList.filter(function(tube){
          return tube.code == aliquot.tubeCode;
        });
        
        if(filterTube.length > 0){
          $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
          //Tube find
          //console.log(filterTube[0].isCollected);
          if(!filterTube[0].isCollected){
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

    function inputChange(aliquot, aliquotChange){
      if(aliquotChange){
        $scope.formAliquot[aliquot.aliquotId].$setValidity('customValidation',true);
        if(aliquot.aliquotCode && aliquot.aliquotCode.length==9){
          if(_isTube(aliquot.aliquotCode)){
            aliquot.tubeCode = aliquot.aliquotCode;
            aliquot.aliquotCode = "";
            $element.find('#' + aliquot.tubeId).blur();
          } else {
            _nextFocus(aliquot);
          }
        }
      } else {
        $scope.formAliquot[aliquot.tubeId].$setValidity('customValidation',true);
      }

      if(aliquot.role.toUpperCase() == "EXAM"){
        completePlaceholder(self.selectedMomentType.exams);
      } else {
        completePlaceholder(self.selectedMomentType.stores);
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
        
        if(current.index == aliquot.index && current.role.toUpperCase() == aliquot.role.toUpperCase() && aliquot.isSaved == false){
          newFocus = aliquot.aliquotId;
          break;
        }
        if(current.index == aliquot.index) current.index++;
      }

      if(newFocus.length) self.setFocus(newFocus);
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
      //console.log(self.tubeList);
      //console.log($element);
      //console.log(angular);
      selecMomentType(self.momentTypeList[0]);
      console.log(self.momentTypeList);
      
      console.log('teste semi fake');
      console.log(AliquotTubeService.getMomentTypeList());
    }


  }
}());
