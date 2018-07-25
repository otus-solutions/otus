describe('participants-manager-list-controller Test', function () {
  var Mock = {};
  var controller;
  var Injections = {};
  const HEADERS = ['Recrutamento', 'Nome', 'Sexo', 'Nascimento', 'Centro', 'Óbito', 'Relatórios'];
  const TABLE_TITLE = 'Lista de Participantes';

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function () {
    Mock.ParticipantManagerService = {
      listIdexers: function () {
        return Promise.resolve(mockParticipantList());
      },
      selectParticipant: function (p) {
        var participant = p;
      }
    };

    Mock.LoadingScreenService = {
      changeMessage: function (msg) {
      },
      start: function () {
        return Promise.resolve();
      },
      finish: function () {
        return Promise.resolve();
      }
    };

    Mock.ApplicationStateService = {
      activateDashboard: function () {
      },
      activateCreateParticipant: function () {
      },
      activateParticipantDashboard: function () {
      }
    }

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.participant.business.ParticipantManagerService', Mock.ParticipantManagerService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_) {
      Injections = {
        ParticipantManagerService: Mock.ParticipantManagerService,
        LoadingScreenService: Mock.LoadingScreenService,
        ApplicationStateService: Mock.ApplicationStateService,
        DynamicTableSettingsFactory: _$injector_.get('otusjs.otus.uxComponent.DynamicTableSettingsFactory')
      };

      controller = _$controller_('otusParticipantsListCtrl', Injections);
      jasmine.clock().install();
      jasmine.clock().tick(50);
    });
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });


  describe('onInit test success with participantList', function () {
    var oldDate = new Date();
    beforeEach(function () {
      spyOn(controller, '$onInit').and.callThrough();
      spyOn(Mock.LoadingScreenService, 'changeMessage').and.callThrough();
      spyOn(Injections.DynamicTableSettingsFactory, 'create').and.callThrough();
      spyOn(window, "Date").and.callFake(function () {
        return oldDate;
      });
      controller.participantsList = mockParticipantList();
      controller.$onInit();
    });

    it('should construct component', function (done) {
      expect(Mock.LoadingScreenService.changeMessage).toHaveBeenCalled();
      expect(Mock.LoadingScreenService.changeMessage).toHaveBeenCalledTimes(1);
      expect(controller.participants[0].birthday instanceof Object).toEqual(true);
      expect(controller.participants[0].birthday.getDate instanceof Function).toEqual(true);
      expect(typeof(controller.participants[0].obito)).toEqual("string");
      expect(controller.selectedParticipant).toEqual(null);
      expect(Injections.DynamicTableSettingsFactory.create).toHaveBeenCalled();
      expect(Injections.DynamicTableSettingsFactory.create).toHaveBeenCalledTimes(1);
      expect(controller.dynamicTableSettings.headers).toEqual(HEADERS);
      expect(controller.dynamicTableSettings.tableTitle).toEqual(TABLE_TITLE);
      expect(controller.dynamicTableSettings.disableCheckbox).toEqual(true);
      expect(controller.dynamicTableSettings.elementsArray).toEqual(controller.participants);
      expect(controller.dynamicTableSettings.elementsProperties.indexOf('recruitmentNumber')).toBeGreaterThan(-1);
      expect(controller.dynamicTableSettings.elementsProperties.indexOf('name')).toBeGreaterThan(-1);
      expect(controller.dynamicTableSettings.elementsProperties.indexOf('sex')).toBeGreaterThan(-1);
      expect(controller.dynamicTableSettings.elementsProperties.indexOf('birthday')).toBeGreaterThan(-1);
      expect(controller.dynamicTableSettings.elementsProperties.indexOf('fieldCenter.acronym')).toBeGreaterThan(-1);
      expect(controller.dynamicTableSettings.elementsProperties.indexOf('obito')).toBeGreaterThan(-1);
      done();
    });

  });

  describe('onInit test success without participantList', function () {
    var oldDate = new Date();
    beforeEach(function () {
      spyOn(controller, '$onInit').and.callThrough();
      spyOn(Mock.LoadingScreenService, 'changeMessage').and.callThrough();
      spyOn(Mock.LoadingScreenService, 'start').and.callThrough();
      spyOn(Mock.LoadingScreenService, 'finish').and.callThrough();
      spyOn(Mock.ParticipantManagerService, 'listIdexers').and.callThrough();
      spyOn(Injections.DynamicTableSettingsFactory, 'create').and.callThrough();
      spyOn(window, "Date").and.callFake(function () {
        return oldDate;
      });
      controller.$onInit();
    });

    it('should construct component', function (done) {
      expect(Mock.LoadingScreenService.changeMessage).toHaveBeenCalled();
      expect(Mock.LoadingScreenService.changeMessage).toHaveBeenCalledTimes(1);
      expect(Mock.LoadingScreenService.start).toHaveBeenCalled();
      expect(Mock.LoadingScreenService.start).toHaveBeenCalledTimes(1);
      expect(Mock.ParticipantManagerService.listIdexers).toHaveBeenCalled();
      expect(Mock.ParticipantManagerService.listIdexers).toHaveBeenCalledTimes(1);
      Mock.ParticipantManagerService.listIdexers().then(function () {
        expect(Mock.LoadingScreenService.finish).toHaveBeenCalled();
        expect(Mock.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
        expect(controller.participants[0].birthday instanceof Object).toEqual(true);
        expect(controller.participants[0].birthday.getDate instanceof Function).toEqual(true);
        expect(typeof(controller.participants[0].obito)).toEqual("string");
        expect(controller.selectedParticipant).toEqual(null);
        expect(Injections.DynamicTableSettingsFactory.create).toHaveBeenCalled();
        expect(Injections.DynamicTableSettingsFactory.create).toHaveBeenCalledTimes(1);
        expect(controller.dynamicTableSettings.headers).toEqual(HEADERS);
        expect(controller.dynamicTableSettings.tableTitle).toEqual(TABLE_TITLE);
        expect(controller.dynamicTableSettings.disableCheckbox).toEqual(true);
        expect(controller.dynamicTableSettings.elementsArray).toEqual(controller.participants);
        expect(controller.dynamicTableSettings.elementsProperties.indexOf('recruitmentNumber')).toBeGreaterThan(-1);
        expect(controller.dynamicTableSettings.elementsProperties.indexOf('name')).toBeGreaterThan(-1);
        expect(controller.dynamicTableSettings.elementsProperties.indexOf('sex')).toBeGreaterThan(-1);
        expect(controller.dynamicTableSettings.elementsProperties.indexOf('birthday')).toBeGreaterThan(-1);
        expect(controller.dynamicTableSettings.elementsProperties.indexOf('fieldCenter.acronym')).toBeGreaterThan(-1);
        expect(controller.dynamicTableSettings.elementsProperties.indexOf('obito')).toBeGreaterThan(-1);
        done();
      });
      done();
    });

  });


  describe('onInit test fail without participantList', function () {
    beforeEach(function () {
      spyOn(controller, '$onInit').and.callThrough();
      spyOn(Mock.LoadingScreenService, 'changeMessage').and.callThrough();
      spyOn(Mock.ApplicationStateService, 'activateDashboard').and.callThrough();
      spyOn(Mock.ParticipantManagerService, 'listIdexers').and.returnValue(Promise.reject());
      controller.$onInit();
    });

    it('should construct component', function (done) {
      expect(Mock.LoadingScreenService.changeMessage).toHaveBeenCalled();
      expect(Mock.LoadingScreenService.changeMessage).toHaveBeenCalledTimes(1);
      expect(Mock.ParticipantManagerService.listIdexers).toHaveBeenCalled();
      expect(Mock.ParticipantManagerService.listIdexers).toHaveBeenCalledTimes(1);
      Mock.ParticipantManagerService.listIdexers().then(function () {
        done();
      }).catch(function () {
        expect(Mock.ApplicationStateService.activateDashboard).toHaveBeenCalled();
        expect(Mock.ApplicationStateService.activateDashboard).toHaveBeenCalledTimes(1);
      });
      done();
    });

  });

  describe('add participant button click', function () {
    beforeEach(function () {
      spyOn(Mock.ApplicationStateService, 'activateCreateParticipant').and.callThrough();
      controller.addParticipant();
    });

    it('should call state of participant create', function () {
      expect(Mock.ApplicationStateService.activateCreateParticipant).toHaveBeenCalled();
      expect(Mock.ApplicationStateService.activateCreateParticipant).toHaveBeenCalledTimes(1);
    });
  });

  describe('select participant button icon click', function () {
    beforeEach(function () {
      var oldDate = new Date();
      spyOn(controller, '$onInit').and.callThrough();
      spyOn(Mock.ApplicationStateService, 'activateParticipantDashboard').and.callThrough();
      spyOn(Mock.ParticipantManagerService, 'selectParticipant').and.callThrough();
      spyOn(window, "Date").and.callFake(function () {
        return oldDate;
      });
      controller.participantsList = mockParticipantList();
      controller.$onInit();
      controller.selectParticipant(controller.participants[0]);

    });

    it('should call state of participant create', function () {
      var participant = mockParticipantList();
      expect(Mock.ParticipantManagerService.selectParticipant).toHaveBeenCalledWith(participant[0]);
      expect(Mock.ParticipantManagerService.selectParticipant).toHaveBeenCalledTimes(1);
      expect(Mock.ApplicationStateService.activateParticipantDashboard).toHaveBeenCalled();
      expect(Mock.ApplicationStateService.activateParticipantDashboard).toHaveBeenCalledTimes(1);
    });
  });

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
