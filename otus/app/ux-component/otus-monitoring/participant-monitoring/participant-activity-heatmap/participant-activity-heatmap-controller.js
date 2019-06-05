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
    const DOES_NOT_APPLY = 'DOES_NOT_APPLY';
    const MULTIPLE = 'MULTIPLE';
    const AMBIGUITY = 'AMBIGUITY';

    var self = this;

    self.ERROR_MESSAGE = 'Atualmente, não existe nenhum formulário disponível no sistema';
    self.LOAD_ERROR_MESSAGE = "Ocorreu um erro ao buscar o relatório de atividades";
    self.activityList = [];
    self.legends = [];
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */;
    self.selectParticipant = selectParticipant;
    self.getCurrentState = getCurrentState;
    self.showObservation = showObservation;
    self.loadData = loadData;
    self.COLOR = {
      CREATED: '#ff6f69',
      FINALIZED: '#88d8b0',
      SAVED: '#ffeead',
      DOES_NOT_APPLY: '#cecece',
      UNDEFINED: '#ffffff',
      MULTIPLE: '#ffcc5c',
      AMBIGUITY: '#bae1ff'
    };

    /* Lifecycle methods */
    function onInit() {
      _loadParticipant();
      _buildLegend();
      EventService.onParticipantSelected(_participantAvailable);
      self.selectedParticipant = null; //TODO review why
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
          self.showActivitySignal = true;
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
      self.showActivitySignal = false;
      self.selectedParticipant = participantData;
      selectParticipant(participantData);
    }

    function _loadParticipant() {
      return DashboardService
        .getSelectedParticipant()
        .then(function (participantData) {
          _participantAvailable(participantData);
        }).catch(function () {
        });
    }

    function _buildLegend() {
      self.legends.push({label: 'Criada.', color: self.COLOR.CREATED});
      self.legends.push({label: 'Salva.', color: self.COLOR.SAVED});
      self.legends.push({label: 'Finalizada.', color: self.COLOR.FINALIZED});
      self.legends.push({label: 'Não será realizada.', color: self.COLOR.DOES_NOT_APPLY});
      self.legends.push({label: 'Nenhuma atividade.', color: self.COLOR.UNDEFINED});
      self.legends.push({label: 'Múltiplas atividades.', color: self.COLOR.MULTIPLE});
      self.legends.push({label: 'Ambiguidade.', color: self.COLOR.AMBIGUITY});
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