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
    var self = this;

    self.fetchReportList = fetchReportList;
    self.getFullReport = getFullReport;


    function fetchReportList() {
      var defer = $q.defer();


      defer.resolve(self.fakeData.reportList);

      return defer.promise;
    }

    function getFullReport(id) {
      var defer = $q.defer();

      $timeout(function () {
        var fullReport = self.fakeData.reports[id];
        console.log(fullReport);
        if(fullReport){
          defer.resolve(fullReport);
        }else{
          defer.reject(new Error('some error'));
        }

      }, getRandomTimeout(7));
      return defer.promise;

    }


    // temporary resources
    function getRandomTimeout(maxSeconds) {
      return Math.floor(Math.random() * Math.floor(maxSeconds))*1000;
    }

    self.fakeData = {
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
          template: "<span>{{dataSources.ultimo_rcpc.getAnswerById(rcpc_1)}}</span>",
          dataSources: [
            {
              key: "ultimo_rcpc",
              datasource: "Activity",
              result: []
            }
          ]
        },
        4: {
          "template": "<span>{{dataSources.Participant.recruitmentNumber}}</span>",
          dataSources: [
            {
              key: "cabeçalho",
              label:"",
              dataSource: "Participant",
              result: [
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
        },
        {
          id: '5',
          name: 'Relatório 5',
        },
        { id: 6, name: 'Relatório 6' },
        { id: 7, name: 'Relatório 7' },
        { id: 8, name: 'Relatório 8' },
        { id: 9, name: 'Relatório 9' },
        { id: 10, name: 'Relatório 10' },
        { id: 11, name: 'Relatório 11' },
        { id: 12, name: 'Relatório 12' },
        { id: 13, name: 'Relatório 13' },
        { id: 14, name: 'Relatório 14' },
        { id: 15, name: 'Relatório 15' },
        { id: 16, name: 'Relatório 16' }
      ]
    };

  }

}());
