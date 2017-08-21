(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('tubeList', {
      templateUrl: 'app/ux-component/laboratory/main-panel/tube-list/tube-list-template.html',
      bindings: {
        tubeList: '=',
        tubeConfiguration: '<',
        state: '<'
      },
      controller: controller
    });

  controller.$inject = [
     'otusjs.laboratory.business.participant.ParticipantLaboratoryService'
 ];

  function controller(ParticipantLaboratoryService) {
    var self = this;

    /* Public Interface */
    self.$onInit = onInit;


    function onInit() {
      _getMoments();
    }

    function _getMoments() {
      self.moments = [];
      //TODO remove to service - at tube creation
      self.tubeList.forEach(function(tube) {
        if (!self.moments.includes(tube.momentLabel)) {
          self.moments.push(tube.momentLabel);
        }
      });
    }
    return self;
  }


}());
