(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.IssueFactory', Factory);

  Factory.$inject = [ ];

  function Factory() {
    let self = this;
    /* Public methods */
    self.create = create;
    self.fromJsonObject = fromJsonObject;

    function create() {

    }

    function fromJsonObject(item, participant){
      return angular.extend(item, item, participant);

      // return angular.extend(item, item, {
      //     rn: participant.recruitmentNumber,
      //     name: participant.name,
      //     center: participant.fieldCenter.acronym
      // });
    }

    return self;
  }
}());
