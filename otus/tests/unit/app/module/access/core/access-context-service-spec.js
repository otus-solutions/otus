xdescribe('otusjs.user.access.core.ContextService', function() {

  var UNIT_NAME = 'otusjs.user.access.core.ContextService';
  var Mock = {};
  var Injections = {};
  var service= {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$rootScope_, _CONTEXT_DATA_, _$injector_) {
      /* Test data*/
      mockAuthenticationData();

      /* Injectable mocks */
      Injections.CONTEXT_DATA = _CONTEXT_DATA_;
      mockStorageService(_$injector_);
      mockApplicationContextService(_$injector_, _$rootScope_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('isValid method', function() {

    it('should call StorageService.session.getItem', function() {
      spyOn(Mock.ApplicationContextService, 'isSessionInitialized');

      service.isValid();

      expect(Mock.ApplicationContextService.isSessionInitialized).toHaveBeenCalledWith();
    });

    describe('when sessionContex exists', function() {

      it('should return false', function() {
        spyOn(Mock.ApplicationContextService, 'isSessionInitialized').and.returnValue(true);

        expect(service.isValid()).toBe(false);
      });

    });

    describe('when sessionContex not exists', function() {

      it('should return true', function() {
        spyOn(Mock.ApplicationContextService, 'isSessionInitialized').and.returnValue(false);

        expect(service.isValid()).toBe(true);
      });

    });

  });

  describe('beginSession method', function() {

    describe('when parentContext is setted', function() {

      it('should call _parentContextService.initializeSession', function() {
        spyOn(Mock.ApplicationContextService, 'initializeSession');

        service.setParent(Mock.ApplicationContextService);
        service.beginSession(Mock.authenticationData);

        expect(Mock.ApplicationContextService.initializeSession).toHaveBeenCalledWith(Mock.authenticationData);
      });

    });

    describe('when parentContext is not setted', function() {

      it('should not call _parentContext.begin', function() {
        spyOn(Mock.ApplicationContextService, 'initializeSession');

        service.setParent(null);
        service.beginSession(Mock.authenticationData);

        expect(Mock.ApplicationContextService.initializeSession).not.toHaveBeenCalledWith(Mock.authenticationData);
      });

    });

  });

  describe('endSession method', function() {

    describe('when parentContext is setted', function() {

      it('should call _parentContextService.terminateSession', function() {
        spyOn(Mock.ApplicationContextService, 'terminateSession');

        service.setParent(Mock.ApplicationContextService);
        service.endSession();

        expect(Mock.ApplicationContextService.terminateSession).toHaveBeenCalledWith();
      });

    });

    describe('when parentContext is not setted', function() {

      it('should not call _parentContext.begin', function() {
        spyOn(Mock.ApplicationContextService, 'terminateSession');

        service.setParent(null);
        service.endSession();

        expect(Mock.ApplicationContextService.terminateSession).not.toHaveBeenCalledWith();
      });

    });

  });

  function mockAuthenticationData() {
    Mock.authenticationData = {};
  }

  function mockApplicationContextService($injector, $rootScope) {
    Mock.$rootScope = $rootScope;
    Mock.$scope = $rootScope.$new();
    Mock.ApplicationContextService = $injector.get('otusjs.otus.application.ApplicationContextService');
    Mock.ApplicationContextService.configureStorage(Mock.StorageService.session);
    Mock.ApplicationContextService.begin();
  }

  function mockStorageService($injector) {
    Mock.StorageService = $injector.get('otusjs.otus.interoperability.storage.StorageService');
  }

});
