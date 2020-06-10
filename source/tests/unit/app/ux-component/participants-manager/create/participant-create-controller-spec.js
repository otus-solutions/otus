describe('participant-create-controller Test', function() {
  var Mock = {};
  var controller;
  var Injections = {};

  beforeEach(function() {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function() {

    Mock.ImmutableDate = function() {
      return {
        resetTime: function() {},
        toJSON: function() {
          return {
            objectType: 'ImmutableDate',
            value: "2018-07-20 00:00:00.000"
          };
        }
      };
    };

    angular.mock.module(function($provide) {
      $provide.value("$element", {
        find: function() {
          var self = this;
          self.focus = function() {};
          return self;
        }
      });
      $provide.value('otusjs.utils.ImmutableDate', Mock.ImmutableDate);
      $provide.value("otusjs.application.state.ApplicationStateService", {
        activateParticipantsList: function() {}
      });
      $provide.value("otusjs.model.participant.ParticipantFactory", {
        create: function(p) {
          return p;
        }
      });
      $provide.value("otusjs.deploy.FieldCenterRestService", {
        loadCenters: function() {
          return Promise.resolve(mockCenters());
        }
      });
      $provide.value("otusjs.otus.dashboard.core.ContextService", {
        getLoggedUser: function() {
          return Promise.resolve({
            fieldCenter: {
              acronym: "RS"
            }
          });
        }
      });
      $provide.value("otusjs.participant.business.ParticipantManagerService", {
        create: function(p) {
          if (p) {
            if (p.recruitmentNumber == 7654321) {
              return Promise.reject({
                data: {
                  MESSAGE: "Número de recrutamento 1234567 já existe"
                }
              });
            }
          }
          return Promise.resolve(p);

        }
      });
      $provide.value("otusjs.participant.business.ParticipantMessagesService", {
        showSaveDialog: function() {
          return Promise.resolve();
        },
        showNotSave: function() {},
        showToast: function() {},
        showRecruitmentNumberGenerated: function () {
          return Promise.resolve();
        }
      });

      $provide.value("otusjs.user.business.UserAccessPermissionService", {
        getCheckingParticipantPermission: function() {
          return Promise.resolve();
        }
      });
    });

  });

  beforeEach(function() {
    inject(function(_$injector_, _$controller_) {
      Injections = {
        "$element": _$injector_.get('$element'),
        "ImmutableDate": _$injector_.get('otusjs.utils.ImmutableDate'),
        "mdcDateTimeDialog": _$injector_.get('mdcDateTimeDialog'),
        "ApplicationStateService": _$injector_.get('otusjs.application.state.ApplicationStateService'),
        "mdcDefaultParams": _$injector_.get('mdcDefaultParams'),
        "ParticipantFactory": _$injector_.get('otusjs.model.participant.ParticipantFactory'),
        "ProjectFieldCenterService": _$injector_.get('otusjs.deploy.FieldCenterRestService'),
        "dashboardContextService": _$injector_.get('otusjs.otus.dashboard.core.ContextService'),
        "ParticipantManagerService": _$injector_.get('otusjs.participant.business.ParticipantManagerService'),
        "ParticipantMessagesService": _$injector_.get('otusjs.participant.business.ParticipantMessagesService'),
        "UserAccessPermissionService": _$injector_.get('otusjs.user.business.UserAccessPermissionService')
      };


      controller = _$controller_('otusParticipantCreateCtrl', Injections);
      var oldDate = new Date();
      spyOn(window, "Date").and.callFake(function() {
        return oldDate;
      });

      spyOn(window, "parseInt").and.returnValue(123);
      spyOn(window.localStorage, "getItem").and.callFake(function(key) {
        return "{}";
      });
      spyOn(Injections.ProjectFieldCenterService, "loadCenters").and.callThrough();
      spyOn(Injections.dashboardContextService, "getLoggedUser").and.callThrough();
      spyOn(Injections.ApplicationStateService, "activateParticipantsList").and.callThrough();
      controller.$onInit();
    });
  });

  it('should construct component successful', function(done) {
    expect(Injections.ProjectFieldCenterService.loadCenters).toHaveBeenCalledTimes(1);
    Injections.ProjectFieldCenterService.loadCenters().then(function() {
      expect(Injections.dashboardContextService.getLoggedUser).toHaveBeenCalledTimes(1);
      expect(controller.centers).not.toBeNull();
      Injections.dashboardContextService.getLoggedUser().then(function() {
        expect(controller.centerFilter).not.toBeNull();
        expect(controller.centerFilter).toEqual("RS");
        expect(controller.participant).not.toBeNull();
        expect(controller.participant instanceof Object).toBe(true);
        done();
      });
      done();
    });
  });

  it('should called method onFilter', function(done) {
    Injections.ProjectFieldCenterService.loadCenters().then(function() {
      Injections.dashboardContextService.getLoggedUser().then(function() {
        mockParticipant();
        controller.onFilter();
        expect(controller.participant.recruitmentNumber).not.toBeNull();
        expect(controller.participant.recruitmentNumber).toEqual(123);
        expect(controller.participant.birthdate).not.toBeNull();
        expect(controller.participant.birthdate.objectType).toEqual("ImmutableDate");
        expect(controller.participant.birthdate.value).toEqual('2018-07-20 00:00:00.000');
        expect(controller.participant.fieldCenter).not.toBeNull();
        expect(controller.participant.fieldCenter.acronym).not.toBeNull();
        expect(controller.participant.fieldCenter.acronym).toEqual("RS");
        expect(controller.participant.late).toEqual(false);
        done();
      });
    });
    done();
  });

  it("should called state of participants list", function() {
    controller.listParticipants();
    expect(Injections.ApplicationStateService.activateParticipantsList).toHaveBeenCalledTimes(1);
  });


  describe("try save participant", function() {
    var originalTimeout;
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      spyOn(controller, "onFilter").and.callThrough();
      spyOn(Injections.ParticipantMessagesService, "showSaveDialog").and.callThrough();
      spyOn(Injections.ParticipantMessagesService, "showNotSave").and.callThrough();
      spyOn(Injections.ParticipantMessagesService, "showToast").and.callThrough();
      spyOn(Injections.ParticipantMessagesService, "showRecruitmentNumberGenerated").and.callThrough();
      spyOn(Injections.ParticipantFactory, "create").and.callThrough();
      spyOn(Injections.ParticipantManagerService, "create").and.callThrough();
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it("should save a new participant", function(done) {
      Injections.ProjectFieldCenterService.loadCenters().then(function() {
        Injections.dashboardContextService.getLoggedUser().then(function() {
          mockParticipant();
          controller.onFilter();
          controller.saveParticipant();
          expect(Injections.ParticipantMessagesService.showSaveDialog).toHaveBeenCalledTimes(1);
          Injections.ParticipantMessagesService.showSaveDialog().then(function() {
            Injections.ParticipantManagerService.create().then(function() {
              expect(controller.birthdate).toBeDefined();
              expect(controller.recruitmentNumber).toBeDefined();
              expect(controller.centerFilter).toEqual("RS");
              done();
            });
          });
        });
      });
    });

    it("should save a new participant with auto generate recruitment number ", function(done) {
      Injections.ProjectFieldCenterService.loadCenters().then(function() {
        Injections.dashboardContextService.getLoggedUser().then(function() {
          mockParticipant();
          controller.onFilter();
          controller.participant.recruitmentNumber = undefined;
          controller.permissions.autoGenerateRecruitmentNumber = true;
          controller.saveParticipant();
          expect(Injections.ParticipantMessagesService.showSaveDialog).toHaveBeenCalledTimes(1);
          Injections.ParticipantMessagesService.showSaveDialog().then(function() {
            Injections.ParticipantManagerService.create().then(function() {
              Injections.ParticipantMessagesService.showRecruitmentNumberGenerated().then(function () {
                expect(controller.birthdate).toBeDefined();
                expect(controller.recruitmentNumber).toBeDefined();
                expect(controller.centerFilter).toEqual("RS");
                done();
              });
            }).catch(function(err) {
              done();
            });
          });
        });
      });
    });

    it("should not save a new participant because of recruitmentNumber", function(done) {
      Injections.ProjectFieldCenterService.loadCenters().then(function() {
        Injections.dashboardContextService.getLoggedUser().then(function() {
          mockParticipant();
          controller.onFilter();
          controller.participant.recruitmentNumber = 7654321;
          controller.saveParticipant();
          expect(Injections.ParticipantMessagesService.showSaveDialog).toHaveBeenCalledTimes(1);
          Injections.ParticipantMessagesService.showSaveDialog().then(function() {
            Injections.ParticipantManagerService.create().then(function() {
              done();
            }).catch(function(err) {
              expect(Injections.ParticipantMessagesService.showNotSave).toHaveBeenCalledTimes(1);
              done();
            });
          });
        });
      });
    });

    it("should not save a new participant with field empty", function(done) {
      Injections.ProjectFieldCenterService.loadCenters().then(function() {
        Injections.dashboardContextService.getLoggedUser().then(function() {
          mockParticipant();
          controller.participant.sex = null;
          controller.onFilter();
          controller.saveParticipant();
          expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledTimes(1);
          expect(Injections.ParticipantMessagesService.showToast).toHaveBeenCalledWith("Favor, preencha todos os campos!");

          done();
        });
      });

    });

  });

  function mockParticipant() {
    controller.recruitmentNumber = "7654321";
    controller.participant.name = "Fulano";
    controller.participant.sex = "M";
    controller.birthdate = new Date();
    controller.permissions = {};
    controller.permissions.participantRegistration = true;
  }


  function mockCenters() {
    return JSON.parse('[' +
      '{"name":"Minas Gerais","code":3,"acronym":"MG","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgba(255, 99, 132, 1)","goal":3025},' +
      '{"name":"Sao Paulo","code":6,"acronym":"SP","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(54, 162, 235, 0.2)","borderColor":"rgba(54, 162, 235, 1)","goal":4895},' +
      '{"name":"Rio Grande do Sul","code":5,"acronym":"RS","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(75, 192, 192, 0.2)","borderColor":"rgba(75, 192, 192, 1)","goal":1999},' +
      '{"name":"Rio de Janeiro","code":4,"acronym":"RJ","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(127, 190, 102, 0.2)","borderColor":"rgba(127, 190, 102, 1)","goal":1745},' +
      '{"name":"Espirito Santo","code":2,"acronym":"ES","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(153, 102, 255, 0.2)","borderColor":"rgba(153, 102, 255, 1)","goal":1024},' +
      '{"name":"Bahia","code":1,"acronym":"BA","country":null,"state":null,"address":null,"complement":null,"zip":null,"phone":null,"backgroundColor":"rgba(255, 163, 102, 0.2)","borderColor":"rgba(255, 163, 102, 1)","goal":1945}]');
  }



});
