(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.aliquot')
    .service('otusjs.laboratory.aliquot.AliquotTubeService', Service);

  Service.$inject = [
    'otusjs.laboratory.aliquot.AliquotManagerService',
    'otusjs.laboratory.business.ParticipantLaboratoryService',
    '$q'
  ];

  function Service(AliquotManagerService, ParticipantLaboratoryService, $q) {
    var self = this;
    var _test;

    self.buildMomentTypeList = buildMomentTypeList;
    self.getMomentTypeAliquot = getMomentTypeAliquot;
    self.fieldsChanged = fieldsChanged;
    self.aliquotsWithErrors = aliquotsWithErrors;
    self.populateAliquotsArray = populateAliquotsArray;
    self.getNewAliquots = getNewAliquots;
    self.saveAliquoting = saveAliquoting;
    self.updateAliquots = updateAliquots;

    function updateAliquots(updateStructure, fakeMe) {
      // var defer = $q.defer();
      // defer.resolve();
      // if (fakeMe) {
      // }else {
      //    defer.reject();
      // }
      // return defer.promise;
      return ParticipantLaboratoryService.updateAliquots(updateStructure);
    }

    function saveAliquoting(newAliquots, momentType, results){
      return _saveFakeAliquots(newAliquots,momentType, results);
    }

    function _saveFakeAliquots(newAliquots, momentType, results){
      var results = results ? results : true;

      newAliquots.forEach(function(aliquot) {
        var newAliquot = {
          objectType: "Aliquot",
          name: aliquot.name,
          role: aliquot.role,
          code: aliquot.aliquotCode,
          container: aliquot.container,
          collectionData: {
            objectType: "AliquotCollectionData",
            metadata: "",
            operator: "jose.maria@teste.com",
            time: new Date().toISOString()
          },
          tubeCode: aliquot.tubeCode,
          label: aliquot.label
        };

        momentType.collectedAliquots.push(newAliquot);
      });

      return results;
    }

    function fieldsChanged(momentType){
      var changed = false;
      var originalAliquots = momentType.originalExams.concat(momentType.originalStores);
      var newAliquots = momentType.exams.concat(momentType.stores);

      for (var i = 0; i < newAliquots.length; i++) {
        if(originalAliquots[i].tubeCode != newAliquots[i].tubeCode
        || originalAliquots[i].aliquotCode != newAliquots[i].aliquotCode){
          changed = true;
          break
        }
      }

      return changed;
    }

    function getNewAliquots(momentType){
      var originalAliquots = momentType.originalExams.concat(momentType.originalStores);
      var aliquotArray = momentType.exams.concat(momentType.stores);
      var newAliquotsArray = [];

      for (var i = 0; i < aliquotArray.length; i++) {
        if((originalAliquots[i].tubeCode != aliquotArray[i].tubeCode
        || originalAliquots[i].aliquotCode != aliquotArray[i].aliquotCode) && aliquotArray[i].aliquotCode && aliquotArray[i].isSaved == false){
          aliquotArray[i].tubeCode = aliquotArray[i].tubeCode ? aliquotArray[i].tubeCode : aliquotArray[i].placeholder;
          newAliquotsArray.push(aliquotArray[i]);
        }
      }

      return newAliquotsArray;
    }


    function aliquotsWithErrors(momentType){
      var hasErrors = false;
      var aliquotArray = momentType.exams.concat(momentType.stores);

      for (var i = 0; i < aliquotArray.length; i++) {
        if(aliquotArray[i].aliquotMessage || aliquotArray[i].tubeMessage){
          if(!aliquotArray[i].isSaved){
            hasErrors = true;
            break;
          }
        }
      }

      return hasErrors;
    }

    function buildMomentTypeList(tubeList){
      var momentTypeList = AliquotManagerService.buildMomentTypeList(tubeList);
      return momentTypeList;
    }

    function populateAliquotsArray(momentType){
      var indexStorage = 0;
      var indexExam = 0;
      var stores = [];
      var exams = [];
      momentType.availableAliquots.forEach(function(aliquot){
        var aliquotStructure = {
                                  aliquotCode: "",
                                  tubeCode: "",
                                  container: "",
                                  containerLabel: "",
                                  placeholder: "",
                                  aliquotMessage: "",
                                  tubeMessage: "",
                                  operator: "",
                                  date: "",
                                  time:"",
                                  isSaved: false
                                };

        var role = "EXAM";
        var index = indexExam;

        if(aliquot.name.toUpperCase() == "STORAGE"){
          role = "storage";
          index = indexStorage;
        }

        aliquotStructure.name = aliquot.name;
        aliquotStructure.label = aliquot.label ? aliquot.label : aliquot.name;
        aliquotStructure.containerLabel = aliquotStructure.label;

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

      momentType.originalStores = JSON.parse(JSON.stringify(momentType.stores));
      momentType.originalExams = JSON.parse(JSON.stringify(momentType.exams));

      momentType.repeatedAliquots = [];

      return momentType;
    }

    function fillAliquotsWithCollectedAliquots(momentType){
      momentType.collectedAliquots.forEach(function(collectedAliquot){
        var arrayAliquots = momentType.exams;

        if(collectedAliquot.role.toUpperCase() == "STORAGE") arrayAliquots = momentType.stores;

        for (var i = 0, endLoop = false; i < arrayAliquots.length && !endLoop; i++) {
          var aliquot = arrayAliquots[i];
          if(aliquot.tubeCode == "" && aliquot.name.toUpperCase() == collectedAliquot.name.toUpperCase()){
            aliquot.tubeCode = collectedAliquot.tubeCode;
            //Apaga Daqui
            if(collectedAliquot.code.toString().length == 8) collectedAliquot.code = `${collectedAliquot.code}9`;
            //Até Aqui
            aliquot.aliquotCode = collectedAliquot.code;
            aliquot.isSaved = true;
            aliquot.operator = collectedAliquot.aliquotCollectionData.operator.toLowerCase();
            var dateTime = new Date(collectedAliquot.aliquotCollectionData.time)
            aliquot.date = dateTime.toLocaleDateString();
            aliquot.time = dateTime.toLocaleTimeString();
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
                        "role": "EXAM",
                        "quantity": 1
                      },
                      {
                        "objectType": "AliquotDescriptor",
                        "name": "PCR",
                        "label": "PCR",
                        "role": "EXAM",
                        "quantity": 1
                      },
                      {
                        "objectType": "AliquotDescriptor",
                        "name": "FASTING_INSULINE",
                        "label": "Insulina Jejum",
                        "role": "EXAM",
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
  }
}());
