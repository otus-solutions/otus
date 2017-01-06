describe('otusjs.participant.core.ContextService', function() {

  var UNIT_NAME = 'otusjs.participant.core.ContextService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _EVENTS_, _CONTEXT_DATA_, _$rootScope_) {
      mockStorageService(_$injector_);
      mockSessionContextService(_$injector_, _$rootScope_);

      /* Injectable mocks */
      Injections.EVENTS = _EVENTS_;
      Injections.CONTEXT_DATA = _CONTEXT_DATA_;

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('begin method', function() {

    beforeEach(function() {
      service.setParent(Mock.SessionContextService);
      service.configureStorage(Mock.StorageService.session);
    });

    describe('every time', function() {

      it('should request new scope from parent context', function() {
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        service.begin();

        expect(Mock.SessionContextService.getScope).toHaveBeenCalledWith();
      });

    });

    describe('when internal $scope is not initialized', function() {

      it('should store a null value in internal $scope', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        try {
          service.begin()
        } catch (e) {
          expect(service.getScope()).toBe(null);
        };
      });

      it('should throw an exception', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        expect(function() {
          service.begin()
        }).toThrowError('Internal application $scope was not correctly initialized.');
      });

      it('should not try to save the context data', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);
        spyOn(Mock.StorageService.session, 'setItem');

        try {
          service.begin()
        } catch(e) {
          expect(Mock.StorageService.session.setItem).not.toHaveBeenCalled();
        }
      });

    });

    describe('when internal $scope is initialized', function() {

      beforeEach(function() {
        service.setParent(Mock.SessionContextService);
        service.configureStorage(Mock.StorageService.session);
      });

      describe('and StorageService is initialized', function() {

        it('should store the $scope reference', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

          service.begin();

          expect(service.getScope()).toEqual(internalScope);
        });

        it('should configure the scope name as "participantContext"', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

          service.begin();

          expect(service.getScope().name).toEqual(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT);
        });

        it('should configure the context attribute of scope with a literal object', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

          service.begin();

          expect(service.getScope().context).toEqual({});
        });

        it('should save the application context object in session storage', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);
          spyOn(Mock.StorageService.session, 'setItem');

          service.begin();

          expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT, '{}');
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

    beforeEach(function() {
      service.setParent(Mock.SessionContextService);
      service.configureStorage(Mock.StorageService.session);
    });

    describe('every time', function() {

      it('should request new scope from parent context', function() {
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        service.restore();

        expect(Mock.SessionContextService.getScope).toHaveBeenCalledWith();
      });

    });

    describe('when internal $scope is not initialized', function() {

      it('should store a null value in internal $scope', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        try {
          service.restore()
        } catch (e) {
          expect(service.getScope()).toBe(null);
        };
      });

      it('should throw an exception', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        expect(function() {
          service.restore()
        }).toThrowError('Internal application $scope was not correctly initialized.');
      });

      it('should not try to save the context data', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);
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
          service.setParent(Mock.SessionContextService);
          service.configureStorage(Mock.StorageService.session);
        });

        it('should store the $scope reference', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

          service.restore();

          expect(service.getScope()).toEqual(internalScope);
        });

        it('should configure the scope name as "participantContext"', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

          service.restore();

          expect(service.getScope().name).toEqual('participantContext');
        });

        it('should configure the context attribute of scope with a literal object', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

          service.restore();

          expect(service.getScope().context).toEqual({});
        });

        it('should restore the application context object from session storage', function() {
          var serializedContext = Mock.StorageService.session.getItem(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT);
          spyOn(JSON, 'parse');

          service.restore();

          expect(JSON.parse).toHaveBeenCalledWith(serializedContext);
        });

      });

      describe('and StorageService is not initialized', function() {

        beforeEach(function() {
          service.setParent(Mock.SessionContextService);
          service.configureStorage(undefined);
        });

        it('should throw an exception', function() {
          expect(function() {
            service.restore()
          }).toThrowError('StorageService (session) is not initialized.');
        });

        it('should intialize the internal scope as a new scope', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

          try {
            service.restore();
          } catch (e) {}

          expect(service.getScope()).toEqual(internalScope);
        });

        it('should configure the scope name as "participantContext"', function() {
          try {
            service.restore();
          } catch (e) {}

          expect(service.getScope().name).toEqual('participantContext');
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

        expect(Mock.StorageService.session.removeItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT);
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

        expect(Mock.StorageService.session.getItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT);
      });

      describe('and application context is resolved', function() {

        it('should return true', function() {
          spyOn(Mock.StorageService.session, 'getItem').and.returnValue('{}');

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
        spyOn(Mock.StorageService.session, 'getItem');

        service.isValid();

        expect(Mock.StorageService.session.getItem).not.toHaveBeenCalledWith(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT);
      });

      it('should return false', function() {
        expect(service.isValid()).toBe(false);
      });

    });

  });

  describe('configureStorage method', function() {

    it('should store a reference to ServiceStorage.session', function() {
      spyOn(Mock.StorageService.session, 'setItem');

      service.setParent(Mock.SessionContextService);
      service.begin();
      service.configureStorage(Mock.StorageService.session);
      service.save();

      expect(Mock.StorageService.session.setItem).toHaveBeenCalled();
    });

  });

  describe('setParent method', function() {

    it('should store a reference to parent context service', function() {
      service.setParent(Mock.SessionContextService);

      spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);
      service.begin();
      expect(Mock.SessionContextService.getScope).toHaveBeenCalledWith();
    });

    it('should initialize participantContextService attribute of parent context service with self value', function() {
      service.setParent(Mock.SessionContextService);

      expect(Mock.SessionContextService.participantContextService).toEqual(service);
    });

  });

  describe('broadcast method', function() {

    describe('when internal scope is initialized', function() {

      var internalScope;

      beforeEach(function() {
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.SessionContextService);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should call $scope.$broadcast with eventname and data', function() {
        spyOn(internalScope, '$broadcast');

        service.broadcast('EVENT_NAME', {});

        expect(internalScope.$broadcast).toHaveBeenCalledWith('EVENT_NAME', {});
      });

    });

    describe('when internal scope is not initialized', function() {

      it('should call $scope.$broadcast with eventname and data', function() {
        spyOn(Mock.$scope, '$broadcast');

        service.broadcast('EVENT_NAME', {});

        expect(Mock.$scope.$broadcast).not.toHaveBeenCalled();
      });

    });

  });

  describe('getData method', function() {

    describe('when internal scope and context are initialized', function() {

      var internalScope;

      beforeEach(function() {
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.SessionContextService);
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
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.SessionContextService);
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

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT, '{"KEY":"VALUE"}');
      });

    });

  });

  describe('removeData method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.SessionContextService);
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

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT, '{}');
      });

    });

  });

  describe('save method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.SessionContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.SessionContextService);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should save the serialized application context object in session storage', function() {
        spyOn(Mock.StorageService.session, 'setItem');

        service.save();

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.PARTICIPANT_CONTEXT, '{}');
      });

    });

  });

  describe('getSelectedParticipant method', function() {

    var participant = {};

    beforeEach(function() {
      service.setParent(Mock.SessionContextService);
      service.begin();
      service.selectParticipant(participant);
    });

    it('should return selected participant from context', function() {
      var returnedValue = service.getSelectedParticipant();

      expect(returnedValue).toEqual(participant);
    });

  });

  describe('selectParticipant method', function() {

    var participant = {};

    beforeEach(function() {
      service.setParent(Mock.SessionContextService);
      service.begin();
      service.selectParticipant(participant);
    });

    it('should set participant on context', function() {
      expect(service.getSelectedParticipant()).toEqual({});
    });

  });

  function mockSessionContextService($injector, $rootScope) {
    var sessionData = {}
    sessionData.token = 'token';
    Mock.$rootScope = $rootScope;
    Mock.$scope = $rootScope.$new();
    Mock.SessionContextService = $injector.get('otusjs.application.session.core.ContextService');
    Mock.SessionContextService.configureStorage(Mock.StorageService.session);
    Mock.SessionContextService.begin(sessionData);
  }

  function mockStorageService($injector) {
    Mock.StorageService = $injector.get('otusjs.otus.interoperability.storage.StorageService');
  }

});
