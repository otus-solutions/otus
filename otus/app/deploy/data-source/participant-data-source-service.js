(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantDataSourceService', Service);

  Service.$inject = [
    '$q',
    'otusjs.deploy.ParticipantRestService',
    'otusjs.participant.storage.ParticipantStorageService'
  ];

  function Service($q, ParticipantRestService, ParticipantStorageService) {
    var self = this;
    var _loadingDefer = $q.defer();

    /* Public methods */
    self.up = up;
    self.listIndexers = listIndexers;

    function up() {
      _loadingDefer = $q.defer();
      _initializeSources();
      _loadData();
      return _loadingDefer.promise;
    }

    function listIndexers() {
      var defer = $q.defer();
      _loadingDefer.promise
        .then(function() {
          defer.resolve(ParticipantStorageService.getCollection().find());
        });
      return defer.promise;
    }

    function _initializeSources() {
      ParticipantRestService.initialize();
    }

    function _loadData() {
      ParticipantRestService
        .listIdexers()
        .then(function(response) {
          ParticipantStorageService.getCollection().clear();
          ParticipantStorageService.getCollection().insert(response);
          ParticipantStorageService.save();
          _loadingDefer.resolve();
        });
    }
  }
}());
