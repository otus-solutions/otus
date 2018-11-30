(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusParticipantHeatmapCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
    '$scope',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.dashboard.core.EventService',
    'otusjs.application.state.ApplicationStateService',
    'otusjs.otus.dashboard.service.DashboardService',
    'otusjs.monitoring.business.ParticipantMonitoringService',
  ];

  function Controller($q, $mdToast, $mdDialog, $scope, LoadingScreenService, EventService, ApplicationStateService, DashboardService, ParticipantMonitoringService) {
    const CREATED = 'CREATED';
    const SAVED = 'SAVED';
    const FINALIZED = 'FINALIZED';
    const DOES_NOT_APPLY = 'DOES_NOT_APPLY';
    const UNDEFINED = 'UNDEFINED';
    const MULTIPLE = 'MULTIPLE';
    const AMBIGUITY = 'AMBIGUITY';
    const COLOR = {
      CREATED: '#ff6f69',
      FINALIZED: '#88d8b0',
      SAVED: '#ffeead',
      DOES_NOT_APPLY: '#cecece',
      UNDEFINED: '#ffffff',
      MULTIPLE: '#ffcc5c',
      AMBIGUITY: '#bae1ff'
    };

    var self = this;

    self.ERROR_MESSAGE = 'Atualmente não existem nenhum formulário disponível no sistema';
    self.LOAD_ERROR_MESSAGE = "Ocorreu um erro ao buscar o relatório de atividades";
    self.activityList = [];
    self.legends = [];
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.getFlagColor = getFlagColor;
    self.selectParticipant = selectParticipant;
    self.getCurrentState = getCurrentState;
    self.showObservation = showObservation;
    self.loadData = loadData;

    /* Lifecycle methods */
    function onInit() {
      _loadParticipant();
      _buildLegend();
      EventService.onParticipantSelected(_participantAvailable);
      self.selectedParticipant = null; //TODO review why
    }

    function getFlagColor(activity) {
      console.log('cham'); //TODO REMOVE AND FIX THIS MULTIPLE CALLS
      switch (activity.status) {
        case CREATED:
          return COLOR.CREATED;
        case SAVED:
          return COLOR.SAVED;
        case FINALIZED:
          return COLOR.FINALIZED;
        case DOES_NOT_APPLY:
          return COLOR.DOES_NOT_APPLY;
        case UNDEFINED:
          return COLOR.UNDEFINED;
        case MULTIPLE:
          return COLOR.MULTIPLE;
        case AMBIGUITY:
          return COLOR.AMBIGUITY;
      }
    }

    function selectParticipant(selectedParticipant) {
      self.selectedParticipant = selectedParticipant;
    }

    function showObservation(event, index, activity) {
      $mdDialog.show({
        locals: {activity: activity},
        controller: _DialogController,
        templateUrl: 'app/ux-component/otus-monitoring/participant-monitoring/participant-activity-heatmap/activity-observation-dialog-template.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      }).then(function (result) {
        LoadingScreenService.start();
        _defineActivityWithDoesNotApplies(result, index, activity).then(function () {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Atualização realizada com sucesso.')
              .hideDelay(5000)
          );
        })
          .catch(function () {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Ocorreu um erro. Tente novamente mais tarde.')
                .hideDelay(5000)
            );
          });
      }, function () {
      });
    }

    function getCurrentState() {
      ApplicationStateService.getCurrentState();
    }

    function _defineActivityWithDoesNotApplies(result, index, activity) {
      var defer = $q.defer();
      if (result.doesNotApply) {
        ParticipantMonitoringService.defineActivityWithDoesNotApplies(self.selectedParticipant.recruitmentNumber, result.observation, activity)
          .then(function (response) {
            self.activityList[index] = ParticipantMonitoringService.buildActivityStatus(response);
            LoadingScreenService.finish();
            defer.resolve();
          }).catch(function (e) {
          LoadingScreenService.finish();
          defer.reject();
        });
      } else {
        ParticipantMonitoringService.deleteNotAppliesOfActivity(self.selectedParticipant.recruitmentNumber, activity)
          .then(function (response) {
            self.activityList[index] = ParticipantMonitoringService.buildActivityStatus(response);
            LoadingScreenService.finish();
            defer.resolve();
          }).catch(function (e) {
          LoadingScreenService.finish();
          defer.reject();
        });
      }
      return defer.promise;
    }

    function loadData() {
      self.loading = true;
      self.error = false;

      ParticipantMonitoringService.buildActivityStatusList(self.selectedParticipant.recruitmentNumber)
        .then(function (result) {
          self.activityList = result;
          self.loading = false;
        })
        .catch(function (err) {
          self.loading = false;
          self.error = true;
        });
    }

    function _participantAvailable(participantData) {
      self.activityList = [];
      self.loadAvailable = true;
      selectParticipant(participantData);
    }

    function _loadParticipant() {
      return DashboardService
        .getSelectedParticipant()
        .then(function (participantData) {
          self.selectedParticipant = participantData;

        }).catch(function () {
      });
    }

    function _buildLegend() {
      self.legends.push({label: 'Criado.', color: COLOR.CREATED});
      self.legends.push({label: 'Salvo.', color: COLOR.SAVED});
      self.legends.push({label: 'Finalizado.', color: COLOR.FINALIZED});
      self.legends.push({label: 'Não realizado.', color: COLOR.DOES_NOT_APPLY});
      self.legends.push({label: 'Nenhuma atividade.', color: COLOR.UNDEFINED});
      self.legends.push({label: 'Multiplas atividades.', color: COLOR.MULTIPLE});
      self.legends.push({label: 'Ambiguidade.', color: COLOR.AMBIGUITY});
    }

    function _DialogController($scope, $mdDialog, activity) {
      const AMBIGUITY_STATE_DESCRIPTION = 'Atividade definida como não se aplica, porém, existe atividade(s) adicionada(s) ao participante!';
      const MULTIPLE_STATE_DESCRIPTION = 'Existe mais de uma atividade adicionada ao participante! Status e datas descritas abaixo:';
      $scope.disable;
      $scope.doesNotApply;
      $scope.observation;
      $scope.description;
      $scope.information;

      onInit();

      function onInit() {
        $scope.disable = true;
        $scope.doesNotApply = false;

        if (activity.status === DOES_NOT_APPLY) {
          $scope.doesNotApply = true;
          $scope.observation = activity.observation ? activity.observation : '';
        } else if (activity.status === AMBIGUITY) {
          $scope.doesNotApply = true;
          $scope.information = activity.information;
          $scope.description = AMBIGUITY_STATE_DESCRIPTION;
          $scope.observation = activity.observation ? activity.observation : '';
        } else if (activity.status === MULTIPLE) {
          $scope.information = activity.information;
          $scope.description = MULTIPLE_STATE_DESCRIPTION;
        }
      }

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.change = function () {
        if (!$scope.doesNotApply) {
          if (activity.status === DOES_NOT_APPLY || activity.status === AMBIGUITY) {
            $scope.disable = false;
          }
        } else {
          $scope.disable = false;
          if (!$scope.observation) {
            $scope.observation = "";
          }
        }
      };

      $scope.update = function () {
        var result = {};
        result.doesNotApply = $scope.doesNotApply;
        result.observation = $scope.observation;
        if ($scope.doesNotApply)
          $mdDialog.hide(result);
        else
          $mdDialog.hide(result);
      };

    }
  }
}());
