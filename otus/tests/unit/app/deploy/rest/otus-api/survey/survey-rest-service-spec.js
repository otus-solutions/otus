describe('survey-rest-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  var originalTimeout;

  beforeEach(function() {
    mockInjections();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    angular.mock.module('otusjs.deploy.rest', function ($provide) {
      $provide.value("OtusRestResourceService", Mock.OtusRestResourceService);
    });

    inject(function(_$injector_) {
      Injections = {
        $q: _$injector_.get('$q')
      };
      service = _$injector_.get('otusjs.deploy.SurveyRestService', Injections);
      service.initialize();
    });

    spyOn(Mock.rest, "getSurveyGroupsByUser").and.callThrough();
    spyOn(Mock.OtusRestResourceService, "getSurveyGroupResource").and.returnValue(Mock.rest)
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should defined method', function() {
    expect(service.getSurveyGroupsByUser).toBeDefined();
  });

  it('should call getSurveyGroupsByUser method', function (done) {
    service.getSurveyGroupsByUser();
    expect(Mock.rest.getSurveyGroupsByUser).toHaveBeenCalledTimes(1);
    done()
  });

  function mockInjections() {
    Mock.rest = {
      getSurveyGroupsByUser: function () {
        return {$promise: Promise.resolve({data:[]})};
      }
    };
    Mock.OtusRestResourceService = {
      getSurveyGroupResource: function () {
        return Mock.rest;
      }
    };

    Mock.$q = {
      defer: () =>{
        return {promise:{},resolve:()=>{},reject:()=>{}}
      },
    }
  }

});
