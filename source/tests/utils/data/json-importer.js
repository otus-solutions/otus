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
        "externalID": 5000123,
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
        "_id": "5be45306e69a690064fb1e1g",
        "isDiscarded": false,
        "externalID": 5000124,
        "mode": {
          "name": "Em papel"
        },
        "getID": function () {
          return "5be45306e69a690064fb1e1g";
        },
        "surveyForm": {
          "surveyTemplate": {
            "identity":
              {
                "extents": "StudioObject",
                "objectType": "SurveyIdentity",
                "name": "CISE",
                "acronym": "CIS-R",
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
  sex: "M",
  birthdate: {
    objectType: "ImmutableDate",
    value: "1977-03-14 :0:00.000"
  },
  fieldCenter: {
    name: "Rio Grande do Sul",
    code: 5,
    acronym: "RS"
  },
  meta: {
    revision: 0,
    created: 0,
    version: 0
  },
  stringfiedRN: "5003388"
};

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

Test.utils.data.tubeCollectionData = {
  "objectType": "TubeCollectionData",
  "isCollected": true,
  "metadata": "",
  "operator": "lalala@gmail.com",
  "time": "2017-06-06T15:15:28.958Z",
  "customMetadata": ["59b68aee28f10d398e986595"]
};

Test.utils.data.tube = {
  "objectType": "Tube",
  "type": "EDTA",
  "moment": "FASTING",
  "code": "331005018",
  "groupName": "DEFAULT",
  "aliquotes": [],
  "order": 2,
  "tubeCollectionData": {
    "objectType": "TubeCollectionData",
    "isCollected": false,
    "metadata": "",
    "operator": "",
    "time": null,
    "customMetadata": [
      "5fb586d86ac9617bfffb921c"
    ]
  }
};

Test.utils.data.aliquot = {
  "_id": "5ce2daad99e0c90065f4050a",
  "tubeCode": "351286198",
  "transportationLotId": null,
  "examLotId": null,
  "examLotData": null,
  "recruitmentNumber": 50000501,
  "sex": "M",
  "fieldCenter": {
    "name": "Rio Grande do Sul",
    "code": 5,
    "acronym": "RS",
    "country": null,
    "state": null,
    "address": null,
    "complement": null,
    "zip": null,
    "phone": null,
    "backgroundColor": "rgba(75, 192, 192, 0.2)",
    "borderColor": "rgba(75, 192, 192, 1)"
  },
  "birthdate": {
    "objectType": "ImmutableDate",
    "value": "1990-01-05 00:00:00.000"
  },
  "objectType": "Aliquot",
  "code": "353686297",
  "name": "FASTING_SERUM",
  "container": "CRYOTUBE",
  "role": "STORAGE",
  "aliquotCollectionData": {
    "objectType": "AliquotCollectionData",
    "metadata": "",
    "operator": "adonis.garcia.adg@gmail.com",
    "time": "2019-05-20T16:49:49.879Z",
    "processing": "2019-05-20T16:43:47.701Z"
  },
  "aliquotHistory": [
    {
      "objectType": "AliquotEvent",
      "type": "CONVERTED_STORAGE",
      "userEmail": "otus@gmail.com",
      "description": "Falta de material para completar os exames",
      "date": "2019-05-14T12:36:23.631Z"
    }
  ]
};
Test.utils.data.stage = {
  _id: "5c198c8516da48006669ac63",
  name: "Onda X",
  surveyAcronyms: ["CSJ"]
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
      "NavigationManager": {
        "getNavigationList": function () {
          return [{
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
        }
      },
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
    "version": 1,
    "name": "PRESSÃO ARTERIAL",
    "acronym": "PASC",
    "requiredExternalID": true
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
Test.utils.data.activityReportResult = {
  "activityID": "5c198c8516da48006669ac63",
  "activityReportReady": true,
  "activityReportInfo": false,
  "report": {
    "objectType": "ParticipantReport",
    "label": "Titulo do relatório",
    "dirty": false,
    "template": "  \n<otus-script>\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Relatório de Atividade</p>\n    <br/>\n    <p>Formulário: CENTRO DE LEITURA DE RETINOGRAFIA</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Sigla : RETCLQ</p>\n    <p>Questão 1 : true</p>\n    </section>\n\n   <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n",
    "dataSources": {
      "RETCLQ": [
        {
          "objectType": "QuestionFill",
          "questionID": "RETCLQ1",
          "customID": "RETCLQB_3",
          "answer": {
            "value": "a"
          },
          "forceAnswer": false,
          "metadata": {
            "value": true
          },
          "comment": ""
        }
      ],
      "CSJ": [
        {
          "objectType": "QuestionFill",
          "questionID": "CSJ1",
          "customID": "CSJA_2",
          "answer": {
            "value": false
          },
          "forceAnswer": false,
          "metadata": {
            "value": "a"
          },
          "comment": ""
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
Test.utils.data.anwserFilling = {
  "template": "  \n<otus-script>\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Relatório de Atividade</p>\n    <br/>\n    <p>Formulário: CENTRO DE LEITURA DE RETINOGRAFIA</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Sigla : RETCLQ</p>\n    <p>Questão 1 : true</p>\n    </section>\n\n   <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n",
  "label": "Titulo do relatório",
  "sender": "otus@gmail.com",
  "sendingDate": "2018-11-07T15:51:53.725Z",
  "dataSources": [
    {
      "key": "self",
      "dataSource": "ActivityReport",
      "label": "Questões de RETCLQ",
      "filters": {},
      "result": [
        {
          "objectType": "QuestionFill",
          "questionID": "ANTC1",
          "customID": "ANTCa_d2",
          "answer": {
            "value": "a"
          },
          "forceAnswer": false,
          "metadata": {
            "value": true
          },
          "comment": ""
        }
      ],
      "optional": false
    },
    {
      "key": "RETCLQ",
      "dataSource": "AnswerFilling",
      "label": "Questões de RETCLQ",
      "filters": {
        "acronym": "RETCQL",
        "version": 2,
        "category": 0,
        "statusHistory": {
          "name": "FINALIZED",
          "position": -1
        }
      },
      "result": [
        {
          "objectType": "QuestionFill",
          "questionID": "RETCLQ1",
          "customID": "RETCLQB_3",
          "answer": {
            "value": "a"
          },
          "forceAnswer": false,
          "metadata": {
            "value": true
          },
          "comment": ""
        }

      ],
      "optional": false
    },
    {
      "key": "CSJ",
      "dataSource": "AnswerFilling",
      "label": "Questões de CSJ",
      "filters": {
        "acronym": "CSJ",
        "version": 1,
        "category": 0,
        "statusHistory": {
          "name": "FINALIZED",
          "position": -1
        }
      },
      "result": [
        {
          "objectType": "QuestionFill",
          "questionID": "CSJ1",
          "customID": "CSJA_2",
          "answer": {
            "value": false
          },
          "forceAnswer": false,
          "metadata": {
            "value": "a"
          },
          "comment": ""
        }
      ],
      "optional": false
    }
  ]
}
Test.utils.data.checker = {
  "text": "Otus Coruja",
  "title": "Otus Coruja",
  "metastat": {
    "code": 1,
    "email": "otus.coruja@gmail.com"
  },
  "checker": {
    "name": "Otus",
    "surname": "Coruja",
    "extraction": true,
    "extractionIps": [
      "155.155.220.55"
    ],
    "phone": "5199999999",
    "fieldCenter": {},
    "email": "otus.coruja@gmail.com",
    "admin": true,
    "enable": true,
    "meta": {
      "revision": 0,
      "created": 0,
      "version": 0
    },
    "$loki": 1
  }
}
Test.utils.data.preActivity = {
  "objectType": "preActivity",
  "surveyForm": {
    "extents": "StudioObject",
    "objectType": "SurveyForm",
    "_id": "5aff3edaaf11bb0d302be3c7",
    "sender": "otus.coruja.ferreira@gmail.com",
    "sendingDate": "2017-08-30T22:45:02.997Z",
    "surveyFormType": "FORM_INTERVIEW",
    "surveyTemplate": {
      "extents": "StudioObject",
      "objectType": "Survey",
      "oid": "dXNlclVVSUQ6W3VuZGVmaW5lZF1zdXJ2ZXlVVUlEOls0YWExMjlhMC04ZDljLTExZTctODE4Mi00MzIyM2MyN2M0NmRdcmVwb3NpdG9yeVVVSUQ6WyBOb3QgZG9uZSB5ZXQgXQ==",
      "identity": {
        "extents": "StudioObject",
        "objectType": "SurveyIdentity",
        "name": "COLETA JEJUM",
        "acronym": "CSJ",
        "recommendedTo": "",
        "description": "",
        "keywords": []
      },
      "metainfo": {
        "extents": "StudioObject",
        "objectType": "SurveyMetaInfo",
        "creationDatetime": "2017-08-30T16:00:06.458Z",
        "otusStudioVersion": ""
      },
      "dataSources": [],
      "itemContainer": [
        {
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "CSJ1",
          "customID": "CSJC1",
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "01. O(A) Sr(a) tem diabetes?",
              "formattedText": "01. O(A) Sr(a) tem diabetes?"
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
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 1,
              "extractionValue": "1",
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
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 2,
              "extractionValue": "0",
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
              }
            }
          ],
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "CSJ2",
          "customID": "CSJC2",
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "02. O(A) Sr(a) foi submetido a cirurgia bariátrica (redução de estômago)?",
              "formattedText": "02. O(A) Sr(a) foi submetido a cirurgia bariátrica (redução de estômago)?"
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
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 1,
              "extractionValue": "1",
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
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 2,
              "extractionValue": "0",
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
              }
            }
          ],
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "CSJ3",
          "customID": "CSJC3",
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "03. Quando se machuca o sangramento demora muito a parar ou aparecem&nbsp; hematomas (manchas roxas) com muita frequência?",
              "formattedText": "<div>03. Quando se machuca o sangramento demora muito a parar ou aparecem&nbsp;<span style='letter-spacing: 0.01em;'>hematomas (manchas roxas) com muita frequência?</span></div>"
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
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 1,
              "extractionValue": "1",
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
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 2,
              "extractionValue": "0",
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
              }
            }
          ],
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "CSJ4",
          "customID": "CSJC4",
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "04. Alguma vez já lhe falaram que você tem algum problema de sangramento ou de&nbsp; coagulação do sangue?",
              "formattedText": "<div>04. Alguma vez já lhe falaram que você tem algum problema de sangramento ou de&nbsp;<span style='letter-spacing: 0.01em;'>coagulação do sangue?</span></div>"
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
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 1,
              "extractionValue": "1",
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
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 2,
              "extractionValue": "0",
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
              }
            }
          ],
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "CSJ5",
          "customID": "CSJC5",
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "05. Faz o uso de aspirina ou algum outro medicamento para anticoagulação?",
              "formattedText": "05. Faz o uso de aspirina ou algum outro medicamento para anticoagulação?"
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
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 1,
              "extractionValue": "1",
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
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 2,
              "extractionValue": "0",
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
              }
            }
          ],
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "SingleSelectionQuestion",
          "templateID": "CSJ6",
          "customID": "CSJC6",
          "dataType": "Integer",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "06. Já desmaiou ao colher sangue ou em alguma situação médica estressante, como&nbsp; por exemplo, ao tomar uma injeção ou ao sentir dor forte?",
              "formattedText": "<div>06. Já desmaiou ao colher sangue ou em alguma situação médica estressante, como&nbsp;<span style='letter-spacing: 0.01em;'>por exemplo, ao tomar uma injeção ou ao sentir dor forte?</span></div>"
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
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 1,
              "extractionValue": "1",
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
              }
            },
            {
              "extents": "StudioObject",
              "objectType": "AnswerOption",
              "value": 2,
              "extractionValue": "0",
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
              }
            }
          ],
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "TimeQuestion",
          "templateID": "CSJ7",
          "customID": "CSJC7",
          "dataType": "LocalTime",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "07. HORÁRIO DO INÍCIO DA PUNÇÃO VENOSA EM JEJUM:",
              "formattedText": "07. HORÁRIO DO INÍCIO DA PUNÇÃO VENOSA EM JEJUM:"
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          },
          "options": {
            "extends": "StudioObject",
            "objectType": "QuestionOption",
            "data": {}
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "TimeQuestion",
          "templateID": "CSJ8",
          "customID": "CSJC8",
          "dataType": "LocalTime",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "08. HORÁRIO DO TÉRMINO DA PUNÇÃO VENOSA EM JEJUM:",
              "formattedText": "08. HORÁRIO DO TÉRMINO DA PUNÇÃO VENOSA EM JEJUM:"
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              }
            }
          },
          "options": {
            "extends": "StudioObject",
            "objectType": "QuestionOption",
            "data": {}
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "CheckboxQuestion",
          "templateID": "CSJ9",
          "customID": "CSJC9",
          "dataType": "Array",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "09. INTERCORRÊNCIAS DA PUNÇÃO VENOSA EM JEJUM:",
              "formattedText": "09. INTERCORRÊNCIAS DA PUNÇÃO VENOSA EM JEJUM:"
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
          "options": [
            {
              "extents": "StudioObject",
              "objectType": "CheckboxAnswerOption",
              "optionID": "CSJ9a",
              "customOptionID": "CSJC9a",
              "dataType": "Boolean",
              "value": false,
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Veia de difícil acesso",
                  "formattedText": "Veia de difícil acesso"
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
              "optionID": "CSJ9b",
              "customOptionID": "CSJC9b",
              "dataType": "Boolean",
              "value": false,
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Formação de hematoma",
                  "formattedText": "Formação de hematoma"
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
              "optionID": "CSJ9c",
              "customOptionID": "CSJC9c",
              "dataType": "Boolean",
              "value": false,
              "label": {
                "ptBR": {
                  "extends": "StudioObject",
                  "objectType": "Label",
                  "oid": "",
                  "plainText": "Necessidade de duas punções",
                  "formattedText": "Necessidade de duas punções"
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
              "optionID": "CSJ9d",
              "customOptionID": "CSJC9d",
              "dataType": "Boolean",
              "value": false,
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": false
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "TextQuestion",
          "templateID": "CSJ10",
          "customID": "CSJC9dqou",
          "dataType": "String",
          "label": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "Outra (especifique):",
              "formattedText": "Outra (especifique):"
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
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "mandatory",
                "data": {
                  "canBeIgnored": false,
                  "reference": true
                }
              },
              "minLength": {
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "minLength",
                "data": {
                  "canBeIgnored": true,
                  "reference": 1
                }
              },
              "maxLength": {
                "extends": "StudioObject",
                "objectType": "Rule",
                "validatorType": "maxLength",
                "data": {
                  "canBeIgnored": true,
                  "reference": 300
                }
              }
            }
          }
        },
        {
          "extents": "SurveyItem",
          "objectType": "TextItem",
          "templateID": "CSJ11",
          "customID": "CSJCZ",
          "dataType": "String",
          "value": {
            "ptBR": {
              "extends": "StudioObject",
              "objectType": "Label",
              "oid": "",
              "plainText": "OBRIGADO.",
              "formattedText": "<b>OBRIGADO.</b>"
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
      "navigationList": [
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "BEGIN NODE",
          "index": 0,
          "inNavigations": [],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "BEGIN NODE",
              "destination": "CSJ1",
              "name": "BEGIN NODE_CSJ1",
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
            {
              "origin": "CSJ11",
              "index": 12
            }
          ],
          "routes": []
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ1",
          "index": 2,
          "inNavigations": [
            {
              "origin": "BEGIN NODE",
              "index": 0
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ1",
              "destination": "CSJ2",
              "name": "CSJ1_CSJ2",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ2",
          "index": 3,
          "inNavigations": [
            {
              "origin": "CSJ1",
              "index": 2
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ2",
              "destination": "CSJ3",
              "name": "CSJ2_CSJ3",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ3",
          "index": 4,
          "inNavigations": [
            {
              "origin": "CSJ2",
              "index": 3
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ3",
              "destination": "CSJ4",
              "name": "CSJ3_CSJ4",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ4",
          "index": 5,
          "inNavigations": [
            {
              "origin": "CSJ3",
              "index": 4
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ4",
              "destination": "CSJ5",
              "name": "CSJ4_CSJ5",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ5",
          "index": 6,
          "inNavigations": [
            {
              "origin": "CSJ4",
              "index": 5
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ5",
              "destination": "CSJ6",
              "name": "CSJ5_CSJ6",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ6",
          "index": 7,
          "inNavigations": [
            {
              "origin": "CSJ5",
              "index": 6
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ6",
              "destination": "CSJ7",
              "name": "CSJ6_CSJ7",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ7",
          "index": 8,
          "inNavigations": [
            {
              "origin": "CSJ6",
              "index": 7
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ7",
              "destination": "CSJ8",
              "name": "CSJ7_CSJ8",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ8",
          "index": 9,
          "inNavigations": [
            {
              "origin": "CSJ7",
              "index": 8
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ8",
              "destination": "CSJ9",
              "name": "CSJ8_CSJ9",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ9",
          "index": 10,
          "inNavigations": [
            {
              "origin": "CSJ8",
              "index": 9
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ9",
              "destination": "CSJ11",
              "name": "CSJ9_CSJ11",
              "isDefault": true,
              "conditions": []
            },
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ9",
              "destination": "CSJ10",
              "name": "CSJ9_CSJ10",
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
                      "when": "CSJ9",
                      "operator": "contains",
                      "answer": "CSJC9d",
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
          "origin": "CSJ10",
          "index": 11,
          "inNavigations": [
            {
              "origin": "CSJ9",
              "index": 10
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ10",
              "destination": "CSJ11",
              "name": "CSJ10_CSJ11",
              "isDefault": true,
              "conditions": []
            }
          ]
        },
        {
          "extents": "SurveyTemplateObject",
          "objectType": "Navigation",
          "origin": "CSJ11",
          "index": 12,
          "inNavigations": [
            {
              "origin": "CSJ10",
              "index": 11
            },
            {
              "origin": "CSJ9",
              "index": 10
            }
          ],
          "routes": [
            {
              "extents": "SurveyTemplateObject",
              "objectType": "Route",
              "origin": "CSJ11",
              "destination": "END NODE",
              "name": "CSJ11_END NODE",
              "isDefault": true,
              "conditions": []
            }
          ]
        }
      ],
      "staticVariableList": [],
      "surveyItemGroupList": []
    },
    "version": 2,
    "acronym": "CSJ",
    "name": "COLETA JEJUM",
    "isDiscarded": false,
    "requiredExternalID": true
  },
  "configuration": {
    "category": {
      "name": "C0",
      "objectType": "ActivityCategory",
      "label": "Normal",
      "disabled": false,
      "isDefault": true,
      "$$mdSelectId": 1
    }
  },
  "mode": "PAPER",
  "user": {
    "name": "Otus",
    "surname": "Coruja",
    "fieldCenter": {},
    "phone": "5199999999",
    "email": "otus.coruja@gmail.com",
    "token": "fakeKIT9fFZQ96XE9uYVOsKo"
  },
  "paperActivityData": {
    "checker": undefined,
    "realizationDate": "2019-12-04T11:54:58.171Z"
  },
  "externalID": null,
  "preActivityValid": false,
  "stage": Test.utils.data.stage
};
Test.utils.data.userActivityPendency = {
  "_id": "5e137acf6f34296229baf794",
  "objectType": "userActivityPendency",
  "creationDate": "2020-01-06T18:22:07.716Z",
  "dueDate": "2020-01-14T03:00:00.000Z",
  "requester": "fdrtec@gmail.com",
  "receiver": "fagnerschwalm@gmail.com",
  "activityInfo": {
    "id": "5dfd1bd807ef686e9ad1399b",
    "acronym": "CSJ",
    "recruitmentNumber": 1166657
  }
}
Test.utils.data.participantContact = {
  "_id": "5e833fdfc24cae6884d69194",
  "objectType": "ParticipantContact",
  "recruitmentNumber": 2000735,
  "email": {
    "main": {
      "value": {
        "content": "otus@gmail.com"
      },
      "observation": "pessoal"
    },
    "second": {
      "value": {
        "content": "a@hotmal.com"
      },
      "observation": "trabalho"
    },
    "third": {
      "value": {
        "content": "jose.silva.albuquerque@bol.com.br"
      },
      "observation": "email como nome grande"
    },
    "fourth": {
      "value": {
        "content": "a@b"
      },
      "observation": "gdf"
    }
  },
  "address": {
    "main": {
      "value": {
        "postalCode": "91787193",
        "street": "Rua Elvira Dendena",
        "streetNumber": 436,
        "neighbourhood": "Hípica",
        "city": "Cachoeirinha",
        "state": "RS",
        "country": "Brasil"
      },
      "observation": ""
    },
    "second": {
      "value": {
        "postalCode": "91787-140",
        "street": "Rua Maurílio Ferreira",
        "streetNumber": 634,
        "complements": "ap1",
        "neighbourhood": "Campo Novo",
        "city": "Porto Alegre",
        "state": "RS",
        "country": "Brasil"
      },
      "observation": "Casa da Mãe (Maria)"
    },
    "third": {
      "value": {
        "postalCode": "91787-193",
        "street": "Rua Elvira Dendena",
        "streetNumber": 123,
        "neighbourhood": "Hípica",
        "city": "Porto Alegre",
        "state": "RS",
        "country": "Brasil"
      }
    }
  },
  "phoneNumber": {
    "main": {
      "value": {
        "content": "51998579999"
      },
      "observation": "Whats"
    },
    "second": {
      "value": {
        "content": "5132646985"
      },
      "observation": "Casa"
    },
    "third": {
      "value": {
        "content": "11223336545"
      },
      "observation": "testess"
    },
    "fourth": {
      "value": {
        "content": "12345697456"
      },
      "observation": "fcd"
    },
    "fifth": {
      "value": {
        "content": "23610365413"
      },
      "observation": "abc"
    }
  }
}
Test.utils.data.searchSettingsForGenericList = {
  "currentQuantity": 0,
  "quantityToGet": 15,
  "order": {
    "fields": ["a"],
    "mode": 1
  },
  "filter": {
    "status": "initialStatus"
  }
};
Test.utils.data.activitySharingArtfacts = {
  "data": {
    "activity": {
      "objectType": "Activity",
      "_id": "5f49059e5b1291413d340190",
      "surveyForm": {
        "extents": "StudioObject",
        "objectType": "SurveyForm",
        "sender": "nando.souza97@hotmail.com",
        "sendingDate": "2017-11-07T15:14:16.587Z",
        "surveyFormType": "FORM_INTERVIEW",
        "surveyTemplate": null,
        "version": 2,
        "acronym": "RCPC",
        "name": "RECEPÇÃO",
        "isDiscarded": false,
        "requiredExternalID": false
      },
      "participantData": {
        "_id": "5ea343bdb174c405c9bba6cc",
        "recruitmentNumber": 555555,
        "name": "Fulano Detal Bezerra Pereira Menezes Rodrigues Gomes",
        "sex": "M",
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1949-04-22 00:00:00.000"
        },
        "fieldCenter": {
          "_id": "587d366a7b65e477dc410ab9",
          "name": "Rio Grande do Sul",
          "code": 5,
          "acronym": "RS",
          "country": null,
          "state": null,
          "address": null,
          "complement": null,
          "zip": null,
          "phone": null,
          "backgroundColor": "rgba(75, 192, 192, 0.2)",
          "borderColor": "rgba(75, 192, 192, 1)",
          "locationPoint": null
        },
        "late": false,
        "email": "fdrtec@gmail.com",
        "password": null,
        "tokenList": null,
        "registeredBy": null,
        "identified": true
      },
      "category": {
        "name": "C0",
        "objectType": "ActivityCategory",
        "label": "Normal",
        "disabled": false,
        "isDefault": true
      },
      "mode": "AUTOFILL",
      "fillContainer": {
        "fillingList": []
      },
      "statusHistory": [
        {
          "objectType": "ActivityStatus",
          "name": "CREATED",
          "date": "2020-08-28T13:24:46.910Z",
          "user": {
            "name": "Fabiano",
            "surname": "Dias Ramires",
            "phone": "51998577574",
            "email": "fdrtec@gmail.com"
          }
        }
      ],
      "interviews": [],
      "isDiscarded": false,
      "navigationTracker": {
        "objectType": "NavigationTracker",
        "lastVisitedIndex": null,
        "items": [
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC1",
            "index": 0,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [],
            "outputs": [
              "RCPC4",
              "RCPC2"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC2",
            "index": 1,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC1"
            ],
            "outputs": [
              "RCPC4",
              "RCPC3",
              "RCPC22"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC3",
            "index": 2,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC2"
            ],
            "outputs": [
              "RCPC4"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC4",
            "index": 3,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC3",
              "RCPC1",
              "RCPC2"
            ],
            "outputs": [
              "RCPC5"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC5",
            "index": 4,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC4"
            ],
            "outputs": [
              "RCPC6"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC6",
            "index": 5,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC5"
            ],
            "outputs": [
              "RCPC7"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC7",
            "index": 6,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC6"
            ],
            "outputs": [
              "RCPC8",
              "RCPC22"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC8",
            "index": 7,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC7"
            ],
            "outputs": [
              "RCPC13",
              "RCPC9"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC9",
            "index": 8,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC8"
            ],
            "outputs": [
              "RCPC10"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC10",
            "index": 9,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC9"
            ],
            "outputs": [
              "RCPC11"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC11",
            "index": 10,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC10"
            ],
            "outputs": [
              "RCPC12"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC12",
            "index": 11,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC11"
            ],
            "outputs": [
              "RCPC13",
              "RCPC22"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC13",
            "index": 12,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC12",
              "RCPC8"
            ],
            "outputs": [
              "RCPC17",
              "RCPC14"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC14",
            "index": 13,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC13"
            ],
            "outputs": [
              "RCPC17",
              "RCPC15"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC15",
            "index": 14,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC14"
            ],
            "outputs": [
              "RCPC16"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC16",
            "index": 15,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC15"
            ],
            "outputs": [
              "RCPC17"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC17",
            "index": 16,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC16",
              "RCPC13",
              "RCPC14"
            ],
            "outputs": [
              "RCPC18"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC18",
            "index": 17,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC17"
            ],
            "outputs": [
              "RCPC19"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC19",
            "index": 18,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC18"
            ],
            "outputs": [
              "RCPC20"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC20",
            "index": 19,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC19"
            ],
            "outputs": [
              "RCPC21"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC21",
            "index": 20,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC20"
            ],
            "outputs": [
              "RCPC22"
            ]
          },
          {
            "objectType": "NavigationTrackingItem",
            "id": "RCPC22",
            "index": 21,
            "state": "NOT_VISITED",
            "previous": null,
            "inputs": [
              "RCPC21",
              "RCPC2",
              "RCPC7",
              "RCPC12"
            ],
            "outputs": []
          }
        ]
      },
      "externalID": null
    },
    "dataSharingJson": {"data": {
      "activitySharing": {
        "objectType": "ActivitySharing",
        "_id": "5f4d0a3950d1ae36cd85bb8c",
        "activityId": "5f49059e5b1291413d340190",
        "userId": "5a3a5383918a3a27dd5d94c8",
        "participantToken": "eyJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoic2hhcmluZyJ9.LF49U2dH0TOxFMhigjKP8Q2YESWItwIlkHT3PEWqK1Q",
        "creationDate": "2020-08-31T14:33:29.471Z",
        "expirationDate": "2020-09-01T16:28:45.885Z"
      },
      "url": "https://localhost:51008/otus/survey-player/#/?activity=5f49059e5b1291413d340190&token=eyJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoic2hhcmluZyJ9.LF49U2dH0TOxFMhigjKP8Q2YESWItwIlkHT3PEWqK1Q"
    }}
  }
};

Test.utils.data.LaboratoryViewerService = {
  checkExistAndRunOnInitOrBackHome: function(onInitFunction, finishLoadingScreen){
    onInitFunction();
    if(finishLoadingScreen){
      finishLoadingScreen();
    }
  }
};

Test.utils.data.fileStructure = {
  examSendingLot: {
    _id: '1234',
    realizationDate: '2020-12-16'
  },
  exams: []
};

Test.utils.data.ProjectContextService = {
  getExamSendingAction: function() { return 'view'; },
  setExamSendingAction: function(action) {},
  getFileStructure: function() { return Test.utils.data.fileStructure; },
  setFileStructure: function(obj) {}
};

Test.utils.data.participantLaboratory = {

  "objectType": null,
  "recruitmentNumber": 5003304,
  "collectGroupName": "DEFAULT",
  "tubes": [
    {
      "objectType": "Tube",
      "type": "GEL",
      "moment": "FASTING",
      "code": "341002263",
      "groupName": "DEFAULT",
      "aliquots": [{
        "objectType": "Aliquot",
        "code": 34200252,
        "name": "BIOCHEMICAL_SERUM",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "LALA@GMAIL.COM",
          "time": "2017-06-22T21:43:06.086Z",
          "processing": "2018-06-20T18:58:10.942Z"
        },
        "aliquotHistory": [{
          "objectType": "AliquotEvent",
          "type": "CONVERTED_STORAGE",
          "userEmail": "otus@gmail.com",
          "description": "Falta de material para completar os exames",
          "date": "2019-05-14T12:36:23.631Z"
        }]
      }],
      "order": 1,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": true,
        "metadata": "",
        "operator": "lalala@gmail.com",
        "time": "2017-06-06T15:15:28.958Z",
        "customMetadata": ["59b68aee28f10d398e986595"]
      }
    }, {
      "objectType": "Tube",
      "type": "EDTA",
      "moment": "FASTING",
      "code": "361009386",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 2,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null,
        "customMetadata": []
      }
    }, {
      "objectType": "Tube",
      "type": "FLUORIDE",
      "moment": "FASTING",
      "code": "361009389",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 3,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "GEL",
      "moment": "FASTING",
      "code": "361009381",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 4,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "GEL",
      "moment": "FASTING",
      "code": "361009382",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 5,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "GEL",
      "moment": "FASTING",
      "code": "361009383",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 6,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "EDTA",
      "moment": "FASTING",
      "code": "361009387",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 7,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "EDTA",
      "moment": "FASTING",
      "code": "361009388",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 8,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "GEL",
      "moment": "POST_OVERLOAD",
      "code": "361009390",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 9,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "GEL",
      "moment": "POST_OVERLOAD",
      "code": "361009391",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 10,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "FLUORIDE",
      "moment": "POST_OVERLOAD",
      "code": "361009385",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 11,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }, {
      "objectType": "Tube",
      "type": "URINE",
      "moment": "NONE",
      "code": "361009384",
      "groupName": "DEFAULT",
      "aliquots": [],
      "order": 12,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    }],
  "exams": []
};

Test.utils.data.locationPoint = {
  transportLocationPoints: []
};

Test.utils.data.codeConfiguration = {
  waveNumberToken: 1,
  tubeToken: 'tubeToken',
  cryotubeToken: 'cryotubeToken',
  palletToken: 'palletToken'
};
