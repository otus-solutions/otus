(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ActivityRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.update = update;
    self.list = list;
    self.save = save;
    self.remove = remove;
    self.addActivityRevision = addActivityRevision;
    self.getActivityRevisions = getActivityRevisions;

    function initialize() {
      _rest = OtusRestResourceService.getActivityResource();
    }

    function update(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.update({ id: data._id, rn: data.participantData.recruitmentNumber }, data).$promise;
    }

    function save(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.create({ rn: data.participantData.recruitmentNumber }, data).$promise;
    }

    function list(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      var request = $q.defer();

      _rest
        .listAll({ rn: recruitmentNumber })
        .$promise
        .then(function(response) {
          if (response.data && response.data.length) {
            request.resolve(response.data);
          } else {
            request.resolve([]);
          }
        });

      return request.promise;
    }

    function remove(data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.remove(data).$promise;
    }

    function addActivityRevision(activityRevision, data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.addActivityRevision({ rn: data.participantData.recruitmentNumber}, activityRevision).$promise;
    }

    function getActivityRevisions(activityID, data) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      var request = $q.defer();
      _rest.getActivityRevisions({ id: activityID, rn: data.participantData.recruitmentNumber })
        .$promise
        .then(function(response) {
          if (response.data && response.data.length) {
            request.resolve(response.data);
          } else {
            request.resolve([]);
          }
        });

      return request.promise;
    }
  }
}());
