(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.ParticipantExamService', service);

  service.$inject = [
    '$q'
  ];

  function service($q) {
    let self = this;

    self.fetchExams = fetchExams;
    self.resolveExamDependencies = resolveExamDependencies;


    function fetchExams() {
      let defer = $q.defer();

      let fakeData = {
        exams: [
          {
            name: 'Hemograma',
            hasBeenDelivered: false,
            requestList: []
          },
          {
            name: 'Glicemia',
            hasBeenDelivered: true,
            requestList: []
          }
        ]
      };
      defer.resolve(fakeData);

      return defer.promise;
    }

    function resolveExamDependencies(requestList) {
      let defer = $q.defer();
      $q.all(requestList)
        .then(function (data) {
          defer.resolve(data);
          //TODO: how this $q.all handle data?
        })
        .catch(function (e) {
          defer.reject(e);
        });
      return defer.promise;
    }
  }

}());