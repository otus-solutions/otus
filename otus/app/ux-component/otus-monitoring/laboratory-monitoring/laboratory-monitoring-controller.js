(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('otusLaboratoryMonitoringDashboardCtrl', Controller);

  Controller.$inject = [
    '$q',
    'otusjs.monitoring.business.LaboratoryMonitoringService',
    'otusjs.deploy.LoadingScreenService',
    'otusjs.otus.uxComponent.BarChartsVerticalFactory'
  ];

  function Controller($q, LaboratoryMonitoringService, LoadingScreenService, BarChartsFactory) {
    var self = this;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.openTabPendingResultsByAliquots = openTabPendingResultsByAliquots;
    self.openTabQuantitativeByTypeOfAliquots = openTabQuantitativeByTypeOfAliquots;
    self.openTabOrphanByExams = openTabOrphanByExams;
    self.openTabStorageByAliquots = openTabStorageByAliquots;
    self.openTabResultsByExam = openTabResultsByExam;
    self.downloadCSVFileOfPendingResults = downloadCSVFileOfPendingResults;
    /* Lifecycle methods */
    function onInit() { };

    function openTabPendingResultsByAliquots() {
      if (!$('#pending-results-chart svg').length) {
        LoadingScreenService.start();
        _loadDataPendingResultsByAliquots();

      }
    };

    function openTabQuantitativeByTypeOfAliquots() {
      if (!$('#quantitative-by-aliquots svg').length) {
        _loadDataQuantitativeByTypeOfAliquots();
      }
    };

    function openTabOrphanByExams() {
      if (!$('#orphans-by-exam svg').length) {
        _loadDataOrphansByExam();
      }
    }

    function openTabStorageByAliquots() {
      if (!$('#storage-by-exam svg').length) {
        _loadStorageByAliquots();
      }
    }

    function openTabResultsByExam() {
      if (!$('#results-by-exam svg').length) {
        _loadResultsByExam();
      }
    }

    function _loadDataPendingResultsByAliquots() {
      LaboratoryMonitoringService.getDataOfPendingResultsByAliquots()
        .then(function (response) {
      LoadingScreenService.finish();
          var colors = ['#c7453b', "#529c40"];
          var element = '#pending-results-chart';
          BarChartsFactory.create(response, element, colors);
        }).catch(function (e) {
          LoadingScreenService.finish();
        });


    }

    function _loadDataQuantitativeByTypeOfAliquots() {
      LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots()
        .then(function (response) {
          var colors = ['#b33040', '#d25c4d', '#f2b447'];
          var element = '#quantitative-by-aliquots';
          BarChartsFactory.create(response, element, colors);
          LoadingScreenService.finish();
        }).catch(function (e) {
          LoadingScreenService.finish();
        });

    };

    function _loadDataOrphansByExam() {
      LaboratoryMonitoringService.getDataOrphanByExams()
        .then(function (response) {
          LoadingScreenService.finish();
          BarChartsFactory.create(response, "#orphans-by-exam");
        }).catch(function (e) {
          LoadingScreenService.finish();
        });

    };

    function _loadStorageByAliquots() {
      LaboratoryMonitoringService.getDataOfStorageByAliquots()
        .then(function (response) {
          LoadingScreenService.finish();
          BarChartsFactory.create(response,'#storage-by-exam');
        }).catch(function (e) {
        LoadingScreenService.finish();
        });

    };

    function _loadResultsByExam() {
      LaboratoryMonitoringService.getDataOfResultsByExam()
        .then(function (response) {
          LoadingScreenService.finish();
          BarChartsFactory.create(response,'#results-by-exam');
        }).catch(function (e) {
          LoadingScreenService.finish();
        });


    }

    function downloadCSVFileOfPendingResults() {
      LaboratoryMonitoringService.donwloadCSVFileOfPendingResults();
      LoadingScreenService.changeMessage("Por favor, aguarde! Estamos gerando o arquivo para download.");
      LoadingScreenService.start();
      _build().then(function (response) {
        if (response) {
          var name = "monitoramento-laboratorial-resultados-pendentes-".concat(new Date().toLocaleDateString());
          alasql('SELECT * INTO CSV("' + name + '.csv",{headers:true}) FROM LAB_MONITORING');
          alasql("DROP TABLE IF EXISTS LAB_MONITORING");
          LoadingScreenService.finish();
        }
      }).catch(function (e) {
        throw new Error(e);
      }).finally(function () {
        LoadingScreenService.finish();
      });
    };

    function _build() {
      var pendingResults = [
        {
          'code': 362001621,
          'fieldCenter': 'RS',
          'type': 'BIOCHEMICAL_SERUM',
          'condition': 'waiting'
        },
        {
          'code': 363004633,
          'fieldCenter': 'RS',
          'type': 'PCR',
          'condition': 'waiting'
        }
      ];
      return $q(function (resolve, reject) {
        alasql("DROP TABLE IF EXISTS LAB_MONITORING");
        alasql("CREATE TABLE IF NOT EXISTS LAB_MONITORING(CODIGO INT, CENTRO STRING, TIPO STRING, CONDICAO STRING)");
        if (Array.isArray(pendingResults) && pendingResults.length > 0) {
          try {
            pendingResults.forEach(function (line) {
              alasql("INSERT INTO LAB_MONITORING VALUES(" + line.code + ",'" + line.fieldCenter + "','" + line.type + "','" + line.condition + "')");
            });
          } catch (e) {
            reject(e);
          }
          resolve(true);
        } else {
          reject("Data not found.");
        }
      });
    }

  };
}());
