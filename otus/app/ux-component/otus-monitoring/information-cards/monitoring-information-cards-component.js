(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('monitoringInformationCardsComponent', {
            controller: Controller,
            templateUrl: 'app/ux-component/otus-monitoring/information-cards/monitoring-information-cards-template.html',
            bindings: {
                selectedLots: '=',
                csvData: '=',
                createInformationCards: '='
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

        self.progressWheelChart;
        self.goalPercentage = 49;
        self.goal = 6000;
        self.reachedTotal = 100;


        function onInit() {

            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });

                self.createInformationCards = createInformationCards;

            });

        }

        function createInformationCards(qData) {

            self.reachedTotal = 0;
            self.goal = 0;
            self.goalPercentage = 0;

            for (var i = 0; i < qData.data.length; i++) {

                self.goal += qData.data[i].goal;
                var totalGoal = 0;

                for (var j = 0; j < qData.data[i].data.length; j++) {
                    self.reachedTotal += qData.data[i].data[j];
                    totalGoal += qData.data[i].data[j];
                }

                self.goalPercentage += totalGoal / qData.data[i].goal;
                
            }
            
            self.goalPercentage = ((self.goalPercentage / qData.data.length)*100).toFixed(2);

            createProgressWheel(
                self.progressWheelChart,
                "goalPercentageChart",
                [self.goalPercentage, 100 - (self.goalPercentage)], [
                    'percentagem da meta cumprida',
                    'percentagem da meta a ser cumprida'
                ], [
                    'rgba(49, 216, 88, 0.5)',
                    'rgba(250, 250, 250, 0.5)'
                ], [
                    'rgba(49, 216, 88, 1)',
                    'rgba(240, 240, 240, 1)'
                ]);
        }

        function createProgressWheel(chart, element, data, label, backgroundColor, borderColor) {

            if (!chart) {
                var ctx = document.getElementById(element);
                chart = new Chart(ctx, {
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
            else {
                chart.config.data.labels = (label);
                chart.data.datasets = [{
                    label: '% da meta cumprida',
                    data: data,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,

                    borderWidth: 1.5
                }];
                chart.update();
            }

        }


    }
}());
