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
    /* Public methods */
    self.getStatusOfActivities = getStatusOfActivities;
    self.defineActivityWithDoesNotApplies = defineActivityWithDoesNotApplies;
    self.buildActivityStatus = buildActivityStatus;
    self.getParticipantActivityReportLists = getParticipantActivityReportLists;

    function getStatusOfActivities(recruitmentNumber) {
      // self.ParticipantActivityReportList = MonitoringCollectionService.getStatusOfActivities(recruitmentNumber);
      self.ParticipantActivityReportList = [
        {
          "activities": [],
          "acronym": "FCOC",
          "name": "FUNÇÃO COGNITIVA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T13:39:08.827Z",
                  "user": {
                    "name": "Wilson",
                    "surname": "Cañon Montañez",
                    "phone": "51989197171",
                    "email": "wilcamo32@yahoo.com"
                  }
                }
              ]
            }
          ],
          "acronym": "CURC",
          "name": "RECEPÇÃO DA COLETA DE URINA"
        },
        {
          "activities": [],
          "acronym": "FRC",
          "name": "Formulário Revisão Cardiovascular"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-09-26T18:52:03.631Z",
                  "user": {
                    "name": "Cristina",
                    "surname": "Castilhos",
                    "phone": "51999122700",
                    "email": "ccdickie@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T19:53:26.558Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T18:26:31.784Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            }
          ],
          "acronym": "ISG",
          "name": "INGESTÃO DA SOLUÇÃO DE GLICOSE",
          "doesNotApply": {
            "recruitmentNumber": 5059678,
            "acronym": "ISG",
            "observation": "lalaia"
          }
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-09-26T18:49:51.436Z",
                  "user": {
                    "name": "Cristina",
                    "surname": "Castilhos",
                    "phone": "51999122700",
                    "email": "ccdickie@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T19:53:26.558Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T18:26:31.784Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            }
          ],
          "acronym": "CSP",
          "name": "COLETA DE SANGUE PÓS-CARGA"
        },
        {
          "activities": [],
          "acronym": "MED2",
          "name": "USO DE MEDICAMENTOS 2"
        },
        {
          "activities": [],
          "acronym": "MED3",
          "name": "USO DE MEDICAMENTOS 3"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-12-15T11:59:18.323Z",
                  "user": {
                    "name": "Mirna",
                    "surname": "Anocibar Araújo",
                    "phone": "51982710979",
                    "email": "mirnadocris@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "MEDC",
          "name": "USO DE MEDICAMENTOS"
        },
        {
          "activities": [],
          "acronym": "AMAC",
          "name": "ANAMNESE AUDIOLÓGICA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T15:27:10.864Z",
                  "user": {
                    "name": "Carolina",
                    "surname": "Breda Resende",
                    "phone": "51991152538",
                    "email": "breda.carolina@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "CISE",
          "name": "CIS-R"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T13:52:18.918Z",
                  "user": {
                    "name": "Katharine",
                    "surname": "Konrad Leal",
                    "phone": "53981498171",
                    "email": "katharineeleal@hotmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "HVSD",
          "name": "HÁBITOS DE VIDA RELACIONADOS À SAÚDE"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-21T13:05:46.150Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "DORC",
          "name": "DOR CRÔNICA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T14:19:43.623Z",
                  "user": {
                    "name": "Katharine",
                    "surname": "Konrad Leal",
                    "phone": "53981498171",
                    "email": "katharineeleal@hotmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "EAIC",
          "name": "EXPERIÊNCIAS ADVERSAS NA INFÂNCIA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-02T14:50:21.453Z",
                  "user": {
                    "name": "Tássia",
                    "surname": "Camargo",
                    "phone": "51993663464",
                    "email": "tassiacam@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "HMPD",
          "name": "HISTÓRIA MÉDICA PREGRESSA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T14:03:36.351Z",
                  "user": {
                    "name": "Katharine",
                    "surname": "Konrad Leal",
                    "phone": "53981498171",
                    "email": "katharineeleal@hotmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "DISC",
          "name": "DISCRIMINAÇÃO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "CREATED",
                  "date": "2017-06-21T12:37:59.566Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-21T13:18:00.252Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "DIEC",
          "name": "DIETA"
        },
        {
          "activities": [],
          "acronym": "CFUC",
          "name": "CAPACIDADE FUNCIONAL"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T11:13:26.387Z",
                  "user": {
                    "name": "Carolina",
                    "surname": "Breda Resende",
                    "phone": "51991152538",
                    "email": "breda.carolina@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "CREATED",
                  "date": "2017-06-21T12:37:59.503Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "ANTC",
          "name": "ANTROPOMETRIA"
        },
        {
          "activities": [],
          "acronym": "MULC",
          "name": "MULHERES"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T14:40:45.556Z",
                  "user": {
                    "name": "Katharine",
                    "surname": "Konrad Leal",
                    "phone": "53981498171",
                    "email": "katharineeleal@hotmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "AFID",
          "name": "ATIVIDADE FÍSICA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-09-26T18:48:03.212Z",
                  "user": {
                    "name": "Cristina",
                    "surname": "Castilhos",
                    "phone": "51999122700",
                    "email": "ccdickie@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T19:53:26.558Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T18:26:31.784Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            }
          ],
          "acronym": "CSJ",
          "name": "COLETA JEJUM"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-21T12:39:09.100Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-12-15T12:06:58.902Z",
                  "user": {
                    "name": "Thiane",
                    "surname": "Ristow Cardinal",
                    "phone": "51999021994",
                    "email": "thianeristowcardinal@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "BIOC",
          "name": "BIOIMPEDÂNCIA E ANTROPOMETRIA JEJUM"
        },
        {
          "activities": [],
          "acronym": "MSKC",
          "name": "MUSCULOESQUELÉTICO"
        },
        {
          "activities": [],
          "acronym": "RETCLQ",
          "name": "CENTRO DE LEITURA DE RETINOGRAFIA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "CREATED",
                  "date": "2017-06-21T12:37:59.527Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-21T13:04:38.585Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "SPPC",
          "name": "BATERIA CURTA DE PERFORMANCE FÍSICA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2018-03-28T19:20:47.633Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "DSOC",
          "name": "DIÁRIO DO SONO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T14:31:59.720Z",
                  "user": {
                    "name": "Katharine",
                    "surname": "Konrad Leal",
                    "phone": "53981498171",
                    "email": "katharineeleal@hotmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "HOCC",
          "name": "HISTÓRIA OCUPACIONAL"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "CREATED",
                  "date": "2017-04-12T10:35:11.975Z",
                  "user": {
                    "name": "Wilson",
                    "surname": "Cañon Montañez",
                    "phone": "51989197171",
                    "email": "wilcamo32@yahoo.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T19:27:35.019Z",
                  "user": {
                    "name": "Patrícia",
                    "surname": "Damé",
                    "phone": "51991024765",
                    "email": "patikdame@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2018-03-26T19:59:02.751Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "ACTA",
          "name": "ACTIMETRIA ATIVAÇÃO"
        },
        {
          "activities": [],
          "acronym": "MONC",
          "name": "MONOFILAMENTO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-09-26T18:49:05.723Z",
                  "user": {
                    "name": "Cristina",
                    "surname": "Castilhos",
                    "phone": "51999122700",
                    "email": "ccdickie@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T19:53:26.558Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "INITIALIZED_OFFLINE",
                  "date": "2017-04-12T18:26:31.784Z",
                  "user": {
                    "name": "vilmar",
                    "surname": "moreira",
                    "phone": "51993919378",
                    "email": "marioplates@yahoo.com.br"
                  }
                }
              ]
            }
          ],
          "acronym": "CSI",
          "name": "COLETA DE SANGUE INTERMEDIÁRIA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "CREATED",
                  "date": "2017-06-21T12:37:59.734Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-21T12:58:25.448Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "RETC",
          "name": "RETINOGRAFIA"
        },
        {
          "activities": [],
          "acronym": "B342",
          "name": "BUG342"
        },
        {
          "activities": [],
          "acronym": "FORC",
          "name": "FORÇA ISOMÉTRICA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2018-03-28T18:54:30.145Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "ACTDC",
          "name": "ACTIMETRIA DEVOLUÇÃO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T13:54:29.403Z",
                  "user": {
                    "name": "Katharine",
                    "surname": "Konrad Leal",
                    "phone": "53981498171",
                    "email": "katharineeleal@hotmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "SONC",
          "name": "SONO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T14:15:44.485Z",
                  "user": {
                    "name": "Katharine",
                    "surname": "Konrad Leal",
                    "phone": "53981498171",
                    "email": "katharineeleal@hotmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "PSEC",
          "name": "POSIÇÃO SÓCIOECONÔMICA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T11:28:05.250Z",
                  "user": {
                    "name": "Thiane",
                    "surname": "Ristow Cardinal",
                    "phone": "51999021994",
                    "email": "thianeristowcardinal@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "PASC",
          "name": "PRESSÃO ARTERIAL"
        },
        {
          "activities": [],
          "acronym": "CCA",
          "name": "QUESTIONÁRIO PARA COLETA DE CABELO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-21T13:00:37.744Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "USGC",
          "name": "ULTRASSONOGRAFIA DAS ARTÉRIAS CARÓTIDAS E FEMORAIS"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-09T18:05:48.182Z",
                  "user": {
                    "name": "William",
                    "surname": "Dartora",
                    "phone": "51982727783",
                    "email": "dartorawilliam@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "CREATED",
                  "date": "2017-06-21T12:37:59.564Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "VOPC",
          "name": "VELOCIDADE DA ONDA DE PULSO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-12T10:46:42.876Z",
                  "user": {
                    "name": "Wilson",
                    "surname": "Cañon Montañez",
                    "phone": "51989197171",
                    "email": "wilcamo32@yahoo.com"
                  }
                }
              ]
            }
          ],
          "acronym": "RCPC",
          "name": "RECEPÇÃO"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-04-20T17:10:05.596Z",
                  "user": {
                    "name": "Jeanne Gabriele",
                    "surname": "Schmidt",
                    "phone": "51981672936",
                    "email": "jeannegsch@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "TVSC",
          "name": "TESTE DE VOZ SUSSURRADA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "CREATED",
                  "date": "2017-06-21T12:37:59.781Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            },
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-06-21T12:52:57.199Z",
                  "user": {
                    "name": "Eduarda",
                    "surname": "Fin",
                    "phone": "51992165481",
                    "email": "dudafin@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "ECGC",
          "name": "ELETROCARDIOGRAMA"
        },
        {
          "activities": [
            {
              "statusHistory": [
                {
                  "objectType": "ActivityStatus",
                  "name": "FINALIZED",
                  "date": "2017-07-26T18:11:17.919Z",
                  "user": {
                    "name": "Mirna",
                    "surname": "Anocibar Araújo",
                    "phone": "51982710979",
                    "email": "mirnadocris@gmail.com"
                  }
                }
              ]
            }
          ],
          "acronym": "TCLEC",
          "name": "TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO"
        },
        {
          "activities": [],
          "acronym": "MOND",
          "name": "MONOFILAMENTO"
        },
        {
          "activities": [],
          "acronym": "DSN",
          "name": "Diário do Sono para Trabalhadores Noturnos"
        },
        {
          "activities": [],
          "acronym": "TST",
          "name": "teste"
        }
      ];
      return _buildDataToView(self.ParticipantActivityReportList);
    };

    function getParticipantActivityReportLists() {
        return self.ParticipantActivityReportList;
    }

    function defineActivityWithDoesNotApplies(recruitmentNumber, observation, activity) {
      var data = {
        "recruitmentNumber": recruitmentNumber,
        "acronym": activity.acronym,
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
          information.push({
            'status': _buildStatusToPTbr(activity.statusHistory.name),
            'date': $filter('date')(activity.statusHistory.date, 'dd/MM/yyyy')
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
        switch (data.activities[0].statusHistory.name) {
          case CREATED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': CREATED,
              'date': $filter('date')(data.activities[0].statusHistory.date, 'dd/MM/yyyy')
            };
          case SAVED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': SAVED,
              'date': $filter('date')(data.activities[0].statusHistory.date, 'dd/MM/yyyy')
            };
          case FINALIZED:
            return {
              'acronym': data.acronym,
              'name': data.name,
              'status': FINALIZED,
              'date': $filter('date')(data.activities[0].statusHistory.date, 'dd/MM/yyyy')
            };
        }
      }
      return data;
    };

    function _buildDataToView(response) {
      if (!response)
        return;
      var data = [];
      response.forEach(function (activity) {
        data.push(buildActivityStatus(activity));
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
