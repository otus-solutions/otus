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

    function addActivityRevision(activityRevision) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      //return _rest.addActivityRevision(activityRevision).$promise;

      //TODO: OTUS-494 limpar implemenções de teste antes de entregar
      console.log(activityRevision);
      var deferred = $q.defer();
      deferred.resolve(activityRevision);
      return deferred.promise;
    }


    //TODO: OTUS-494 limpar implemenções de teste antes de entregar
    function getActivityRevisions(activityID) {

        var revisions = [{
          activityId: 987654321,
          revisionDate: "2018-12-01T02:00:00.000Z",
          user: {
            name: "Joao Silva",
            email: "joao@gmail.com"
          }},
          {
            activityId: 123456789,
            revisionDate: "2017-10-06T02:00:00.000Z",
            user: {
              name: "Pedro Azambuja",
              email: "p.zamba@gmail.com"
            }},
          {
            activityId: 456852951,
            revisionDate: "2018-06-28T02:00:00.000Z",
            user: {
              name: "Maria da Luz",
              email: "m.luz@gmail.com"
            }
        }];


      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      //return _rest.getActivityRevisions(activityID).$promise;
      var deferred = $q.defer();
      deferred.resolve(revisions);
      return deferred.promise;
      }
  }
}());
