(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activityAutoFillEventCtrl', Controller);

  Controller.$inject = [
    '$mdDialog',
    '$mdToast',
    'SurveyFormFactory',
    'otusjs.application.dialog.DialogShowService',
    'otusjs.participant.business.ParticipantFollowUpService',
    'otusjs.model.activity.ActivityFactory',
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.deploy.ConfigurationRestService',
    'otusjs.activity.repository.ActivityRepositoryService',
    'otusjs.application.session.core.ContextService'
  ];

  function Controller($mdDialog, $mdToast, SurveyFormFactory, DialogShowService, ParticipantFollowUpService, ActivityFactory, ParticipantActivityService, ConfigurationRestService, ActivityRepositoryService, SessionContextService) {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      self.eventData = self.eventComponent.eventData;
      self.eventComponent.activateEvent = activateEvent;
    }

    function activateEvent() {
      _showDialog(self.eventData.description).then(() => {
        SessionContextService.getLoggedUser().then((user) => {
          ConfigurationRestService.getSurveyByAcronym(self.eventData.acronym).then((surveyForm) => {
            if (surveyForm.data.length > 0) {
              ParticipantActivityService
                .listAllCategories()
                .then((response) => {
                  if (response.length > 0) {
                    let activityConfiguration = {};
                    activityConfiguration.category = response[0];
                    let activity = ActivityFactory.createAutoFillActivity(SurveyFormFactory.fromJsonObject(surveyForm.data[surveyForm.data.length - 1]), user, self.eventComponent.selectedParticipant, activityConfiguration, "");
                    ActivityRepositoryService.createFollowUpActivity(activity).then((result) => {
                      self.eventData.activityId = result._id;
                      ParticipantFollowUpService.activateFollowUpEvent(self.eventComponent.selectedParticipant.recruitmentNumber, self.eventData).then(function (result) {
                        self.eventComponent.eventData.participantEvents.push(result);
                        self.eventComponent.eventData.status = "PENDING"
                      });
                    }).catch(() => {
                      _showToast(5000, "Ocorreu um erro, entre em contato com o administrador do sistema");
                    });
                  } else {
                    _showToast(3000, "Não existem categorias de atividade cadastradas no sistema");
                  }
                });
            } else {
              _showToast(3000, "Atividade não encontrada");
            }
          });
        });
      });
    }

    function _showToast(delay, msg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(msg)
          .position("right bottom")
          .hideDelay(delay)
      );
    }

    function _showDialog(msg) {
      var _exitDialog = {
        dialogToTitle:'Ativação de Evento',
        titleToText:'Ativar Evento?',
        textDialog: msg,
        ariaLabel:'Confirmação de cancelamento',
        buttons: [
          {
            message:'Ok',
            action:function(){$mdDialog.hide()},
            class:'md-raised md-primary'
          },
          {
            message:'Cancelar',
            action:function(){$mdDialog.cancel()},
            class:'md-raised md-no-focus'
          }
        ]
      };

      return DialogShowService.showDialog( _exitDialog);
    }
  }
}());
