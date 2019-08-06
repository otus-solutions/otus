describe('StaticVariableDataSourceRequestService', function () {
  var Mock = {};
  var Injections = {};
  var service;
  var UNIT_NAME = 'otusjs.deploy.staticVariable.StaticVariableDataSourceService';

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    inject(function ($injector) {
      mock();
      Injections.$q = $injector.get('$q');
      Injections.StaticVariableRestService = $injector.get('otusjs.deploy.StaticVariableRestService');
      Injections.StaticVariableDataSourceRequestFactory = $injector.get('otusjs.deploy.staticVariable.StaticVariableDataSourceRequestFactory');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');

      service = $injector.get(UNIT_NAME, Injections);
    });
    spyOn(Injections.StaticVariableRestService, 'initialize').and.callThrough();
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.up).toBeDefined();
    expect(service.setup).toBeDefined();
  });

  it('upMethod should initialize the rest service', function () {
    expect(service.up()).toBePromise();
    expect(Injections.StaticVariableRestService.initialize).toHaveBeenCalled();
  });

  it('setupMethod should execute activityFacadeService', function () {
    spyOn(Mock.SurveyForm, 'getStaticVariableList').and.returnValue(Mock.variables);
    spyOn(Injections.ParticipantManagerService, 'getSelectedParticipante').and.returnValue(Mock.selectedParticipant);
    expect(service.setup(Mock.ActivityFacadeService)).toBePromise();
    expect(Mock.SurveyForm.getStaticVariableList).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.getSelectedParticipante).toHaveBeenCalledTimes(1);
  });

  it('setupMethod should return variable null', function () {
    spyOn(Mock.SurveyForm, 'getStaticVariableList').and.returnValue([]);
    expect(service.setup(Mock.ActivityFacadeService)).toBePromise();
  });

  function mock() {
    Mock.selectedParticipant = {
      recruitmentNumber: 32056510,
    };

    Mock.SurveyForm = {
      getStaticVariableList: function () {
      }
    };

    Mock.Activity = {
      getSurvey: function () {
        return Mock.SurveyForm;
      }
    };

    Mock.ActivityFacadeService = {
      getCurrentSurvey: function () {
        return Mock.Activity
      }
    };

    Mock.variables =[
      {
        name: "var1",
        sending: "onda 1",
        value: 0
      },
      {
        name: "var2",
        sending: "onda 2",
        value: "30Kg"
      }
    ];
  }
});
