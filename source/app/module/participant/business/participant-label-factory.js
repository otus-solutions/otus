(function() {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .factory('otusjs.participant.business.ParticipantLabelFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    self.create = create;

    function create(participant) {
      return new ParticipantLabel(participant);
    }

    return self;
  }

  function ParticipantLabel(participant) {
    var NONE = 'Nenhum';
    var DEFAULT = 'DEFAULT';
    var self = this;

    self.recruitment_number = participant.recruitmentNumber;
    self.participant_name = participant.name ? participant.name : "______________";
    self.gender = participant.sex ? participant.name : "__";
    self.birthday = self.birthday ? _convertFormatDate(new Date(participant.birthdate.value)) : "__/__/____";
    self.printStructure = {
      type: "",
      size: "",
      identified: "",
      columns: "",
    }

    function _convertFormatDate(birthdate) {
      var date = new Date(birthdate);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    function _buildNameParticipantLabel(name) {
      var result = name.split(' ');
      return result[0] + ' ' + result[result.length - 1];
    }

  }
}());
