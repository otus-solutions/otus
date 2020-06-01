(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.IssueFactory', Factory);

  Factory.$inject = [
    'otusjs.participant.business.ParticipantManagerService'
  ];

  function Factory() {
    let self = this;
    /* Public methods */
    self.create = create;
    self.fromJsonObject = fromJsonObject;

    function create() {

    }

    function fromJsonObject(participant){
      return {
        rn: participant.recruitmentNumber,
        name: participant.name,
        center: participant.fieldCenter.acronym
      };
    }

    return self;
  }
}());
