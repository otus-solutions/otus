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
    self.getExamsName = getExamsName;
    self.getStatusOfActivities = getStatusOfActivities;
    self.getActivitiesProgressReport = getActivitiesProgressReport;
    self.getExamsProgressReport = getExamsProgressReport;
    self.defineActivityWithDoesNotApplies = defineActivityWithDoesNotApplies;
    self.deleteNotAppliesOfActivity = deleteNotAppliesOfActivity;
    self.getDataOfPendingResultsByAliquots = getDataOfPendingResultsByAliquots;
    self.getDataQuantitativeByTypeOfAliquots = getDataQuantitativeByTypeOfAliquots;
    self.getDataOrphanByExams = getDataOrphanByExams;
    self.getDataOfStorageByAliquots = getDataOfStorageByAliquots;
    self.getDataByExam = getDataByExam;
    self.getDataToCSVOfPendingResultsByAliquots = getDataToCSVOfPendingResultsByAliquots;
    self.getDataToCSVOfOrphansByExam = getDataToCSVOfOrphansByExam;

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
    }

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
    }

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
    }

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
    }

    function getExamsName(center) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getExamsName(center)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    function getExamsProgressReport(center) {
      var request = $q.defer();
      _remoteStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getExamsProgressReport(center)
            .then(function (response) {
              request.resolve(response.data);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

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
    }

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
    }

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
    }

    function getDataOfPendingResultsByAliquots(center) {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataOfPendingResultsByAliquots(center)
            .then(function (response) {
              request.resolve(response.data.pendingResultsByAliquot);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    function getDataQuantitativeByTypeOfAliquots(center) {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataQuantitativeByTypeOfAliquots(center)
            .then(function (response) {
              request.resolve(response.data.quantitativeByTypeOfAliquots);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

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
    }

    function getDataOfStorageByAliquots(center) {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataOfStorageByAliquots(center)
            .then(function (response) {
              request.resolve(response.data.storageByAliquot);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    function getDataByExam(center) {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataByExam(center)
            .then(function (response) {
              request.resolve(response.data.examsQuantitative);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    function getDataToCSVOfPendingResultsByAliquots(center) {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataToCSVOfPendingResultsByAliquots(center)
            .then(function (response) {
              request.resolve(response.data.pendingAliquotsCsvData);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });

      return request.promise;
    }

    function getDataToCSVOfOrphansByExam() {
      var request = $q.defer();
      _laboratoryMonitoringStorage
        .whenReady()
        .then(function (remoteStorage) {
          return remoteStorage
            .getDataToCSVOfOrphansByExam()
            .then(function (response) {
              request.resolve(response.data.orphanExamsCsvData);
            })
            .catch(function (e) {
              request.reject(e);
            });
        });
      return request.promise;
    }
  }
}());
