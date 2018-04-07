(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('monitoringOverviewVisualizationComponent', {
            controller: Controller,
            templateUrl: 'app/ux-component/otus-monitoring/visualizations/monitoring-overview-visualization-template.html',
            bindings: {
                selectedLots: '=',
                csvData: '=',
                questionnaireData: '=',
                createQuestionnaireLineChart: '='
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

        self.lineChart;
        /* public functions */
        self.createLineChart = createLineChart;

        self.centers = [];


        function onInit() {

            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });

            });

            self.createQuestionnaireLineChart = createLineChart;

        }


        function createLineChart(qData) {


            if (!self.lineChart) {

                var ctx = document.getElementById("myLineChart");
                self.lineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: qData.dates,
                        datasets: qData.data
                    },
                    options: {
                        showTooltips: false,
                        responsive: true,
                        maintainAspectRatio:false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true/*,
                                        callback: function (value) {
                                            return value + "%";
                                        }*/
                                }
                            }]
                        }
                    }
                });
            }
            else {

                self.lineChart.labels = (qData.dates);
                self.lineChart.data.datasets = (qData.data);
                self.lineChart.update();
            }
            


        }

    }
}());
