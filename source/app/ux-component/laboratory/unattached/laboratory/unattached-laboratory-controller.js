(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('unattachedLaboratoryCtrl', Controller);

  Controller.$inject = [
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.laboratory.business.participant.LaboratoryLabelFactory'
  ];

  function Controller(UnattachedLaboratoryService, LaboratoryLabelFactory) {
    var self = this;

    self.$onInit = onInit;
    self.attacheLaboratory = attacheLaboratory;
    self.generateLabels = generateLabels;

    function onInit() {

    }

    function generateLabels() {
      UnattachedLaboratoryService.getByID()
      // LaboratoryLabelFactory.self.laboratoryData
    }

    function attacheLaboratory() {
      self.attacheError = null;
      LoadingScreenService.start();
      UnattachedLaboratoryService.attacheLaboratory(self.laboratoryIdentification).then(function () {
        LoadingScreenService.finish();
      }).catch(function (error) {
        self.attacheHaveErrors = true;
        if (error.data) {
          if (error.data.MESSAGE.match("Laboratory not found")) {
            self.attacheError = "Laboratório não encontrado";
          } else if (error.data.MESSAGE.match("Laboratory is already attached")) {
            self.attacheError = "Laboratório já foi vinculado a um participante";
          } else if (error.data.MESSAGE.match("Invalid configuration")) {
            if (error.data.CONTENT.laboratoryCollectGroup !== error.data.CONTENT.participantCollectGroup) {
              self.attacheError = "O laboratório e o participante devem pertencer ao mesmo grupo de controle de qualidade";
            }
            if (error.data.CONTENT.laboratoryFieldCenter !== error.data.CONTENT.participantFieldCenter) {
              if (self.attacheError) {
                self.attacheError += " e " + "ao mesmo centro"
              } else {
                self.attacheError = "O laboratório e o participante devem pertencer ao mesmo centro";
              }
            }
          } else {
            self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
          }
        } else {
          self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
        }
        LoadingScreenService.finish();
      });
    }
  }
}());
