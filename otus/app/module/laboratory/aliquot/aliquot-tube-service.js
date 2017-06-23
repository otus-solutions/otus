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
      var indexExam = 1;
      var indexStorage = 1;
      
      momentType.aliquotsConfigs.forEach(function(aliquot){
        if(aliquot.name.toUpperCase() == "STORAGE"){
          aliquots.storage[indexStorage] = _createStructureAliquot(aliquot);
          aliquots.stores.push(aliquots.storage[indexStorage]);
          indexStorage++;
        } else {
          aliquots.exam[indexExam] = _createStructureAliquot(aliquot);
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
        tubeStructure.push(_createTubesAliquot(aliquot));
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
        code: "",
        label: "",
        container: "",
        name: "",
        placeholder: "",
        aliquot: ""
      };
    }
  }
}());
