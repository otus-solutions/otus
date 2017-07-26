(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.business')
    .factory('otusjs.laboratory.business.LaboratoryLabelFactory', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    /* Public interface */
    self.create = create;

    function create(participant, laboratory) {
      return new LaboratoryLabel(participant, laboratory);
    }

    return self;
  }

  function LaboratoryLabel(participant, laboratory) {
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
      var labels = {};
      labels.GEL = 'Gel';
      labels.FLUORIDE = 'Fluoreto';
      labels.EDTA = 'EDTA';
      labels.URINE = 'Urina';
      labels.CITRATE = 'Citrato';
      labels.EDTA_DNA = 'EDTA DNA';

      labels.FASTING = 'Jejum';
      labels.MIDDLE = 'Meio';
      labels.POST_OVERLOAD = 'Pós';
      labels.NONE = '';

      tubes.forEach(function(tube) {
        tube.label = labels[tube.type] + ' ' + labels[tube.moment];
      });
    }

    function _buildNameParticipantLabel(name) {
      var result = name.split(' ');
      return result[0] + ' ' + result[result.length - 1];
    }

  }
}());
