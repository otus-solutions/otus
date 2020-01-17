describe('SurveyItemDatasourceService', function () {
  var Mock = {};
  var Injections = {};
  var service;
  var UNIT_NAME = 'otusjs.deploy.SurveyItemDatasourceService';

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    inject(function ($injector, $rootScope) {
      mock();
      Injections.$q = $injector.get('$q');
      Injections.DatasourceService = $injector.get('otusjs.utils.DatasourceService');
      Injections.SurveyItemRestService = $injector.get('otusjs.deploy.SurveyItemRestService');
      Injections.ActivityLocalStorageService = $injector.get('otusjs.activity.storage.ActivityLocalStorageService');

      service = $injector.get(UNIT_NAME, Injections);
      Mock.scope = $rootScope.$new();
    });
    spyOn(Injections.SurveyItemRestService, 'initialize').and.callThrough();
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.up).toBeDefined();
  });

  it('upMethod should initialize the rest service', function () {
    expect(service.up()).toBePromise();
    expect(Injections.SurveyItemRestService.initialize).toHaveBeenCalledTimes(1);
  });

  function mock() {
    Mock.dsDefsArray =[
      {
        _id : 12456461,
        _name: "Text",
        _bindTo : []
      },
      {
        _id : 98784652,
        _name: "Text",
        _bindTo : []
      }
    ];
  }
});
