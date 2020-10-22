describe('Moment Type Manager Factory', function () {
  var Mock = {};
  var factory;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.laboratory.business.participant.aliquot');
  });


  beforeEach(function () {
    inject(function (_$injector_, $rootScope) {
      Injections = {
        "$q": _$injector_.get('$q'),
        "AliquotStructureFactory": _$injector_.get('AliquotStructureFactory')
      };
      factory = _$injector_.get('otusjs.laboratory.business.participant.aliquot.MomentTypeManagerFactory', Injections);
      mockTubes();
      mockInitialize(Injections.$q, $rootScope);
    });
  });
  describe('test for remove aliquots', function () {
    var moment;
    beforeEach(function () {
      moment = factory.create(jasmine.any(Object));
      mockFactoryData(moment);
      spyOn(moment.collectedAliquots, 'find').and.returnValue(Mock.deferred.promise);
      spyOn(moment.exams, 'splice').and.callThrough();
      spyOn(moment.storages, 'splice').and.callThrough();
      spyOn(moment.convertedStorages, 'splice').and.callThrough();
    });

    it('should remove a exam', function () {
      var _length = moment.collectedAliquots.length;
      var aliquot = {};
      aliquot.code = '343000648';
      moment.removeAliquot(aliquot);
      expect(_length).toBeGreaterThan(moment.collectedAliquots.length);
    });


    it('should remove a storage', function () {
      var _length = moment.collectedAliquots.length;
      var aliquot = {};
      aliquot.code = '343006231';
      moment.removeAliquot(aliquot);
      expect(_length).toBeGreaterThan(moment.collectedAliquots.length);
    });

    it('should remove a additional', function () {
      var _length = moment.collectedAliquots.length;
      var aliquot = {};
      aliquot.code = '343007231';
      aliquot.isConverted = true;
      moment.removeAliquot(aliquot);
      expect(_length).toBeGreaterThan(moment.collectedAliquots.length);
      expect(moment.convertedStorages.splice).toHaveBeenCalledTimes(1);
    });


    function mockFactoryData(factory) {
      factory.collectedAliquots = [
        {
        "objectType": "Aliquot",
        "code": "343000648",
        "name": "BIOCHEMICAL_SERUM",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2018-02-20T19:34:36.853Z",
          "processing": "2018-02-27T10:30:00Z"
        }
      }, {
        "objectType": "Aliquot",
        "code": "343121222",
        "name": "FASTING_HORMONE",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2018-02-21T11:58:38.663Z",
          "processing": "2018-02-27T10:30:00Z"
        }
      }, {
        "objectType": "Aliquot",
        "code": "343000064",
        "name": "PCR",
        "container": "CRYOTUBE",
        "role": "EXAM",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2018-07-11T21:33:57.043Z",
          "processing": "2018-07-11T21:33:31.995Z"
        }
      }, {
        "objectType": "Aliquot",
        "code": "343006231",
        "name": "FASTING_SERUM",
        "container": "CRYOTUBE",
        "role": "STORAGE",
        "aliquotCollectionData": {
          "objectType": "AliquotCollectionData",
          "metadata": "",
          "operator": "tiago.matana@gmail.com",
          "time": "2018-07-11T21:48:06.595Z",
          "processing": "2018-07-11T21:47:48.361Z"
        }
      }];

      factory.exams = [
        {
        "aliquotCode": "343000648",
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
        "tubeMessage": ""
      }, {
        "aliquotCode": "343000064",
        "aliquotId": "EXAMAliquot1",
        "tubeCode": "341005082",
        "container": "",
        "containerLabel": "PCR",
        "date": "2018-07-11T21:33:57.043Z",
        "index": 1,
        "isSaved": true,
        "label": "PCR",
        "name": "PCR",
        "operator": "tiago.matana@gmail.com",
        "placeholder": "",
        "processing": "2018-07-11T21:33:31.995Z",
        "role": "EXAM",
        "time": "",
        "tubeId": "EXAMTube1",
        "tubeMessage": ""
      }, {
        "aliquotCode": "343121222",
        "aliquotId": "EXAMAliquot2",
        "tubeCode": "341005082",
        "container": "",
        "containerLabel": "Hormônios Jejum",
        "date": "2018-02-21T11:58:38.663Z",
        "index": 2,
        "isSaved": true,
        "label": "Hormônios Jejum",
        "name": "FASTING_HORMONE",
        "operator": "tiago.matana@gmail.com",
        "placeholder": "",
        "processing": "2018-02-27T10:30:00.000Z",
        "role": "EXAM",
        "time": "",
        "tubeId": "EXAMTube2",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "EXAMAliquot3",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Glicemia Jejum",
        "date": "",
        "index": 3,
        "isSaved": false,
        "label": "Glicemia Jejum",
        "name": "FASTING_GLYCEMIA",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "EXAM",
        "time": "",
        "tubeId": "EXAMTube3",
        "tubeMessage": ""
      }];

      factory.storages = [
        {
        "aliquotCode": "343006231",
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
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot1",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 1,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube1",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot2",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 2,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube2",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot3",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 3,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube3",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot4",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 4,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube4",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot5",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 5,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube5",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot6",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 6,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube6",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot7",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 7,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube7",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot8",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 8,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube8",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot9",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 9,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube9",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot10",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 10,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube10",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot11",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 11,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube11",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot12",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 12,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube12",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot13",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 13,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube13",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot14",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 14,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube14",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot15",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 15,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube15",
        "tubeMessage": ""
      }];

      factory.convertedStorages = [
        {
          "aliquotCode": "343007231",
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
          "tubeMessage": ""
        }
      ];

      factory.originalExams = [
        {
        "aliquotCode": "343000648",
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
        "tubeMessage": ""
      }, {
        "aliquotCode": "343000064",
        "aliquotId": "EXAMAliquot1",
        "tubeCode": "341005082",
        "container": "",
        "containerLabel": "PCR",
        "date": "2018-07-11T21:33:57.043Z",
        "index": 1,
        "isSaved": true,
        "label": "PCR",
        "name": "PCR",
        "operator": "tiago.matana@gmail.com",
        "placeholder": "",
        "processing": "2018-07-11T21:33:31.995Z",
        "role": "EXAM",
        "time": "",
        "tubeId": "EXAMTube1",
        "tubeMessage": ""
      }, {
        "aliquotCode": "343121222",
        "aliquotId": "EXAMAliquot2",
        "tubeCode": "341005082",
        "container": "",
        "containerLabel": "Hormônios Jejum",
        "date": "2018-02-21T11:58:38.663Z",
        "index": 2,
        "isSaved": true,
        "label": "Hormônios Jejum",
        "name": "FASTING_HORMONE",
        "operator": "tiago.matana@gmail.com",
        "placeholder": "",
        "processing": "2018-02-27T10:30:00.000Z",
        "role": "EXAM",
        "time": "",
        "tubeId": "EXAMTube2",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "EXAMAliquot3",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Glicemia Jejum",
        "date": "",
        "index": 3,
        "isSaved": false,
        "label": "Glicemia Jejum",
        "name": "FASTING_GLYCEMIA",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "EXAM",
        "time": "",
        "tubeId": "EXAMTube3",
        "tubeMessage": ""
      }];

      factory.originalStorages = [
        {
        "aliquotCode": "343006231",
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
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot1",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 1,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube1",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot2",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 2,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube2",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot3",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 3,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube3",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot4",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 4,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube4",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot5",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 5,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube5",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot6",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 6,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube6",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot7",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 7,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube7",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot8",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 8,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube8",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot9",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 9,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube9",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot10",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 10,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube10",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot11",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 11,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube11",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot12",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 12,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube12",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot13",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 13,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube13",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot14",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 14,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube14",
        "tubeMessage": ""
      }, {
        "aliquotCode": "",
        "aliquotId": "STORAGEAliquot15",
        "tubeCode": "",
        "container": "",
        "containerLabel": "Soro Jejum",
        "date": "",
        "index": 15,
        "isSaved": false,
        "label": "Soro Jejum",
        "name": "FASTING_SERUM",
        "operator": "",
        "placeholder": "",
        "processing": "",
        "role": "STORAGE",
        "time": "",
        "tubeId": "STORAGETube15",
        "tubeMessage": ""
      }];
    }
  });

  function mockTubes() {
    Mock.tube = {
      "objectType": "Tube",
      "type": "GEL",
      "moment": "POST_OVERLOAD",
      "code": "341005091",
      "groupName": "DEFAULT",
      "aliquotes": [],
      "order": 1,
      "tubeCollectionData": {
        "objectType": "TubeCollectionData",
        "isCollected": false,
        "metadata": "",
        "operator": "",
        "time": null
      }
    };


  }

  function mockInitialize($q, $rootScope){
    let aliquot = {
      "objectType": "Aliquot",
      "code": "343000648",
      "name": "BIOCHEMICAL_SERUM",
      "container": "CRYOTUBE",
      "role": "EXAM",
      "aliquotCollectionData": {
        "objectType": "AliquotCollectionData",
        "metadata": "",
        "operator": "tiago.matana@gmail.com",
        "time": "2018-02-20T19:34:36.853Z",
        "processing": "2018-02-27T10:30:00Z"
      }
    }

    Mock.deferred = $q.defer();
    Mock.deferred.resolve(aliquot);
  }
});