(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .component('attacheLaboratory', {
      controller: 'attacheLaboratoryCtrl as $ctrl',
      templateUrl: 'app/ux-component/laboratory/attache-laboratory/attache-laboratory-template.html',
      bindings: {
        selectedParticipant: '=',
        subtitle: '=',
        text: '='
      }
    })
    .controller('attacheLaboratoryCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$scope',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.laboratory.business.unattached.UnattachedLaboratoryService',
    'otusjs.laboratory.business.participant.ParticipantLaboratoryService',
    'otusjs.laboratory.core.EventService',
    'otusjs.otus.dashboard.service.DashboardService'
  ];

  function Controller(
    $mdToast,
    $scope,
    DialogShowService,
    LoadingScreenService,
    UnattachedLaboratoryService,
    ParticipantLaboratoryService
  ) {
    var self = this;

    /* attr - var */
    self.UNEXPECTED_ERROR_MESSAGE = "Ocorreu um erro, entre em contato com o administrador do sistema";

    self.$onInit = onInit;
    /* Public methods */

    self.attacheLaboratory = attacheLaboratory

    function onInit() {
      self.hasLaboratory = false;
      self.ready = false;
      ParticipantLaboratoryService.onParticipantSelected(_setupLaboratory);
    }

    function attacheLaboratory() {
      self.attacheError = null;

      const textDialog = 'Deseja realmente vincular o laboratório código <b>'.concat(self.laboratoryIdentification)
        .concat('</b> ao participante <b>').concat(self.selectedParticipant.recruitmentNumber)
        .concat('</b><br /><b>O vínculo não poderá ser desfeito.</b>');

      DialogShowService.showConfirmationDialog('Confirmação de Vínculo', textDialog, 'Confirmação de vínculo')
        .then(function () {
          LoadingScreenService.start();
          UnattachedLaboratoryService.attacheLaboratory(self.laboratoryIdentification)
            .then(function () {
              _refreshLaboratory();
              LoadingScreenService.finish();
            })
            .catch(function (error) {
              LoadingScreenService.finish();
              _showToast('Laboratório não encontrado')
            });
        })
    }

    function _refreshLaboratory() {
      self.hasLaboratory = false;
      self.ready = false;
      ParticipantLaboratoryService.hasLaboratory()
        .then(function (hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          self.ready = true;
        });
    }

    function _setupLaboratory() {
      self.hasLaboratory = false;
      self.ready = false;
      ParticipantLaboratoryService.hasLaboratory()
        .then(function (hasLaboratory) {
          self.hasLaboratory = hasLaboratory;
          self.ready = true;
        });
    }

    function _showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .hideDelay(5000)
      );
    }
  }
}());
