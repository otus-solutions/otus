(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant')
    .factory('otusjs.laboratory.business.participant.LaboratoryLabelFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(participant, laboratory, tubeLabels) {
      return new LaboratoryLabel(participant, laboratory, tubeLabels);
    }

    return self;
  }

  function LaboratoryLabel(participant, laboratory, tubeLabels) {
    var NONE = 'Nenhum';
    var DEFAULT = 'DEFAULT';
    var self = this;

    self.recruitment_number = participant.recruitmentNumber;
    self.participant_name = participant.name;
    self.gender = participant.sex;
    self.birthday = _convertFormatDate(new Date(participant.birthdate.value));
    self.cq_group = (laboratory.collectGroupName !== undefined && laboratory.collectGroupName !== DEFAULT) ? laboratory.collectGroupName : NONE;
    self.tubes = laboratory.tubes;
    _buildTubeLabel(self.tubes);



    function _convertFormatDate(birthdate) {
      var date = new Date(birthdate);
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    function _buildTubeLabel(tubes) {
      tubes.forEach(function(tube) {
        tube.label = tube.label + ' ' + tube.momentLabel;
      });
    }

    function _buildNameParticipantLabel(name) {
      var result = name.split(' ');
      return result[0] + ' ' + result[result.length - 1];
    }

  }
}());
