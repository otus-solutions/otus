(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.repository')
    .service('otusjs.monitoring.repository.MonitoringCollectionService', Service);

  Service.$inject = [
    '$q',
    'otusjs.monitoring.core.ModuleService',
    'otusjs.monitoring.storage.MonitoringLocalStorageService'
  ];

  function Service($q, ModuleService, MonitoringLocalStorageService) {
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


    function getDataOfPendingResultsByAliquots() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataOfPendingResultsByAliquots()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getDataQuantitativeByTypeOfAliquots() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataQuantitativeByTypeOfAliquots()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

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
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getDataOfStorageByAliquots() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataOfStorageByAliquots()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    };

    function getDataOfResultsByExam() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataOfResultsByExam()
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

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
