(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant.aliquot')
    .service('otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService', Service);

  Service.$inject = [
    'otusjs.laboratory.business.participant.aliquot.AliquotManagerService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    '$q',
    'AliquotStructureFactory'
  ];

  function Service(AliquotManagerService, ParticipantLaboratoryService, $q, AliquotStructureFactory) {
    var self = this;

    self.buildMomentTypeList = buildMomentTypeList;
    self.getMomentTypeAliquot = getMomentTypeAliquot;
    self.areFieldsChanged = areFieldsChanged;
    self.aliquotsWithErrors = aliquotsWithErrors;
    self.populateAliquotsArray = populateAliquotsArray;
    self.getNewAliquots = getNewAliquots;
    self.updateAliquots = updateAliquots;
    self.removeAliquot = removeAliquot;

    function updateAliquots(updateStructure) {
      return ParticipantLaboratoryService.updateAliquots(updateStructure);
    }

    function removeAliquot(aliquotCode) {
      return ParticipantLaboratoryService.removeAliquot(aliquotCode);
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

      momentType = fillAliquotsWithCollectedAliquots(momentType);

      momentType.originalStorages = JSON.parse(JSON.stringify(momentType.storages));
      momentType.originalExams = JSON.parse(JSON.stringify(momentType.exams));

      momentType.repeatedAliquots = [];

      return momentType;
    }

    function fillAliquotsWithCollectedAliquots(momentType){
      momentType.collectedAliquots.forEach(function(collectedAliquot){
        var arrayAliquots = momentType.exams;

        if(collectedAliquot.role.toUpperCase() == "STORAGE") arrayAliquots = momentType.storages;

        for (var i = 0, endLoop = false; i < arrayAliquots.length && !endLoop; i++) {
          var aliquot = arrayAliquots[i];
          if(aliquot.tubeCode === "" && aliquot.name.toUpperCase() == collectedAliquot.name.toUpperCase()){
            aliquot.tubeCode = collectedAliquot.tubeCode;
            aliquot.aliquotCode = collectedAliquot.code;
            aliquot.isSaved = true;
            aliquot.operator = collectedAliquot.aliquotCollectionData.operator.toLowerCase();
            var dateTime = new Date(collectedAliquot.aliquotCollectionData.time);
            var dateProcessing = new Date(collectedAliquot.aliquotCollectionData.processing);
            if (isNaN(dateProcessing)) {
              aliquot.processing = "";
            } else {
              aliquot.processing = dateProcessing;
            }
            aliquot.date = dateTime;
            endLoop = true;
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
