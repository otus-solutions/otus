(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.ParticipantReportService', service);

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
        reports: [
          {
            name: 'Hemograma',
            hasBeenDelivered: false,
            datasources: [
              {
                key: "ultimo_rcpc",
                datasource: "Activity",
                result: {}
              }
            ]
          },
          {
            name: 'Glicemia',
            hasBeenDelivered: true,
            datasources: [
              {
                key: "ultimo_rcpc",
                datasource: "Activity",
                result: {}
              }
            ]
          },
          {
            id: 132465,
            template: "<span>{{datasources.ultimo_rcpc.getAnswerById(rcpc_1)}}<span>",
            datasources: [
              {
                key: "ultimo_rcpc",
                datasource: "Activity",
                result: {}
              }
            ]
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