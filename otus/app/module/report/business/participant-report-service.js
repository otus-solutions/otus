(function () {
  'use strict';

  angular
    .module('otusjs.report.business')
    .service('otusjs.report.business.ParticipantReportService', service);

  service.$inject = [
    '$q',
    'otusjs.report.repository.ParticipantReportRepositoryService'
  ];

  function service($q, ParticipantReportCollectionService) {
    var self = this;

    self.fetchReportList = fetchReportList;
    self.getFullReport = getFullReport;  //todo reassign


    function fetchReportList(participant) {
      return ParticipantReportCollectionService.getParticipantReportList(participant.recruitmentNumber)
    }

    function getFullReport(participant, reportId) {
      return ParticipantReportCollectionService.getFullReport(participant.recruitmentNumber, reportId)
    }


    //todo: remover daqui pra baixo
    function fetchFakeReportList() {
      var defer = $q.defer();


      defer.resolve(self.fakeData.reportList);

      return defer.promise;
    }


    function getFakeFullReport(participant, id) {
      var defer = $q.defer();

      $timeout(function () {
          var fullReport = self.fakeData.reports[id];
          if (fullReport) {
            defer.resolve(fullReport);
          } else {
            defer.reject(new Error('some error'));
          }

        },
        //getRandomTimeout(7)
      );
      return defer.promise;

    }


    // temporary resources
    function getRandomTimeout(maxSeconds) {
      return Math.floor(Math.random() * Math.floor(maxSeconds)) * 1000;
    }

    self.fakeData = {
      reports: {
        1: {
          label: 'Hemograma',
          dataSources: [
            {
              key: "ultimo_rcpc",
              label: "Basófilos",
              dataSource: "Activity",
              result: [null]
            }
          ]
        },
        2: {
          label: 'Glicemia',
          dataSources: [
            {
              key: "ultimo_rcpc",
              label: "Resultado Glicemia",
              dataSource: "Activity",
              result: [null]
            }
          ]
        },
        3: {
          label: 'Urina',
          template: "<span>{{dataSources.ultimo_rcpc.getAnswerById(rcpc_1)}}</span>",
          dataSources: [
            {
              key: "ultimo_rcpc",
              label: "Último RCPC",
              dataSource: "Activity",
              result: [null]
            },
            {
              key: "ultimo_rcpc",
              label: "Outra atividade",
              dataSource: "Activity",
              result: [null]
            }
          ]
        },
        4: {
          label: 'Data de coleta',
          "template": "<span>{{dataSources.Participant.recruitmentNumber}}</span>",
          dataSources: [
            {
              key: "cabeçalho",
              label: "Informações básicas do Participante",
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
              label: "Alguma atividade",
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
          label: 'Hemograma',
        },
        {
          id: '2',
          label: 'Glicemia',
        },
        {
          id: '3',
          label: 'Urina',
        },
        {
          id: '4',
          label: 'Data de coleta',
        },
        {
          id: '5',
          label: 'Relatório 5',
        },
        {id: 6, label: 'Relatório 6'},
        {id: 7, label: 'Relatório 7'},
        {id: 8, label: 'Relatório 8'},
        {id: 9, label: 'Relatório 9'},
        {id: 10, label: 'Relatório 10'},
        {id: 11, label: 'Relatório 11'},
        {id: 12, label: 'Relatório 12'},
        {id: 13, label: 'Relatório 13'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 15, label: 'Relatório 15'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 14, label: 'Relatório 14'},
        {id: 15, label: 'Relatório 15'},
        {id: 16, label: 'Relatório 35'}
      ]
    };

  }

}());
