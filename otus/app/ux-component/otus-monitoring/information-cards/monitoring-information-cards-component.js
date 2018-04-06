(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('monitoringInformationCardsComponent', {
            controller: Controller,
            templateUrl: 'app/ux-component/otus-monitoring/information-cards/monitoring-information-cards-template.html',
            bindings: {
                selectedLots: '=',
                csvData: '='
            }
        });

    Controller.$inject = [
        'otusjs.deploy.FieldCenterRestService',
        '$filter'
    ];

    function Controller(ProjectFieldCenterService, $filter) {
        var self = this;

        /* Lifecycle hooks */
        self.$onInit = onInit;

        /* public functions */
        self.createProgressWheel = createProgressWheel;
        self.centers = [];
        self.generalInformation = {
            "goal": 2140,
            "deaths": 20,
            "completed": 1400
        }


        function onInit() {

            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });

                var goal = (self.generalInformation.completed) /
                    (self.generalInformation.goal - self.generalInformation.deaths);
                var data = [goal * 100, 100 - (goal * 100)];

                createProgressWheel(
                    "goalPercentageChart",
                    data, [
                        'percentagem da meta cumprida',
                        'percentagem da meta a ser cumprida'
                    ], [
                        'rgba(49, 216, 88, 0.5)',
                        'rgba(250, 250, 250, 0.5)'
                    ], [
                        'rgba(49, 216, 88, 1)',
                        'rgba(240, 240, 240, 1)'
                ]);

                goal = self.generalInformation.deaths / self.generalInformation.goal;
                data = [goal * 100, 100 - (goal * 100)];

                createProgressWheel(
                    "deathsPercentageChart",
                    data, [
                        'percentagem de falecimentos',
                        'percentagem de participantes ainda vivos'
                    ], [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(250, 250, 250, 0.5)'
                    ], [
                        'rgba(255, 99, 132, 1)',
                        'rgba(240, 240, 240, 0.6)'
                ]);
            });
            // self.otusExamsLotsManager.listComponent = self;

        }

        function createProgressWheel(element, data, label, backgroundColor, borderColor) {



            var ctx = document.getElementById(element);
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: label,
                    datasets: [{
                        label: '% da meta cumprida',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,

                        borderWidth: 1.5
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: true,
                    cutoutPercentage: 70,
                    layout: {
                        padding: {
                            left: 0,
                            right: 10,
                            top: 0,
                            bottom: 0
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    }
                }
            });
        }


    }
}());
