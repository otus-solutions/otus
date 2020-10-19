describe('otusParticipantAliquotService', function() {

  var UNIT_NAME = 'otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService';
  var Mock = {};
  var Injections = {};
  var service = {};


  beforeEach(angular.mock.module('otusjs.laboratory'));
  beforeEach(angular.mock.module('otusjs.laboratory.business'));
  beforeEach(angular.mock.module('otusjs.laboratory.repository'));
  beforeEach(angular.mock.module('otusjs.laboratory.storage'));
  beforeEach(angular.mock.module('otusjs.laboratory.core'));
  beforeEach(function() {

    inject(function(_$injector_) {
      mockAliquotStruture();
      mockMomentType();
      // Injections
      mockInjections(_$injector_);
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('populateAliquotsArray method', function() {

    var _aliquotNotStruture = {};
    var _aliquotStruture = {};
    var _greaterAliquotStruture = [];
    beforeEach(function() {
      _aliquotStruture = Mock.aliquotStructureExam;
      _greaterAliquotStruture.push(_aliquotNotStruture, _aliquotStruture);
    });

    it('should verify a aliquot struture', function() {
      expect(Mock.aliquotStructureExam).not.toBeNull();
      expect(Mock.aliquotStructureExam).not.toEqual(Mock.aliquotStructureStore);
      expect(Mock.aliquotStructureExam).toEqual(_aliquotStruture);
      expect(Mock.aliquotStructureExam).not.toBeGreaterThan(_greaterAliquotStruture);
    });

  });

  describe('fillAliquotsWithCollectedAliquots method', function() {

    it('should fill exam storage and convertedStorages array', function() {
      var modifiedMomentType = service.populateAliquotsArray(Mock.momentType);
      expect(modifiedMomentType.exams.length).toEqual(4);
      expect(modifiedMomentType.storages.length).toEqual(16);
      expect(modifiedMomentType.convertedStorages.length).toEqual(1);
      expect(modifiedMomentType.exams[0].aliquotCode).toEqual('343000648');
      expect(modifiedMomentType.storages[0].aliquotCode).toEqual('343006231');
      expect(modifiedMomentType.convertedStorages[0].aliquotCode).toEqual('343007231');
    });

  });

  function mockAliquotStruture() {
    var aliquotStructure = {
    aliquotCode : "",
    tubeCode : "",
    container : "",
    containerLabel : "",
    placeholder : "",
    aliquotMessage : "",
    tubeMessage : "",
    operator : "",
    date : "",
    time : "",
    processing : "",
    isSaved : false,
    locationPoint: ''
    };
    var aliquot = [];
    aliquot.role = "EXAM";
    aliquot.exams = [];
    aliquot.exams.push(aliquotStructure);
    Mock.aliquotStructureExam = aliquot;

    aliquot = [];
    aliquot.role = "STORAGE";
    aliquot.storage = [];
    aliquot.storage.push(aliquotStructure);
    Mock.aliquotStructureStore = aliquot;

  }

  function mockInjections($injector) {
    Mock.AliquotManagerService = $injector.get('otusjs.laboratory.business.participant.aliquot.AliquotManagerService');
    Mock.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
    Mock.$q = $injector.get('$q');
    Mock.AliquotStructureFactory = $injector.get('AliquotStructureFactory');

    Injections.AliquotManagerService = Mock.AliquotManagerService;
    Injections.ParticipantLaboratoryService = Mock.ParticipantLaboratoryService;
    Injections.$q = Mock.$q;
  }

  function mockMomentType() {
    Mock.momentType = {
      "type": "GEL",
      "moment": "FASTING",
      "momentLabel": "Jejum",
      "typeLabel": "Gel",
      "boxColor": "#ffcc00",
      "collectedAliquots": [
        {
          "code": "343000648",
          "aliquotId": "EXAMAliquot",
          "tubeCode": "341005082",
          "container": "",
          "containerLabel": "Bioquímica Soro",
          "date": "2018-02-20T19:34:36.853Z",
          "index": "",
          "isSaved": true,
          "label": "Bioquímica Soro",
          "name": "BIOCHEMICAL_SERUM",
          "operator": "tiago.matana@gmail.com",
          "placeholder": "",
          "processing": "2018-02-27T10:30:00.000Z",
          "role": "EXAM",
          "time": "",
          "tubeId": "EXAMTube",
          "tubeMessage": "",
          "aliquotCollectionData": {
            "objectType": "AliquotCollectionData",
            "metadata": "",
            "operator": "teste@gmail.com",
            "time": "2019-05-16T15:41:47.818Z",
            "processing": "2019-05-16T15:40:32.457Z"
          },
          "aliquotHistory": []
        },
        {
          "code": "343006231",
          "aliquotId": "STORAGEAliquot",
          "tubeCode": "341005082",
          "container": "",
          "containerLabel": "Soro Jejum",
          "date": "2018-07-11T21:48:06.595Z",
          "index": "",
          "isSaved": true,
          "label": "Soro Jejum",
          "name": "FASTING_SERUM",
          "operator": "tiago.matana@gmail.com",
          "placeholder": "",
          "processing": "2018-07-11T21:47:48.361Z",
          "role": "STORAGE",
          "time": "",
          "tubeId": "STORAGETube",
          "tubeMessage": "",
          "aliquotCollectionData": {
            "objectType": "AliquotCollectionData",
            "metadata": "",
            "operator": "teste@gmail.com",
            "time": "2019-05-20T17:31:07.934Z",
            "processing": "2019-05-20T17:30:28.778Z"
          },
          "aliquotHistory": []

        },
        {
          "code": "343007231",
          "aliquotId": "STORAGEAliquot",
          "tubeCode": "341005082",
          "container": "",
          "isConverted": true,
          "containerLabel": "Soro Jejum",
          "date": "2018-07-11T21:48:06.595Z",
          "index": "",
          "isSaved": true,
          "label": "Soro Jejum",
          "name": "FASTING_SERUM",
          "operator": "tiago.matana@gmail.com",
          "placeholder": "",
          "processing": "2018-07-11T21:47:48.361Z",
          "role": "STORAGE",
          "time": "",
          "tubeId": "STORAGETube",
          "tubeMessage": "",
          "aliquotCollectionData": {
            "objectType": "AliquotCollectionData",
            "metadata": "",
            "operator": "boese.work@gmail.com",
            "time": "2019-05-20T17:43:49.815Z",
            "processing": "2019-05-20T17:30:28.778Z"
          },
          "aliquotHistory": [
            {
              "objectType": "AliquotEvent",
              "type": "CONVERTED_STORAGE",
              "userEmail": "boese.work@gmail.com",
              "description": "asdasd asda sdas d asdasdasd asdas das dasd asd asd asd a sd",
              "date": "2019-05-20T17:44:06.044Z"
            }
          ]
        }
      ],
      "availableAliquots": [
        {
          "objectType": "AliquotDescriptor",
          "name": "BIOCHEMICAL_SERUM",
          "label": "Bioquímica Soro",
          "role": "EXAM",
          "index": 0
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "PCR",
          "label": "PCR",
          "role": "EXAM",
          "index": 1
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_HORMONE",
          "label": "Hormônios Jejum",
          "role": "EXAM",
          "index": 2
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_GLYCEMIA",
          "label": "Glicemia Jejum",
          "role": "EXAM",
          "index": 3
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 0
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 1
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 2
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 3
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 4
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 5
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 6
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 7
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 8
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 9
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 10
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 11
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 12
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 13
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 14
        },
        {
          "objectType": "AliquotDescriptor",
          "name": "FASTING_SERUM",
          "label": "Soro Jejum",
          "role": "STORAGE",
          "index": 15
        }
      ]
    };
  }

});
