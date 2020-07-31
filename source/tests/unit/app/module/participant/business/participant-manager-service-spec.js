describe('participant-manager-service Test', function() {
  let service;
  let Injections = {};
  let Mock = {};

  const PARTICIPANT_NOT_FOUND_ERROR_MSG = "Participant was not found.";
  const RN = 1234567;
  const ID = "123";
  const MAIL = "mail@mail.com";

  beforeEach(function() {
    angular.mock.module('otusjs.otus');
    inject(function($injector) {
      Injections.ContextService = $injector.get('otusjs.participant.core.ContextService');
      Injections.EventService = $injector.get('otusjs.participant.core.EventService');
      Injections.ParticipantRepositoryService =  $injector.get('otusjs.participant.repository.ParticipantRepositoryService');
      Injections.SearchQueryFactory = $injector.get('otusjs.utils.SearchQueryFactory');
      Injections.$q = $injector.get('$q');
      Injections.ParticipantDataSourceService = $injector.get('otusjs.deploy.ParticipantDataSourceService');

      service = $injector.get('otusjs.participant.business.ParticipantManagerService', Injections);
    });
    mock();
    spyOn(Injections.$q, "defer").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "create").and.returnValue(Promise.resolve(Mock.participant));
    spyOn(Injections.ParticipantRepositoryService, "update").and.returnValue(Promise.resolve(Mock.participant));
    spyOn(Injections.ParticipantRepositoryService, "getAllowNewParticipants").and.returnValue(Promise.resolve(Mock.projectConfiguration));
    spyOn(Injections.ContextService, "getSelectedParticipant");
    spyOn(Injections.ContextService, "selectParticipant");
    spyOn(Injections.EventService, "fireParticipantSelected");
    spyOn(Injections.ParticipantRepositoryService, "createParticipantContact").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "getParticipantContact").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "getParticipantContactByRecruitmentNumber").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "addNonMainEmail").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "addNonMainAddress").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "addNonMainPhoneNumber").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "updateEmail").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "updateAddress").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "updatePhoneNumber").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "swapMainContact").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "deleteParticipantContact").and.callThrough();
    spyOn(Injections.ParticipantRepositoryService, "deleteNonMainContact").and.callThrough();
    spyOn(Injections.ParticipantDataSourceService, "updateLoginEmail").and.returnValue(Promise.resolve());
    spyOn(Injections.ParticipantDataSourceService, "removeEmailByParticipantId").and.returnValue(Promise.resolve());
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
    expect(service.createParticipantContact).toBeDefined();
    expect(service.getParticipantContact).toBeDefined();
    expect(service.getParticipantContactByRecruitmentNumber).toBeDefined();
    expect(service.addNonMainEmail).toBeDefined();
    expect(service.addNonMainAddress).toBeDefined();
    expect(service.addNonMainPhoneNumber).toBeDefined();
    expect(service.updateEmail).toBeDefined();
    expect(service.updateAddress).toBeDefined();
    expect(service.updatePhoneNumber).toBeDefined();
    expect(service.swapMainContact).toBeDefined();
    expect(service.deleteParticipantContact).toBeDefined();
    expect(service.deleteNonMainContact).toBeDefined();
    expect(service.getParticipantById).toBeDefined();
    expect(service.updateLoginEmail).toBeDefined();
    expect(service.updateEmailParticipantSessionStorage).toBeDefined();
    expect(service.removeEmailByParticipantId).toBeDefined();
    expect(service.extractEmailValuesFromContacts).toBeDefined();
  });

  it('should called method create', function() {
    service.create(Mock.participant);
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantRepositoryService.create).toHaveBeenCalledWith(Mock.participant);
    expect(Injections.ParticipantRepositoryService.create).toHaveBeenCalledTimes(1);
  });

  it('should called method update', function() {
    service.update(Mock.participant);
    expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantRepositoryService.update).toHaveBeenCalledWith(Mock.participant);
    expect(Injections.ParticipantRepositoryService.update).toHaveBeenCalledTimes(1);
  });

  it('should called method listIdexers', function() {
    spyOn(Injections.ParticipantRepositoryService, "listIdexers").and.returnValue(Promise.resolve(Mock.participantList));
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

  xit('getParticipantListMethod should called method participantList', function () {
    spyOn(Injections.ParticipantRepositoryService, "listIdexers").and.returnValue(Promise.resolve(Mock.participantList));
    //expect(service.setup()).toBePromise();
  });

  it('getParticipantMethod should return array', function () {
    expect(service.getParticipantList()).toEqual([]);
  });

  it('getParticipantMethod should return error', function () {
    expect(service.getParticipant).toThrowError(PARTICIPANT_NOT_FOUND_ERROR_MSG);
  });

  it('createParticipantContact method should called method createParticipantContact', function() {
    service.createParticipantContact(Mock.participantContact);
    expect(Injections.ParticipantRepositoryService.createParticipantContact).toHaveBeenCalledWith(Mock.participantContact);
    expect(Injections.ParticipantRepositoryService.createParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('getParticipantContact method should called method getParticipantContact', function() {
    service.getParticipantContact(ID);
    expect(Injections.ParticipantRepositoryService.getParticipantContact).toHaveBeenCalledWith(ID);
    expect(Injections.ParticipantRepositoryService.getParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('getParticipantContactByRecruitmentNumber method should called method getParticipantContactByRecruitmentNumber', function() {

    service.getParticipantContactByRecruitmentNumber(RN);
    expect(Injections.ParticipantRepositoryService.getParticipantContactByRecruitmentNumber).toHaveBeenCalledWith(RN);
    expect(Injections.ParticipantRepositoryService.getParticipantContactByRecruitmentNumber).toHaveBeenCalledTimes(1);
  });

  it('addNonMainEmail method should called method addNonMainEmail', function() {
    const dto = {};
    service.addNonMainEmail(dto);
    expect(Injections.ParticipantRepositoryService.addNonMainEmail).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.addNonMainEmail).toHaveBeenCalledTimes(1);
  });

  it('addNonMainAddress method should called method addNonMainAddress', function() {
    const dto = {};
    service.addNonMainAddress(dto);
    expect(Injections.ParticipantRepositoryService.addNonMainAddress).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.addNonMainAddress).toHaveBeenCalledTimes(1);
  });

  it('addNonMainPhoneNumber method should called method addNonMainPhoneNumber', function() {
    const dto = {};
    service.addNonMainPhoneNumber(dto);
    expect(Injections.ParticipantRepositoryService.addNonMainPhoneNumber).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.addNonMainPhoneNumber).toHaveBeenCalledTimes(1);
  });

  it('updateEmail method should called method updateEmail', function() {
    const dto = {};
    service.updateEmail(dto);
    expect(Injections.ParticipantRepositoryService.updateEmail).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.updateEmail).toHaveBeenCalledTimes(1);
  });

  it('updateAddress method should called method updateAddress', function() {
    const dto = {};
    service.updateAddress(dto);
    expect(Injections.ParticipantRepositoryService.updateAddress).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.updateAddress).toHaveBeenCalledTimes(1);
  });

  it('updatePhoneNumber method should called method updatePhoneNumber', function() {
    const dto = {};
    service.updatePhoneNumber(dto);
    expect(Injections.ParticipantRepositoryService.updatePhoneNumber).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.updatePhoneNumber).toHaveBeenCalledTimes(1);
  });

  it('swapMainContact method should called method swapMainContact', function() {
    const dto = {};
    service.swapMainContact(dto);
    expect(Injections.ParticipantRepositoryService.swapMainContact).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.swapMainContact).toHaveBeenCalledTimes(1);
  });

  it('deleteParticipantContact method should called method deleteParticipantContact', function() {
    service.deleteParticipantContact(ID);
    expect(Injections.ParticipantRepositoryService.deleteParticipantContact).toHaveBeenCalledWith(ID);
    expect(Injections.ParticipantRepositoryService.deleteParticipantContact).toHaveBeenCalledTimes(1);
  });

  it('deleteNonMainContact method should called method deleteNonMainContact', function() {
    const dto = {};
    service.deleteNonMainContact(dto);
    expect(Injections.ParticipantRepositoryService.deleteNonMainContact).toHaveBeenCalledWith(dto);
    expect(Injections.ParticipantRepositoryService.deleteNonMainContact).toHaveBeenCalledTimes(1);
  });

  xit('getParticipantById method should called method participantList', function () {
    service.setup()
    expect(service.getParticipantById(ID)).toEqual();
  });

  it('getParticipantByIdMethod_should_throw_error_if_resource_is_not_initialized', () => {
    expect(service.getParticipantById).toThrowError(PARTICIPANT_NOT_FOUND_ERROR_MSG);
  });

  it('updateLoginEmail method should called method updateLoginEmail', function () {
    service.updateLoginEmail(ID, MAIL);
    expect(Injections.ParticipantDataSourceService.updateLoginEmail).toHaveBeenCalledWith(ID, MAIL);
    expect(Injections.ParticipantDataSourceService.updateLoginEmail).toHaveBeenCalledTimes(1);
  });

  it('removeEmailByParticipantId method should called method removeEmailByParticipantId', function () {
    service.removeEmailByParticipantId(ID);
    expect(Injections.ParticipantDataSourceService.removeEmailByParticipantId).toHaveBeenCalledWith(ID);
    expect(Injections.ParticipantDataSourceService.removeEmailByParticipantId).toHaveBeenCalledTimes(1);
  });

  it('extractEmailValuesFromContacts method should called parameter', function () {
    let contacts = { test: { value: { content: 1 } } };
    expect(service.extractEmailValuesFromContacts(contacts)).toEqual([1]);
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

    Mock.participantContact = mockParticipantContact();

    Mock.participantList = [
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

    Mock.projectConfiguration = {
      objectType: "ProjectConfiguration",
      participantRegistration: true
    };
  }

  function mockParticipantContact(){
    return {
      "objectType": "ParticipantContact",
      "recruitmentNumber": 1234567,
      "email": {
        "main": {
          "value": { "content": "main@gmail.com" },
          "observation": "personal"
        },
        "second": {
          "value": { "content": "second.email@gmail.com" },
          "observation": "work"
        },
        "third": {
          "value": { "content": "third.email@gmail.com" },
          "observation": "university"
        },
        "fourth": {
          "value": { "content": "fourth.email@gmail.com" },
          "observation": "mom"
        }
      },
      "address": {
        "main": {
          "value": {
            "postalCode": "90010-907",
            "street": "Rua dos Bobos",
            "streetNumber": 0,
            "complements": "Feita com muito esmero!",
            "neighbourhood": "Centro",
            "city": "Porto Alegre",
            "state": "RS",
            "country": "Brasil"
          },
          "observation": "Casa"
        },
        "second": {
          "value": {
            "postalCode": "90010-907",
            "street": "Av A",
            "streetNumber": 7,
            "complements": "somewhere over the rainbow",
            "neighbourhood": "Zona Sul",
            "city": "Porto Alegre",
            "state": "RS",
            "country": "Brasil"
          },
          "observation": "Casa da vizinha da minha tia."
        }
      },
      "phoneNumber": {
        "main": {
          "value": { "content":  "51123456789" },
          "observation": "casa"
        },
        "second": {
          "value": { "content":  "51987654321" },
          "observation": "celular"
        }
      }
    }
  }
});
