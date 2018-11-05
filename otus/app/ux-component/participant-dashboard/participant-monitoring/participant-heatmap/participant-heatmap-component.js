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
        '$scope'
    ];

    function Controller(EventService, ApplicationStateService, DashboardService, $scope) {
        var self = this;
        self.FINALIZED = "FINALIZED";
        self.CREATED = "CREATED";
        self.SAVED = "SAVED";
        self.UNNECESSARY = "UNNECESSARY";

        /* Public methods */
        self.selectParticipant = selectParticipant;
        /* Lifecycle hooks */
        self.$onInit = onInit;
        self.getCurrentState = getCurrentState;

        // cores 
        //(questionarios completos/verde, questionarios salvos/amarelo, questionarios nao realizados/vermelho,
        // questionarios que nao precisam ser preenchidos/ cinza )
        self.colors = ["#f4415c", "#f4ca41", "#1ece8b", "#cecece"];

        self.data = [{
            "id": "SIGLA1",
            "full_name": "ACTIVITY_NAME",
            "status": "complete",
            "type": "exam",
            "date": "2017-10-06", // TODO: Qual padrão estamos utilizando?
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA2",
            "full_name": "ACTIVITY_NAME",
            "status": "UNNECESSARY",
            "type": "Activity",
            "date": "2017-10-21",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA3",
            "full_name": "ACTIVITY_NAME",
            "status": "SAVED",
            "type": "Activity",
            "date": "2018-04-01",
            "color": "#f4ca41"
        },
        {
            "id": "SIGLA4",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2017-08-10",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA5",
            "full_name": "ACTIVITY_NAME",
            "status": "SAVED",
            "type": "Activity",
            "date": "2017-08-07",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA6",
            "full_name": "ACTIVITY_NAME",
            "status": "UNNECESSARY",
            "type": "Activity",
            "date": "2017-08-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA7",
            "full_name": "ACTIVITY_NAME",
            "status": "SAVED",
            "type": "Activity",
            "date": "2000-08-07",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA8",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2006-08-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA9",
            "full_name": "ACTIVITY_NAME",
            "status": "SAVED",
            "type": "Activity",
            "date": "2017-08-08",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA10",
            "full_name": "ACTIVITY_NAME",
            "status": "UNNECESSARY",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA11",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        }, {
            "id": "SIGLA12",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA13",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA14",
            "full_name": "ACTIVITY_NAME",
            "status": "UNNECESSARY",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA15",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA16",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA17",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA18",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA19",
            "full_name": "ACTIVITY_NAME",
            "status": "CREATED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#f4415c"
        },
        {
            "id": "SIGLA20",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA21",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA22",
            "full_name": "ACTIVITY_NAME",
            "status": "CREATED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#f4415c"
        },
        {
            "id": "SIGLA23",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA24",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA25",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA26",
            "full_name": "ACTIVITY_NAME",
            "status": "CREATED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#f4415c"
        },
        {
            "id": "SIGLA27",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA28",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA29",
            "full_name": "ACTIVITY_NAME",
            "status": "CREATED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#f4415c"
        },
        {
            "id": "SIGLA30",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA31",
            "full_name": "ACTIVITY_NAME",
            "status": "CREATED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#f4415c"
        },
        {
            "id": "SIGLA32",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#4286f4"
        },
        {
            "id": "SIGLA33",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA34",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA35",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA36",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        },
        {
            "id": "SIGLA37",
            "full_name": "ACTIVITY_NAME",
            "status": "CREATED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#f4415c"
        },
        {
            "id": "SIGLA38",
            "full_name": "ACTIVITY_NAME",
            "status": "CREATED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#f4415c"
        },
        {
            "id": "SIGLA39",
            "full_name": "ACTIVITY_NAME",
            "status": "FINALIZED",
            "type": "Activity",
            "date": "2014-12-22",
            "color": "#1ece8b"
        }];

        /* Lifecycle methods */
        function onInit() {
        }

        $scope.getStyle = function () {

            if (this.dateValue.status == self.CREATED) {
                return self.colors[0];
            }

            if (this.dateValue.status == self.COMPLETE) {
                return self.colors[2];
            }

            if (this.dateValue.status == self.SAVED) {
                return self.colors[1];
            }

            if (this.dateValue.status == self.UNNECESSARY) {
                return self.colors[3];
            }

            // retorna que o questionario esta completo se nao existe texto ou ele for diferente das opcoes
            // feito para o caso de um questionario que nao precisa ser completado pelo participante, mas
            // nao esta indicado no banco de dados ser considerado como completo (???)
            // foi isso que eu entendi entao vou deixar assim por enquando (:
            return self.colors[2];
        }

        function selectParticipant(selectedParticipant) {
            self.selectedParticipant = selectedParticipant;
        }

        /* Lifecycle methods */
        function onInit() {
            _loadSelectedParticipant();
            EventService.onParticipantSelected(_loadSelectedParticipant);
            self.selectedParticipant = null;
        }

        function getCurrentState() {
            return ApplicationStateService.getCurrentState();
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
