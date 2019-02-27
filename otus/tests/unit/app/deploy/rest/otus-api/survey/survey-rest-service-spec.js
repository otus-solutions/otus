xdescribe('survey-rest-service Test', function() {
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
        $provide.value("$q", Mock.$q);
      });

      inject(function(_$injector_) {
        service = _$injector_.get('otusjs.deploy.SurveyRestService', Injections);
        service.initialize();
      });

      spyOn(Mock.rest, "listSurveysGroups").and.callThrough();
    });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

    it('should defined method', function() {
       expect(service.listSurveysGroups).toBeDefined();
    });

  it('should call listSurveysGroups method', function (done) {


    service.listSurveysGroups();
    done()
  });


  function mockInjections() {
    Mock.rest = {
      listSurveysGroups: function () {
        return {$promise: true};
      }
    };
    Mock.OtusRestResourceService = {
      getSurveyResource: function () {
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
