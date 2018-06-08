(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('monitoringCentersCumulativeResultsVisualizationComponent', {
            controller: Controller,
            templateUrl: 'app/ux-component/otus-monitoring/visualizations/centers-cumulative-results/monitoring-centers-cumulative-results-visualization-template.html',
            bindings: {
                selectedLots: '=',
                csvData: '=',
                createCumulativeResultsChart: '='
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
        self.barChart;
        self.centers = [];

        function onInit() {

            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });
            });

            self.createCumulativeResultsChart = createCumulativeResultsChart;

        }

        function createCumulativeResultsChart(qData)
        {
            var cumulativeInfo = [{
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                data: []
            }];


            for(var i=0; i< qData.data.length; i++)
            {
                cumulativeInfo[0].backgroundColor[i] = (qData.data[i].backgroundColor);
                cumulativeInfo[0].borderColor[i] = (qData.data[i].borderColor);
                cumulativeInfo[0].data[i] =(qData.data[i].data.reduce(function(a,b){
                    return a+b;
                },0));
                
            }

            if (!self.barChart) {

                var ctx = document.getElementById("centersCumulativeResultsChart");
                self.barChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: qData.fieldCenters,
                        datasets: cumulativeInfo
                    },
                    options: {
                        showTooltips: false,
                        responsive: true,
                        maintainAspectRatio:true,
                        title: {
                            display: true,
                            fontSize:20,
                            text: 'Número Total de Atividades Finalizadas por Centro'
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                stacked: false
                            }],
                            yAxes: [{
                                stacked:true
                            }]
                        }
                    }
                });
            }
            else {

                self.barChart.config.data.labels = (qData.fieldCenters);
                self.barChart.data.datasets = (cumulativeInfo);
                self.barChart.update();
            }

        }

    }
}());
