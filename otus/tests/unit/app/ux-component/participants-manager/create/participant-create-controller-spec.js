fdescribe('participant-create-controller Test', function() {
  var Mock = {};
  var controller;
  var Injections = {};

  beforeEach(function() {
    angular.module('otusjs.otus.uxComponent');
  });

  beforeEach(function() {
    window.ImmutableDate = function(date) {
        var self = this;
        self.objectType = 'ImmutableDate';
        self.date = date ? date : undefined;
        self.toJSON = toJSON;
        self.resetTime = resetTime;
        function resetTime() {
        if (!self.date) {
          return;
        }
        self.date.setHours(0);
        self.date.setMinutes(0);
        self.date.setSeconds(0);
        self.date.setMilliseconds(0);
      }
        function toJSON() {
          return {
            objectType: 'ImmutableDate',
            value: "2018-07-20 00:00:00.000"
          };
        }
        return self;
      };



    angular.mock.module(function($provide) {
      $provide.value("$element", {});
      $provide.value("otusjs.application.state.ApplicationStateService", {});
      $provide.value("otusjs.model.participant.ParticipantFactory", {});
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
      $provide.value("otusjs.participant.business.ParticipantManagerService", {});
      $provide.value("otusjs.participant.business.ParticipantMessagesService", {});
    });
  });

  beforeEach(function() {
    inject(function(_$injector_, _$controller_) {
      Injections = {
        "$element": _$injector_.get('$element'),
        "mdcDateTimeDialog": _$injector_.get('mdcDateTimeDialog'),
        "ApplicationStateService": _$injector_.get('otusjs.application.state.ApplicationStateService'),
        "mdcDefaultParams": _$injector_.get('mdcDefaultParams'),
        "ParticipantFactory": _$injector_.get('otusjs.model.participant.ParticipantFactory'),
        "ProjectFieldCenterService": _$injector_.get('otusjs.deploy.FieldCenterRestService'),
        "dashboardContextService": _$injector_.get('otusjs.otus.dashboard.core.ContextService'),
        "ParticipantManagerService": _$injector_.get('otusjs.participant.business.ParticipantManagerService'),
        "ParticipantMessagesService": _$injector_.get('otusjs.participant.business.ParticipantMessagesService')
      };


      controller = _$controller_('otusParticipantCreateCtrl', Injections);
      var oldDate = new Date();
      spyOn(window, "Date").and.callFake(function() {
        return oldDate;
      });
       // = ImmutableDate();
      // var _data = new ImmutableDate();
      // spyOn(window, "ImmutableDate").and.callFake(function(date) {
      //   return _data;
      //
      // });
      spyOn(window, "parseInt").and.callFake(function(num) {
        return parseInt(num);
      });
      spyOn(window.localStorage, "getItem").and.callFake(function(key) {
        return "{}";
      });
      spyOn(Injections.ProjectFieldCenterService, "loadCenters").and.callThrough();
      spyOn(Injections.dashboardContextService, "getLoggedUser").and.callThrough();
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
    mockParticipant();
    Injections.ProjectFieldCenterService.loadCenters().then(function() {
      done();

      Injections.dashboardContextService.getLoggedUser().then(function() {
        // controller.onFilter();
        // console.log(controller.participant);
        done();
      });
    });
    done();
    controller.onFilter();
    // console.log(controller.participant);
  });

  function mockParticipant() {
    // controller.ImmutableDate = Mock.ImmutableDate;
    controller.recruitmentNumber = "1234567";
    controller.name = "Fulano";
    controller.sex = "M";
    controller.birthdate = new Date();
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
