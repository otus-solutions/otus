(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.ParticipantRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.list = list;
    self.create = create;
    self.getByRecruitmentNumber = getByRecruitmentNumber;
    self.getFollowUps = getFollowUps;
    self.activateFollowUpEvent = activateFollowUpEvent;

    function initialize() {
      _rest = OtusRestResourceService.getParticipantResource();
    }

    function getByRecruitmentNumber(rn) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.getByRecruitmentNumber({rn}).$promise;
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.list().$promise;
    }

    function create(participant) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return _rest.create({}, participant).$promise;
    }

    function getFollowUps(recruitmentNumber) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return Promise.resolve({
        "data": [
          {
            "_id": "5e28766c600f31392c24d73d",
            "objectType": "FollowUp",
            "activated": true,
            "description": "teste",
            "windowBetween": 0,
            "time": 365,
            "order": 0,
            "participantEvents": [
              {
                "_id": "5e2b1665ff6a0a524204b528",
                "activated": true,
                "status": "ACCOMPLISHED",
                "description": "",
                "objectType": "FollowUp",
                "eventId": "5e28766c600f31392c24d73d",
                "participant": "5e271f34f511b164206b66a6",
                "date": "2019-01-23T16:08:05.940Z"
              }
            ],
            "events": [
              {
                "_id" : "5e2881ef34d7de000769c1a4",
                "objectType" : "ActivityAutoFillEvent",
                "activated" : true,
                "description" : "Event",
                "acronym" : "acronym",
                "name" : "name",
                "followUpId" : "5e1f4b25420db12b9a1766a8",
                "order" : 13,
                "participantEvents": [
                  {
                    "_id": "5e2b1665ff6a0a524204b528",
                    "activated": true,
                    "status": "ACCOMPLISHED",
                    "description": "",
                    "objectType": "ActivityAutoFillEvent",
                    "eventId": "5e28766c600f31392c24d73d",
                    "participant": "5e271f34f511b164206b66a6",
                    "date": "2019-01-23T16:08:05.940Z"
                  }
                ],
              }
            ],
            "deadline": {
              "startDate": "2019-01-23T16:08:05.940Z",
              "finalDate": "2019-11-24T17:08:05.940Z",
              "remainingDays": -61
            }
          },
          {
            "_id": "5e1f568735cbca35dddd1fd7",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 2,
            "participantEvents": [
              {
                "_id": "5e2b1e55e607135ebe43fcfe",
                "activated": true,
                "status": "PENDING",
                "description": "FollowUp 2",
                "objectType": "followUp",
                "eventId": "5e1f568735cbca35dddd1fd7",
                "participant": "5e271f34f511b164206b66a6",
                "date": "2020-01-24T16:41:57.773Z"
              }
            ],
            "events": [],
            "deadline": {
              "startDate": "2020-01-24T16:41:57.773Z",
              "finalDate": "2020-09-20T16:41:57.773Z",
              "remainingDays": 239
            }
          },
          {
            "_id": "5e1f56fd35cbca35dddd1fd8",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 3,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25d9e70fb7b1000742280c",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 4,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25da190fb7b1000742280d",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 5,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25da440fb7b1000742280e",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 6,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25e55f0fb7b1000742280f",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 7,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25eed60fb7b10007422810",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 8,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25eeff0fb7b10007422811",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 9,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25f2230fb7b10007422812",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 10,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25f2240fb7b10007422813",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 11,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25f2250fb7b10007422814",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 12,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25f2400fb7b10007422815",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 13,
            "participantEvents": [],
            "events": []
          },
          {
            "_id": "5e25f7940fb7b10007422816",
            "objectType": "followUp",
            "activated": true,
            "description": "FollowUp 2",
            "windowBetween": 60,
            "time": 300,
            "order": 14,
            "participantEvents": [],
            "events": []
          }
        ]
      });
      // return _rest.getFollowUps({recruitmentNumber}).$promise;
    }

    function activateFollowUpEvent(recruitmentNumber, event) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }
      return Promise.resolve(event);
      // return _rest.activateFollowUpEvent({
      //   rn: recruitmentNumber
      // }, event).$promise;
    }
  }
}());
