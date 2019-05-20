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
}

