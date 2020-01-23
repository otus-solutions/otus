describe('participant-manager-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var DATA_RN = "9892854";
  var ERROR_MESSAGE = "ParticipantList is not initialized.";

  beforeEach(function() {
    angular.mock.module('otusjs.otus');
  });

  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.value('otusjs.participant.repository.ParticipantRepositoryService',{
        create: function(participant) {
          return Promise.resolve(participant);
        },
        listIdexers: function() {
          return Promise.resolve(mockParticipantList());
        },
        getAllowNewParticipants: function() {
          return Promise.resolve(mockProjectConfiguration());
        }
      });
      $provide.value('otusjs.utils.SearchQueryFactory',{
        newParticipantFilter: function() {
          return Promise.resolve([{recruitmentNumber:DATA_RN}]);
        }
      });
    });
  });

  beforeEach(function() {
    inject(function(_$injector_) {
      Injections.ContextService = _$injector_.get('otusjs.participant.core.ContextService');
      Injections.EventService = _$injector_.get('otusjs.participant.core.EventService');
      Injections.ParticipantRepositoryService =  _$injector_.get('otusjs.participant.repository.ParticipantRepositoryService');
      Injections.SearchQueryFactory = _$injector_.get('otusjs.utils.SearchQueryFactory');
      Injections.$q = _$injector_.get('$q');

      service = _$injector_.get('otusjs.participant.business.ParticipantManagerService', Injections);
    });
    mock();
    spyOn(Injections.$q, "defer").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "create").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "listIdexers").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "getAllowNewParticipants").and.callThrough();
    spyOn(Injections.ContextService, "getSelectedParticipant");
    spyOn(Injections.ContextService, "selectParticipant");
    spyOn(Injections.EventService, "fireParticipantSelected");
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.setup).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.listIdexers).toBeDefined();
    expect(service.getAllowNewParticipants).toBeDefined();
    expect(service.filter).toBeDefined();
    expect(service.selectParticipant).toBeDefined();
    expect(service.getSelectedParticipant).toBeDefined();
    expect(service.getParticipantList).toBeDefined();
    expect(service.getParticipant).toBeDefined();
  });

  it('should called method create', function() {
    service.create(Mock.participant);
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantRepositoryService.create).toHaveBeenCalledWith(Mock.participant);
    expect(Injections.ParticipantRepositoryService.create).toHaveBeenCalledTimes(1);
  });

  it('should called method listIdexers', function() {
    service.listIdexers();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantRepositoryService.listIdexers).toHaveBeenCalled();
    expect(Injections.ParticipantRepositoryService.listIdexers).toHaveBeenCalledTimes(1);
  });

  it('should called method getAllowNewParticipants', function() {
    service.getAllowNewParticipants();
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantRepositoryService.getAllowNewParticipants).toHaveBeenCalled();
    expect(Injections.ParticipantRepositoryService.getAllowNewParticipants).toHaveBeenCalledTimes(1);
  });

  it('selectParticipantMethod should called method selectParticipant and fireParticipantSelected', function () {
    service.selectParticipant(Mock.selectedParticipant);
    expect(Injections.ContextService.selectParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.EventService.fireParticipantSelected).toHaveBeenCalledTimes(1);
  });

  it('getSelectedParticipantMethod should called method getSelectedParticipant', function () {
    service.getSelectedParticipant();
    expect(Injections.ContextService.getSelectedParticipant).toHaveBeenCalledTimes(1);
  });

  it('getParticipantListMethod should called method participantList', function () {
    service.setup();
    expect(service.getParticipantList()).toEqual([]);
  });

  it('getParticipantMethod should find method participantList return error', function () {
    service.setup();
    expect(service.getParticipant).toThrowError(ERROR_MESSAGE);
  });

  function mock() {
    Mock.selectedParticipant = {
      recruitmentNumber: 32056510,
    };

    Mock.participant = {
      "recruitmentNumber": 9876542,
      "objectType": "Participant",
      "name": "Beltrano",
      "sex": "M",
      "birthdate": {
        "objectType": "ImmutableDate",
        "value": "1954-09-20 00:00:00.000"
      },
      "fieldCenter": {
        "acronym": "RS"

      },
      "late": false
    };
  }

  function mockProjectConfiguration() {
    return {
      objectType: "ProjectConfiguration",
      participantRegistration: true
    };
  }

  function mockParticipantList() {
    return [
      {
        "recruitmentNumber": 9892854,
        "objectType": "Participant",
        "name": "Siclano",
        "sex": "M",
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1954-09-20 00:00:00.000"
        },
        "fieldCenter": {
          "acronym": "RS"

        },
        "late": false
      },
      {
        "recruitmentNumber": 1234567,
        "objectType": "Participant",
        "name": "Fulano",
        "sex": "M",
        "birthdate": {
          "objectType": "ImmutableDate",
          "value": "1954-09-20 00:00:00.000"
        },
        "fieldCenter": {
          "acronym": "RS"

        },
        "late": false
      }
    ];
  }
});
