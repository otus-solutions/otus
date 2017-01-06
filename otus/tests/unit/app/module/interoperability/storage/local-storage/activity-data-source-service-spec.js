describe('otusjs.otus.interoperability.dataSource.ActivityDataSourceService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.dataSource.ActivityDataSourceService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockQ();
      mockActivityRepositoryService(_$injector_);
      mockSurveyRepositoryService(_$injector_);
      mockActivityStorageService(_$injector_);
      mockSurveyStorageService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('up method', function() {

    xit('should request a defer promise state', function() {
      service.up();

      expect(Mock.$q.defer).toHaveBeenCalledWith();
    });

    xit('should resolve loadingDefer', function() {
      service.up();

      expect(Mock.loadingDefer.resolve).toHaveBeenCalledWith();
    });

    it('should initialize ActivityRepositoryService', function() {
      spyOn(Mock.ActivityRepositoryService, 'initialize');

      service.up();

      expect(Mock.ActivityRepositoryService.initialize).toHaveBeenCalledWith();
    });

    it('should initialize SurveyRepositoryService', function() {
      spyOn(Mock.SurveyRepositoryService, 'initialize');

      service.up();

      expect(Mock.SurveyRepositoryService.initialize).toHaveBeenCalledWith();
    });

    it('should get the avaiable surveys', function() {
      var promise = {};
      promise.then = jasmine.createSpy();
      spyOn(Mock.SurveyRepositoryService, 'list').and.returnValue(promise);

      service.up();

      expect(Mock.SurveyRepositoryService.list).toHaveBeenCalledWith();
    });

    describe('when surveys are retrieved', function() {

      var response = {};

      beforeEach(function() {
        response.data = [{}, {}];
        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0](response);
        });
        spyOn(Mock.SurveyRepositoryService, 'list').and.returnValue(promise);
        service.up();
      });

      it('should clear survey storage', function() {
        expect(Mock.surveyCollection.clear).toHaveBeenCalledWith();
      });

      it('should insert retrieved data into survey storage', function() {
        expect(Mock.surveyCollection.insert).toHaveBeenCalledWith(response.data);
      });

      it('should save collection', function() {
        expect(Mock.SurveyStorageService.save).toHaveBeenCalledWith();
      });

    });

    describe('when surveys are not retrieved', function() {

      var response = {};

      beforeEach(function() {
        response.data = [];
        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0](response);
        });
        spyOn(Mock.SurveyRepositoryService, 'list').and.returnValue(promise);
      });

      it('should not clear survey storage', function() {
        service.up();

        expect(Mock.surveyCollection.clear).not.toHaveBeenCalledWith();
      });

      it('should not insert retrieved data into survey storage', function() {
        service.up();

        expect(Mock.surveyCollection.insert).not.toHaveBeenCalledWith(response.data);
      });

      it('should not save collection', function() {
        service.up();

        expect(Mock.SurveyStorageService.save).not.toHaveBeenCalledWith();
      });

    });

    it('should get the added activities', function() {
      var promise = {};
      promise.then = jasmine.createSpy();
      spyOn(Mock.ActivityRepositoryService, 'list').and.returnValue(promise);

      service.up();

      expect(Mock.ActivityRepositoryService.list).toHaveBeenCalledWith();
    });

    describe('when activities are retrieved', function() {

      var response = {};

      beforeEach(function() {
        response.data = [{}, {}];
        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0](response);
        });
        spyOn(Mock.ActivityRepositoryService, 'list').and.returnValue(promise);
      });

      it('should clear survey storage', function() {
        service.up();

        expect(Mock.activityCollection.clear).toHaveBeenCalledWith();
      });

      it('should insert retrieved data into survey storage', function() {
        service.up();

        expect(Mock.activityCollection.insert).toHaveBeenCalledWith(response.data);
      });

      it('should save collection', function() {
        service.up();

        expect(Mock.ActivityStorageService.save).toHaveBeenCalledWith();
      });

    });

    describe('when activities are not retrieved', function() {

      var response = {};

      beforeEach(function() {
        response.data = [];
        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0](response);
        });
        spyOn(Mock.ActivityRepositoryService, 'list').and.returnValue(promise);
      });

      it('should not clear survey storage', function() {
        service.up();

        expect(Mock.activityCollection.clear).not.toHaveBeenCalledWith();
      });

      it('should not insert retrieved data into survey storage', function() {
        service.up();

        expect(Mock.activityCollection.insert).not.toHaveBeenCalledWith(response.data);
      });

      it('should not save collection', function() {
        service.up();

        expect(Mock.ActivityStorageService.save).not.toHaveBeenCalledWith();
      });

    });

  });

  describe('getActivityDataSet method', function() {

    it('should return an object with getData method defined', function() {
      var returnedObject = service.getActivityDataSet();

      expect(returnedObject.getData).toBeDefined();
    });

    it('should return an object with save method defined', function() {
      var returnedObject = service.getActivityDataSet();

      expect(returnedObject.save).toBeDefined();
    });

  });

  describe('getSurveyDataSet method', function() {

    it('should return an object with getData method defined', function() {
      var returnedObject = service.getSurveyDataSet();

      expect(returnedObject.getData).toBeDefined();
    });

    it('should return an object with save method defined', function() {
      var returnedObject = service.getSurveyDataSet();

      expect(returnedObject.save).toBeDefined();
    });

  });

  function mockQ() {
    Mock.loadingDefer = {};
    Mock.loadingDefer.promise = {};
    Mock.loadingDefer.resolve = jasmine.createSpy();

    Mock.$q = {};
    Mock.$q.defer = jasmine.createSpy().and.returnValue(Mock.loadingDefer);

    Injections.$q = Mock.$q;
  }

  function mockActivityRepositoryService($injector) {
    Mock.ActivityRepositoryService = $injector.get('otusjs.otus.interoperability.rest.otusApi.ActivityRepositoryService');
    Injections.ActivityRepositoryService = Mock.ActivityRepositoryService;
  }

  function mockSurveyRepositoryService($injector) {
    Mock.SurveyRepositoryService = $injector.get('otusjs.otus.interoperability.rest.otusApi.SurveyRepositoryService');
    Injections.SurveyRepositoryService = Mock.SurveyRepositoryService;
  }

  function mockActivityStorageService($injector) {
    Mock.ActivityStorageService = $injector.get('otusjs.activity.storage.ActivityStorageService');

    Mock.activityCollection = {};
    Mock.activityCollection.find = jasmine.createSpy();
    Mock.activityCollection.clear = jasmine.createSpy();
    Mock.activityCollection.insert = jasmine.createSpy();
    spyOn(Mock.ActivityStorageService, 'getCollection').and.returnValue(Mock.activityCollection);
    spyOn(Mock.ActivityStorageService, 'save');

    Injections.ActivityStorageService = Mock.ActivityStorageService;
  }

  function mockSurveyStorageService($injector) {
    Mock.SurveyStorageService = $injector.get('otusjs.activity.storage.SurveyStorageService');

    Mock.surveyCollection = {};
    Mock.surveyCollection.find = jasmine.createSpy();
    Mock.surveyCollection.clear = jasmine.createSpy();
    Mock.surveyCollection.insert = jasmine.createSpy();
    spyOn(Mock.SurveyStorageService, 'getCollection').and.returnValue(Mock.surveyCollection);
    spyOn(Mock.SurveyStorageService, 'save');

    Injections.SurveyStorageService = Mock.SurveyStorageService;
  }

});
