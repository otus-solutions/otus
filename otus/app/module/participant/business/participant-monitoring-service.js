(function () {
  'use strict';

  angular
    .module('otusjs.participant.business')
    .service('otusjs.participant.business.ParticipantMonitoringService', Service);

  Service.$inject = [
    'otusjs.participant.repository.ParticipantMonitoringRepositoryService'
  ];

  function Service(ParticipantMonitoringRepositoryService) {
    const CREATED = 'CREATED';
    const SAVED = 'SAVED';
    const FINALIZED = 'FINALIZED';
    const UNNECESSARY = 'UNNECESSARY';

    var self = this;
    /* Public methods */
    self.getStatusOfActivities = getStatusOfActivities;
    self.updateObservation = updateObservation;

    function getStatusOfActivities(recruitmentNumber) {
      // return _buildDataToView(ParticipantMonitoringRepositoryService.getParticipantReportList(recruitmentNumber));

      /**
        TODO: Estrutura deve ser retornada do banco
      **/
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
        "unnecessary": {
          "_id": "5be443ef4c43aa5319b3d1da",
          "rn": 7000312,
          "acronym": "CSJ",
          "observations": "Atividade está descartada, participante está com febre amarela."
        }
      },
      {
        "_id": "5aff3edaaf11bb0d302be3c9",
        "activities": [],
        "acronym": "RCPC",
        "name": "RECEPÇÃO"
      },
      {
        "_id": "5aff3edaaf11bb0d302be3cb",
        "activities": [],
        "acronym": "ISG",
        "name": "INGESTÃO DA SOLUÇÃO DE GLICOSE"
      },
      {
        "_id": "5aff3edbaf11bb0d302be3cd",
        "activities": [],
        "acronym": "CSP",
        "name": "COLETA DE SANGUE PÓS-CARGA"
      },
      {
        "_id": "5aff3edcaf11bb0d302be3d2",
        "activities": [],
        "acronym": "MED2",
        "name": "USO DE MEDICAMENTOS 2"
      },
      {
        "_id": "5aff3edcaf11bb0d302be3d4",
        "activities": [],
        "acronym": "MEDC",
        "name": "USO DE MEDICAMENTOS"
      },
      {
        "_id": "5aff3eddaf11bb0d302be3d7",
        "activities": [],
        "acronym": "MED3",
        "name": "USO DE MEDICAMENTOS 3"
      },
      {
        "_id": "5aff3eddaf11bb0d302be3d9",
        "activities": [],
        "acronym": "AMAC",
        "name": "ANAMNESE AUDIOLÓGICA"
      },
      {
        "_id": "5aff3edeaf11bb0d302be3dd",
        "activities": [],
        "acronym": "CISE",
        "name": "CIS-R"
      },
      {
        "_id": "5aff3edeaf11bb0d302be3de",
        "activities": [],
        "acronym": "DORC",
        "name": "DOR CRÔNICA"
      },
      {
        "_id": "5aff3edeaf11bb0d302be3df",
        "activities": [],
        "acronym": "BIOC",
        "name": "BIOIMPEDÂNCIA E ANTROPOMETRIA JEJUM"
      },
      {
        "_id": "5aff3edeaf11bb0d302be3e0",
        "activities": [],
        "acronym": "MSKC",
        "name": "MUSCULOESQUELÉTICO"
      },
      {
        "_id": "5aff3edeaf11bb0d302be3e1",
        "activities": [],
        "acronym": "RETCLQ",
        "name": "CENTRO DE LEITURA DE RETINOGRAFIA"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e3",
        "activities": [],
        "acronym": "VOPC",
        "name": "VELOCIDADE DA ONDA DE PULSO"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e4",
        "activities": [],
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
        "_id": "5aff3edfaf11bb0d302be3e8",
        "activities": [],
        "acronym": "DISC",
        "name": "DISCRIMINAÇÃO"
      },
      {
        "_id": "5aff3edfaf11bb0d302be3e9",
        "activities": [],
        "acronym": "DSOC",
        "name": "DIÁRIO DO SONO"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3ea",
        "activities": [],
        "acronym": "HOCC",
        "name": "HISTÓRIA OCUPACIONAL"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3eb",
        "activities": [],
        "acronym": "ACTA",
        "name": "ACTIMETRIA ATIVAÇÃO"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3ec",
        "activities": [],
        "acronym": "MONC",
        "name": "MONOFILAMENTO"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3ed",
        "activities": [],
        "acronym": "B342",
        "name": "BUG342"
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
        "name": "COLETA DE SANGUE INTERMEDIÁRIA"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f2",
        "activities": [],
        "acronym": "CURC",
        "name": "RECEPÇÃO DA COLETA DE URINA"
      },
      {
        "_id": "5aff3ee0af11bb0d302be3f3",
        "activities": [],
        "acronym": "PSEC",
        "name": "POSIÇÃO SÓCIOECONÔMICA"
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
        "_id": "5aff3ee1af11bb0d302be3fb",
        "activities": [],
        "acronym": "TVSC",
        "name": "TESTE DE VOZ SUSSURRADA"
      },
      {
        "_id": "5aff3ee1af11bb0d302be3fc",
        "activities": [],
        "acronym": "HVSD",
        "name": "HÁBITOS DE VIDA RELACIONADOS À SAÚDE"
      },
      {
        "_id": "5aff3ee1af11bb0d302be3fd",
        "activities": [],
        "acronym": "ECGC",
        "name": "ELETROCARDIOGRAMA"
      },
      {
        "_id": "5aff3ee1af11bb0d302be3fe",
        "activities": [],
        "acronym": "TCLEC",
        "name": "TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO"
      }]);
    }

    function updateObservation(data) {
      // TODO:
    }

    function _buildDataToView(response) {
      var result = [];
      response.filter(function (survey) {
        if (survey.unnecessary) {
          result.push({
            'acronym': survey.acronym,
            'name': survey.name,
            'status': UNNECESSARY,
            'date': survey.name,
            'observations': survey.unnecessary ? survey.unnecessary.observations : undefined
          });
        } else if (survey.activities.length == 0) {
          console.log(survey);
          var length = survey.activities.statusHistory.length;
          if (survey.activities.statusHistory[length - 1].name === CREATED) {
            result.push({
              'acronym': survey.acronym,
              'name': survey.name,
              'status': CREATED,
              'date': survey.name,
              'observations': survey.unnecessary ? survey.unnecessary.observations : undefined
            });
          } else if (survey.activities.statusHistory[length - 1].name === SAVED) {
            result.push({
              'acronym': survey.acronym,
              'name': survey.name,
              'status': SAVED,
              'date': survey.name,
              'observations': survey.unnecessary ? survey.unnecessary.observations : undefined
            });
          } else if (survey.activities.statusHistory[length - 1].name === FINALIZED) {
            result.push({
              'acronym': survey.acronym,
              'name': survey.name,
              'status': FINALIZED,
              'date': survey.name,
              'observations': survey.unnecessary ? survey.unnecessary.observations : undefined
            });
          }
        } else if (survey.activities.length > 0) {
          result.push({
            'acronym': survey.acronym,
            'name': survey.name,
            'status': MULTIPLE,
            'date': survey.name,
            'observations': survey.unnecessary ? survey.unnecessary.observations : undefined
          });
        } else {
          result.push({
            'acronym': survey.acronym,
            'name': survey.name,
            'status': UNDEFINED,
            'date': survey.name,
            'observations': survey.unnecessary ? survey.unnecessary.observations : undefined
          });
        }
      });

      return result;
    }

  }

}());
