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
        self.createDoughnutChart = createDoughnutChart;
        self.createBarChart = createBarChart;
        self.barChart;
        self.centers = [];
        self.generalInformation = {
            "goal": 2140,
            "deaths": 35,
            "completed": 1400,
            "MG": {
                "goal": 3115,
                "deaths": 23,
                "completed": 2937
            },
            "SP": {
                "goal": 5061,
                "deaths": 67,
                "completed": 4688
            },
            "RS": {
                "goal": 2061,
                "deaths": 25,
                "completed": 1921
            },
            "RJ": {
                "goal": 1784,
                "deaths": 17,
                "completed": 1672
            },
            "ES": {
                "goal": 1055,
                "deaths": 18,
                "completed": 961
            },
            "BA": {
                "goal": 2029,
                "deaths": 47,
                "completed": 1847
            }
        }



        function onInit() {

            ProjectFieldCenterService.loadCenters().then(function (result) {

                self.centers = $filter('orderBy')(self.centers);
                result.forEach(function (fieldCenter) {
                    self.centers.push(fieldCenter.acronym)
                });
                //createBarChart();
            });

            self.createCumulativeResultsChart = createCumulativeResultsChart;
            // self.otusExamsLotsManager.listComponent = self;

            //createBarChart();
            //createDoughnutChart();


        }

        function createCumulativeResultsChart(qData)
        {
            var cumulativeInfo = [{
                //label: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                data: []
            }];


            for(var i=0; i< qData.data.length; i++)
            {
                //cumulativeInfo[0].label[i] = qData.data[i].label;
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

        function createBarChart() {

            var centersCompleted = [
                self.generalInformation.MG.completed,
                self.generalInformation.SP.completed,
                self.generalInformation.RS.completed,
                self.generalInformation.RJ.completed,
                self.generalInformation.ES.completed,
                self.generalInformation.BA.completed 
            ];

            var centersGoals = [
                self.generalInformation.MG.goal - self.generalInformation.MG.completed - self.generalInformation.MG.deaths,
                self.generalInformation.SP.goal - self.generalInformation.SP.completed - self.generalInformation.SP.deaths,
                self.generalInformation.RS.goal - self.generalInformation.RS.completed - self.generalInformation.RS.deaths,
                self.generalInformation.RJ.goal - self.generalInformation.RJ.completed - self.generalInformation.RJ.deaths,
                self.generalInformation.ES.goal - self.generalInformation.ES.completed - self.generalInformation.ES.deaths,
                self.generalInformation.BA.goal - self.generalInformation.BA.completed - self.generalInformation.BA.deaths
                
            ];

            var centersDeaths = [
                self.generalInformation.MG.deaths,
                self.generalInformation.SP.deaths,
                self.generalInformation.RS.deaths,
                self.generalInformation.RJ.deaths,
                self.generalInformation.ES.deaths,
                self.generalInformation.BA.deaths
            ];
            
            var ctx = document.getElementById("centersCumulativeResultsChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: self.centers,
                    datasets: [{
                        label: 'Meta Cumprida',
                        data: centersCompleted,
                        backgroundColor: [
                            'rgba(49, 216, 88, 0.2)',
                            'rgba(49, 216, 88, 0.2)',
                            'rgba(49, 216, 88, 0.2)',
                            'rgba(49, 216, 88, 0.2)',
                            'rgba(49, 216, 88, 0.2)',
                            'rgba(49, 216, 88, 0.2)'
                        ],
                        borderColor: [
                            'rgba(49, 216, 88, 1)',
                            'rgba(49, 216, 88, 1)',
                            'rgba(49, 216, 88, 1)',
                            'rgba(49, 216, 88, 1)',
                            'rgba(49, 216, 88, 1)',
                            'rgba(49, 216, 88, 1)'
                        ],

                        borderWidth: 1.5
                    },
                    {
                        label: 'Meta Restante',
                        data: centersGoals,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(127, 190, 102, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 163, 102, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(127, 190, 102, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 163, 102, 1)'
                        ],

                        borderWidth: 1.5
                    },
                    {
                        label: 'Falecimentos',
                        data: centersDeaths,
                        backgroundColor: [
                            //'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            //'rgba(255, 99, 132, 1)'
                        ],

                        borderWidth: 1.5
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked:true,
                            ticks: {
                                beginAtZero: false
                              }
                        }]
                    }
                }
            });

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
                        label: '% da meta cumprida',
                        data: dataMG,
                        backgroundColor: [
                            'rgba(49, 216, 88, 0.5)',
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            'rgba(49, 216, 88, 1)',
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1.5
                    },
                    {
                        label: '% da meta cumprida',
                        data: dataSP,
                        backgroundColor: [
                            'rgba(49, 216, 88, 0.5)',
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            'rgba(49, 216, 88, 1)',
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1.5
                    },
                    {
                        label: '% da meta cumprida',
                        data: dataRS,
                        backgroundColor: [
                            'rgba(49, 216, 88, 0.5)',
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            'rgba(49, 216, 88, 1)',
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1.5
                    },
                    {
                        label: '% da meta cumprida',
                        data: dataRJ,
                        backgroundColor: [
                            'rgba(49, 216, 88, 0.5)',
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            'rgba(49, 216, 88, 1)',
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1.5
                    },
                    {
                        label: '% da meta cumprida',
                        data: dataES,
                        backgroundColor: [
                            'rgba(49, 216, 88, 0.5)',
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            'rgba(49, 216, 88, 1)',
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1.5
                    },
                    {
                        label: '% da meta cumprida',
                        data: dataBA,
                        backgroundColor: [
                            'rgba(49, 216, 88, 0.5)',
                            'rgba(250, 250, 250, 0.5)'
                        ],
                        borderColor: [
                            'rgba(49, 216, 88, 1)',
                            'rgba(240, 240, 240, 1)'
                        ],

                        borderWidth: 1.5
                    }]
                },
                options: {
                    //responsive: false,
                    //maintainAspectRatio: true,
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
