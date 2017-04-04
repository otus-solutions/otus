xdescribe('otusjs.application.ApplicationContextService', function() {

  var UNIT_NAME = 'otusjs.application.ApplicationContextService';
  var Mock = {};
  var Injections = {};
  var service = {};
  var injector = {}

  beforeEach(function() {
    module('otusjs..otus');

    inject(function(_$injector_, _CONTEXT_DATA_, _$rootScope_) {
      injector = _$injector_;
      mockStorageService(_$injector_);

      /* Injectable mocks */
      mockRootScope(_$rootScope_);
      Injections.CONTEXT_DATA = _CONTEXT_DATA_;

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('begin method', function() {

    describe('every time', function() {

      beforeEach(function() {
        service.configureStorage(Mock.StorageService.session);
      });

      it('should request new scope from $rootScope', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);

        service.begin();

        expect(Mock.$rootScope.$new).toHaveBeenCalledWith();
      });

    });

    describe('when internal $scope is not initialized', function() {

      it('should store a null value in internal $scope', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(undefined);

        try {
          service.begin()
        } catch (e) {
          expect(service.getScope()).toBe(null);
        };
      });

      it('should throw an exception', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(undefined);

        expect(function() {
          service.begin()
        }).toThrowError('Internal application $scope was not correctly initialized.');
      });

      it('should not try to save the context data', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(undefined);
        spyOn(Mock.StorageService.session, 'setItem');

        try {
          service.begin()
        } catch(e) {
          expect(Mock.StorageService.session.setItem).not.toHaveBeenCalled();
        }
      });

    });

    describe('when internal $scope is initialized', function() {

      describe('and StorageService is initialized', function() {

        it('should store the $scope reference', function() {
          spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);

          service.begin();

          expect(service.getScope()).toEqual(Mock.$scope);
        });

        it('should configure the scope name as "applicationContext"', function() {
          expect(service.getScope().name).toEqual('applicationContext');
        });

        it('should configure the context attribute of scope with a literal object', function() {
          expect(service.getScope().context).toEqual({});
        });

        it('should save the application context object in session storage', function() {
          spyOn(Mock.StorageService.session, 'setItem');

          service.begin();

          expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.APPLICATION_CONTEXT, '{}');
        });

      });

      describe('when StorageService is not initialized', function() {

        beforeEach(function() {
          service.configureStorage(undefined);
        });

        it('should throw an exception', function() {
          expect(function() {
            service.begin()
          }).toThrowError('StorageService (session) is not initialized.');
        });

      });

    });

  });

  describe('restore method', function() {

    describe('every time', function() {

      beforeEach(function() {
        service.configureStorage(Mock.StorageService.session);
      });

      it('should request new scope from $rootScope', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);

        service.restore();

        expect(Mock.$rootScope.$new).toHaveBeenCalledWith();
      });

    });

    describe('when internal $scope is not initialized', function() {

      it('should store a null value in internal $scope', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(undefined);

        try {
          service.restore()
        } catch (e) {
          expect(service.getScope()).toBe(null);
        };
      });

      it('should throw an exception', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(undefined);

        expect(function() {
          service.restore()
        }).toThrowError('Internal application $scope was not correctly initialized.');
      });

      it('should not try to save the context data', function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(undefined);
        spyOn(Mock.StorageService.session, 'setItem');

        try {
          service.restore()
        } catch(e) {
          expect(Mock.StorageService.session.setItem).not.toHaveBeenCalled();
        }
      });

    });

    describe('when internal $scope is initialized', function() {

      describe('and StorageService is initialized', function() {

        beforeEach(function() {
          service.configureStorage(Mock.StorageService.session);
        });

        it('should store the $scope reference', function() {
          spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);

          service.restore();

          expect(service.getScope()).toEqual(Mock.$scope);
        });

        it('should configure the scope name as "applicationContext"', function() {
          expect(service.getScope().name).toEqual('applicationContext');
        });

        it('should configure the context attribute of scope with a literal object', function() {
          expect(service.getScope().context).toEqual({});
        });

        it('should restore the application context object from session storage', function() {
          var serializedContext = Mock.StorageService.session.getItem(Injections.CONTEXT_DATA.APPLICATION_CONTEXT);
          spyOn(JSON, 'parse');

          service.restore();

          expect(JSON.parse).toHaveBeenCalledWith(serializedContext);
        });

      });

      describe('and StorageService is not initialized', function() {

        beforeEach(function() {
          service.configureStorage(undefined);
        });

        it('should throw an exception', function() {
          expect(function() {
            service.restore()
          }).toThrowError('StorageService (session) is not initialized.');
        });

        it('should intialize the internal scope as a new scope', function() {
          spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);

          try {
            service.restore();
          } catch (e) {}

          expect(service.getScope()).toEqual(Mock.$scope);
        });

        it('should configure the scope name as "applicationContext"', function() {
          try {
            service.restore();
          } catch (e) {}

          expect(service.getScope().name).toEqual('applicationContext');
        });

        it('should configure the context attribute of scope with a literal object as a new context', function() {
          try {
            service.restore();
          } catch (e) {}

          expect(service.getScope().context).toEqual({});
        });

      });

    });

  });

  describe('end method', function() {

    describe('when StorageService is initialized', function() {

      beforeEach(function() {
        service.configureStorage(Mock.StorageService.session);
      });

      it('should remove the application context object from session storage', function() {
        spyOn(Mock.StorageService.session, 'removeItem');

        service.end();

        expect(Mock.StorageService.session.removeItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.APPLICATION_CONTEXT);
      });

      it('should set null to the internal scope', function() {
        service.end();

        expect(service.getScope()).toEqual(null);
      });

    });

    describe('when StorageService is not initialized', function() {

      beforeEach(function() {
        service.configureStorage(undefined);
      });

      it('should not try to remove the application context object from session storage', function() {
        spyOn(Mock.StorageService.session, 'removeItem');

        service.end();

        expect(Mock.StorageService.session.removeItem).not.toHaveBeenCalled();
      });

    });

  });

  describe('isValid method', function() {

    describe('when StorageService is initialized', function() {

      beforeEach(function() {
        service.configureStorage(Mock.StorageService.session);
      });

      it('should try to retrieve the application context object from session storage', function() {
        spyOn(Mock.StorageService.session, 'getItem').and.returnValue('{}');

        service.isValid();

        expect(Mock.StorageService.session.getItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.APPLICATION_CONTEXT);
      });

      describe('and application context is resolved', function() {

        it('should return true', function() {
          spyOn(Mock.StorageService.session, 'getItem').and.returnValue('{}');
          spyOn(JSON, 'parse').and.returnValue({});

          expect(service.isValid()).toBe(true);
        });

      });

      describe('and application context is not resolved', function() {

        it('should return false', function() {
          spyOn(Mock.StorageService.session, 'getItem').and.returnValue('');

          expect(service.isValid()).toBe(false);
        });

      });

    });

    describe('when StorageService is not initialized', function() {

      beforeEach(function() {
        service.configureStorage(undefined);
      });

      it('should not to try retrieve the application context object from session storage', function() {
        spyOn(Mock.StorageService.session, 'getItem').and.returnValue('{}');

        service.isValid();

        expect(Mock.StorageService.session.getItem).not.toHaveBeenCalledWith(Injections.CONTEXT_DATA.APPLICATION_CONTEXT);
      });

      it('should not parse the serialized application context object from session storage', function() {
        spyOn(Mock.StorageService.session, 'getItem').and.returnValue('{}');
        spyOn(JSON, 'parse');

        service.isValid();

        expect(JSON.parse).not.toHaveBeenCalledWith('{}');
      });

      it('should return false', function() {
        expect(service.isValid()).toBe(false);
      });

    });

  });

  describe('configureStorage method', function() {

    it('should store a reference to ServiceStorage.session', function() {
      spyOn(Mock.StorageService.session, 'setItem');

      service.configureStorage(Mock.StorageService.session);
      service.save();

      expect(Mock.StorageService.session.setItem).toHaveBeenCalled();
    });

  });

  describe('broadcast method', function() {

    describe('when internal scope is initialized', function() {

      beforeEach(function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should call $scope.$broadcast with eventname and data', function() {
        spyOn(Mock.$scope, '$broadcast');

        service.broadcast('EVENT_NAME', {});

        expect(Mock.$scope.$broadcast).toHaveBeenCalledWith('EVENT_NAME', {});
      });

    });

    describe('when internal scope is not initialized', function() {

      // TODO: We need to find a way to test this case. The internal scope always
      //       is initialized when this test case run. So the exception never is
      //       thrown and the test fail.
      xit('should throw an exception', function() {
        expect(function() {
          service.broadcast('EVENT_NAME', {});
        }).toThrowError('Internal $scope is not initialized.');
      });

      it('should not call $scope.$broadcast with eventname and data', function() {
        spyOn(Mock.$scope, '$broadcast');

        service.broadcast('EVENT_NAME', {});

        expect(Mock.$scope.$broadcast).not.toHaveBeenCalled();
      });

    });

  });

  describe('getData method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should get a value from context key', function() {
        service.setData('KEY', 'VALUE');

        expect(service.getData('KEY')).toEqual('VALUE');
      });

    });

  });

  describe('setData method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should set a value at context key', function() {
        service.setData('KEY', 'VALUE');

        expect(service.getData('KEY')).toEqual('VALUE');
      });

      it('should save the application context object in session storage', function() {
        spyOn(Mock.StorageService.session, 'setItem');

        service.setData('KEY', 'VALUE');

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.APPLICATION_CONTEXT, '{"KEY":"VALUE"}');
      });

    });

    describe('when internal scope and context are not initialized', function() {

      // TODO: We need to find a way to test this case. The internal scope always
      //       is initialized when this test case run. So the exception never is
      //       thrown and the test fail.
      xit('should throw an exception', function() {
        expect(function() {
          service.setData('KEY', 'VALUE');
        }).toThrowError('Internal $scope is not initialized.');
      });

    });

  });

  describe('removeData method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should the value from the context key and the key', function() {
        service.removeData('KEY');

        expect(service.getData('KEY')).toBeUndefined();
      });

      it('should save the application context object in session storage', function() {
        spyOn(Mock.StorageService.session, 'setItem');

        service.removeData('KEY');

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.APPLICATION_CONTEXT, '{}');
      });

    });

    describe('when internal scope and context are not initialized', function() {

      // TODO: We need to find a way to test this case. The internal scope always
      //       is initialized when this test case run. So the exception never is
      //       thrown and the test fail.
      xit('should throw an exception', function() {
        expect(function() {
          service.removeData('KEY');
        }).toThrowError('Internal $scope is not initialized.');
      });

    });

  });

  describe('save method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        spyOn(Mock.$rootScope, '$new').and.returnValue(Mock.$scope);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should save the serialized application context object in session storage', function() {
        spyOn(Mock.StorageService.session, 'setItem');

        service.save();

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.APPLICATION_CONTEXT, '{}');
      });

    });

    describe('when internal scope and context are not initialized', function() {

      // TODO: We need to find a way to test this case. The internal scope always
      //       is initialized when this test case run. So the exception never is
      //       thrown and the test fail.
      xit('should throw an exception', function() {
        expect(function() {
          service.removeData('KEY');
        }).toThrowError('Internal $scope is not initialized.');
      });

    });

  });

  describe('isSessionInitialized method', function() {

    describe('when sessionContext does not exist on storage', function() {

      it('should return false', function() {
        spyOn(Mock.StorageService.session, 'getItem').and.returnValue('');

        expect(service.isSessionInitialized()).toBe(false);
      });

    });

    describe('when sessionContext exists on storage', function() {

      it('should return true', function() {
        spyOn(Mock.StorageService.session, 'getItem').and.returnValue('{}');

        expect(service.isSessionInitialized()).toBe(true);
      });

    });

  });

  describe('initializeSession method', function() {

    it('should request to sessionContextService to begin the context', function() {
      service.initializeSession({});

      expect(service.isSessionInitialized()).toBe(true);
    });

  });

  describe('terminateSession method', function() {

    it('should request to sessionContextService to begin the context', function() {
      service.sessionContextService = {};
      service.sessionContextService.end = jasmine.createSpy();

      service.terminateSession();

      expect(service.sessionContextService.end).toHaveBeenCalledWith();
    });

  });

  function mockRootScope($rootScope) {
    Mock.$scope = $rootScope.$new();
    Mock.$rootScope = $rootScope;
    Injections.$rootScope = Mock.$rootScope;
  }

  function mockStorageService($injector) {
    Mock.StorageService = $injector.get('otusjs.application.storage.StorageService');
  }

});
