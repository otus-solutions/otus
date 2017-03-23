(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('otusLaboratory', {
      controller: Controller,
      templateUrl: 'app/ux-component/laboratory/laboratory-start.html'
    });

  Controller.$inject = [
    'otusjs.laboratory.business.ParticipantLaboratoryService'
  ];

  function Controller(ParticipantLaboratoryService) {
    var self = this;
    self.hasLaboratory = false;
    self.json = '';
    // self.json = Servicoquevaipegarojsonviarestrequest;

    /* Public methods */
    self.$onInit = onInit;
    self.intializeLaboratory = intializeLaboratory;

    function onInit() {
      ParticipantLaboratoryService
        .hasLaboratory()
        .then(function(hasLaboratory) {
          self.hasLaboratory = hasLaboratory
          if (hasLaboratory) {
            _fetchLaboratory();
          }
        });
    }

    function intializeLaboratory() {
      ParticipantLaboratoryService
        .initializeLaboratory()
        .then(function(laboratory) {
          if (laboratory) {
            self.hasLaboratory = true;
            _fetchLaboratory();
          }
        });
    }

    function _fetchLaboratory() {
      ParticipantLaboratoryService
        .getLaboratory()
        .then(function() {
          self.json = ParticipantLaboratoryService.toJson();
        });
    }
  }
}());
