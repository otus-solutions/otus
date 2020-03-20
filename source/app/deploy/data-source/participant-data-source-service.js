(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantDataSourceService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.model.participant.ParticipantFactory',
    'otusjs.deploy.ProjectConfigurationRestService',
    'otusjs.participant.storage.ParticipantStorageService',
    'otusjs.deploy.ParticipantContactRestService'
  ];

  function Service($q, ParticipantRestService, ParticipantFactory, ProjectConfigurationRestService, ParticipantStorageService, ParticipantContactRestService) {
    var self = this;
    var _loadingDefer = $q.defer();
    let _genericParticipantContactStorageDefer = $q.defer();

    /* Public methods */
    self.up = up;
    self.listIndexers = listIndexers;
    self.create = create;
    self.update = update;
    self.getAllowNewParticipants = getAllowNewParticipants;
    self.getFollowUps = getFollowUps;
    self.activateFollowUpEvent = activateFollowUpEvent;
    self.deactivateFollowUpEvent = deactivateFollowUpEvent;
    self.createParticipantContact = createParticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getByRecruitmentNumberPaticipantContact = getByRecruitmentNumberPaticipantContact;
    self.addNonMainEmail = addNonMainEmail;
    self.addNonMainAddress = addNonMainAddress;
    self.addNonMainPhoneNumber = addNonMainPhoneNumber;
    self.updateEmail = updateEmail;
    self.updateAddress = updateAddress;
    self.updatePhoneNumber = updatePhoneNumber;
    self.swapMainContact = swapMainContact;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteNonMainContact = deleteNonMainContact;

    function up() {
      _loadingDefer = $q.defer();
      _initializeSources();
      _loadData();
      return _loadingDefer.promise;
    }

    function listIndexers() {
      var defer = $q.defer();
      _loadingDefer.promise
        .then(function () {
          defer.resolve(ParticipantStorageService.getCollection().find());
        });
      return defer.promise;
    }

    function _initializeSources() {
      ParticipantRestService.initialize();
      ProjectConfigurationRestService.initialize();
      ParticipantContactRestService.initialize();
    }

    function create(participant) {
      var deferred = $q.defer();
      ParticipantRestService
        .create(participant)
        .then(function (response) {
          deferred.resolve(response.data);
          _loadData();
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function update(participant) {
      var deferred = $q.defer();
      ParticipantRestService
        .update(participant)
        .then(function (response) {
          deferred.resolve(response.data);
          _loadData();
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function getAllowNewParticipants() {
      var deferred = $q.defer();
      ProjectConfigurationRestService
        .getProjectConfiguration()
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function getFollowUps(recruitmentNumber) {
      var deferred = $q.defer();
      ParticipantRestService
        .getFollowUps(recruitmentNumber)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function activateFollowUpEvent(recruitmentNumber, event) {
      var deferred = $q.defer();
      ParticipantRestService
        .activateFollowUpEvent(recruitmentNumber, event)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function deactivateFollowUpEvent(followUpId) {
      var deferred = $q.defer();
      ParticipantRestService
        .deactivateFollowUpEvent(followUpId)
        .then(function (response) {
          deferred.resolve(response.data);
        }).catch(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function _loadData() {
      ParticipantRestService
        .list()
        .then(function (response) {
          ParticipantStorageService.getCollection().clear();
          let _participants = ParticipantFactory.fromArray(response.data);
          ParticipantStorageService.getCollection().insert(_participants);
          ParticipantStorageService.save();
          _loadingDefer.resolve();
        });
    }

    function createParticipantContact(jsonParticipant) {
      ParticipantContactRestService.createParticipantContact(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });
      return {
        whenReady() {
          return _genericParticipantContactStorageDefer.promise;
        }
      }
    }

    function getParticipantContact(id) {
      ParticipantContactRestService.getParticipantContact(id)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function getByRecruitmentNumberPaticipantContact(rn) {
      ParticipantContactRestService.getByRecruitmentNumberPaticipantContac(rn)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function addNonMainEmail(jsonParticipant) {
      ParticipantContactRestService.addNonMainEmail(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function addNonMainAddress(jsonParticipant) {
      ParticipantContactRestService.addNonMainAddress(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function addNonMainPhoneNumber(jsonParticipant) {
      ParticipantContactRestService.addNonMainPhoneNumber(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function updateEmail(jsonParticipant) {
      ParticipantContactRestService.updateEmail(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function updateAddress(jsonParticipant) {
      ParticipantContactRestService.updateAddress(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function updatePhoneNumber(jsonParticipant) {
      ParticipantContactRestService.updatePhoneNumber(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function swapMainContact(jsonParticipant) {
      ParticipantContactRestService.swapMainContact(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function deleteParticipantContact(id) {
      ParticipantContactRestService.deleteParticipantContact(id)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function deleteNonMainContact(id) {
      ParticipantContactRestService.deleteNonMainContact(id)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

  }
}());
