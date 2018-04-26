(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('monitoringCentersGoalsVisualizationComponent', {
            controller: Controller,
            templateUrl: 'app/ux-component/otus-monitoring/visualizations/centers-goals/monitoring-centers-goals-visualization-template.html',
            bindings: {
                selectedLots: '=',
                csvData: '=',
                createCentersGoalsChart: '='
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
        self.centers = [];
        self.chart;



        function onInit() {

            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });
            });

            self.createCentersGoalsChart = createCentersGoalsChart;

        }

        function createCentersGoalsChart(qData) {
            var cumulativeInfo = [];


            for (var i = 0; i < qData.data.length; i++) {
                var total = (qData.data[i].data.reduce(function (a, b) {
                    return a + b;
                }, 0));

                var info = {
                    label: qData.data[i].label,
                    data: [(total / qData.data[i].goal) * 100, 100 - ((total / qData.data[i].goal) * 100)],
                    backgroundColor: [qData.data[i].backgroundColor, 'rgba(250, 250, 250, 0.5)'],
                    borderColor: [qData.data[i].borderColor, 'rgba(240, 240, 240, 1)'],
                    borderWidth: 1
                }
                cumulativeInfo[i] = info;
            }
            console.log(cumulativeInfo);

            if (!self.chart) {

                var ctx = document.getElementById("centersGoalsDoughnutChart");
                self.chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: cumulativeInfo//,
                        //labels:qData.fieldCenters
                    },
                    options: {
                        //responsive: false,
                        maintainAspectRatio: true,
                        cutoutPercentage: 40,
                        title: {
                            display: true,
                            fontSize:20,
                            text: 'Porcentagem de Participantes Contemplados por Centro'
                        },
                        //cutoutPercentage: 70,
                        legend: {
                            display: false
                        },
                        tooltips: {
                            //enabled: false
                            //mode:'index',
                            //intersect:false,
                            callbacks: {
                                label: function(t,d) {
                                    return d.datasets[t.datasetIndex].label +
                                    ": " +
                                    (d.datasets[t.datasetIndex].data[t.index].toFixed(2)) +
                                    "%";
                                }
                            }
                        }
                    }
                });
            }
            else {
                //self.chart.config.data.labels = (qData.fieldCenters);
                //self.chart.config.data.labels = qData.fieldCenters;
                self.chart.data.datasets = (cumulativeInfo);
                self.chart.update();
            }

        }

        function createDoughnutChart() {


            var goal = (self.generalInformation.MG.completed) /
                (self.generalInformation.MG.goal - self.generalInformation.MG.deaths);
            var dataMG = [goal * 100, 100 - (goal * 100)];

            goal = (self.generalInformation.SP.completed) /
                (self.generalInformation.SP.goal - self.generalInformation.SP.deaths);
            var dataSP = [goal * 100, 100 - (goal * 100)];

            goal = (self.generalInformation.RS.completed) /
                (self.generalInformation.RS.goal - self.generalInformation.RS.deaths);
            var dataRS = [goal * 100, 100 - (goal * 100)];

            goal = (self.generalInformation.RJ.completed) /
                (self.generalInformation.RJ.goal - self.generalInformation.RJ.deaths);
            var dataRJ = [goal * 100, 100 - (goal * 100)];

            goal = (self.generalInformation.ES.completed) /
                (self.generalInformation.ES.goal - self.generalInformation.ES.deaths);
            var dataES = [goal * 100, 100 - (goal * 100)];

            goal = (self.generalInformation.BA.completed) /
                (self.generalInformation.BA.goal - self.generalInformation.BA.deaths);
            var dataBA = [goal * 100, 100 - (goal * 100)];

            var ctx = document.getElementById("centersGoalsDoughnutChart");
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'percentagem da meta cumprida',
                        'percentagem da meta a ser cumprida'
                    ],
                    datasets: [{
                        label: '% da meta de Minal Gerais cumprida',
                        data: dataMG,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1
                    },
                    {
                        label: '% da meta de São Paulo cumprida',
                        data: dataSP,
                        backgroundColor: [
                            "rgba(54, 162, 235, 0.2)",
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            "rgba(54, 162, 235, 1)",
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1
                    },
                    {
                        label: '% da meta de Rio Grande do Sul cumprida',
                        data: dataRS,
                        backgroundColor: [
                            "rgba(75, 192, 192, 0.2)",
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            "rgba(75, 192, 192, 1)",
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1
                    },
                    {
                        label: '% da meta de Rio de Janeiro cumprida',
                        data: dataRJ,
                        backgroundColor: [
                            "rgba(127, 190, 102, 0.2)",
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            "rgba(127, 190, 102, 1)",
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1
                    },
                    {
                        label: '% da meta de Espírito Santo cumprida',
                        data: dataES,
                        backgroundColor: [
                            "rgba(153, 102, 255, 0.2)",
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            "rgba(153, 102, 255, 1)",
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1
                    },
                    {
                        label: '% da meta de Bahia cumprida',
                        data: dataBA,
                        backgroundColor: [
                            "rgba(255, 163, 102, 0.2)",
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            "rgba(255, 163, 102, 1)",
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1
                    }]
                },
                options: {
                    //responsive: false,
                    maintainAspectRatio: true,
                    cutoutPercentage: 40,
                    //cutoutPercentage: 70,
                    legend: {
                        //display: false
                    },
                    tooltips: {
                        //enabled: false
                    }
                }
            });

        }



    }
}());
