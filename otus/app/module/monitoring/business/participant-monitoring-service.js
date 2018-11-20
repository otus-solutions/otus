(function () {
  'use strict';

  angular
    .module('otusjs.monitoring.business')
    .service('otusjs.monitoring.business.ParticipantMonitoringService', Service);

  Service.$inject = [
    '$filter',
    'otusjs.monitoring.repository.MonitoringCollectionService'
  ];

  function Service($filter, MonitoringCollectionService) {
    const CREATED = 'CREATED';
    const SAVED = 'SAVED';
    const FINALIZED = 'FINALIZED';
    const DOES_NOT_APPLY = 'DOES_NOT_APPLY';
    const UNDEFINED = 'UNDEFINED';
    const MULTIPLE = 'MULTIPLE';
    const AMBIGUITY = 'AMBIGUITY';
    const AMBIGUITY_STATE_DESCRIPTION = 'Atividade definida como não se aplica, porém, existe atividade(s) adicionada(s) ao participante!';
    const MULTIPLE_STATE_DESCRIPTION = 'Existe mais de uma atividade adicionada ao participante! Status e datas descritas abaixo:';

    var self = this;
    self.data = [];
    /* Public methods */
    self.getStatusOfActivities = getStatusOfActivities;
    self.defineActivityWithDoesNotApplies = defineActivityWithDoesNotApplies;

    function getStatusOfActivities(recruitmentNumber) {
      // self.data = _buildDataToView(MonitoringCollectionService.getStatusOfActivities(recruitmentNumber));
      // return self.data;

      return _buildDataToView([{
        "_id": "5aff3edaaf11bb0d302be3c7",
        "activities": [
          {
            "_id": "5be45306e69a690064fb1e1c",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "FINALIZED",
                "date": "2018-11-08T15:15:45.810Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          },
          {
            "_id": "5be4533be69a690064fb1e1d",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "FINALIZED",
                "date": "2018-11-08T15:16:41.177Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          }
        ],
        "acronym": "CSJ",
        "name": "COLETA JEJUM",
        "doesNotApply": {
          "_id": "5be443ef4c43aa5319b3d1da",
          "rn": 7000312,
          "acronym": "CSJ",
          "observation": "Atividade está descartada, participante está com febre amarela."
        }
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e3",
        "activities": [],
        "acronym": "VOPC",
        "name": "VELOCIDADE DA ONDA DE PULSO"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e4",
        "activities": [
          {
            "_id": "5be45306e69a690064fb1e1c",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "FINALIZED",
                "date": "2018-11-08T15:15:45.810Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          },
          {
            "_id": "5be4533be69a690064fb1e1d",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "FINALIZED",
                "date": "2018-09-08T15:16:41.177Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          }
        ],
        "acronym": "USGC",
        "name": "ULTRASSONOGRAFIA DAS ARTÉRIAS CARÓTIDAS E FEMORAIS"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e5",
        "activities": [],
        "acronym": "ANTC",
        "name": "ANTROPOMETRIA"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e6",
        "activities": [
          {
            "_id": "5b843716086a5e5ee961e05c",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "SAVED",
                "date": "2018-08-27T17:39:01.285Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          }
        ],
        "acronym": "DIEC",
        "name": "DIETA"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e7",
        "activities": [],
        "acronym": "CFUC",
        "name": "CAPACIDADE FUNCIONAL"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3ee",
        "activities": [],
        "acronym": "FORC",
        "name": "FORÇA ISOMÉTRICA"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3ef",
        "activities": [
          {
            "_id": "5b8d773f086a5e5ee91527fe",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "CREATED",
                "date": "2018-09-03T18:02:39.750Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          }
        ],
        "acronym": "ACTDC",
        "name": "ACTIMETRIA DEVOLUÇÃO"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f0",
        "activities": [],
        "acronym": "RETC",
        "name": "RETINOGRAFIA"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f1",
        "activities": [],
        "acronym": "CSI",
        "name": "COLETA DE SANGUE INTERMEDIÁRIA",
        "doesNotApply": {
          "_id": "5be443ef4c43aa5319b3d1da",
          "rn": 7000312,
          "acronym": "CSJ",
          "observation": "Atividade está descartada, participante está com febre amarela."
        }
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f4",
        "activities": [],
        "acronym": "EAIC",
        "name": "EXPERIÊNCIAS ADVERSAS NA INFÂNCIA"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f5",
        "activities": [],
        "acronym": "FRC",
        "name": "Formulário Revisão Cardiovascular"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f8",
        "activities": [
          {
            "_id": "5b8d773f086a5e5ee91527ff",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "CREATED",
                "date": "2018-09-03T18:02:39.755Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          }
        ],
        "acronym": "AFID",
        "name": "ATIVIDADE FÍSICA"
      },
      {
        "_id": "5aff3ee1af11bb0d302be3f9",
        "activities": [],
        "acronym": "MULC",
        "name": "MULHERES"
      },
      {
        "_id": "5aff3ee1af11bb0d302be3fa",
        "activities": [],
        "acronym": "SONC",
        "name": "SONO"
      },
      {
        "_id": "5b0c2eec086a5e1c77cd86f2",
        "activities": [],
        "acronym": "MOND",
        "name": "MONOFILAMENTO"
      },
      {
        "_id": "5b858dda086a5e5ee91527e9",
        "activities": [],
        "acronym": "DQUOTE",
        "name": "Testes"
      }, {
        "_id": "5b869bb3086a5e5ee91527f6",
        "activities": [
          {
            "_id": "5be07e20e69a690064fb1e1a",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "FINALIZED",
                "date": "2018-11-05T17:30:17.887Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          }
        ],
        "acronym": "DQUOTETWO",
        "name": "teste"
      }, {
        "_id": "5b9a98b0086a5e5ee9152806",
        "activities": [
          {
            "_id": "5b9a98e0086a5e5ee9152807",
            "statusHistory": [
              {
                "objectType": "ActivityStatus",
                "name": "SAVED",
                "date": "2018-09-13T17:07:33.244Z",
                "user": {
                  "name": "Emanoel",
                  "surname": "Vianna",
                  "phone": "51999999999",
                  "email": "vianna.emanoel@gmail.com"
                }
              }
            ]
          }
        ],
        "acronym": "MARAVILHA",
        "name": "funciona"
      }, {
        "_id": "5b9acc72086a5e5ee9152808",
        "activities": [],
        "acronym": "TS",
        "name": "teste"
      }]);
    };

    function defineActivityWithDoesNotApplies(recruitmentNumber, observation, survey) {
      var data = {
        "recruitmentNumber": recruitmentNumber,
        "acronym": survey.acronym,
        "observation": observation
      };

      return MonitoringCollectionService.defineActivityWithDoesNotApplies(data);
    };


    function buildActivityStatus(data) {
      if (data.doesNotApply) {
        if (data.activities.length == 0) {
          return {
            'acronym': data.acronym,
            'name': data.name,
            'status': DOES_NOT_APPLY,
            'observation': data.doesNotApply ? data.doesNotApply.observation : undefined
          };
        } else {
          return {
            'acronym': data.acronym,
            'name': data.name,
            'status': AMBIGUITY,
            'description': AMBIGUITY_STATE_DESCRIPTION,
            'observation': data.doesNotApply ? data.doesNotApply.observation : undefined
          };
        }
      } else if (data.activities.length == 0) {
        return {
          'acronym': data.acronym,
          'name': data.name,
          'status': UNDEFINED
        };
      } else if (data.activities.length > 1) {
        var information = [];
        data.activities.filter(function (activity) {
          var length = activity.statusHistory.length;
          information.push({
            'status': _buildStatusToPTbr(activity.statusHistory[length - 1].name),
            'date': $filter('date')(activity.statusHistory[length - 1].date, 'dd/MM/yyyy')
          });
        });
        return {
          'acronym': data.acronym,
          'name': data.name,
          'status': MULTIPLE,
          'description': MULTIPLE_STATE_DESCRIPTION,
          'information': information
        };
      } else if (data.activities.length == 1) {
        var length = data.activities[0].statusHistory.length;
        switch (data.activities[0].statusHistory[length - 1].name) {
          case CREATED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': CREATED,
              'date': $filter('date')(data.activities[0].statusHistory[length - 1].date, 'dd/MM/yyyy')
            };
          case SAVED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': SAVED,
              'date': $filter('date')(data.activities[0].statusHistory[length - 1].date, 'dd/MM/yyyy')
            };
          case FINALIZED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': FINALIZED,
              'date': $filter('date')(data.activities[0].statusHistory[length - 1].date, 'dd/MM/yyyy')
            };
        }
      }
      return data;
    };

    function _buildDataToView(response) {
      var data = [];
      response.filter(function (survey) {
        data.push(buildActivityStatus(survey));
      });
      return data;
    };

    function _buildStatusToPTbr(status) {
      switch (status) {
        case CREATED:
          return 'Criado';
        case SAVED:
          return 'Salvo';
        case FINALIZED:
          return 'Finalizado';
      }
    };

  }

}());
