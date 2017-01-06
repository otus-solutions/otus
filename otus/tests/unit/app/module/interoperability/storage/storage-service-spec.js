describe('otusjs.otus.interoperability.storage.StorageService', function() {

  var UNIT_NAME = 'otusjs.otus.interoperability.storage.StorageService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      /* Injectable mocks */
      mockQ();
      mockLocalStorageService(_$injector_);
      mockSessionStorageService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('initialize method', function() {

    it('should call LocalStorageService.initialize', function() {
      service.initialize();

      expect(Mock.LocalStorageService.initialize).toHaveBeenCalledWith();
    });

    it('should call SessionStorageService.initialize', function() {
      service.initialize();

      expect(Mock.SessionStorageService.initialize).toHaveBeenCalledWith();
    });

    describe('when local storage initialize with success', function() {

      it('should test if local storage is ready', function() {
        spyOn(Mock.LocalStorageService, 'isReady');

        service.initialize();

        expect(Mock.LocalStorageService.isReady).toHaveBeenCalledWith();
      });

      describe('when local storage is ready', function() {

        it('should test if session storage is ready', function() {
          spyOn(Mock.LocalStorageService, 'isReady').and.returnValue(true);
          spyOn(Mock.SessionStorageService, 'isReady');

          service.initialize();

          expect(Mock.SessionStorageService.isReady).toHaveBeenCalledWith();
        });

      });

      describe('when local storage is not ready', function() {

        it('should not test if session storage is ready', function() {
          spyOn(Mock.LocalStorageService, 'isReady').and.returnValue(false);
          spyOn(Mock.SessionStorageService, 'isReady');

          service.initialize();

          expect(Mock.SessionStorageService.isReady).not.toHaveBeenCalledWith();
        });

      });

    });

    describe('when session storage initialize with success', function() {

      it('should test if session storage is ready', function() {
        spyOn(Mock.LocalStorageService, 'isReady').and.returnValue(true);
        spyOn(Mock.SessionStorageService, 'isReady');

        service.initialize();

        expect(Mock.SessionStorageService.isReady).toHaveBeenCalledWith();
      });

      describe('when session storage is ready', function() {

        it('should test if local storage is ready', function() {
          spyOn(Mock.SessionStorageService, 'isReady').and.returnValue(true);
          spyOn(Mock.LocalStorageService, 'isReady');

          service.initialize();

          expect(Mock.LocalStorageService.isReady).toHaveBeenCalledWith();
        });

      });

    });

  });

  describe('isReady method', function() {

    describe('when local and session storage are ready', function() {

      beforeEach(function() {
        spyOn(Mock.LocalStorageService, 'isReady').and.returnValue(true);
        spyOn(Mock.SessionStorageService, 'isReady').and.returnValue(true);
        service.initialize();
      });

      it('should return true', function() {
        expect(service.isReady()).toBe(true);
      });

    });

    describe('when local or session storage are not ready', function() {

      it('should return false (when local storage is not ready)', function() {
        spyOn(Mock.LocalStorageService, 'isReady').and.returnValue(false);
        spyOn(Mock.SessionStorageService, 'isReady').and.returnValue(true);
        service.initialize();

        expect(service.isReady()).toBe(false);
      });

      it('should return false (when session storage is not ready)', function() {
        spyOn(Mock.LocalStorageService, 'isReady').and.returnValue(true);
        spyOn(Mock.SessionStorageService, 'isReady').and.returnValue(false);
        service.initialize();

        expect(service.isReady()).toBe(false);
      });

    });

  });

  describe('when storage service is ready', function() {

    xit('should resolve de loadingDefer', function() {
      spyOn(Mock.LocalStorageService, 'isReady').and.returnValue(true);
      spyOn(Mock.SessionStorageService, 'isReady').and.returnValue(true);
      service.initialize();

      expect(Mock.loadingDefer.resolve).toHaveBeenCalledWith();
    });

  });

  function mockQ() {
    Mock.loadingDefer = {};
    Mock.loadingDefer.resolve = jasmine.createSpy();
    Mock.$q = {};
    Mock.$q.defer = jasmine.createSpy().and.returnValue(Mock.loadingDefer);
    Injections.$q = Mock.$q;
  }

  function mockLocalStorageService($injector) {
    var promise = {};
    promise.then = jasmine.createSpy().and.callFake(function() {
      arguments[0]();
    });

    Mock.LocalStorageService = $injector.get('otusjs.otus.interoperability.storage.LocalStorageService');

    spyOn(Mock.LocalStorageService, 'initialize').and.returnValue(promise);

    Injections.LocalStorageService = Mock.LocalStorageService;
  }

  function mockSessionStorageService($injector) {
    var promise = {};
    promise.then = jasmine.createSpy().and.callFake(function() {
      arguments[0]();
    });

    Mock.SessionStorageService = $injector.get('otusjs.otus.interoperability.storage.SessionStorageService');

    spyOn(Mock.SessionStorageService, 'initialize').and.returnValue(promise);

    Injections.SessionStorageService = Mock.SessionStorageService;
  }

});
