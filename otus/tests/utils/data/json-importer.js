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
Test.utils.data.activityReport = {
  "template": "  \n<otus-script>\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Relatório de Atividade</p>\n    <br/>\n    <p>Formulário: CENTRO DE LEITURA DE RETINOGRAFIA</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Sigla : RETCLQ</p>\n    <p>Questão 1 : true</p>\n    </section>\n\n   <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n",
  "label": "Titulo do relatório",
  "acronym":"RETCLQ",
  "version": 1,
  "sender": "fdrtec@gmail.com",
  "sendingDate": "2018-11-07T15:51:53.725Z",
  "fieldCenter": [
    "SP",
    "RS",
    "RJ",
    "MG",
    "ES",
    "BA"
  ],
  "dataSources": [
    {
      "key": "RETCLQ",
      "dataSource": "AnwserFillingDataSource",
      "label": "Questões Respondidas de RETCLQ",
      "result": [{"RETCLQ1": "teste"}],
      "optional": false
    }
  ]
};

Test.utils.data.activityReportResult =  {
  "activityID": "5c198c8516da48006669ac63",
  "activityReportReady": true,
  "activityReportInfo": false,
  "report": {
    "objectType": "ParticipantReport",
    "id": "5be30a1916da480067523df9",
    "label": "Bioquimica Soro (Lab. Central)",
    "dirty": false,
    "template": "  \n<otus-script>\n  {{data.date = helper.formatDate(ds.atividade[0].getInterviewDate())}}\n  {{data.participant = ds.participant[0]}}\n  {{data.sexo = data.participant.sex.toUpperCase() === 'F' ? 'Feminino' : 'Masculino'}}\n  {{data.nascimento = helper.formatDate(ds.participant[0].birthdate.value)}}\n  \n  {{data.exameUreiaSanque = ds.exameUreiaSanque[0]}}\n  {{data.exameUreiaSanqueObs = data.exameUreiaSanque.observations[0] ? data.exameUreiaSanque.observations[0].value : \"\"}}\n  {{data.resultadoUreia = helper.getObjectByArray(data.exameUreiaSanque.examResults, 'resultName', 'URÉIA...................................:')}}\n\n  {{data.exameCreatininaSangue = ds.exameCreatininaSangue[0]}}\n  {{data.exameCreatininaSangueObs = data.exameCreatininaSangue.observations[0] ? data.exameCreatininaSangue.observations[0].value : \"\"}}\n  {{data.resultadoCreatinina = helper.getObjectByArray(data.exameCreatininaSangue.examResults, 'resultName', 'CREATININA..............................:')}}\n\n  {{data.exameELSAB12 = ds.exameELSAB12[0]}}\n  {{data.exameELSAB12Obs = data.exameELSAB12.observations[0] ? data.exameELSAB12.observations[0].value : \"\"}}\n  {{data.resultadoVitaminaB12 = helper.getObjectByArray(data.exameELSAB12.examResults, 'resultName', 'VITAMINA B12:')}}\n\n  {{data.exameAspartatoTransaminase = ds.exameAspartatoTransaminase[0]}}\n  {{data.exameAspartatoTransaminaseObs = data.exameAspartatoTransaminase.observations[0] ? data.exameAspartatoTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAspartatoTransaminase = helper.getObjectByArray(data.exameAspartatoTransaminase.examResults, 'resultName', 'ASPARTATO TRANSAMINASE..................:')}}\n\n  {{data.exameAlaninaTransaminase = ds.exameAlaninaTransaminase[0]}}\n  {{data.exameAlaninaTransaminaseObs = data.exameAlaninaTransaminase.observations[0] ? data.exameAlaninaTransaminase.observations[0].value : \"\"}}\n  {{data.resultadoAlaninaTransaminase = helper.getObjectByArray(data.exameAlaninaTransaminase.examResults, 'resultName', 'ALANINA TRANSAMINASE....................:')}}\n\n  {{data.exameGamaGlutamilTransferase = ds.exameGamaGlutamilTransferase[0]}}\n  {{data.exameGamaGlutamilTransferaseObs = data.exameGamaGlutamilTransferase.observations[0] ? data.exameGamaGlutamilTransferase.observations[0].value : \"\"}}\n  {{data.resultadoGamaGT = helper.getObjectByArray(data.exameGamaGlutamilTransferase.examResults, 'resultName', 'GAMA GT.................................:')}}\n\n  {{data.exameAcidoUrico = ds.exameAcidoUrico[0]}}\n  {{data.exameAcidoUricoObs = data.exameAcidoUrico.observations[0] ? data.exameAcidoUrico.observations[0].value : \"\"}}\n  {{data.resultadoAcidoUrico = helper.getObjectByArray(data.exameAcidoUrico.examResults, 'resultName', 'ÁCIDO ÚRICO.............................:')}}\n\n  {{data.exameColesterolTotalFracoes = ds.exameColesterolTotalFracoes[0]}}\n  {{data.exameColesterolTotalFracoesObs = data.exameColesterolTotalFracoes.observations[0] ? data.exameColesterolTotalFracoes.observations[0].value : \"\"}}\n  {{data.resultadoColesterolTotal = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'COLESTEROL TOTAL........................:')}}\n  {{data.resultadoHdlColesterol = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'HDL COLESTEROL..........................:')}}\n  {{data.resultadoLdlColesterol = helper.getObjectByArray(data.exameColesterolTotalFracoes.examResults, 'resultName', 'LDL COLESTEROL..........................:')}}\n\n  {{data.exameTriglicerides = ds.exameTriglicerides[0]}}\n  {{data.exameTrigliceridesObs = data.exameTriglicerides.observations[0] ? data.exameTriglicerides.observations[0].value : \"\"}}\n  {{data.resultadoTriglicerides = helper.getObjectByArray(data.exameTriglicerides.examResults, 'resultName', 'TRIGLICÉRIDES...........................:')}}\n\n  {{ required('Resultado Ureia', data.resultadoUreia, 'é obrigatório.') }}\n  {{ required('Resultado Creatinina', data.resultadoCreatinina, 'é obrigatório.') }}\n  {{ required('Resultado Aspartato Transaminase', data.resultadoAspartatoTransaminase, 'é obrigatório.') }}\n  {{ required('Resultado Alanina Transaminase', data.resultadoAlaninaTransaminase, 'é obrigatório.') }}\n  {{ required('Resultado Gama GT', data.resultadoGamaGT, 'é obrigatório.') }}\n  {{ required('Resultado Acido Urico', data.resultadoAcidoUrico, 'é obrigatório.') }}\n  {{ required('Resultado Colesterol Total', data.resultadoColesterolTotal, 'é obrigatório.') }}\n  {{ required('Resultado Hdl Colesterol', data.resultadoHdlColesterol, 'é obrigatório.') }}\n  {{ required('Resultado Ldl Colesterol', data.resultadoLdlColesterol, 'é obrigatório.') }}\n  {{ required('Resultado Triglicerides', data.resultadoTriglicerides, 'é obrigatório.') }}\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Colesterol total e Frações – Soro</p>\n    <br/>\n    <p>COLESTEROL TOTAL: {{data.resultadoColesterolTotal.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável: < 190 mg/dl</p>\n    <br>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>HDL colesterol – Soro</p>\n    <br/>\n    <p>HDL COLESTEROL: {{data.resultadoHdlColesterol.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável: > 40 mg/dl</p>\n    <br>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>LDL colesterol – Soro</p>\n    <br/>\n    <p>LDL COLESTEROL: {{data.resultadoLdlColesterol.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CÁLCULO FRIEDWALD</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Ótimo: < 100 mg/dL</p>\n    <p>Desejável < 130 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Triglicérides – Soro</p>\n    <br/>\n    <p>TRIGLICÉRIDES: {{data.resultadoTriglicerides.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameTrigliceridesObs\">\n      <p>Obs: {{data.exameTrigliceridesObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência acima de 20 anos:</p>\n    <p>Desejável < 150 mg/dL</p>\n    <p>OBS.: Os valores de referência descritos neste laudo estão de acordo a Atualização da Diretriz Brasileira de Dislipidemias\n      e Prevenção da Aterosclerose 2017 para prevenção primária (sem doença cardiovascular prévia). Conforme categoria de\n      risco cardiovascular, o médico poderá definir valores de metas individualizadas.</p>\n  </section>\n\n  <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n  <p class=\"break\"></p>\n  <!-- PAGE 1 END -->\n\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Aspartato transaminase (AST) – Soro</p>\n    <br/>\n    <p>ASPARTATO TRANSAMINASE: {{data.resultadoAspartatoTransaminase.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAspartatoTransaminaseObs\">\n      <p>Obs: {{data.exameAspartatoTransaminaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: até 40 U/L</p>\n    <p>MULHERES: até 32 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Alanina transaminase (ALT) – Soro</p>\n    <br/>\n    <p>ALANINA TRANSAMINASE: {{data.resultadoAlaninaTransaminase.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAlaninaTransaminaseObs\">\n      <p>Obs: {{data.exameAlaninaTransaminaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA AUTOMATIZADA (IFCC MODIFICADA)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: até 41 U/L</p>\n    <p>MULHERES: até 33 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Gama glutamil transferase (Gama GT) – Soro</p>\n    <br/>\n    <p>GAMA GT: {{data.resultadoGamaGT.value}} U/L</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameGamaGlutamilTransferaseObs\">\n      <p>Obs: {{data.exameGamaGlutamilTransferaseObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CINÉTICA COLORIMÉTRICA AUTOMATIZADA (SZACZ - IFCC)</p>\n    <p>Valores de referência:</p>\n    <p>HOMENS: 8 a 61 U/L</p>\n    <p>MULHERES: 5 a 36 U/L</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Uréia – Soro</p>\n    <br/>\n    <p>URÉIA: {{data.resultadoUreia.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameUreiaSanqueObs\">\n      <p>Obs: {{data.exameUreiaSanqueObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: CINÉTICA AUTOMATIZADA (UREASE E GLUTAMATO DESIDROGENASE)</p>\n    <p>Valores de referência:</p>\n    <p>17 a 49 mg/dL</p>\n  </section>\n\n  <footer class=\"footer footer-2\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 2</p>\n  </footer>\n  <p class=\"break\"></p>\n  <!-- PAGE 2 END -->\n\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"https://image.ibb.co/iw30bc/logo_Elsa.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Creatinina – Soro</p>\n    <br/>\n    <p>CREATININA: {{data.resultadoCreatinina.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameCreatininaSangueObs\">\n      <p>Obs: {{data.exameCreatininaSangueObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA AUTOMATIZADA (JAFFÉ SEM DESPROTEINIZAÇÃO)</p>\n    <p>Valores de referência:</p>\n    <p>Homem: 0,70 a 1,20 mg/dL</p>\n    <p>Mulher: 0,50 a 0,90 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Ácido úrico – Soro</p>\n    <br/>\n    <p>ÁCIDO ÚRICO: {{data.resultadoAcidoUrico.value}} mg/dL</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameAcidoUricoObs\">\n      <p>Obs: {{data.exameAcidoUricoObs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ENZIMÁTICA COLORIMÉTRICA</p>\n    <p>Valores de referência:</p>\n    <p>Homens: 3,4 a 7,0 mg/dL</p>\n    <p>Mulheres: 2,4 a 5,7 mg/dL</p>\n    <br>\n    <hr>\n  </section>\n\n  <section ng-if=\"data.exameELSAB12\" class=\"contextValues\">\n    <p>Vitamina B12 – Soro</p>\n    <br/>\n    <p>VITAMINA B12: {{data.resultadoVitaminaB12.value}} pg/mL</p>\n  </section>\n\n  <section ng-if=\"data.exameELSAB12\" class=\"contextObs\">\n    <span ng-if=\"data.exameELSAB12Obs\">\n      <p>Obs: {{data.exameELSAB12Obs}}</p>\n      <br>\n    </span>\n    <p>Metodologia: ELETROQUIMIOLUMINESCÊNCIA</p>\n    <p>Valores de referência:</p>\n    <p>221 a 946 pg/mL</p>\n  </section>\n\n  <footer class=\"footer footer-3\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Página 3</p>\n  </footer>\n</div>\n",
    "dataSources": {
      "participant": [
        {
          "recruitmentNumber": 5001007,
          "name": "ROZALINO CORREA MORAES",
          "sex": "M",
          "birthdate": {
            "objectType": "ImmutableDate",
            "value": "1954-10-11 00:00:00.000"
          },
          "fieldCenter": {
            "name": null,
            "code": null,
            "acronym": "RS",
            "country": null,
            "state": null,
            "address": null,
            "complement": null,
            "zip": null,
            "phone": null,
            "backgroundColor": null,
            "borderColor": null
          }
        }
      ],
      "atividade": [
        {
          "mode": "PAPER",
          "statusHistory": [
            {
              "objectType": "ActivityStatus",
              "name": "CREATED",
              "date": "2018-05-30T22:16:24.903Z",
              "user": {
                "name": "Diogo",
                "surname": "Ferreira",
                "phone": "5193034655",
                "email": "diogo.rosas.ferreira@gmail.com"
              }
            },
            {
              "objectType": "ActivityStatus",
              "name": "INITIALIZED_OFFLINE",
              "date": "2018-03-01T22:15:56.368Z",
              "user": {
                "name": "Bruce",
                "surname": "Duncan",
                "phone": "51997123127",
                "email": "bbduncan@ufrgs.br"
              }
            },
            {
              "objectType": "ActivityStatus",
              "name": "OPENED",
              "date": "2018-05-30T22:16:29.179Z",
              "user": {
                "name": "Diogo",
                "surname": "Ferreira",
                "phone": "5193034655",
                "email": "diogo.rosas.ferreira@gmail.com"
              }
            },
            {
              "objectType": "ActivityStatus",
              "name": "INITIALIZED_ONLINE",
              "date": "2018-05-30T22:16:30.347Z",
              "user": {
                "name": "Diogo",
                "surname": "Ferreira",
                "phone": "5193034655",
                "email": "diogo.rosas.ferreira@gmail.com"
              }
            },
            {
              "objectType": "ActivityStatus",
              "name": "FINALIZED",
              "date": "2018-05-30T22:16:48.615Z",
              "user": {
                "name": "Diogo",
                "surname": "Ferreira",
                "phone": "5193034655",
                "email": "diogo.rosas.ferreira@gmail.com"
              }
            }
          ],
          "objectType": "ActivityDatasource"
        }
      ],
      "exameUreiaSanque": [
        {
          "_id": "5b16b844e103cf0780cd113d",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "URÉIA - SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd34f9b9bdf61326c1641cd",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "URÉIA - SANGUE",
              "resultName": "URÉIA...................................:",
              "value": "404",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd34f9b9bdf61326c1641f0",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "URÉIA - SANGUE",
              "resultName": "URÉIA...................................:",
              "value": "1901",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd352ca9bdf61326c16421e",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA INS - INSULINA JEJUM",
              "resultName": "Insulina jejum : ",
              "value": "628",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1940-06-27 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd354569bdf61326c16421f",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA INS - INSULINA JEJUM",
              "resultName": "Insulina jejum : ",
              "value": "427",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1940-06-27 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd355e49bdf61326c164220",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA INS - INSULINA JEJUM",
              "resultName": "Insulina jejum : ",
              "value": "96",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1940-06-27 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd35ba29bdf61326c16431b",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA 3FT",
              "resultName": "Insulina jejum : ",
              "value": "848",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1940-06-27 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd35c1a9bdf61326c16431d",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA 3FT",
              "resultName": "Insulina jejum : ",
              "value": "1330",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1940-06-27 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113d",
              "_id": "5bd35cdd9bdf61326c16431e",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA 3FT",
              "resultName": "URÉIA...................................:",
              "value": "404",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ],
      "exameCreatininaSangue": [
        {
          "_id": "5b16b844e103cf0780cd113e",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "CREATININA - SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113e",
              "_id": "5bd34f9b9bdf61326c1641ce",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "CREATININA - SANGUE",
              "resultName": "CREATININA..............................:",
              "value": "1530",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd113e",
              "_id": "5bd34f9b9bdf61326c1641f1",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "CREATININA - SANGUE",
              "resultName": "CREATININA..............................:",
              "value": "1041",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ],
      "exameELSAB12": [
        {
          "_id": "5b16b844e103cf0780cd1148",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "ELSA B12",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1148",
              "_id": "5bd34f9b9bdf61326c1641da",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA B12",
              "resultName": "VITAMINA B12:",
              "value": "520",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "F",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-02-22 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1148",
              "_id": "5bd34f9b9bdf61326c1641fd",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ELSA B12",
              "resultName": "VITAMINA B12:",
              "value": "1246",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "F",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-02-22 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Maria)"
            }
          ]
        }
      ],
      "exameAspartatoTransaminase": [
        {
          "_id": "5b16b844e103cf0780cd1141",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1141",
              "_id": "5bd34f9b9bdf61326c1641d0",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE",
              "resultName": "ASPARTATO TRANSAMINASE..................:",
              "value": "141",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1141",
              "_id": "5bd34f9b9bdf61326c1641f3",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ASPARTATO TRANSAMINASE(TGO/AST)-SANGUE",
              "resultName": "ASPARTATO TRANSAMINASE..................:",
              "value": "490",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ],
      "exameAlaninaTransaminase": [
        {
          "_id": "5b16b844e103cf0780cd1142",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1142",
              "_id": "5bd34f9b9bdf61326c1641d1",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE",
              "resultName": "ALANINA TRANSAMINASE....................:",
              "value": "349",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1142",
              "_id": "5bd34f9b9bdf61326c1641f4",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ALANINA TRANSAMINASE (TGP/ALT) - SANGUE",
              "resultName": "ALANINA TRANSAMINASE....................:",
              "value": "1753",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ],
      "exameGamaGlutamilTransferase": [
        {
          "_id": "5b16b844e103cf0780cd1143",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "GAMA GLUTAMIL TRANSFERASE - SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1143",
              "_id": "5bd34f9b9bdf61326c1641d2",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "GAMA GLUTAMIL TRANSFERASE - SANGUE",
              "resultName": "GAMA GT.................................:",
              "value": "1841",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1143",
              "_id": "5bd34f9b9bdf61326c1641f5",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "GAMA GLUTAMIL TRANSFERASE - SANGUE",
              "resultName": "GAMA GT.................................:",
              "value": "2057",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ],
      "exameAcidoUrico": [
        {
          "_id": "5b16b844e103cf0780cd1144",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "ÁCIDO ÚRICO - SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1144",
              "_id": "5bd34f9b9bdf61326c1641d3",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ÁCIDO ÚRICO - SANGUE",
              "resultName": "ÁCIDO ÚRICO.............................:",
              "value": "1233",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1144",
              "_id": "5bd34f9b9bdf61326c1641f6",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "ÁCIDO ÚRICO - SANGUE",
              "resultName": "ÁCIDO ÚRICO.............................:",
              "value": "754",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ],
      "exameColesterolTotalFracoes": [
        {
          "_id": "5b16b844e103cf0780cd1145",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641d4",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "COLESTEROL NÃO HDL......................:",
              "value": "348",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641d5",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "COLESTEROL TOTAL........................:",
              "value": "2108",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641d6",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "HDL COLESTEROL..........................:",
              "value": "1035",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641d7",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "LDL COLESTEROL..........................:",
              "value": "1531",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641f7",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "COLESTEROL NÃO HDL......................:",
              "value": "607",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641f8",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "COLESTEROL TOTAL........................:",
              "value": "1772",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641f9",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "HDL COLESTEROL..........................:",
              "value": "507",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1145",
              "_id": "5bd34f9b9bdf61326c1641fa",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "COLESTEROL TOTAL E FRAÇÕES - SANGUE",
              "resultName": "LDL COLESTEROL..........................:",
              "value": "426",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ],
      "exameTriglicerides": [
        {
          "_id": "5b16b844e103cf0780cd1140",
          "examSendingLotId": "5b16b844e103cf0780cd113c",
          "objectType": "Exam",
          "name": "TRIGLICÉRIDES - SANGUE",
          "examResults": [
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1140",
              "_id": "5bd34f9b9bdf61326c1641cf",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "TRIGLICÉRIDES - SANGUE",
              "resultName": "TRIGLICÉRIDES...........................:",
              "value": "239",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            },
            {
              "examSendingLotId": "5b16b844e103cf0780cd113c",
              "examId": "5b16b844e103cf0780cd1140",
              "_id": "5bd34f9b9bdf61326c1641f2",
              "objectType": "ExamResults",
              "aliquotCode": "3530000719",
              "examName": "TRIGLICÉRIDES - SANGUE",
              "resultName": "TRIGLICÉRIDES...........................:",
              "value": "1648",
              "aliquotValid": true,
              "releaseDate": "2018-01-03T13:43:00.000Z",
              "observations": [],
              "fieldCenter": null,
              "recruitmentNumber": 5001007,
              "sex": "M",
              "birthdate": {
                "objectType": "ImmutableDate",
                "value": "1960-08-24 00:00:00.000"
              }
            }
          ],
          "observations": [
            {
              "objectType": "ExamObservation",
              "name": "OBS:",
              "value": "Teste de observação (Antonio)"
            }
          ]
        }
      ]
    },
    "missingDataSources": [],
    "fieldsError": [],
    "hasError": false,
    "hasAllDatasources": true,
    "isAvailable": false,
    "loading": true,
    "status": {
      "color": "#666666",
      "icon": "description",
      "bottomIcon": "",
      "bottomIconClass": "",
      "tooltip": "",
      "msg": "",
      "expanded": false,
      "expandAndCollapseIcon": "keyboard_arrow_down",
      "buttonEnabled": false
    },
    "missingOptionalDataSources": []
  }
}