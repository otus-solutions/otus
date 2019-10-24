describe('PrePlayerStepServiceService', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.PrePlayerStepService';

  beforeEach(function () {
    mock();
    angular.mock.module('otusjs.otus');

    inject(function ($injector) {
      Injections.$q = $injector.get('$q');
      Injections.PlayerService = $injector.get('otusjs.player.core.player.PlayerService');
      Injections.SurveyItemDatasourceService = $injector.get('otusjs.deploy.SurveyItemDatasourceService');
      Injections.ActivityFacadeService = $injector.get('otusjs.player.data.activity.ActivityFacadeService');
      Injections.FileUploadDatasourceService = $injector.get('otusjs.deploy.FileUploadDatasourceService');
      Injections.StaticVariableDataSourceService = $injector.get('otusjs.deploy.staticVariable.StaticVariableDataSourceService');
      service = $injector.get(UNIT_NAME, Injections);
    });
    spyOn(Injections.SurveyItemDatasourceService, 'setupDatasources').and.callThrough();
    spyOn(Injections.FileUploadDatasourceService, 'setupUploader').and.callThrough();
    spyOn(Injections.StaticVariableDataSourceService, 'setup').and.callThrough();
    spyOn(Injections.ActivityFacadeService, 'getCurrentSurvey').and.returnValue(Mock.Activity);
    spyOn(Injections.PlayerService, 'registerHardBlocker');
    spyOn(Injections.PlayerService, 'registerSoftBlocker');
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.beforeEffect).toBeDefined();
    expect(service.effect).toBeDefined();
    expect(service.afterEffect).toBeDefined();
    expect(service.getEffectResult).toBeDefined();
  });

  it('effectMethod should use the methods stated in the injection', function () {
    service.effect();
    expect(Injections.SurveyItemDatasourceService.setupDatasources).toHaveBeenCalledTimes(1);
    expect(Injections.FileUploadDatasourceService.setupUploader).toHaveBeenCalledTimes(1);
    expect(Injections.StaticVariableDataSourceService.setup).toHaveBeenCalledTimes(1);
    expect(Injections.PlayerService.registerHardBlocker).toHaveBeenCalled();
    expect(Injections.PlayerService.registerSoftBlocker).toHaveBeenCalled();
  });

  function mock(){
    Mock.Activity = {
      getSurveyDatasources: function () {
        return Promise.resolve("Passou");
      }
    };

    Mock.ActivityFacadeService = {
      getCurrentSurvey: function () {
        return Mock.Activity
      }
    };
  }
});