(function() {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('monitoringInformationCardsCtrl', Controller);

  Controller.$inject = [
    '$filter'
  ];

  function Controller($filter) {
    var self = this;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* public functions */
    self.createProgressWheel = createProgressWheel;
    self.createInformationCards = createInformationCards;

    function onInit() {
      self.centers = $filter('orderBy')(self.centers);
    }

    function createInformationCards(qData) {

      self.reachedTotal = 0;
      self.goal = 0;
      self.goalPercentage = 0;
      var _lenghtOfdata = qData.data.length;
      for (var i = 0; i < _lenghtOfdata; i++) {
        self.goal += qData.data[i].goal;
        var _totalGoal = 0;
        for (var j = 0; j < qData.data[i].data.length; j++) {
          self.reachedTotal += qData.data[i].data[j];
          _totalGoal += qData.data[i].data[j];
        }
        self.goalPercentage += _totalGoal / qData.data[i].goal;
      }



      self.goalPercentage = ((self.goalPercentage / qData.data.length) * 100).toFixed(2);
      if(self.goalPercentage == "NaN"){
        self.goalPercentage = "0.00";
      }
      console.log((self.goalPercentage, 100 - (self.goalPercentage)));
      createProgressWheel(
        "goalPercentageChart", [self.goalPercentage, 100 - (self.goalPercentage)], [
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

    function createProgressWheel(element, data, label, backgroundColor, borderColor) {
      if (!self.progressWheelChart) {
        var ctx = document.getElementById(element);
        self.progressWheelChart = new Chart(ctx, {
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
      } else {
        self.progressWheelChart.config.data.labels = (label);
        self.progressWheelChart.data.datasets = [{
          label: '% da meta cumprida',
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1.5
        }];
        self.progressWheelChart.update();
      }
    }

  }
}());
