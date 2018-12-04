(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.project.exams')
    .service('otusjs.laboratory.business.project.exams.ExamLotService', service);

  service.$inject = [
    '$q',
    'otusjs.laboratory.exam.ExamService',
    'otusjs.laboratory.business.configuration.LaboratoryConfigurationService',
    'otusjs.laboratory.repository.ProjectRepositoryService',
    'otusjs.deploy.LoadingScreenService'
  ];

  function service($q, ExamService, LaboratoryConfigurationService, ProjectRepositoryService, LoadingScreenService) {
    var self = this;

    self.createAliquotLot = createAliquotLot;
    self.loadAliquotLotFromJson = loadAliquotLotFromJson;

    //Laboratory Project Methods
    self.getAliquots = getAliquots;
    self.getLotAliquots = getLotAliquots;
    self.getAliquotConfiguration = getAliquotConfiguration;
    self.getAliquotsByCenter = getAliquotsByCenter;
    self.getLots = getLots;
    self.createLot = createLot;
    self.updateLot = updateLot;
    self.deleteLot = deleteLot;
    self.getContainerLabelToAliquot = getContainerLabelToAliquot;
    self.getDescriptors = getDescriptors;
    self.getAvailableExams = getAvailableExams;
    self.getAliquot = getAliquot;

    var messageLoading =
      'Por favor aguarde o carregamento das alíquotas.<br> Esse processo pode demorar um pouco...';

    function getLotAliquots(id) {
      var deferred = $q.defer();

      ProjectRepositoryService.getLotAliquots(id)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getContainerLabelToAliquot(aliquot) {
      return aliquot.container.toUpperCase() === "CRYOTUBE" ? "Criotubo" :
        "Palheta";
    }

    function createAliquotLot() {
      return ExamService.createAliquotLot();
    }

    function loadAliquotLotFromJson(lotJSON) {
      return ExamService.buildAliquotLotFromJson(lotJSON);
    }

    function getAliquots() {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      ProjectRepositoryService.getAliquots()
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          deferred.reject(err);
          LoadingScreenService.finish();
        });

      return deferred.promise;
    }

    function getAliquotConfiguration() {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      ProjectRepositoryService.getAliquotConfiguration()
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          LoadingScreenService.finish();
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getAliquotsByCenter(center) {
      var deferred = $q.defer();

      ProjectRepositoryService.getAliquotsByCenter(center)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getLots(centerAcronym) {
      var deferred = $q.defer();

      LaboratoryConfigurationService.fetchAliquotsDescriptors()
        .then(function () {
          ProjectRepositoryService.getLots(centerAcronym)
            .then(function (response) {
              var lots = JSON.parse(response).map(function (lotJson) {
                return ExamService.buildAliquotLotFromJson(
                  lotJson);
              });

              deferred.resolve(lots);
            })
            .catch(function (err) {
              deferred.reject(err);
            });
        });

      return deferred.promise;
    }

    function createLot(lotStructure) {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      delete lotStructure._id;
      ProjectRepositoryService.createLot(lotStructure)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          deferred.reject(err);
          LoadingScreenService.finish();
        });

      return deferred.promise;
    }

    function updateLot(lotStructure) {
      LoadingScreenService.changeMessage(messageLoading);
      LoadingScreenService.start();
      var deferred = $q.defer();

      ProjectRepositoryService.updateLot(lotStructure)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          deferred.reject(err);
          LoadingScreenService.finish();
        });

      return deferred.promise;
    }

    function deleteLot(lotCode) {
      var deferred = $q.defer();

      ProjectRepositoryService.deleteLot(lotCode)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
        })
        .catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }

    function getDescriptors() {
      var deferred = $q.defer();

      ProjectRepositoryService.getAliquotsDescriptors()
        .then(function (response) {
          deferred.resolve(response.data);
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          deferred.reject(err);
          LoadingScreenService.finish();
        });

      return deferred.promise;
    }

    function getAvailableExams(center) {
      var deferred = $q.defer();

      ProjectRepositoryService.getAvailableExams(center)
        .then(function (response) {
          deferred.resolve(response);
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          deferred.reject(err);
          LoadingScreenService.finish();
        });

      return deferred.promise;
    }

    function getAliquot(aliquotFilter) {
      var deferred = $q.defer();
      LoadingScreenService.start();
      ProjectRepositoryService.getAliquot(aliquotFilter)
        .then(function (response) {
          deferred.resolve(JSON.parse(response));
          LoadingScreenService.finish();
        })
        .catch(function (err) {
          deferred.reject(err);
          LoadingScreenService.finish();
        });

      return deferred.promise;
    }
  }
}());
