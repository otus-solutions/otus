(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusParticipantHeatmap', {
            controller: Controller,
            templateUrl: 'app/ux-component/participant-dashboard/participant-monitoring/participant-heatmap/participant-heatmap-template.html'
        });

    Controller.$inject = [
        'otusjs.otus.dashboard.core.EventService',
        'otusjs.application.state.ApplicationStateService',
        'otusjs.otus.dashboard.service.DashboardService',
        'otusjs.participant.business.ParticipantMonitoringService',
        '$scope'
    ];

    function Controller(EventService, ApplicationStateService, DashboardService, ParticipantMonitoringService, $scope) {
        const CREATED = 'CREATED';
        const SAVED = 'SAVED';
        const FINALIZED = 'FINALIZED';
        const UNNECESSARY = 'UNNECESSARY';
        const Color = {
            EXAM: '#4286f4',
            CREATED: '#f4415c',
            FINALIZED: '#1ece8b',
            SAVED: '#f4ca41',
            UNNECESSARY: '#cecece'
        }

        var self = this;
        /* Lifecycle hooks */
        self.$onInit = onInit;
        /* Public methods */
        self.getStyle = getStyle;
        self.selectParticipant = selectParticipant;
        self.getCurrentState = getCurrentState;
        self.addComment = addComment;

        /* Lifecycle methods */
        function onInit() {
            self.data = ParticipantMonitoringService.getCurrentStatusOfParticipantInStudy();
            _loadSelectedParticipant();
            EventService.onParticipantSelected(_loadSelectedParticipant);
            self.selectedParticipant = null;
        }

        function getStyle(data) {
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

        function getCurrentState() {
            return ApplicationStateService.getCurrentState();
        }

        function addComment(data) {
            console.log(data);
            // TODO: 
        }

        function _loadSelectedParticipant(participantData) {
            if (participantData) {
                self.selectedParticipant = participantData;
                self.isEmpty = false;
            } else {
                DashboardService
                    .getSelectedParticipant()
                    .then(function (participantData) {
                        self.selectedParticipant = participantData;
                        self.isEmpty = false;
                    });
            }
        }

    }
}());
