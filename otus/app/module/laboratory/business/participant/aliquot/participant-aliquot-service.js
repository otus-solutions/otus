(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant.aliquot')
    .service('otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService', Service);

  Service.$inject = [
    'otusjs.laboratory.business.participant.aliquot.AliquotManagerService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.participant.ParticipantAliquotFactory',
    '$q',
    'AliquotStructureFactory'
  ];

  function Service(AliquotManagerService, ParticipantLaboratoryService, ParticipantAliquotFactory, $q, AliquotStructureFactory) {
    var self = this;

    self.buildMomentTypeList = buildMomentTypeList;
    self.getMomentTypeAliquot = getMomentTypeAliquot;
    self.areFieldsChanged = areFieldsChanged;
    self.aliquotsWithErrors = aliquotsWithErrors;
    self.convertStorageAliquot = convertStorageAliquot;
    self.populateAliquotsArray = populateAliquotsArray;
    self.getNewAliquots = getNewAliquots;
    self.updateAliquots = updateAliquots;
    self.deleteAliquot = deleteAliquot;

    function updateAliquots(updateStructure) {
      return ParticipantLaboratoryService.updateAliquots(updateStructure);
    }

    function convertStorageAliquot(aliquot) {
      return ParticipantLaboratoryService.convertStorageAliquot(aliquot);
    }

    function deleteAliquot(aliquotCode) {
      return ParticipantLaboratoryService.deleteAliquot(aliquotCode);
    }

    function areFieldsChanged(momentType){
      var changed = false;

      if(momentType){
        var originalAliquots = momentType.originalExams.concat(momentType.originalStorages);
        var newAliquots = momentType.exams.concat(momentType.storages);

        for (var i = 0; i < newAliquots.length; i++) {
          if(originalAliquots[i].tubeCode != newAliquots[i].tubeCode
          || originalAliquots[i].aliquotCode != newAliquots[i].aliquotCode){
            changed = true;
            break;
          }
        }
      }

      return changed;
    }

    function getNewAliquots(momentType){
      var originalAliquots = momentType.originalExams.concat(momentType.originalStorages);
      var aliquotArray = momentType.exams.concat(momentType.storages);
      var newAliquotsArray = [];

      for (var i = 0; i < aliquotArray.length; i++) {
        if((originalAliquots[i].tubeCode != aliquotArray[i].tubeCode
        || originalAliquots[i].aliquotCode != aliquotArray[i].aliquotCode) && aliquotArray[i].aliquotCode && aliquotArray[i].isSaved === false){
          aliquotArray[i].tubeCode = aliquotArray[i].tubeCode ? aliquotArray[i].tubeCode : aliquotArray[i].placeholder;
          newAliquotsArray.push(aliquotArray[i]);
        }
      }

      return newAliquotsArray;
    }


    function aliquotsWithErrors(momentType){
      var hasErrors = false;
      var aliquotArray = momentType.exams.concat(momentType.storages);

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
      var storages = [];
      var exams = [];
      momentType.availableAliquots.forEach(function(aliquot){

        if(aliquot.role.toUpperCase() == "STORAGE"){
          aliquot.index = indexStorage;
        } else {
          aliquot.index = indexExam;
        }
        var aliquotStructure = AliquotStructureFactory.create(aliquot).toJSON();

        if(aliquot.role.toUpperCase() == "STORAGE"){
          storages.push(aliquotStructure);
          indexStorage++;
        } else {
          exams.push(aliquotStructure);
          indexExam++;
        }
      });

      momentType.storages = storages;
      momentType.exams = exams;
      momentType.additionalExams = [];

      momentType = fillAliquotsWithCollectedAliquots(momentType);

      momentType.originalStorages = JSON.parse(JSON.stringify(momentType.storages));
      momentType.originalExams = JSON.parse(JSON.stringify(momentType.exams));

      momentType.repeatedAliquots = [];

      return momentType;
    }

    function fillAliquotsWithCollectedAliquots(momentType){
      momentType.collectedAliquots.forEach(function(collectedAliquot){
        var dateTime = new Date(collectedAliquot.aliquotCollectionData.time);
        var dateProcessing = new Date(collectedAliquot.aliquotCollectionData.processing);
        collectedAliquot.aliquotCode = collectedAliquot.code;
        collectedAliquot.isSaved = true;
        collectedAliquot.operator = collectedAliquot.aliquotCollectionData.operator.toLowerCase();
        if (isNaN(dateProcessing)) {
          collectedAliquot.processing = "";
        } else {
          collectedAliquot.processing = dateProcessing;
        }
        collectedAliquot.date = dateTime;

        if (collectedAliquot.isConverted){
          momentType.additionalExams.push(collectedAliquot);
        } else {
          var arrayAliquots = momentType.exams;

          if(collectedAliquot.role.toUpperCase() == "STORAGE") arrayAliquots = momentType.storages;

          for (var i = 0, endLoop = false; i < arrayAliquots.length && !endLoop; i++) {
            var aliquot = arrayAliquots[i];
            if(aliquot.tubeCode === "" && aliquot.name.toUpperCase() == collectedAliquot.name.toUpperCase()){
              if(collectedAliquot.role.toUpperCase() == "STORAGE") aliquot.convertStorage = collectedAliquot.convertStorage;
              aliquot.getHistoryByType = collectedAliquot.getHistoryByType;
              aliquot.tubeCode = collectedAliquot.tubeCode;
              aliquot.aliquotHistory = collectedAliquot.aliquotHistory;
              aliquot.aliquotCode = collectedAliquot.aliquotCode;
              aliquot.isSaved = true;
              aliquot.operator = collectedAliquot.operator;
              aliquot.processing = collectedAliquot.processing;
              aliquot.date = collectedAliquot.date;
              endLoop = true;
            }
          }
        }
      });

      return momentType;
    }

    function getMomentTypeAliquot(type, moment){
      var momentType = AliquotManagerService.getMomentType(type, moment);
    }
  }
}());
