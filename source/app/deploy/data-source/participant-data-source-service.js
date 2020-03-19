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
    let Mock = {};

    Mock.participantContacts = {
      _id: "5e6a45dd2273ad0a40d4050b",
      objectType: 'ParticipantContacts',
      recruitmentNumber: 1234567,
      email: {
        main: {value: {content: 'owail@otussolutions.com'}, observation: 'Trabalho'},
        second: {value: {content: 'medico@elsabrasil.com'}, observation: 'Hospital'},
        third: null,
        fourth: null,
        fifth: null
      },

      address: {
        main: {
          value: {
            postalCode: "90010-907",
            street: 'Rua Um',
            streetNumber: '2',
            complements: 'Ap. 3',
            neighbourhood: 'Bairro Quatro',
            city: 'Cidade Cinco',
            country: 'Sexto país'
          },
          observation: 'Ao lado do pórtico da cidade'
        },
        second: {
          value:
            {
              postalCode: "90010-907",
              street: 'Rua dos Bobos',
              streetNumber: 0,
              complements: 'Feita com muito esmero!',
              neighbourhood: 'Centro',
              city: 'Porto Alegre',
              country: 'Brasil'
            },
          observation: 'Casa da vizinha da minha tia.'
        },

        third:{
          value:{
            postalCode: "H3500COA",
            street: 'Avenida Las Heras',
            streetNumber: 727,
            complements: 'Facultad de Ingeniería, segundo piso.',
            neighbourhood: 'Centro',
            city: 'Resistencia',
            country: 'Argentina',
          },
          observation: 'Universidad Nacional del Nordeste.'
        },
        fourth: null,
        fifth: null
      },

      phoneNumber: {
        main: {value:{content: '+55 011-1406'}, observation: 'fulano de tal'},
        second: {value:{content: '0800-0000'}, observation: 'suport'},
        third: {value:{content:'0800-1000'}, observation: 'teleMarketing'},
        fourth: null,
        fifth: null
      },
    };

    /* Public methods */
    self.up = up;
    self.listIndexers = listIndexers;
    self.create = create;
    self.update = update;
    self.getAllowNewParticipants = getAllowNewParticipants;
    self.getFollowUps = getFollowUps;
    self.activateFollowUpEvent = activateFollowUpEvent;
    self.deactivateFollowUpEvent = deactivateFollowUpEvent;
    self.createParticipantContact = createPaticipantContact;
    self.getParticipantContact = getParticipantContact;
    self.getByRecruitmentNumberPaticipantContact = getByRecruitmentNumberPaticipantContact;
    self.updateMainContact = updateMainContact;
    self.addSecondaryContact = addSecondaryContact;
    self.updateSecondaryContact = updateMainContact;
    self.swapMainContactWithSecondary = swapMainContactWithSecondary;
    self.deleteParticipantContact = deleteParticipantContact;
    self.deleteSecondaryContact = deleteSecondaryContact;

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

    function createPaticipantContact(jsonParticipant) {
      ParticipantContactRestService.createPaticipantContact(jsonParticipant)
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

    function updateMainContact(jsonParticipant) {
      ParticipantContactRestService.updateMainContact(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function addSecondaryContact(jsonParticipant) {
      ParticipantContactRestService.addSecondaryContact(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function updateSecondaryContact(jsonParticipant) {
      ParticipantContactRestService.updateSecondaryContact(jsonParticipant)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

    function swapMainContactWithSecondary(jsonParticipant) {
      ParticipantContactRestService.swapMainContactWithSecondary(jsonParticipant)
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

    function deleteSecondaryContact(id) {
      ParticipantContactRestService.deleteSecondaryContact(id)
        .then(function (response) {
          _genericParticipantContactStorageDefer.resolve(response.data);
        }).catch(function (err) {
        _genericParticipantContactStorageDefer.reject(err);
      });

      return _genericParticipantContactStorageDefer.promise;
    }

  }
}());
