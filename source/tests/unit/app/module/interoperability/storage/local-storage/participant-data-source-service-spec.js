xdescribe('otusjs.otus.interoperability.dataSource.ParticipantDataSourceService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.dataSource.ParticipantDataSourceService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockQ();
      mockParticipantRepositoryService(_$injector_);
      mockParticipantStorageService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('up method', function() {

    xit('should request a defer promise state', function() {
      service.up();

      expect(Mock.$q.defer).toHaveBeenCalledWith();
    });

    it('should initialize ParticipantRepositoryService', function() {
      spyOn(Mock.ParticipantRepositoryService, 'initialize').and.callThrough();

      service.up();

      expect(Mock.ParticipantRepositoryService.initialize).toHaveBeenCalledWith();
    });

    xit('should resolve loadingDefer', function() {
      service.up();

      expect(Mock.loadingDefer.resolve).toHaveBeenCalledWith();
    });

    it('should get the participant indexers', function() {
      var promise = {};
      promise.then = jasmine.createSpy();
      spyOn(Mock.ParticipantRepositoryService, 'listIdexers').and.returnValue(promise);

      service.up();

      expect(Mock.ParticipantRepositoryService.listIdexers).toHaveBeenCalledWith();
    });

    describe('when participant indexers are loaded', function() {

      var indexers = [];

      beforeEach(function() {
        var promise = {};
        promise.then = jasmine.createSpy().and.callFake(function() {
          arguments[0](indexers);
        });
        spyOn(Mock.ParticipantRepositoryService, 'listIdexers').and.returnValue(promise);
      })

      it('should clear current participant store', function() {
        service.up();

        expect(Mock.collection.clear).toHaveBeenCalledWith();
      });

      it('should insert the requested indexers into collection', function() {
        service.up();

        expect(Mock.collection.insert).toHaveBeenCalledWith(indexers.data);
      });

      it('should save collection', function() {
        service.up();

        expect(Mock.ParticipantStorageService.save).toHaveBeenCalledWith();
      });

      xit('should resolve loadingDefer', function() {
        service.up();

        expect(Mock.loadingDefer.resolve).toHaveBeenCalledWith();
      });

    });

  });

  describe('listIndexers method', function() {

    it('should find all participants from participant storage', function() {
      service.listIndexers();

      expect(Mock.ParticipantStorageService.getCollection).toHaveBeenCalledWith();
      expect(Mock.collection.find).toHaveBeenCalledWith();
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

  function mockParticipantRepositoryService($injector) {
    Mock.ParticipantRepositoryService = $injector.get('otusjs.otus.interoperability.rest.otusApi.ParticipantRepositoryService');
    Injections.ParticipantRepositoryService = Mock.ParticipantRepositoryService;
  }

  function mockParticipantStorageService($injector) {
    Mock.ParticipantStorageService = $injector.get('otusjs.otus.interoperability.storage.ParticipantStorageService');

    Mock.collection = {};
    Mock.collection.find = jasmine.createSpy();
    Mock.collection.clear = jasmine.createSpy();
    Mock.collection.insert = jasmine.createSpy();
    spyOn(Mock.ParticipantStorageService, 'getCollection').and.returnValue(Mock.collection);
    spyOn(Mock.ParticipantStorageService, 'save');

    Injections.ParticipantStorageService = Mock.ParticipantStorageService;
  }

});
