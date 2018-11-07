(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusParticipantHeatmap', {
            controller: Controller,
            templateUrl: 'app/ux-component/participant-dashboard/participant-monitoring/participant-heatmap/participant-heatmap-template.html'
        });

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
        const Color = {
            CREATED: '#f4415c',
            FINALIZED: '#1ece8b',
            SAVED: '#f4ca41',
            UNNECESSARY: '#cecece'
        }

        var self = this;
        /* Lifecycle hooks */
        self.$onInit = onInit;
        /* Public methods */
        self.getColor = getColor;
        self.selectParticipant = selectParticipant;
        self.getCurrentState = getCurrentState;
        self.showObservation = showObservation;

        /* Lifecycle methods */
        function onInit() {
            _loadParticipantData();
            EventService.onParticipantSelected(_loadParticipantData);
            self.selectedParticipant = null;
        }

        function getColor(data) {
            switch (data.status) {
                case CREATED:
                    return Color.CREATED;
                case SAVED:
                    return Color.SAVED;
                case FINALIZED:
                    return Color.FINALIZED;
                case UNNECESSARY:
                    return Color.UNNECESSARY;
            }
        }

        function selectParticipant(selectedParticipant) {
            self.selectedParticipant = selectedParticipant;
        }

        function showObservation(event) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/ux-component/participant-dashboard/participant-monitoring/participant-heatmap/observation-dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            }).then(function (observation) {
                _updateObservation(observation);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Observação atualizada com sucesso.')
                        .hideDelay(3000)
                );
            }, function () { });
        }

        // TODO: 
        function _updateObservation(data) {
            ParticipantMonitoringService.updateObservation(data);
        }

        function getCurrentState() {
            return ApplicationStateService.getCurrentState();
        }

        function _loadParticipantData() {
            DashboardService
                .getSelectedParticipant()
                .then(function (participantData) {
                    self.selectedParticipant = participantData;
                    self.data = ParticipantMonitoringService.getStatusOfActivities(participantData.recruitmentNumber);
                });
        }

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.update = function (observation) {
                $mdDialog.hide(observation);
            };
        }
    }
}());
