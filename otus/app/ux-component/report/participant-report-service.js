(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .service('otusjs.otus.uxComponent.ParticipantReportService', service);

  service.$inject = [
    '$q',
    '$timeout'
  ];

  function service($q, $timeout) {
    let self = this;

    self.fetchReportList = fetchReportList;
    self.getFullReport = getFullReport;


    function fetchReportList() {
      let defer = $q.defer();


      defer.resolve(fakeData.reportList);

      return defer.promise;
    }

    function getFullReport(id) {
      let defer = $q.defer();

      $timeout(function () {
        defer.resolve(fakeData.reports[id])

      }, getRandomTimeout(7));
      return defer.promise;

    }


    // temporary resources
    function getRandomTimeout(maxSeconds) {
      return Math.floor(Math.random() * Math.floor(maxSeconds))*1000;
    }

    let fakeData = {
      reports: {
        1: {
          name: 'Hemograma',
          hasBeenDelivered: false,
          dataSources: [
            {
              key: "ultimo_rcpc",
              datasource: "Activity",
              result: []
            }
          ]
        },
        2: {
          name: 'Glicemia',
          hasBeenDelivered: true,
          dataSources: [
            {
              key: "ultimo_rcpc",
              datasource: "Activity",
              result: []
            }
          ]
        },
        3: {
          name: 'Urina',
          id: 132465,
          template: "<span>{{dataSources.ultimo_rcpc.getAnswerById(rcpc_1)}}<span>",
          dataSources: [
            {
              key: "ultimo_rcpc",
              datasource: "Activity",
              result: []
            }
          ]
        },
        4: {
          "template": "<span>{{dataSources.Participant.recruitmentNumber}}<span>",
          "dataSources": [
            {
              "key": "cabeçalho",
              "dataSource": "Participant",
              "result": [
                {
                  "recruitmentNumber": 3051442,
                  "name": "ANDRÃƒâ€°IA APARECIDA",
                  "sex": "F",
                  "birthdate": {
                    "objectType": "ImmutableDate",
                    "value": "1977-05-04 00:00:00.000"
                  },
                  "fieldCenter": {
                    "acronym": "ES"
                  }
                }
              ]
            },
            {
              "filters": {
                "acronym": "MED3",
                "category": "C0",
                "statusHistory": {
                  "name": "FINALIZED",
                  "position": -1
                }
              },
              "key": "HS",
              "dataSource": "Activity",
              "result": [
                {
                  "statusHistory": [
                    {
                      "objectType": "ActivityStatus",
                      "name": "FINALIZED",
                      "date": "2018-03-05T21:59:13.027Z",
                      "user": {
                        "name": "Allister",
                        "surname": "Ramos",
                        "phone": "51982706037",
                        "email": "allistertr@hotmail.com"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      reportList: [
        {
          id: '1',
          name: 'Hemograma',
        },
        {
          id: '2',
          name: 'Glicemia',
        },
        {
          id: '3',
          name: 'Urina',
        },
        {
          id: '4',
          name: 'Data de coleta',
        }
      ]
    };

  }

}());
