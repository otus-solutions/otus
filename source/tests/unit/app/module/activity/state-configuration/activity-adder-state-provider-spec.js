describe('ActivityAdderStateProvider_UnitTest_Suite', () => {
  let provider;
  let Injections = [];
  let Mock = {};
  let URL = '/activity-adder';
  let TEMPLATE = '<otus-activity-adder checkers="$resolve.listCheckers" layout="column" flex></otus-activity-adder>';

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector) => {
      //mockActivityContextService($injector);

      //Mock.ParticipantContextService = $injector.get('otusjs.participant.core.ContextService');
      Mock.ParticipantContextService = {
        restore: function () {
          console.log("fdr");
          return "fdr";
        }
      }
      Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
      Mock.Application = $injector.get('otusjs.application.core.ModuleService');
      Mock.SessionContextService = $injector.get('otusjs.application.session.core.ContextService');

      Injections.STATE = $injector.get('STATE');
      provider = $injector.get('otusjs.deploy.ActivityAdderState', Injections);

    });
  });

  it('providerExistence_check', () => {
    expect(provider).toBeDefined();
  });

  it('parent should be equal to "dashboard"', function () {
    expect(provider.state.parent).toEqual(Injections.STATE.PARTICIPANT_DASHBOARD);
  });

  it('name should be equal to "activity-adder"', function () {
    expect(provider.state.name).toEqual(Injections.STATE.ACTIVITY_ADDER);
  });

  it('url should be equal to "/activity-adder"', function () {
    expect(provider.state.url).toEqual(URL);
  });

  it('template should be defined', function () {
    expect(provider.state.template).toEqual(TEMPLATE);
  });

  it('onEnter should be defined', function () {
    expect(provider.state.onEnter).toBeDefined();
  });


  //TODO: otus-619 mock imprime no console, mas o matcher de chamanda não contabiliza
  xit('should verify if activity context is valid', function () {

    spyOn(Mock.ParticipantContextService, 'restore').and.callThrough();
    spyOn(Mock.Application, 'isDeployed').and.returnValue(Promise.resolve());

    provider.state.onEnter(
      Mock.ParticipantContextService,
      Mock.ActivityContextService,
      Mock.Application,
      Mock.SessionContextService);



    //spyOn(Mock.SessionContextService, 'restore');
    //spyOn(Mock.ParticipantContextService,'restore');
    // spyOn(Mock.ActivityContextService, 'restore');

    //expect(Mock.SessionContextService.restore).toHaveBeenCalledTimes(1);
    expect(Mock.ParticipantContextService.restore).toHaveBeenCalledTimes(1);


    //expect(Mock.ActivityContextService.restore).toHaveBeenCalledTimes(1);


  });

  //   describe('when context is valid', function() {
  //
  //     beforeEach(function() {
  //       spyOn(Mock.ActivityContextService, 'isValid').and.returnValue(true);
  //     })
  //
  //     it('should try restore activity context', function() {
  //       provider.state.onEnter(Mock.ActivityContextService);
  //
  //       expect(Mock.ActivityContextService.restore).toHaveBeenCalledWith();
  //     });
  //
  //     it('should not try begin activity context', function() {
  //       provider.state.onEnter(Mock.ActivityContextService);
  //
  //       expect(Mock.ActivityContextService.begin).not.toHaveBeenCalledWith();
  //     });
  //
  //   });
  //
  //   describe('when context is invalid', function() {
  //
  //     beforeEach(function() {
  //       spyOn(Mock.ActivityContextService, 'isValid').and.returnValue(false);
  //     })
  //
  //     it('should not try restore activity context', function() {
  //       provider.state.onEnter(Mock.ActivityContextService);
  //
  //       expect(Mock.ActivityContextService.restore).not.toHaveBeenCalledWith();
  //     });
  //
  //     it('should try begin activity context', function() {
  //       provider.state.onEnter(Mock.ActivityContextService);
  //
  //       expect(Mock.ActivityContextService.begin).toHaveBeenCalledWith();
  //     });
  //   });
  //


  function mockActivityContextService($injector) {

    //spyOn(Mock.ActivityContextService, 'restore');
    //spyOn(Mock.ParticipantContextService,'restore').and.callThrough();
    //spyOn(Mock.SessionContextService,'restore');
    // spyOn(Mock.ActivityContextService, 'begin');
  }


});


// describe('otusjs.otus.application.state.ActivityAdderStateProvider', function() {
//
//   var UNIT_NAME = 'otusjs.otus.application.state.ActivityAdderState';

//   var provider = {};
//   var Injections = {};
//   var Mock = {};
//
//   beforeEach(function() {
//     module('otusjs.otus');
//
//     inject(function(_$injector_, _STATE_) {
//       mockActivityContextService(_$injector_);
//
//       /* Injectable mocks */
//       Injections.STATE = _STATE_;
//
//       provider = _$injector_.get(UNIT_NAME, Injections);
//     });
//   });
//
//   describe('state definition', function() {
//
//     it('parent should be equal to "dashboard"', function() {
//       expect(provider.state.parent).toEqual(Injections.STATE.PARTICIPANT_DASHBOARD);
//     });
//
//     it('name should be equal to "activity-adder"', function() {
//       expect(provider.state.name).toEqual(Injections.STATE.ACTIVITY_ADDER);
//     });
//
//     it('url should be equal to "/activity-adder"', function() {
//       expect(provider.state.url).toEqual(URL);
//     });
//
//     it('template should be defined', function() {
//       expect(provider.state.template).toEqual(TEMPLATE);
//     });
//
//     it('onEnter should be defined', function() {
//       expect(provider.state.onEnter).toBeDefined();
//     });
//
//   });
//
//   describe('onEnter callback', function() {
//
//     it('should verify if activity context is valid', function() {
//       spyOn(Mock.ActivityContextService, 'isValid');
//
//       provider.state.onEnter(Mock.ActivityContextService);
//
//       expect(Mock.ActivityContextService.isValid).toHaveBeenCalledWith();
//     });
//
//     describe('when context is valid', function() {
//
//       beforeEach(function() {
//         spyOn(Mock.ActivityContextService, 'isValid').and.returnValue(true);
//       })
//
//       it('should try restore activity context', function() {
//         provider.state.onEnter(Mock.ActivityContextService);
//
//         expect(Mock.ActivityContextService.restore).toHaveBeenCalledWith();
//       });
//
//       it('should not try begin activity context', function() {
//         provider.state.onEnter(Mock.ActivityContextService);
//
//         expect(Mock.ActivityContextService.begin).not.toHaveBeenCalledWith();
//       });
//
//     });
//
//     describe('when context is invalid', function() {
//
//       beforeEach(function() {
//         spyOn(Mock.ActivityContextService, 'isValid').and.returnValue(false);
//       })
//
//       it('should not try restore activity context', function() {
//         provider.state.onEnter(Mock.ActivityContextService);
//
//         expect(Mock.ActivityContextService.restore).not.toHaveBeenCalledWith();
//       });
//
//       it('should try begin activity context', function() {
//         provider.state.onEnter(Mock.ActivityContextService);
//
//         expect(Mock.ActivityContextService.begin).toHaveBeenCalledWith();
//       });
//
//     });
//
//   });
//
//   function mockActivityContextService($injector) {
//     Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
//     spyOn(Mock.ActivityContextService, 'begin');
//     spyOn(Mock.ActivityContextService, 'restore');
//   }
//
// });
