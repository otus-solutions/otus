(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.repository')
    .service('otusjs.monitoring.repository.MonitoringCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.core.ModuleService',
    'otusjs.monitoring.storage.MonitoringLocalStorageService',
    'otusjs.model.chart.VerticalBarFactory'
  ];

  function Service($q, ModuleService, MonitoringLocalStorageService, VerticalBarFactory) {
    var self = this;
    var _remoteStorage = ModuleService.getMonitoringRemoteStorage();
    var _laboratoryMonitoringStorage = ModuleService.getLaboratoryMonitoringRemoteStorage();

    self.find = find;
    self.listCenters = listCenters;
    self.listAcronyms = listAcronyms;
    self.getStatusOfActivities = getStatusOfActivities;
    self.getActivitiesProgressReport = getActivitiesProgressReport;
    self.defineActivityWithDoesNotApplies = defineActivityWithDoesNotApplies;
    self.deleteNotAppliesOfActivity = deleteNotAppliesOfActivity;
    self.getDataOfPendingResultsByAliquots = getDataOfPendingResultsByAliquots;
    self.getDataQuantitativeByTypeOfAliquots = getDataQuantitativeByTypeOfAliquots;
    self.getDataOrphanByExams = getDataOrphanByExams;
    self.getDataOfStorageByAliquots = getDataOfStorageByAliquots;
    self.getDataOfResultsByExam = getDataOfResultsByExam;
    self.getDataToCSVOfPendingResultsByAliquots = getDataToCSVOfPendingResultsByAliquots;
    self.getDataToCSVOfQuantitativeByTypeOfAliquots = getDataToCSVOfQuantitativeByTypeOfAliquots;
    self.getDataToCSVOfOrphansByExam = getDataToCSVOfOrphansByExam;
    self.getDataToCSVOfStorageByAliquots = getDataToCSVOfStorageByAliquots;
    self.getDataToCSVOfResultsByExam = getDataToCSVOfResultsByExam;

    function listAcronyms() {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .listAcronyms()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function listCenters() {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .listCenters()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function find(query) {
      var request = $q.defer();

      let localResponse = MonitoringLocalStorageService.find(query);
      if (localResponse.length) {
        request.resolve([].concat(localResponse));
        return request.promise;
      }

      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .find(query.acronym)
            .then(function (response) {
              if (response.data) {
                let inserted = MonitoringLocalStorageService.insert(response.data);
                request.resolve([].concat(inserted));
              }
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getActivitiesProgressReport(center) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getActivitiesProgressReport(center)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getStatusOfActivities(recruitmentNumber) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getStatusOfActivities(recruitmentNumber)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });
      return request.promise;
    };

    function defineActivityWithDoesNotApplies(data) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .defineActivityWithDoesNotApplies(data)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });
      return request.promise;
    };

    function deleteNotAppliesOfActivity(rn, acrony) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .deleteNotAppliesOfActivity(rn, acrony)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });
      return request.promise;
    };

    //TODO: TIAGO REMOVER
    var pending = [
      {
        'title': "FASTING_HORMONE_LOCAL",
        'waiting': 36,
        'received': 36
      },
      {
        'title': "FASTING_GLYCEMIA_LOCAL",
        'waiting': 48,
        'received': 48
      },
      {
        'title': "BUFFY_COAT_MG",
        'waiting': 114,
        'received': 164
      },
      {
        'title': "POST_INSULINE_CENTRAL",
        'waiting': 106,
        'received': 106
      },
      {
        'title': "POST_GLYCEMIA",
        'waiting': 92,
        'received': 92
      },
      {
        'title': "BIOCHEMICAL_URINE",
        'waiting': 96,
        'received': 96
      },
      {
        'title': "FASTING_HORMONE",
        'waiting': 88,
        'received': 88
      },
      {
        'title': 'POST_SERUM',
        'waiting': 97,
        'received': 97
      },
      {
        'title': 'POST_GLYCEMIA_LOCAL',
        'waiting': 94,
        'received': 34
      },
      {
        'title': 'URINARY_CALCIUM',
        'waiting': 272,
        'received': 272
      }
    ];


    function getDataOfPendingResultsByAliquots() {
      var request = $q.defer();
      // _laboratoryMonitoringStorage
      //   .whenReady()
      //   .then(function (remoteStorage) {
      //     return remoteStorage
      //       .getDataOfPendingResultsByAliquots()
      //       .then(function (response) {
      //         request.resolve(VerticalBarFactory.fromJsonObject(response.data, {received: "Recebidos", waiting: "Aguardando"}));
      //       })
      //       .catch(function (e) {
      //         request.reject(e);
      //       });
      //   });
      request.resolve(VerticalBarFactory.fromJsonObject(pending, { received: "Recebidos", waiting: "Aguardando" }));

      return request.promise;
    };


    var quantitative = [
      {
        "title": "POST_INSULINE",
        "transported": 1,
        "prepared": 0,
        "received": 0
      },

      /* 3 */
      {
        "title": "FASTING_GLYCEMIA",
        "transported": 1,
        "prepared": 1,
        "received": 0
      },
      {
        "title": "BIOCHEMICAL_URINE",
        "transported": 1,
        "prepared": 0,
        "received": 0
      },

      /* 5 */
      {
        "title": "BIOCHEMICAL_SERUM",
        "transported": 4,
        "prepared": 1,
        "received": 2
      }];

    function getDataQuantitativeByTypeOfAliquots() {
      var request = $q.defer();
      // _laboratoryMonitoringStorage
      //   .whenReady()
      //   .then(function (remoteStorage) {
      //     return remoteStorage
      //       .getDataQuantitativeByTypeOfAliquots()
      //       .then(function (response) {
      //         request.resolve(VerticalBarFactory.fromJsonObject(response.data, {received: "Recebidos", prepared: "Preparados", transported: "Transportados"}));
      //       })
      //       .catch(function (e) {
      //         request.reject(e);
      //       });
      //   });
      request.resolve(VerticalBarFactory.fromJsonObject(quantitative, { received: "Recebidos", prepared: "Preparados", transported: "Transportados" }));

      return request.promise;
    };

    function getDataOrphanByExams() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataOrphanByExams()
            .then(function (response) {
              request.resolve(response.data.orphanExamsProgress);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    var storage = [
      {
        'title': 'FASTING_HORMONE_LOCAL',
        'storage': 10
      },
      {
        'title': 'FASTING_GLYCEMIA_LOCAL',
        'storage': 12
      },
      {
        'title': 'BUFFY_COAT_MG',
        'storage': 5
      },
      {
        'title': 'POST_INSULINE_CENTRAL',
        'storage': 1
      },
      {
        'title': 'POST_INSULINE_LOCAL',
        'storage': 2
      },
      {
        'title': 'POST_GLYCEMIA',
        'storage': 3
      },
      {
        'title': 'POST_SERUM',
        'storage': 4
      },
      {
        'title': 'POST_GLYCEMIA_LOCAL',
        'storage': 6
      },
      {
        'title': 'BIOCHEMICAL_URINE',
        'storage': 10
      },
      {
        'title': 'URINARY_CALCIUM',
        'storage': 16
      },
      {
        'title': 'FASTING_HORMONE',
        'storage': 19
      }
    ];

    function getDataOfStorageByAliquots() {
      var request = $q.defer();
      // _laboratoryMonitoringStorage
      //   .whenReady()
      //   .then(function (remoteStorage) {
      //     return remoteStorage
      //       .getDataOfStorageByAliquots()
      //       .then(function (response) {
      //         request.resolve(VerticalBarFactory.fromJsonObject(response.data, {storage: "Armazenamento"}));
      //       })
      //       .catch(function (e) {
      //         request.reject(e);
      //       });
      //   });
      request.resolve(VerticalBarFactory.fromJsonObject(storage, { storage: "Armazenamento" }));

      return request.promise;
    };

    var results = [
      {
        'title': 'POST_GLYCEMIA',
        'results': 10
      },
      {
        'title': 'FASTING_HORMONE',
        'results': 12
      }
    ];

    function getDataOfResultsByExam() {
      var request = $q.defer();
      // _laboratoryMonitoringStorage
      //   .whenReady()
      //   .then(function (remoteStorage) {
      //     return remoteStorage
      //       .getDataOfResultsByExam()
      //       .then(function (response) {
      //         request.resolve(VerticalBarFactory.fromJsonObject(response.data, {results: "Resultados de Exame"}));
      //       })
      //       .catch(function (e) {
      //         request.reject(e);
      //       });
      //   });
      request.resolve(VerticalBarFactory.fromJsonObject(results, { results: "Resultados de Exame" }));

      return request.promise;
    };

    function getDataToCSVOfPendingResultsByAliquots() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataToCSVOfPendingResultsByAliquots()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getDataToCSVOfQuantitativeByTypeOfAliquots() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataToCSVOfQuantitativeByTypeOfAliquots()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getDataToCSVOfOrphansByExam() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataToCSVOfOrphansByExam()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getDataToCSVOfStorageByAliquots() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataToCSVOfStorageByAliquots()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getDataToCSVOfResultsByExam() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataToCSVOfResultsByExam()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };
  }
}());
