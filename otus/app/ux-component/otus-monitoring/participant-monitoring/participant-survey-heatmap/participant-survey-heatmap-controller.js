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
    'otusjs.monitoring.business.ParticipantMonitoringService',
  ];

  function Controller($mdToast, $mdDialog, $scope, EventService, ApplicationStateService, DashboardService, ParticipantMonitoringService) {
    const CREATED = 'CREATED';
    const SAVED = 'SAVED';
    const FINALIZED = 'FINALIZED';
    const DOES_NOT_APPLY = 'DOES_NOT_APPLY';
    const UNDEFINED = 'UNDEFINED';
    const MULTIPLE = 'MULTIPLE';
    const Color = {
      CREATED: '#f4415c',
      FINALIZED: '#1ece8b',
      SAVED: '#f4ca41',
      DOES_NOT_APPLY: '#cecece',
      UNDEFINED: '#ffffff',
      MULTIPLE: '#ffa500'
    };

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
    };

    function getFlagColor(survey) {
      switch (survey.status) {
        case CREATED:
          return Color.CREATED;
        case SAVED:
          return Color.SAVED;
        case FINALIZED:
          return Color.FINALIZED;
        case DOES_NOT_APPLY:
          return Color.DOES_NOT_APPLY;
        case UNDEFINED:
          return Color.UNDEFINED;
        case MULTIPLE:
          return Color.MULTIPLE;
      }
    };

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    };

    function showObservation(event, survey) {
      $mdDialog.show({
        locals: { survey: survey },
        controller: _DialogController,
        templateUrl: 'app/ux-component/otus-monitoring/participant-monitoring/participant-survey-heatmap/survey-observation-dialog-template.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      }).then(function (observation) {
        if (_defineSurveyWithDoesNotApply(observation, survey)) {
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
    };

    function getCurrentState() {
      ApplicationStateService.getCurrentState();
    };

    function _defineSurveyWithDoesNotApply(observation, survey) {
      return ParticipantMonitoringService.defineSurveyWithDoesNotApply(self.selectedParticipant.recruitmentNumber, observation, survey);
    };

    function _loadParticipantData() {
      DashboardService
        .getSelectedParticipant()
        .then(function (participantData) {
          self.selectedParticipant = participantData;
          self.surveyList = ParticipantMonitoringService.getStatusOfSurveys(participantData.recruitmentNumber);
        });
    };

    function _buildLegend() {
      self.legends.push({ label: 'Criado.', color: Color.CREATED });
      self.legends.push({ label: 'Salvo.', color: Color.SAVED });
      self.legends.push({ label: 'Finalizado.', color: Color.FINALIZED });
      self.legends.push({ label: 'Não aplicado.', color: Color.DOES_NOT_APPLY });
      self.legends.push({ label: 'Nenhuma atividade.', color: Color.UNDEFINED });
      self.legends.push({ label: 'Multiplas atividades.', color: Color.MULTIPLE });
    };

    function _DialogController($scope, $mdDialog, survey) {
      $scope.doesNotApply;
      $scope.observation;

      onInit();
      function onInit() {
        if (survey.status === DOES_NOT_APPLY) {
          $scope.doesNotApply = true;
          $scope.observation = survey.observation ? survey.observation : '';
        } else {
          $scope.doesNotApply = false;
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
    };
  }
}());
