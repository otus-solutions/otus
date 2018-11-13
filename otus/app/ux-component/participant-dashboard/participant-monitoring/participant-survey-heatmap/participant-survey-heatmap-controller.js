(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantHeatmapCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$scope',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.participant.business.ParticipantMonitoringService',
  ];

  function Controller($mdToast, $mdDialog, $scope, EventService, ApplicationStateService, DashboardService, ParticipantMonitoringService) {
    const CREATED = 'CREATED';
    const SAVED = 'SAVED';
    const FINALIZED = 'FINALIZED';
    const UNNECESSARY = 'UNNECESSARY';
    const UNDEFINED = 'UNDEFINED';
    const MULTIPLE = 'MULTIPLE';
    const Color = {
      CREATED: '#f4415c',
      FINALIZED: '#1ece8b',
      SAVED: '#f4ca41',
      UNNECESSARY: '#cecece',
      UNDEFINED: '#ffffff',
      MULTIPLE: '#ffa500'
    }

    var self = this;
    self.surveyList = [];
    self.legends = [];
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.getFlagColor = getFlagColor;
    self.selectParticipant = selectParticipant;
    self.getCurrentState = getCurrentState;
    self.showObservation = showObservation;

    /* Lifecycle methods */
    function onInit() {
      _loadParticipantData();
      _buildLegend();
      EventService.onParticipantSelected(_loadParticipantData);
      self.selectedParticipant = null;
    }

    function getFlagColor(survey) {
      switch (survey.status) {
        case CREATED:
          return Color.CREATED;
        case SAVED:
          return Color.SAVED;
        case FINALIZED:
          return Color.FINALIZED;
        case UNNECESSARY:
          return Color.UNNECESSARY;
        case UNDEFINED:
          return Color.UNDEFINED;
        case MULTIPLE:
          return Color.MULTIPLE;
      }
    }

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    function showObservation(event, survey) {
      $mdDialog.show({
        locals: { survey: survey },
        controller: _DialogController,
        templateUrl: 'app/ux-component/participant-dashboard/participant-monitoring/participant-survey-heatmap/survey-observation-dialog-template.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      }).then(function (observation) {
        if (_defineSurveyWithUnnecessary(observation, survey)) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Observação atualizada com sucesso.')
              .hideDelay(3000)
          );
        } else {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Ocorreu um erro. Tente novamente mais tarde.')
              .hideDelay(3000)
          );
        }
      }, function () { });
    }

    function getCurrentState() {
      ApplicationStateService.getCurrentState();
    }

    function _defineSurveyWithUnnecessary(observation, survey) {
      return ParticipantMonitoringService.defineSurveyWithUnnecessary(self.selectedParticipant.recruitmentNumber, observation, survey);
    }

    function _loadParticipantData() {
      DashboardService
        .getSelectedParticipant()
        .then(function (participantData) {
          self.selectedParticipant = participantData;
          self.surveyList = ParticipantMonitoringService.getStatusOfSurveys(participantData.recruitmentNumber);
        });
    }

    function _buildLegend() {
      self.legends.push({ label: 'Status criado.', color: Color.CREATED });
      self.legends.push({ label: 'Status salvo.', color: Color.SAVED });
      self.legends.push({ label: 'Status finalizado.', color: Color.FINALIZED });
      self.legends.push({ label: 'Status desnecessário.', color: Color.UNNECESSARY });
      self.legends.push({ label: 'Nenhuma atividade registrada.', color: Color.UNDEFINED });
      self.legends.push({ label: 'Multiplas atividades registradas.', color: Color.MULTIPLE });
    }

    function _DialogController($scope, $mdDialog, survey) {
      $scope.isUnnecessary;
      $scope.observation;

      onInit();
      function onInit() {
        if (survey.status === UNNECESSARY) {
          $scope.isUnnecessary = true;
          $scope.observation = survey.observation ? survey.observation : '';
        } else {
          $scope.isUnnecessary = false;
          $scope.observation = survey.observation ? survey.observation : '';
        }
      }

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.update = function () {
        $mdDialog.hide($scope.observation);
      };
    }
  }
}());
