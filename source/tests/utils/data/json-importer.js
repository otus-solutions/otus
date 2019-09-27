var Test = {};
Test.utils = {};
Test.utils.data = {};
Test.utils.data.activity = [
  {
    "_id": "5aff3edaaf11bb0d302be3c7",
    "activities": [
      {
        "_id": "5be45306e69a690064fb1e1c",
        "isDiscarded": false,
        "mode": {
          "name": "Em papel"
        },
        "getID": function () {
          return "5be45306e69a690064fb1e1c";
        },
        "surveyForm": {
          "surveyTemplate": {
            "identity":
              {
                "extents": "StudioObject",
                "objectType": "SurveyIdentity",
                "name": "ACTIMETRIA DEVOLUÇÃO",
                "acronym": "ACTDC",
                "recommendedTo": "",
                "description": "",
                "keywords": []
              }
          }
        },
        "statusHistory": {
          "objectType": "ActivityStatus",
          "name": "FINALIZED",
          "date": "2018-11-08T15:15:45.810Z",
          "user": {
            "name": "Emanoel",
            "surname": "Vianna",
            "phone": "51999999999",
            "email": "otus@otus.com"
          },
          "getHistory": function () {
            return [{
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-11-08T15:15:45.810Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "otus@otus.com"
              }
            }]
          },
        }
      },
      {
        "_id": "5be4533be69a690064fb1e1d",
        "isDiscarded": false,
        "getID": function () {
          return "5be4533be69a690064fb1e1d";
        },
        "mode": {
          "name": "Online"
        },
        "surveyForm": {
          "surveyTemplate": {
            "identity":
              {
                "extents": "StudioObject",
                "objectType": "SurveyIdentity",
                "name": "ACTIMETRIA DEVOLUÇÃO",
                "acronym": "ACTDC",
                "recommendedTo": "",
                "description": "",
                "keywords": []
              }
          }
        },
        "statusHistory": {
          "objectType": "ActivityStatus",
          "name": "FINALIZED",
          "date": "2018-11-08T15:16:41.177Z",
          "user": {
            "name": "Emanoel",
            "surname": "Vianna",
            "phone": "51999999999",
            "email": "otus@otus.com"
          },
          "getHistory": function () {
            return [{
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-11-08T15:16:41.177Z",
              "user": {
                "name": "Emanoel",
                "surname": "Vianna",
                "phone": "51999999999",
                "email": "otus@otus.com"
              }
            }]
          },
        }
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
    "_id": "5aff3ee0af11bb0d302be3f8",
    "activities": [
      {
        "_id": "5b8d773f086a5e5ee91527ff",
        "statusHistory": {
          "objectType": "ActivityStatus",
          "name": "CREATED",
          "date": "2018-09-03T18:02:39.755Z",
          "user": {
            "name": "Emanoel",
            "surname": "Vianna",
            "phone": "51999999999",
            "email": "otus@otus.com"
          }
        }
      }
    ],
    "acronym": "AFID",
    "name": "ATIVIDADE FÍSICA"
  },
  {
    "_id": "5aff3edfaf11bb0d302be3e6",
    "activities": [
      {
        "_id": "5b843716086a5e5ee961e05c",
        "statusHistory":
          {
            "objectType": "ActivityStatus",
            "name": "SAVED",
            "date": "2018-08-27T17:39:01.285Z",
            "user": {
              "name": "Emanoel",
              "surname": "Vianna",
              "phone": "51999999999",
              "email": "otus@otus.com"
            }
          }
      }
    ],
    "acronym": "DIEC",
    "name": "DIETA"
  },
  {
    "_id": "5b869bb3086a5e5ee91527f6",
    "activities": [
      {
        "_id": "5be07e20e69a690064fb1e1a",
        "statusHistory":
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
      }
    ],
    "acronym": "DQUOTETWO",
    "name": "teste"
  },
  {
    "_id": "5aff3edfaf11bb0d302be3e4",
    "activities": [
      {
        "_id": "5be45306e69a690064fb1e1c",
        "statusHistory":
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
      },
      {
        "_id": "5be4533be69a690064fb1e1d",
        "statusHistory":
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
      }
    ],
    "acronym": "USGC",
    "name": "ULTRASSONOGRAFIA DAS ARTÉRIAS CARÓTIDAS E FEMORAIS"
  },
];
Test.utils.data.HeatMapActivity = {
  "acronym": "CSI",
  "date": null,
  "information": null,
  "name": "COLETA DE SANGUE INTERMEDIÁRIA",
  "objectType": "HeatMapActivity",
  "observation": null,
  "status": "UNDEFINED"
};
Test.utils.data.participantExamStatusList = {
  participantExams: [
    {
      "doesNotApply": {
        "name": null,
        "observation": "",
        "recruitmentNumber": "null"
      },
      "name": "CÁLCIO - URINA AMOSTRA ISOLADA",
      "quantity": 0
    }
  ]
};
Test.utils.data.selectedParticipant = {
  name: "OTUS",
  recruitmentNumber: 3051442,
  sex: "M"
}
Test.utils.data.HeatMapExam = {
  "name": "CÁLCIO - URINA AMOSTRA ISOLADA",
  "objectType": "HeatMapExam",
  "observation": null,
  "quantity": 0,
  "status": "DOES_NOT_HAVE"
};
Test.utils.data.Acronyms = [
  "CSJ", "RCPC", "ISG", "CSP", "MED2", "MEDC",
  "MED3", "AMAC", "CISE", "DORC", "BIOC", "MSKC",
  "CCA", "VOPC", "USGC", "ANTC", "DIEC", "CFUC",
  "DISC", "DSOC", "HOCC", "ACTA", "MONC", "B342",
  "FORC", "ACTD", "RETC"
];
Test.utils.data.StatusOfActivities = [
  {
    acronym: "CURC",
    activities: [],
    doesNotApply: null,
    name: "RECEPÇÃO DA COLETA DE URINA"
  },
  {
    acronym: "FRC",
    activities: [],
    doesNotApply: null,
    name: "Formulário Revisão Cardiovascular"
  }
];
Test.utils.data.ActivityWithDoesNotAppliesData = {
  acronym: "ANTC",
  observation: "",
  recruitmentNumber: 7000312
}
Test.utils.data.Exam = [
  {
    name: "CÁLCIO - URINA AMOSTRA ISOLADA",
    quantity: 1,
    doesNotApply: {}
  },
  {
    name: "ELSA TURBIURINA",
    quantity: 1,
    doesNotApply: {}
  }
];
Test.utils.data.ExamWithDoesNotAppliesData = {
  name: "CURVA GLICÊMICA -120 MINUTOS",
  observation: "",
  recruitmentNumber: 7000312
};
Test.utils.data.aliquot = {
  "_id" : "5ce2daad99e0c90065f4050a",
  "tubeCode" : "351286198",
  "transportationLotId" : null,
  "examLotId" : null,
  "examLotData" : null,
  "recruitmentNumber" : 50000501,
  "sex" : "M",
  "fieldCenter" : {
    "name" : "Rio Grande do Sul",
    "code" : 5,
    "acronym" : "RS",
    "country" : null,
    "state" : null,
    "address" : null,
    "complement" : null,
    "zip" : null,
    "phone" : null,
    "backgroundColor" : "rgba(75, 192, 192, 0.2)",
    "borderColor" : "rgba(75, 192, 192, 1)"
  },
  "birthdate" : {
    "objectType" : "ImmutableDate",
    "value" : "1990-01-05 00:00:00.000"
  },
  "objectType" : "Aliquot",
  "code" : "353686297",
  "name" : "FASTING_SERUM",
  "container" : "CRYOTUBE",
  "role" : "STORAGE",
  "aliquotCollectionData" : {
    "objectType" : "AliquotCollectionData",
    "metadata" : "",
    "operator" : "adonis.garcia.adg@gmail.com",
    "time" : "2019-05-20T16:49:49.879Z",
    "processing" : "2019-05-20T16:43:47.701Z"
  },
  "aliquotHistory" : [
        {
          "objectType": "AliquotEvent",
          "type": "CONVERTED_STORAGE",
          "userEmail": "otus@gmail.com",
          "description": "Falta de material para completar os exames",
          "date": "2019-05-14T12:36:23.631Z"
        }
      ]
};


Test.utils.data.activityPASC = {
  "_id": "58ee02de28110d317f1ad09b",
  "objectType": "Activity",
  "surveyForm": {
    "extents": "StudioObject",
    "objectType": "SurveyForm",
    "_id": undefined,
    "sender": "otus@gmail.com",
    "sendingDate": "2017-04-12T02:58:34.240Z",
    "surveyFormType": "FORM_INTERVIEW",
    "surveyTemplate": {
      "extents": "StudioObject",
      "objectType": "Survey",
      "oid": "dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls5MWE0ZTdmMC1mODI5LTExZTYtOWE4ZS1mMWE3MWZhZmVhZTddcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==",
      "identity": {
        "extents": "StudioObject",
        "objectType": "SurveyIdentity",
        "name": "PRESSÃO ARTERIAL",
        "acronym": "PASC",
        "recommendedTo": "",
        "description": "",
        "keywords": []
      },
      "dataSources": [],
      "metainfo": {
        "extents": "StudioObject",
        "objectType": "SurveyMetaInfo",
        "creationDatetime": "2017-02-21T11:33:30.223Z",
        "otusStudioVersion": ""
      },
      "itemContainer": [
        {
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Simn",
                  "formattedText": "<div>Sim</div>"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 1,
              "extractionValue": "1"
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Não",
                  "formattedText": "Não"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 2,
              "extractionValue": "0"
            }
          ],
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "01. Braço Esquerdo:",
              "formattedText": "<div>01. Braço Esquerdo:</div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": [
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 1,
                "extractionValue": ".Q",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não quer respondern",
                    "formattedText": "<div>Não quer responder</div>"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 2,
                "extractionValue": ".S",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não sabe",
                    "formattedText": "Não sabe"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 3,
                "extractionValue": ".A",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não se aplica",
                    "formattedText": "Não se aplica"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 4,
                "extractionValue": ".F",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não há dados",
                    "formattedText": "Não há dados"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              }
            ]
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "PASC1",
          "customID": "PASC3brs",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "cm",
              "formattedText": "cm"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "02. Circunferência do Braço Esquerdo:",
              "formattedText": "<div>02. Circunferência do Braço Esquerdo:</div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": [
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 1,
                "extractionValue": ".Q",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não quer responder",
                    "formattedText": "Não quer responder"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 2,
                "extractionValue": ".S",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não sabe",
                    "formattedText": "Não sabe"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 3,
                "extractionValue": ".A",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não se aplica",
                    "formattedText": "Não se aplica"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 4,
                "extractionValue": ".F",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não há dados",
                    "formattedText": "Não há dados"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              }
            ]
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "scale": {
                "data": {
                  "reference": 1,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "scale"
              },
              "upperLimit": {
                "data": {
                  "reference": 60,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 12,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "DecimalQuestion",
          "templateID": "PASC2",
          "customID": "PASC1",
          "dataType": "Decimal"
        },
        {
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Omron",
                  "formattedText": "Omron"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 1,
              "extractionValue": "1"
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Tycos",
                  "formattedText": "Tycos"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 2,
              "extractionValue": "2"
            }
          ],
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "&nbsp;03. Aparelho:",
              "formattedText": "<div>&nbsp;03. Aparelho:</div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": [
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 1,
                "extractionValue": ".Q",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não quer responder",
                    "formattedText": "Não quer responder"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 2,
                "extractionValue": ".S",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não sabe",
                    "formattedText": "Não sabe"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 3,
                "extractionValue": ".A",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não se aplica",
                    "formattedText": "Não se aplica"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 4,
                "extractionValue": ".F",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não há dados",
                    "formattedText": "Não há dados"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              }
            ]
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "PASC3",
          "customID": "PASC3mets",
          "dataType": "Integer"
        },
        {
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Adulto pequeno",
                  "formattedText": "Adulto pequeno"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 1,
              "extractionValue": "1"
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Adulto",
                  "formattedText": "Adulto"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 2,
              "extractionValue": "2"
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Adulto grande",
                  "formattedText": "Adulto grande"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 3,
              "extractionValue": "3"
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Coxa",
                  "formattedText": "Coxa"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 4,
              "extractionValue": "4"
            }
          ],
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "04. Tamanho do Manguito:",
              "formattedText": "<div>04. Tamanho do Manguito:</div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": [
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 1,
                "extractionValue": ".Q",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não quer responder",
                    "formattedText": "Não quer responder"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 2,
                "extractionValue": ".S",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não sabe",
                    "formattedText": "Não sabe"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 3,
                "extractionValue": ".A",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não se aplica",
                    "formattedText": "Não se aplica"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 4,
                "extractionValue": ".F",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não há dados",
                    "formattedText": "Não há dados"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              }
            ]
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "PASC4",
          "customID": "PASC1m",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "mmHg",
              "formattedText": "mmHg"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Medidas da Pressão Arterial  1. SISTÓLICA",
              "formattedText": "<b>Medidas da Pressão Arterial</b><div><b>1. SISTÓLICA</b></div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 220,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 70,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC6",
          "customID": "PASC3a",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "mmHg",
              "formattedText": "mmHg"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Medidas da Pressão Arterial   1. DIASTÓLICA",
              "formattedText": "<div><b style='letter-spacing: 0.14px;'>Medidas da Pressão Arterial</b><b><br></b></div><b>1. DIASTÓLICA</b>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 140,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 50,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC7",
          "customID": "PASC4a",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "bpm",
              "formattedText": "bpm"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "1. Frequência Cardíaca",
              "formattedText": "<b>1. Frequência Cardíaca</b>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 120,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 40,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC8",
          "customID": "PASC5a",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "mmHg",
              "formattedText": "mmHg"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Medidas da Pressão Arterial  2. SISTÓLICA",
              "formattedText": "<b>Medidas da Pressão Arterial</b><div><b>2. SISTÓLICA</b></div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 220,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 70,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC9",
          "customID": "PASC3b",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "mmHg",
              "formattedText": "mmHg"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Medidas da Pressão Arterial   2. DIASTÓLICA",
              "formattedText": "<div><b style='letter-spacing: 0.14px;'>Medidas da Pressão Arterial</b><b><br></b></div><b>2. DIASTÓLICA</b>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 140,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 50,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC10",
          "customID": "PASC4b",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "bpm",
              "formattedText": "bpm"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "2. Frequência Cardíaca",
              "formattedText": "<b>2. Frequência Cardíaca</b>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 120,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 40,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC11",
          "customID": "PASC5b",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "mmHg",
              "formattedText": "mmHg"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Medidas da Pressão Arterial  3. SISTÓLICA",
              "formattedText": "<b>Medidas da Pressão Arterial</b><div><b>3. SISTÓLICA</b></div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 220,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 70,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC12",
          "customID": "PASC3c",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "mmHg",
              "formattedText": "mmHg"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Medidas da Pressão Arterial   3. DIASTÓLICA",
              "formattedText": "<div><b style='letter-spacing: 0.14px;'>Medidas da Pressão Arterial</b><b><br></b></div><b>3. DIASTÓLICA</b>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 140,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 50,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC13",
          "customID": "PASC4c",
          "dataType": "Integer"
        },
        {
          "unit": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "bpm",
              "formattedText": "bpm"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Unit",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "3. Frequência Cardíaca",
              "formattedText": "<b>3. Frequência Cardíaca</b>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "upperLimit": {
                "data": {
                  "reference": 120,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "upperLimit"
              },
              "lowerLimit": {
                "data": {
                  "reference": 40,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "lowerLimit"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "accept": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "accept"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "IntegerQuestion",
          "templateID": "PASC14",
          "customID": "PASC5c",
          "dataType": "Integer"
        },
        {
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Sim",
                  "formattedText": "Sim"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 1,
              "extractionValue": "1"
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "dataType": "Integer",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Não",
                  "formattedText": "Não"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              },
              "value": 2,
              "extractionValue": "0"
            }
          ],
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Alteração do Protocolo:",
              "formattedText": "Alteração do Protocolo:"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": [
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 1,
                "extractionValue": ".Q",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não quer responder",
                    "formattedText": "Não quer responder"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 2,
                "extractionValue": ".S",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não sabe",
                    "formattedText": "Não sabe"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 3,
                "extractionValue": ".A",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não se aplica",
                    "formattedText": "Não se aplica"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 4,
                "extractionValue": ".F",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não há dados",
                    "formattedText": "Não há dados"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              }
            ]
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "PASC15",
          "customID": "PASCalt",
          "dataType": "Integer"
        },
        {
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "PASC16a",
              "customOptionID": "PASCalt1",
              "dataType": "Boolean",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Medida realizada fora do jejum (após dextrosol e/ou lanche)",
                  "formattedText": "Medida realizada fora do jejum (após dextrosol e/ou lanche)"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "PASC16b",
              "customOptionID": "PASCalt2",
              "dataType": "Boolean",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Braço muito curto, exigindo troca de manguito (exemplo: Coxa por Adulto grande)n",
                  "formattedText": "<div>Braço muito curto, exigindo troca de manguito (exemplo: Coxa por Adulto&nbsp;<span style='letter-spacing: 0.01em;'>grande)</span></div>"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "PASC16c",
              "customOptionID": "PASCalt3",
              "dataType": "Boolean",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Não foi possível fazer todas as medidas com intervalo de dois minutos",
                  "formattedText": "Não foi possível fazer todas as medidas com intervalo de dois minutos"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "PASC16d",
              "customOptionID": "PASCalt4",
              "dataType": "Boolean",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Exigiu mais de três leituras por erros utilizando o OMRON",
                  "formattedText": "Exigiu mais de três leituras por erros utilizando o OMRON"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "PASC16e",
              "customOptionID": "PASCalt5",
              "dataType": "Boolean",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Participante se movimentou durante a aferição",
                  "formattedText": "Participante se movimentou durante a aferição"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "PASC16f",
              "customOptionID": "PASCalt6",
              "dataType": "Boolean",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Modificação da técnica por problemas anatômicos",
                  "formattedText": "Modificação da técnica por problemas anatômicos"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "PASC16g",
              "customOptionID": "PASCalt7",
              "dataType": "Boolean",
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Outra",
                  "formattedText": "Outra"
                },
                "enUS": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                },
                "esES": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "",
                  "formattedText": ""
                }
              }
            }
          ],
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Alteração do Protocolo - Qual: ",
              "formattedText": "<div><span style='letter-spacing: 0.01em;'>Alteração do Protocolo - Qual:</span><br></div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": []
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "CheckboxQuestion",
          "templateID": "PASC16",
          "customID": "PASCaltq1",
          "dataType": "Array"
        },
        {
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Outra (especifique):",
              "formattedText": "<div>Outra (especifique):</div>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "metadata": {
            "extents": "StudioObject",
            "objectType": "MetadataGroup",
            "options": [
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 1,
                "extractionValue": ".Q",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não quer responder",
                    "formattedText": "Não quer responder"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 2,
                "extractionValue": ".S",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não sabe",
                    "formattedText": "Não sabe"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 3,
                "extractionValue": ".A",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não se aplica",
                    "formattedText": "Não se aplica"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              },
              {
                "extends": "StudioObject",
                "objectType": "MetadataAnswer",
                "dataType": "Integer",
                "value": 4,
                "extractionValue": ".F",
                "label": {
                  "ptBR": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "Não há dados",
                    "formattedText": "Não há dados"
                  },
                  "enUS": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  },
                  "esES": {
                    "extends": "StudioObject",
                    "objectType": "Label",
                    "oid": "",
                    "plainText": "",
                    "formattedText": ""
                  }
                }
              }
            ]
          },
          "fillingRules": {
            "extends": "StudioObject",
            "objectType": "FillingRules",
            "options": {
              "minLength": {
                "data": {
                  "reference": 1,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "minLength"
              },
              "mandatory": {
                "data": {
                  "reference": true,
                  "canBeIgnored": false
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory"
              },
              "maxLength": {
                "data": {
                  "reference": 300,
                  "canBeIgnored": true
                },
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "maxLength"
              }
            }
          },
          "extents": "SurveyItem",
          "objectType": "TextQuestion",
          "templateID": "PASC17",
          "customID": "PASCaltqou",
          "dataType": "String"
        },
        {
          "value": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Obrigado(a).n",
              "formattedText": "<i>Obrigado(a).</i><br>"
            },
            "enUS": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            },
            "esES": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "",
              "formattedText": ""
            }
          },
          "extents": "SurveyItem",
          "objectType": "TextItem",
          "templateID": "PASC18",
          "customID": "PASCZ",
          "dataType": "String"
        }
      ],
      "navigationList": [
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "BEGIN NODE",
          "index": 0,
          "inNavigations": [],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "BEGIN NODE",
              "destination": "PASC1",
              "name": "BEGIN NODE_PASC1",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "END NODE",
          "index": 1,
          "inNavigations": [
            null,
            {
              "origin": "PASC18"
            }
          ],
          "isDefault": false,
          "routes": []
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC1",
          "index": 2,
          "inNavigations": [
            {
              "origin": "BEGIN NODE"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC1",
              "destination": "PASC2",
              "name": "PASC1_PASC2",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC2",
          "index": 3,
          "inNavigations": [
            {
              "origin": "PASC1"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC2",
              "destination": "PASC3",
              "name": "PASC2_PASC3",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC3",
          "index": 4,
          "inNavigations": [
            {
              "origin": "PASC2"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC3",
              "destination": "PASC4",
              "name": "PASC3_PASC4",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC4",
          "index": 5,
          "inNavigations": [
            {
              "origin": "PASC3"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC4",
              "destination": "PASC6",
              "name": "PASC4_PASC6",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC6",
          "index": 7,
          "inNavigations": [
            null,
            {
              "origin": "PASC4"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC6",
              "destination": "PASC7",
              "name": "PASC6_PASC7",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC7",
          "index": 8,
          "inNavigations": [
            {
              "origin": "PASC6"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC7",
              "destination": "PASC8",
              "name": "PASC7_PASC8",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC8",
          "index": 9,
          "inNavigations": [
            {
              "origin": "PASC7"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC8",
              "destination": "PASC9",
              "name": "PASC8_PASC9",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC9",
          "index": 10,
          "inNavigations": [
            {
              "origin": "PASC8"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC9",
              "destination": "PASC10",
              "name": "PASC9_PASC10",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC10",
          "index": 11,
          "inNavigations": [
            {
              "origin": "PASC9"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC10",
              "destination": "PASC11",
              "name": "PASC10_PASC11",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC11",
          "index": 12,
          "inNavigations": [
            {
              "origin": "PASC10"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC11",
              "destination": "PASC12",
              "name": "PASC11_PASC12",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC12",
          "index": 13,
          "inNavigations": [
            {
              "origin": "PASC11"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC12",
              "destination": "PASC13",
              "name": "PASC12_PASC13",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC13",
          "index": 14,
          "inNavigations": [
            {
              "origin": "PASC12"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC13",
              "destination": "PASC14",
              "name": "PASC13_PASC14",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC14",
          "index": 15,
          "inNavigations": [
            {
              "origin": "PASC13"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC14",
              "destination": "PASC15",
              "name": "PASC14_PASC15",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC15",
          "index": 16,
          "inNavigations": [
            {
              "origin": "PASC14"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC15",
              "destination": "PASC18",
              "name": "PASC15_PASC18",
              "isDefault": true,
              "conditions": []
            },
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC15",
              "destination": "PASC16",
              "name": "PASC15_PASC16",
              "isDefault": false,
              "conditions": [
                {
                  "extents": "StudioObject",
                  "objectType": "RouteCondition",
                  "name": "ROUTE_CONDITION_0",
                  "rules": [
                    {
                      "extents": "SurveyTemplateObject",
                      "objectType": "Rule",
                      "when": "PASC15",
                      "operator": "equal",
                      "answer": "1",
                      "isMetadata": false
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC16",
          "index": 17,
          "inNavigations": [
            {
              "origin": "PASC15"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC16",
              "destination": "PASC18",
              "name": "PASC16_PASC18",
              "isDefault": true,
              "conditions": []
            },
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC16",
              "destination": "PASC17",
              "name": "PASC16_PASC17",
              "isDefault": false,
              "conditions": [
                {
                  "extents": "StudioObject",
                  "objectType": "RouteCondition",
                  "name": "ROUTE_CONDITION_0",
                  "rules": [
                    {
                      "extents": "SurveyTemplateObject",
                      "objectType": "Rule",
                      "when": "PASC16",
                      "operator": "equal",
                      "answer": "PASCalt7",
                      "isMetadata": false
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC17",
          "index": 18,
          "inNavigations": [
            {
              "origin": "PASC16"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC17",
              "destination": "PASC18",
              "name": "PASC17_PASC18",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "PASC18",
          "index": 19,
          "inNavigations": [
            {
              "origin": "PASC17"
            },
            {
              "origin": "PASC15"
            },
            {
              "origin": "PASC16"
            }
          ],
          "isDefault": false,
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "PASC18",
              "destination": "END NODE",
              "name": "PASC18_END NODE",
              "isDefault": true,
              "conditions": []
            }
          ]
        }
      ]
    },
    "isDiscarded": false,
    "version": 1
  },
  "mode": "ONLINE",
  "participantData": {
    "recruitmentNumber": 1234567,
    "name": "FULANO DA SILVA",
    "sex": "M",
    "birthdate": {
      "objectType": "ImmutableDate",
      "value": "1963-05-24 00:00:00.000"
    },
    "fieldCenter": {
      "name": "Rio Grande do Sul",
      "code": 5,
      "acronym": "RS",
      "country": null,
      "state": null,
      "address": null,
      "complement": null,
      "zip": null,
      "phone": null
    }
  },
  "interviews": [
    {
      "objectType": "Interview",
      "date": "2017-04-12T11:16:59.154Z",
      "interviewer": {
        "objectType": "Interviewer",
        "name": "Thiane",
        "email": "thianeristowcardinal@gmail.com"
      }
    }
  ],
  "fillContainer": {
    "fillingList": [
      {
        "objectType": "QuestionFill",
        "questionID": "PASC1",
        "answer": {
          "value": "1",
          "objectType": "AnswerFill",
          "type": "SingleSelectionQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC2",
        "answer": {
          "value": 37.2,
          "objectType": "AnswerFill",
          "type": "DecimalQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC3",
        "answer": {
          "value": "1",
          "objectType": "AnswerFill",
          "type": "SingleSelectionQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC4",
        "answer": {
          "value": "3",
          "objectType": "AnswerFill",
          "type": "SingleSelectionQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC6",
        "answer": {
          "value": 135,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC7",
        "answer": {
          "value": 87,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC8",
        "answer": {
          "value": 51,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC9",
        "answer": {
          "value": 135,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC10",
        "answer": {
          "value": 85,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC11",
        "answer": {
          "value": 53,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC12",
        "answer": {
          "value": 138,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC13",
        "answer": {
          "value": 90,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC14",
        "answer": {
          "value": 56,
          "objectType": "AnswerFill",
          "type": "IntegerQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      },
      {
        "objectType": "QuestionFill",
        "questionID": "PASC15",
        "answer": {
          "value": "2",
          "objectType": "AnswerFill",
          "type": "SingleSelectionQuestion"
        },
        "forceAnswer": false,
        "metadata": {
          "objectType": "MetadataFill",
          "value": null
        },
        "comment": ""
      }
    ]
  },
  "statusHistory": [
    {
      "objectType": "ActivityStatus",
      "name": "CREATED",
      "date": "2017-04-12T10:35:11.971Z",
      "user": {
        "name": "Wilson",
        "surname": "Cañon Montañez",
        "phone": "51989197171",
        "email": "wilcamo32@yahoo.com"
      }
    },
    {
      "objectType": "ActivityStatus",
      "name": "OPENED",
      "date": "2017-04-12T11:16:08.584Z",
      "user": {
        "name": "Thiane",
        "surname": "Ristow Cardinal",
        "phone": "51999021994",
        "email": "thianeristowcardinal@gmail.com"
      }
    },
    {
      "objectType": "ActivityStatus",
      "name": "INITIALIZED_ONLINE",
      "date": "2017-04-12T11:16:59.154Z",
      "user": {
        "name": "Thiane",
        "surname": "Ristow Cardinal",
        "phone": "51999021994",
        "email": "thianeristowcardinal@gmail.com"
      }
    },
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
  ],
  "isDiscarded": false,
  "navigationTracker": {
    "objectType": "NavigationTracker",
    "items": [
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC1",
        "state": "ANSWERED",
        "previous": null,
        "inputs": [],
        "outputs": [
          "PASC2"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC2",
        "state": "ANSWERED",
        "previous": "PASC1",
        "inputs": [
          "PASC1"
        ],
        "outputs": [
          "PASC3"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC3",
        "state": "ANSWERED",
        "previous": "PASC2",
        "inputs": [
          "PASC2"
        ],
        "outputs": [
          "PASC4"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC4",
        "state": "ANSWERED",
        "previous": "PASC3",
        "inputs": [
          "PASC3"
        ],
        "outputs": [
          "PASC6"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC6",
        "state": "ANSWERED",
        "previous": "PASC4",
        "inputs": [
          "NULL NAVIGATION",
          "PASC4"
        ],
        "outputs": [
          "PASC7"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC7",
        "state": "ANSWERED",
        "previous": "PASC6",
        "inputs": [
          "PASC6"
        ],
        "outputs": [
          "PASC8"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC8",
        "state": "ANSWERED",
        "previous": "PASC7",
        "inputs": [
          "PASC7"
        ],
        "outputs": [
          "PASC9"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC9",
        "state": "ANSWERED",
        "previous": "PASC8",
        "inputs": [
          "PASC8"
        ],
        "outputs": [
          "PASC10"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC10",
        "state": "ANSWERED",
        "previous": "PASC9",
        "inputs": [
          "PASC9"
        ],
        "outputs": [
          "PASC11"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC11",
        "state": "ANSWERED",
        "previous": "PASC10",
        "inputs": [
          "PASC10"
        ],
        "outputs": [
          "PASC12"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC12",
        "state": "ANSWERED",
        "previous": "PASC11",
        "inputs": [
          "PASC11"
        ],
        "outputs": [
          "PASC13"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC13",
        "state": "ANSWERED",
        "previous": "PASC12",
        "inputs": [
          "PASC12"
        ],
        "outputs": [
          "PASC14"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC14",
        "state": "ANSWERED",
        "previous": "PASC13",
        "inputs": [
          "PASC13"
        ],
        "outputs": [
          "PASC15"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC15",
        "state": "ANSWERED",
        "previous": "PASC14",
        "inputs": [
          "PASC14"
        ],
        "outputs": [
          "PASC18",
          "PASC16"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC16",
        "state": "SKIPPED",
        "previous": null,
        "inputs": [
          "PASC15"
        ],
        "outputs": [
          "PASC18",
          "PASC17"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC17",
        "state": "SKIPPED",
        "previous": null,
        "inputs": [
          "PASC16"
        ],
        "outputs": [
          "PASC18"
        ]
      },
      {
        "objectType": "NavigationTrackingItem",
        "id": "PASC18",
        "state": "VISITED",
        "previous": "PASC15",
        "inputs": [
          "PASC17",
          "PASC15",
          "PASC16"
        ],
        "outputs": []
      }
    ],
    "lastVisitedIndex": 16
  },
  "category": {
    "_id": "5a1dff9428110d0a385114f5",
    "name": "C0",
    "objectType": "ActivityCategory",
    "label": "Normal",
    "disabled": false,
    "isDefault": true
  }
};

