(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .controller('otusParticipantExamHeatmapCtrl', Controller);

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
        const AMBIGUITY = 'AMBIGUITY';

        var self = this;

        self.ERROR_MESSAGE = 'Atualmente, não existe nenhum exame disponível no sistema';
        self.LOAD_ERROR_MESSAGE = "O participante não possui laboratório inicializado.";
        self.examList = [];
        self.legends = [];
        self.selectedParticipant = undefined;

        /* Lifecycle hooks */
        self.$onInit = onInit;

        /* Public methods */
        self.getCurrentState = getCurrentState;
        self.showObservation = showObservation;
        self.loadData = loadData;
        self.COLOR = {
            HAVE: '#88d8b0',
            DOES_NOT_HAVE: '#ff6f69',
            DOES_NOT_APPLY: '#cecece',
            AMBIGUITY: '#bae1ff'
        };

        /* Lifecycle methods */
        function onInit() {
            _loadParticipant();
            _buildLegend();
            EventService.onParticipantSelected(_reactToParticipantChange);
        }

        function _loadParticipant() {
            return DashboardService
                .getSelectedParticipant()
                .then(function (participantData) {
                    _reactToParticipantChange(participantData)
                });
        }

        function _reactToParticipantChange(selectedParticipant) {
            self.selectParticipant = selectedParticipant;
            _buildDashboard();
        }

        function showObservation(event, index, exam) {
            $mdDialog.show({
                locals: {exam: exam},
                controller: _DialogController,
                templateUrl: 'app/ux-component/otus-monitoring/participant-monitoring/participant-exam-heatmap/exam-observation-dialog-template.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            }).then(function (result) {
                LoadingScreenService.start();
                _defineExamWithDoesNotApplies(result, index, exam).then(function () {
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

        function _defineExamWithDoesNotApplies(result, index, exam) {
            var defer = $q.defer();
            if (result.doesNotApply) {
                ParticipantMonitoringService.defineExamWithDoesNotApplies(self.selectedParticipant.recruitmentNumber, result.observation, exam)
                    .then(function (response) {
                        self.examList[index] = ParticipantMonitoringService.buildExamStatus(response);
                        LoadingScreenService.finish();
                        defer.resolve();
                    }).catch(function () {
                    LoadingScreenService.finish();
                    defer.reject();
                    LoadingScreenService.finish();
                });
            } else {
                ParticipantMonitoringService.deleteNotAppliesOfExam(self.selectedParticipant.recruitmentNumber, exam)
                    .then(function (response) {
                        self.examList[index] = ParticipantMonitoringService.buildExamStatus(response);
                        LoadingScreenService.finish();
                        defer.resolve();
                    }).catch(function () {
                    LoadingScreenService.finish();
                    defer.reject();
                });
            }
            return defer.promise;
        }

        function loadData() {
            self.loading = true;
            self.error = false;

            ParticipantMonitoringService.buildExamStatusList(self.selectedParticipant.recruitmentNumber)
                .then(function (result) {
                    self.examList = result;
                    self.showExamSignal = true;
                    self.loading = false;
                    LoadingScreenService.finish();
                })
                .catch(function () {
                    self.loading = false;
                    self.error = true;
                    LoadingScreenService.finish();
                });
        }

        function _buildDashboard() {
            self.examList = [];
            self.loadAvailable = true;
            self.showExamSignal = false;
            loadData();
        }

        function _buildLegend() {
            self.legends.push({label: 'Com dados.', color: self.COLOR.HAVE});
            self.legends.push({label: 'Sem dados.', color: self.COLOR.DOES_NOT_HAVE});
            self.legends.push({label: 'Não será realizado.', color: self.COLOR.DOES_NOT_APPLY});
            self.legends.push({label: 'Ambiguidade.', color: self.COLOR.AMBIGUITY});
        }

        function _DialogController($scope, $mdDialog, exam) {
            const AMBIGUITY_STATE_DESCRIPTION = 'Exame definido como não será realizado, porém existe Exame(s) realizado(s) adicionado(s) ao participante!';
            $scope.disable;
            $scope.doesNotApply;
            $scope.observation;
            $scope.description;
            $scope.information;

            onInit();

            function onInit() {
                $scope.disable = true;
                $scope.doesNotApply = false;

                if (exam.status === DOES_NOT_APPLY) {
                    $scope.doesNotApply = true;
                    $scope.observation = exam.observation ? exam.observation : '';
                } else if (exam.status === AMBIGUITY) {
                    $scope.doesNotApply = true;
                    $scope.information = exam.information;
                    $scope.description = AMBIGUITY_STATE_DESCRIPTION;
                    $scope.observation = exam.observation ? exam.observation : '';
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
                    if (exam.status === DOES_NOT_APPLY || exam.status === AMBIGUITY) {
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
