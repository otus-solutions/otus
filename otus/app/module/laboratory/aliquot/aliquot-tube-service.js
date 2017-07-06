(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.aliquot')
    .service('otusjs.laboratory.aliquot.AliquotTubeService', Service);

  Service.$inject = [
    'otusjs.laboratory.AliquotManagerService'
  ];

  function Service(AliquotManagerService) {
    var self = this;
    var _test;


    self.createStructureAliquotList = createStructureAliquotList;
    self.fillAliquotsWithTubesAliquots = fillAliquotsWithTubesAliquots;
    self.fillTubesWithAliquots = fillTubesWithAliquots;

    self.getMomentTypeList = getMomentTypeList;
    self.getMomentTypeAliquot = getMomentTypeAliquot;


    function getMomentTypeList(isFake){     
      var momentTypeList = AliquotManagerService.getMomentTypeList();

      console.log(momentTypeList);

      momentTypeList.forEach(function(momentType) {
        //var fieldsMomentType = AliquotManagerService.getMomentTypeMap(momentType.type, momentType.moment);

        momentType.typeLabel = fakeTypeLabel(momentType.typeLabel, momentType.type);
        momentType.momentLabel = fakeMomentLabel(momentType.momentLabel,momentType.moment);
        momentType.boxColor = fakeColor(momentType.boxColor);
        //momentType.availableAliquots = fieldsMomentType.aliquotsConfig;
        //momentType.collectedAliquots = fieldsMomentType.aliquots;

        var indexStorage = 0;
        var indexExam = 0;
        var stores = [];
        var exams = [];
        momentType.availableAliquots.forEach(function(aliquot){
          var aliquotStructure = {
                                    aliquotCode: "",
                                    tubeCode: "",
                                    container: "",
                                    placeholder: "",
                                    aliquotMessage: "Teste Aliquot Message",
                                    tubeMessage: "Teste Tube Message",
                                    isSaved: false
                                 };
          
          var role = "exam";
          var index = indexExam;
          
          if(aliquot.name.toUpperCase() == "STORAGE"){
            role = "storage";
            index = indexStorage;
          }
          
          aliquotStructure.name = aliquot.name;
          aliquotStructure.label = aliquot.label ? aliquot.label : aliquot.name;

          aliquotStructure.aliquotId = role + "Aliquot" + index;
          aliquotStructure.tubeId = role + "Tube" + index;
          aliquotStructure.role = role;
          aliquotStructure.index = index;
          
          if(aliquot.name.toUpperCase() == "STORAGE"){
            stores.push(aliquotStructure);
            indexStorage++;
          } else {
            exams.push(aliquotStructure);
            indexExam++;
          }
        });

        momentType.stores = stores;
        momentType.exams = exams;

        momentType = fillAliquotsWithCollectedAliquots(momentType);
      });
      
      momentTypeList = fakeMomentTypeList(momentTypeList);

      return momentTypeList;
    }



    function fillAliquotsWithCollectedAliquots(momentType){
      momentType.collectedAliquots.forEach(function(collectedAliquot){
        var arrayAliquots = momentType.exams;
        
        if(collectedAliquot.role.toUpperCase() == "STORAGE") arrayAliquots = momentType.stores;
        
        for (var i = 0, endLoop = false; i < arrayAliquots.length && !endLoop; i++) {
          var aliquot = arrayAliquots[i];
          if(aliquot.tubeCode == "" && aliquot.name.toUpperCase() == collectedAliquot.name.toUpperCase()){
            aliquot.tubeCode = collectedAliquot.tubeCode;
            aliquot.aliquotCode = collectedAliquot.code;
            aliquot.isSaved = true;
            endLoop = true;
          }
        }
      });

      return momentType;
    }





    function getFakeMomentTypeList(){
      return fakeMomentTypeList();
    }
    function getFakeMomentTypeMaps(){
      var retorno = JSON.parse(`
        {
          "FASTING": {
            "GEL": {
              "type": "GEL",
              "typeLabel": "GEL",
              "moment": "FASTING",
              "momentLabel": "Jejum",
              "boxColor": "#ffcc00"
            },
            "EDTA": {
              "type": "EDTA",
              "typeLabel": "EDTA",
              "moment": "FASTING",
              "momentLabel": "Jejum",
              "boxColor": "#660066"
            },
            "FLUORIDE": {
              "type": "FLUORIDE",
              "typeLabel": "FLUORIDE",
              "moment": "FASTING",
              "momentLabel": "Jejum",
              "boxColor": "#666666"
            }
          },
          "POST_OVERLOAD": {
            "GEL": {
              "type": "GEL",
              "typeLabel": "GEL",
              "moment": "POST_OVERLOAD",
              "momentLabel": "Pós",
              "boxColor": "#ffcc00"
            },
            "FLUORIDE": {
              "type": "FLUORIDE",
              "typeLabel": "FLUORIDE",
              "moment": "POST_OVERLOAD",
              "momentLabel": "Pós",
              "boxColor": "#666666"
            }
          },
          "NONE": {
            "URINE": {
              "type": "URINE",
              "typeLabel": "URINE",
              "moment": "NONE",
              "momentLabel": "Nenhum",
              "boxColor": "#ffffff"
            }
          }
        }
      `);

      retorno = fakeFillMomentTypeMaps(retorno,getFakeMomentTypeList());

      return retorno;
    }


    function getMomentTypeAliquot(type, moment){
      var momentType = AliquotManagerService.getMomentType(type, moment);
      
    }

    function fakeColor(color){
      var retorno = "#bf0000";
      if(color && color.length > 0) retorno = color;
      return retorno;
    }

    function fakeMomentLabel(momentLabel, moment){
      var retorno;
      switch (moment.toUpperCase()) {
      case 'FASTING':
        retorno = "Jejum";
        break;
      case 'NONE':
        retorno = "Nenhum";
        break;
      case 'POST_OVERLOAD':
        retorno = "Pós";
        break;
      default:
        retorno = "Outro";
      }
      if(momentLabel && momentLabel.length > 0) retorno = momentLabel;
      return retorno;
    }

    function fakeTypeLabel(typeLabel, type){
      var retorno = type;
      if(typeLabel && typeLabel.length > 0) retorno = typeLabel;
      return retorno;
    }

    function fakeAliquotsConfig(aliquotsConfig){
      var retorno = JSON.parse(`[
                      {
                        "objectType": "AliquotDescriptor",
                        "name": "BIOSORO",
                        "label": "Bioquímica Soro",
                        "role": "exam",
                        "quantity": 1
                      },
                      {
                        "objectType": "AliquotDescriptor",
                        "name": "PCR",
                        "label": "PCR",
                        "role": "exam",
                        "quantity": 1
                      },
                      {
                        "objectType": "AliquotDescriptor",
                        "name": "FASTING_INSULINE",
                        "label": "Insulina Jejum",
                        "role": "exam",
                        "quantity": 1
                      },
                      {
                        "objectType": "AliquotDescriptor",
                        "name": "STORAGE",
                        "label": "Armazenamento",
                        "role": "storage",
                        "quantity": 8
                      }
                    ]`);
      var array = [];
      if(Object.prototype.toString.call(aliquotsConfig) == Object.prototype.toString.call(array) && aliquotsConfig.length > 0)
        retorno = aliquotsConfig;

      return retorno;
    }
    
    function fakeMomentTypeList(momentTypeList){
      var retorno = JSON.parse(`
        [
          {
            "type": "GEL",
            "typeLabel": "GEL",
            "moment": "FASTING",
            "momentLabel": "Jejum",
            "boxColor": "#ffcc00"
          },
          {
            "type": "EDTA",
            "typeLabel": "EDTA",
            "moment": "FASTING",
            "momentLabel": "Jejum",
            "boxColor": "#660066"
          },
          {
            "type": "FLUORIDE",
            "typeLabel": "FLUORIDE",
            "moment": "FASTING",
            "momentLabel": "Jejum",
            "boxColor": "#666666"
          },
          {
            "type": "GEL",
            "typeLabel": "GEL",
            "moment": "POST_OVERLOAD",
            "momentLabel": "Pós",
            "boxColor": "#ffcc00"
          },
          {
            "type": "FLUORIDE",
            "typeLabel": "FLUORIDE",
            "moment": "POST_OVERLOAD",
            "momentLabel": "Pós",
            "boxColor": "#666666"
          },
          {
            "type": "URINE",
            "typeLabel": "URINE",
            "moment": "NONE",
            "momentLabel": "Nenhum",
            "boxColor": "#ffffff"
          }
        ]
      `);
      var array = [];
      if(Object.prototype.toString.call(momentTypeList) == Object.prototype.toString.call(array) && momentTypeList.length > 0)
        retorno = momentTypeList;
      
      return retorno;
    }

    
    function fakeFillMomentTypeMaps(momentTypeMaps, momentTypeList){
      var retorno = momentTypeMaps;
      
      fakeFillTubeList(momentTypeMaps);
      
      momentTypeList.forEach(function(mt) {
        momentTypeMaps[mt.moment][mt.type].aliquotsConfig = fakeAliquotsConfig(momentTypeMaps[mt.moment][mt.type].aliquotsConfig);
      });

      return retorno;
    }

    function fakeFillTubeList(momentTypeMaps, tubeList){
      tubeList.forEach(function(tube) {
        var array = [];
        if(Object.prototype.toString.call(momentTypeMaps[tube.moment][tube.type].tubeList) != Object.prototype.toString.call(array))
          momentTypeMaps[tube.moment][tube.type].tubeList = [];
        
        momentTypeMaps[tube.moment][tube.type].tubeList.push(tube);
      });
    }

    //Object.keys(myObject).forEach(function(element) { });

    /* ------------------ Before Integration with Model  ------------------ */


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
      //TODO store error messages on model?
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
