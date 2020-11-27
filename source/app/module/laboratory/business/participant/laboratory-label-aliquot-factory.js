(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant')
    .factory('otusjs.laboratory.business.participant.LaboratoryLabelAliquotFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    /* Public interface */
    self.create = create;
    self.createForUnattached = createForUnattached;

    function create(participant, laboratory) {
      return new LaboratoryLabelAliquotFactory(participant, laboratory);
    }

    function createForUnattached(laboratory) {
      return new LaboratoryLabelAliquotFactory(null, laboratory);
    }

    return self;
  }

  function LaboratoryLabelAliquotFactory(participant, laboratory) {
    var NONE = 'Nenhum';
    var DEFAULT = 'DEFAULT';
    var self = this;

    if (participant){
      self.recruitment_number = participant.recruitmentNumber;
      self.participant_name = participant.name;
      self.gender = participant.sex;
      self.birthday = _convertFormatDate(new Date(participant.birthdate.value));
      self.laboratoryFieldCenter = participant.fieldCenter.acronym;
    } else {
      self.recruitment_number = "_______________";
      self.participant_name = "_______________";
      self.gender = "__";
      self.birthday = "__/__/____";
      self.laboratoryIdentification = laboratory.identification;
      self.laboratoryFieldCenter = laboratory.fieldCenterAcronym;
    }

    self.printStructure = {
      type: "",
      size: "",
      identified: "",
      columns: "",
    }

    self.aliquots = []


    function _convertFormatDate(birthdate) {
      var date = new Date(birthdate);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

  }
}());
