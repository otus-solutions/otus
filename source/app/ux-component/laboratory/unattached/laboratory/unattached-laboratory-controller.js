(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('unattachedLaboratoryCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$timeout',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.laboratory.business.participant.LaboratoryLabelFactory',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.configuration.LaboratoryConfigurationService'
  ];

  function Controller($mdToast, $timeout, UnattachedLaboratoryService, LaboratoryLabelFactory, LoadingScreenService, LaboratoryConfigurationService) {
    var self = this;

    self.attacheLaboratory = attacheLaboratory;
    self.generateLabels = generateLabels;
    self.discardUnattached = discardUnattached;

    function discardUnattached() {
      LoadingScreenService.start();
      UnattachedLaboratoryService.discardUnattached(self.laboratoryData._id.$oid).then(function () {
        self.reloadData();
        LoadingScreenService.finish();
      }).catch(function () {
        if (error.data) {
            self.attacheError = "Laboratório não encontrado";
        } else {
          self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
        }
        LoadingScreenService.finish();
        $mdToast.show(
          $mdToast.simple()
            .textContent(self.attacheError)
            .hideDelay(10000)
        );
      })
    }

    function generateLabels() {
      self.labels = [];
      LoadingScreenService.start();
      UnattachedLaboratoryService.getById(self.laboratoryData._id.$oid).then(function (result) {
        result.tubes.map(function(tubeInfo) {
          var tubeDescriptor = LaboratoryConfigurationService.getTubeDescriptor(tubeInfo.type);
          var momentDescriptor = LaboratoryConfigurationService.getMomentDescriptor(tubeInfo.moment);

          tubeInfo.label = tubeDescriptor ? tubeDescriptor.label : '';
          tubeInfo.boxColor = tubeDescriptor ? tubeDescriptor.color : '';
          tubeInfo.momentLabel = momentDescriptor.label !== '' ? momentDescriptor.label : 'Nenhum';
          tubeInfo.typeLabel = tubeDescriptor.label;
          return tubeInfo
        });
        self.labels = LaboratoryLabelFactory.createForUnattached(angular.copy(result));
        $timeout(function() {
          $(".label-maker-" + self.laboratoryData._id.$oid).find("button").click();
        });
        LoadingScreenService.finish();
      }).catch(function (error) {
        if (error.data) {
          self.attacheError = "Laboratório não encontrado";
        } else {
          self.attacheError = "Ocorreu um erro, entre em contato com o administrador do sistema";
        }
        LoadingScreenService.finish();
        $mdToast.show(
          $mdToast.simple()
            .textContent(self.attacheError)
            .hideDelay(10000)
        );
      });
    }

    function attacheLaboratory() {
      self.attacheError = null;
      LoadingScreenService.start();
      UnattachedLaboratoryService.attacheLaboratoryToParticipant(self.laboratoryData.identification, self.recruitmentNumber).then(function () {
        self.reloadData();
        LoadingScreenService.finish();
      }).catch(function (error) {
        if (error.data) {
          if (error.data.MESSAGE.match("Participant with recruitment number")) {
            self.attacheError = "Numero de recrutamento " + self.recruitmentNumber + " não encontrado";
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
        $mdToast.show(
          $mdToast.simple()
            .textContent(self.attacheError)
            .hideDelay(10000)
        );
      });
    }
  }
}());
