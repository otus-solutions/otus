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
    
    self.momentTypeList = MomentType.createListMomentType(self.tubeList);

    self.$onInit = onInit;

    self.selecMomentType = selecMomentType;
    self.selectedMomentType;
    self.aliquotList = {};

    self.completePlaceholder = completePlaceholder; 
    self.inputChange = inputChange;
    
    self.validateTube = validateTube;
    self.validateAliquot = validateAliquot;

    
    
    function selecMomentType(momentType){
      if(self.selectedMomentType)
        AliquotTubeService.fillTubesWithAliquots(self.selectedMomentType);
      
      self.selectedMomentType = momentType;

      self.selectedMomentType.aliquotsConfigs = [
        {
          label:"Armazenamento",
          name:"STORAGE"
        },
        {
          label:"Armazenamento",
          name:"STORAGE"
        },
        {
          label:"Armazenamento",
          name:"STORAGE"
        },
        {
          label:"Soro",
          name:"SORO_1"
        },
        {
          label:"Hemacias",
          name:"HEMA_1"
        },
        {
          label:"Soro",
          name:"SORO_1"
        }
      ];
      
      if(momentType.aliquotList["type"]){
        self.aliquotList = momentType.aliquotList;
      } else {
        self.aliquotList = AliquotTubeService.createStructureAliquotList(self.selectedMomentType);
        momentType.aliquotList = self.aliquotList;
        AliquotTubeService.fillAliquotsWithTubesAliquots(momentType);
        //console.log(self.momentTypeList);
      }

      completePlaceholder(self.aliquotList.aliquots.exams);
      completePlaceholder(self.aliquotList.aliquots.stores);

      //console.log(self.aliquotList.aliquots);
      setTimeout(function(){
        //console.log('Começando');
        _defaultCustomValidation();
      },1000);
    }

    function _defaultCustomValidation(){
      var arrayAliquots = self.aliquotList.aliquots.exams.concat(self.aliquotList.aliquots.stores);

      arrayAliquots.forEach(function(aliquot) {
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
        if(aliquot.tubeCode)
          lastPlaceholder = aliquot.tubeCode;
      });
    };


    function _isTube(value){
      return (value.length && value.length == 9 && value.toString().substr(2,1) == '1');
    }

    function _isAliquot(value, nameField){
      return (value.length && value.length == 9 && (value.toString().substr(2,1) == '2' || value.toString().substr(2,1) == '3'));
    }

    function validateAliquot(examStorage){
      if(examStorage.aliquotCode){
        if(_isAliquot(examStorage.aliquotCode)){
          examStorage.aliquotMessage = "";
          $scope.formAliquot[examStorage.aliquotId].$setValidity('customValidation',true);
        } else {
          examStorage.aliquotMessage = "Não é uma Aliquota válida.";
          $scope.formAliquot[examStorage.aliquotId].$setValidity('customValidation',false);
        }
      }
    }

    function validateTube(examStorage){
      if(examStorage.tubeCode){
        var filterTube = self.aliquotList.tubes.filter(function(tube){
          return tube.code == examStorage.tubeCode;
        });
        
        if(filterTube.length > 0){
          $scope.formAliquot[examStorage.tubeId].$setValidity('customValidation',true);
          //Tube find
          //console.log(filterTube[0].isCollected);
          if(!filterTube[0].isCollected){
            //Tube NOT collected
            examStorage.tubeMessage = "Tubo não coletado, não pode ser Aliquotado.";
            $scope.formAliquot[examStorage.tubeId].$setValidity('customValidation',false);  
          }
        } else {
          //Tube NOT exist to this Moment Type
          examStorage.tubeMessage = "Este tubo não existe, ou, não pertence a este Tipo/Momento.";
          $scope.formAliquot[examStorage.tubeId].$setValidity('customValidation',false);
        }
      }
    }

    function inputChange(examStorage, aliquotChange){
      if(aliquotChange){
        $scope.formAliquot[examStorage.aliquotId].$setValidity('customValidation',true);
        if(examStorage.aliquotCode && examStorage.aliquotCode.length==9){
          if(_isTube(examStorage.aliquotCode)){
            examStorage.tubeCode = examStorage.aliquotCode;
            examStorage.aliquotCode = "";
            $element.find('#' + examStorage.tubeId).blur();
          } else {
            _nextFocus(examStorage);
          }
        }
      } else {
        $scope.formAliquot[examStorage.tubeId].$setValidity('customValidation',true);
      }

      if(examStorage.role.toUpperCase() == "EXAM"){
        completePlaceholder(self.aliquotList.aliquots.exams);
      } else {
        completePlaceholder(self.aliquotList.aliquots.stores);
      }
    }  
   
   

    function _nextFocus(examStorage){
      var newFocus = ""
      if(examStorage.role.toUpperCase() == "EXAM"){
        if(examStorage.index < self.aliquotList.aliquots.exams.length - 1){
          newFocus = self.aliquotList.aliquots.exams[examStorage.index + 1].aliquotId;
        } else {
          newFocus = self.aliquotList.aliquots.stores[0].aliquotId;
        }
      } else {
        if(examStorage.index < self.aliquotList.aliquots.stores.length - 1){
          newFocus = self.aliquotList.aliquots.stores[examStorage.index + 1].aliquotId;
        } else {
          //newFocus = self.aliquotList.aliquots.exams[0].aliquotId;
        }
      }

      self.setFocus(newFocus);
    }

    self.setFocus = setFocus; 
    
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
