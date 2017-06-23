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
    'otusjs.laboratory.aliquot.MomentType'
  ];
  
  function Controller(AliquotTubeService,MomentType) {
    var self = this;
    
    self.momentTypeList = MomentType.createListMomentType(self.tubeList);

    self.$onInit = onInit;

    self.selecMomentType = selecMomentType;
    self.selectedMomentType;
    self.aliquotList = {};

    self.completePlaceholder = completePlaceholder; 
    self.inputExamsChange = inputExamsChange; 
    self.inputStoresChange = inputStoresChange; 

    selecMomentType(self.momentTypeList[0]);
    
    function selecMomentType(momentType){
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
      }

      inputExamsChange();
      inputStoresChange();
    }

    
    function completePlaceholder(fields, count){
      var lastPlaceholder = '';
      for(var i = 1; i <= count; i++){
        fields[i].placeholder = lastPlaceholder;
        if(fields[i].code)
          lastPlaceholder = fields[i].code;
      }
    };

    function inputExamsChange(){
      self.completePlaceholder(
          self.aliquotList.aliquots.exam,
          self.aliquotList.aliquots.exams.length
        );
    }  
    
    function inputStoresChange(){
      self.completePlaceholder(
          self.aliquotList.aliquots.storage, 
          self.aliquotList.aliquots.stores.length
        );
    }


    function onInit() {
      
    }


  }
}());
