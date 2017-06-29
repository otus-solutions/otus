(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.aliquot')
    .service('otusjs.laboratory.aliquot.AliquotTubeService', Service);

  Service.$inject = [
    '$q'
  ];

  function Service($q) {
    var self = this;
    var _test;

    _init();

    function _init() {
      _test = null;
    }

    self.createStructureAliquotList = createStructureAliquotList;
    self.fillAliquotsWithTubesAliquots = fillAliquotsWithTubesAliquots;
    self.fillTubesWithAliquots = fillTubesWithAliquots;


    function fillTubesWithAliquots(momentType){
      var listAloquots = [];

      momentType.tubeList.forEach(function(tube) {
        //Vai mudar para aliquots
        tube.aliquotes = [];
      });
      
      listAloquots = momentType.aliquotList.aliquots.exams.concat(momentType.aliquotList.aliquots.stores);
      
      listAloquots = listAloquots.filter(function(aliquot){
        return aliquot.aliquotCode;
      });

      listAloquots.forEach(function(aliquot) {
        momentType.tubeList.forEach(function(tube) {
          if(tube.code == aliquot.tubeCode || tube.code == aliquot.placeholder){
            //Vai mudar para aliquots
            tube.aliquotes.push({
              code: aliquot.aliquotCode,
              container: aliquot.container,
              name: aliquot.name,
              objectType: 'Aliquot',
              role: aliquot.name.toUpperCase() == 'STORAGE' ? 'storage' : 'exam',
              collectionData:{}
            });
          }
        });
      });

      return momentType;
    }


    function fillAliquotsWithTubesAliquots(momentType){
      var tubesWithAliquot = [];
      var listTubeToAliquot = [];

      tubesWithAliquot = momentType.aliquotList.tubes.filter(function(tube){
        return (tube.aliquots.length > 0);
      });

      tubesWithAliquot.forEach(function(tube) {
        tube.aliquots.forEach(function(aliquot) {
          listTubeToAliquot.push(
            {
              tube:tube,
              aliquot:aliquot
            }
          );
        });
      });
      
      listTubeToAliquot.forEach(function(tubeToAliquot){
        var arrayAliquots = [];
        
        if(tubeToAliquot.aliquot.role.toUpperCase() == "STORAGE"){
          arrayAliquots = momentType.aliquotList.aliquots.stores
        } else {
          arrayAliquots = momentType.aliquotList.aliquots.exams
        }

        for (var i = 0, endLoop = false; i < arrayAliquots.length && !endLoop; i++) {
          var aliquot = arrayAliquots[i];
          if(aliquot.tubeCode == "" && aliquot.name.toUpperCase() == tubeToAliquot.aliquot.name.toUpperCase()){
            aliquot.tubeCode = tubeToAliquot.tube.code;
            aliquot.aliquotCode = tubeToAliquot.aliquot.code;
            endLoop = true;
          }
        }
          
      });

      return momentType;
    }


    function createStructureAliquotList(momentType) {
      var aliquotList = {};
      aliquotList = _getStructureAliquotList();
      var tubeList = momentType.tubeList;

      /*
      aliquotList.type = tubeList[0].type;
      aliquotList.moment = tubeList[0].moment;
      aliquotList.momentLabel = tubeList[0].momentLabel;
      aliquotList.boxColor = tubeList[0].boxColor;
      aliquotList.momentLabel = tubeList[0].momentLabel;
      */

      aliquotList.type = momentType.type;
      aliquotList.moment = momentType.moment;
      aliquotList.momentLabel = momentType.momentLabel;
      aliquotList.boxColor = momentType.boxColor;
      

      tubeList.forEach(function(tube) {
        aliquotList.tubes.push(_createAliquotTube(tube));
      });

      _implementStructureAliquot(momentType, aliquotList.aliquots);

      return aliquotList;
    }

    function _implementStructureAliquot(momentType, aliquots){
      var indexExam = 0;
      var indexStorage = 0;
      
      momentType.aliquotsConfigs.forEach(function(aliquot){
        if(aliquot.name.toUpperCase() == "STORAGE"){
          aliquots.storage[indexStorage] = _createStructureAliquot(aliquot);
          aliquots.storage[indexStorage].aliquotId = "storageAliquot" + indexStorage;
          aliquots.storage[indexStorage].tubeId = "storageTube" + indexStorage;
          aliquots.storage[indexStorage].role = "storage";
          aliquots.storage[indexStorage].index = indexStorage;
          aliquots.stores.push(aliquots.storage[indexStorage]);
          indexStorage++;
        } else {
          aliquots.exam[indexExam] = _createStructureAliquot(aliquot);
          aliquots.exam[indexExam].aliquotId = "examAliquot" + indexExam;
          aliquots.exam[indexExam].tubeId = "examTube" + indexExam;
          aliquots.exam[indexExam].role = "exam";
          aliquots.exam[indexExam].index = indexExam;
          aliquots.exams.push(aliquots.exam[indexExam]);
          indexExam++;
        }
      });
    }

    function _createStructureAliquot(aliquot){
      var aliquotStructure = {};
      aliquotStructure = _getStructureAliquot();

      aliquotStructure.label = aliquot.label;
      aliquotStructure.name = aliquot.name;
      
      return aliquotStructure;
    }


    function _createAliquotTube(tube){
      var tubeStructure = {};
      tubeStructure = _getStructureAliquotTube();

      tubeStructure.code = tube.code;
      tubeStructure.isCollected = tube.tubeCollectionData.isCollected;
      
      //Vai mudar para "aliquots"
      tube.aliquotes.forEach(function(aliquot) {
        tubeStructure.aliquots.push(_createTubesAliquot(aliquot));
      });

      return tubeStructure;
    }

    function _createTubesAliquot(aliquot){
      var aliquotStructure = {};
      aliquotStructure = _getStructureTubesAliquot();

      aliquotStructure.code = aliquot.code;
      aliquotStructure.name = aliquot.name;
      aliquotStructure.role = aliquot.role;
      aliquotStructure.container = aliquot.container;
      //Ajustar posteriormente
      aliquotStructure.label = aliquot.name;

      return aliquotStructure;
    }

    function _getStructureAliquotList(){
      return {
        type: "",
        moment:"",
        momentLabel:"",
        boxColor:"",
        tubes: [],
        aliquots: {
          exam:{},
          storage:{},
          exams:[],
          stores:[]
        }
      };
    }

    function _getStructureAliquotTube(){
      return {
        code:"",
        isCollected: false,
        aliquots: []
      };
    }

    function _getStructureTubesAliquot(){
      return {
        code: "",
        name: "",
        role: "",
        container: "",
        label: ""
      };
    }

    function _getStructureAliquot(){
      //Used to exam and storage aliquots
      return {
        tubeCode: "",
        aliquotCode: "",
        label: "",
        container: "",
        name: "",
        role: "",
        placeholder: "",
        aliquotMessage: "Teste Aliquot Message",
        tubeMessage: "Teste Tube Message",
        aliquotId: "",
        tubeId: "",
        index: 0
      };
    }
  }
}());
