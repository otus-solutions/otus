(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantHeatmapCtrl', Controller);

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    '$scope',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.monitoring.business.ParticipantMonitoringService',
  ];

  function Controller($mdToast, $mdDialog, $scope, LoadingScreenService, EventService, ApplicationStateService, DashboardService, ParticipantMonitoringService) {
    const CREATED = 'CREATED';
    const SAVED = 'SAVED';
    const FINALIZED = 'FINALIZED';
    const DOES_NOT_APPLY = 'DOES_NOT_APPLY';
    const UNDEFINED = 'UNDEFINED';
    const MULTIPLE = 'MULTIPLE';
    const AMBIGUITY = 'AMBIGUITY';
    const Color = {
      CREATED: '#88d8b0',
      FINALIZED: '#ff6f69',
      SAVED: '#ffeead',
      DOES_NOT_APPLY: '#cecece',
      UNDEFINED: '#ffffff',
      MULTIPLE: '#ffcc5c',
      AMBIGUITY: '#bae1ff'
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
        case AMBIGUITY:
          return Color.AMBIGUITY;
      }
    };

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    };

    function showObservation(event, index, survey) {
      $mdDialog.show({
        locals: { survey: survey },
        controller: _DialogController,
        templateUrl: 'app/ux-component/otus-monitoring/participant-monitoring/participant-survey-heatmap/survey-observation-dialog-template.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      }).then(function (observation) {
        LoadingScreenService.start();
        if (_defineActivityWithDoesNotApplies(observation, index, survey)) {
          LoadingScreenService.finish();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Observação atualizada com sucesso.')
              .hideDelay(5000)
          );
        } else {
          LoadingScreenService.finish();
          $mdToast.show(
            $mdToast.simple()
              .textContent('Ocorreu um erro. Tente novamente mais tarde.')
              .hideDelay(5000)
          );
        }
      }, function () { });
    };

    function getCurrentState() {
      ApplicationStateService.getCurrentState();
    };

    function _defineActivityWithDoesNotApplies(observation, index, survey) {
      var response = ParticipantMonitoringService.defineActivityWithDoesNotApplies(self.selectedParticipant.recruitmentNumber, observation, survey);
      self.surveyList[index] = ParticipantMonitoringService.buildActivityStatus(response);
      return response;
    };

    function _loadParticipantData() {
      DashboardService
        .getSelectedParticipant()
        .then(function (participantData) {
          self.selectedParticipant = participantData;
          self.surveyList = ParticipantMonitoringService.getStatusOfActivities(participantData.recruitmentNumber);
        });
    };

    function _buildLegend() {
      self.legends.push({ label: 'Criado.', color: Color.CREATED });
      self.legends.push({ label: 'Salvo.', color: Color.SAVED });
      self.legends.push({ label: 'Finalizado.', color: Color.FINALIZED });
      self.legends.push({ label: 'Não aplicado.', color: Color.DOES_NOT_APPLY });
      self.legends.push({ label: 'Nenhuma atividade.', color: Color.UNDEFINED });
      self.legends.push({ label: 'Multiplas atividades.', color: Color.MULTIPLE });
      self.legends.push({ label: 'Ambiguidade.', color: Color.AMBIGUITY });
    };

    function _DialogController($scope, $mdDialog, survey) {
      $scope.doesNotApply;
      $scope.observation;
      $scope.description;
      $scope.information;

      onInit();
      function onInit() {
        if (survey.status === DOES_NOT_APPLY) {
          $scope.doesNotApply = true;
          $scope.observation = survey.observation ? survey.observation : '';
        } else if (survey.status === AMBIGUITY) {
          $scope.doesNotApply = true;
          $scope.information = survey.information;
          $scope.description = survey.description;
          $scope.observation = survey.observation ? survey.observation : '';
        } else if (survey.status === MULTIPLE) {
          $scope.information = survey.information;
          $scope.description = survey.description;
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
