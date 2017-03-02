(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business')
    .factory('otusjs.laboratory.business.ParticipantLaboratoryFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new ToJson();
    }

    return self;
  }

  function ToJson() {
    var self = this;
    self.toJson = toJson;

    function _convertFormatDate(birthdate) {
      var date = new Date(birthdate);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    function toJson(participant, laboratory) {
      var json = {};

      json.recruitment_number = participant.recruitmentNumber;
      json.participant_name = participant.name;
      json.gender = participant.sex;
      json.birthday = _convertFormatDate(new Date(participant.birthdate.value));
      json.cq_group = laboratory.cqGroup || 'Nenhum';
      json.tubes = laboratory.tubes;

      return JSON.stringify(json);
    }

  }
}());
