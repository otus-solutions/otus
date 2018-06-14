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
                createCumulativeResultsChart: '=',
                centers: '='
            }
        });

    Controller.$inject = [
        '$filter'
    ];

    function Controller($filter) {
        var self = this;

        /* Lifecycle hooks */
        self.$onInit = onInit;

        function onInit() {
            self.centers = $filter('orderBy')(self.centers);
            self.createCumulativeResultsChart = createCumulativeResultsChart;
        }

        function createCumulativeResultsChart(qData)
        {
            var _cumulativeInfo = [{
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                data: []
            }];
            var _lenghtOfdata = qData.data.length;
            for(var i=0; i< _lenghtOfdata; i++)
            {
                _cumulativeInfo[0].backgroundColor[i] = (qData.data[i].backgroundColor);
                _cumulativeInfo[0].borderColor[i] = (qData.data[i].borderColor);
                _cumulativeInfo[0].data[i] =(qData.data[i].data.reduce(function(a,b){
                    return a+b;
                },0));
            }

            if (!self.barChart) {
                var ctx = document.getElementById("centersCumulativeResultsChart");
                self.barChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: qData.fieldCenters,
                        datasets: _cumulativeInfo
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
                self.barChart.data.datasets = (_cumulativeInfo);
                self.barChart.update();
            }
        }
    }
}());
