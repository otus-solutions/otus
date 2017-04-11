xdescribe('otusjs.activity.core.ContextService', function() {

  var UNIT_NAME = 'otusjs.activity.core.ContextService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _EVENTS_, _CONTEXT_DATA_, _$rootScope_) {
      mockStorageService(_$injector_);
      mockApplicationContextService(_$injector_, _$rootScope_);

      /* Injectable mocks */
      Injections.EVENTS = _EVENTS_;
      Injections.CONTEXT_DATA = _CONTEXT_DATA_;

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('begin method', function() {

    beforeEach(function() {
      service.setParent(Mock.ApplicationContextService);
      service.configureStorage(Mock.StorageService.session);
    });

    describe('every time', function() {

      it('should request new scope from parent context', function() {
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        service.begin();

        expect(Mock.ApplicationContextService.getScope).toHaveBeenCalledWith();
      });

    });

    describe('when internal $scope is not initialized', function() {

      it('should store a null value in internal $scope', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        try {
          service.begin()
        } catch (e) {
          expect(service.getScope()).toBe(null);
        };
      });

      it('should throw an exception', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        expect(function() {
          service.begin()
        }).toThrowError('Internal application $scope was not correctly initialized.');
      });

      it('should not try to save the context data', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);
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
        service.setParent(Mock.ApplicationContextService);
        service.configureStorage(Mock.StorageService.session);
      });

      describe('and StorageService is initialized', function() {

        it('should store the $scope reference', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

          service.begin();

          expect(service.getScope()).toEqual(internalScope);
        });

        it('should configure the scope name as "activityContext"', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

          service.begin();

          expect(service.getScope().name).toEqual(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT);
        });

        it('should configure the context attribute of scope with a literal object', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

          service.begin();

          expect(service.getScope().context).toEqual({});
        });

        it('should save the application context object in session storage', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);
          spyOn(Mock.StorageService.session, 'setItem');

          service.begin();

          expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT, '{}');
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
      service.setParent(Mock.ApplicationContextService);
      service.configureStorage(Mock.StorageService.session);
    });

    describe('every time', function() {

      it('should request new scope from parent context', function() {
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        service.restore();

        expect(Mock.ApplicationContextService.getScope).toHaveBeenCalledWith();
      });

    });

    describe('when internal $scope is not initialized', function() {

      it('should store a null value in internal $scope', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        try {
          service.restore()
        } catch (e) {
          expect(service.getScope()).toBe(null);
        };
      });

      it('should throw an exception', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        expect(function() {
          service.restore()
        }).toThrowError('Internal application $scope was not correctly initialized.');
      });

      it('should not try to save the context data', function() {
        spyOn(Mock.$scope, '$new').and.returnValue(undefined);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);
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
          service.setParent(Mock.ApplicationContextService);
          service.configureStorage(Mock.StorageService.session);
        });

        it('should store the $scope reference', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

          service.restore();

          expect(service.getScope()).toEqual(internalScope);
        });

        it('should configure the scope name as "activityContext"', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

          service.restore();

          expect(service.getScope().name).toEqual('activityContext');
        });

        it('should configure the context attribute of scope with a literal object', function() {
          var internalScope = Mock.$scope.$new();
          spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

          service.restore();

          expect(service.getScope().context).toEqual({});
        });

        it('should restore the application context object from session storage', function() {
          var serializedContext = Mock.StorageService.session.getItem(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT);
          spyOn(JSON, 'parse');

          service.restore();

          expect(JSON.parse).toHaveBeenCalledWith(serializedContext);
        });

      });

      describe('and StorageService is not initialized', function() {

        beforeEach(function() {
          service.setParent(Mock.ApplicationContextService);
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
          spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

          try {
            service.restore();
          } catch (e) {}

          expect(service.getScope()).toEqual(internalScope);
        });

        it('should configure the scope name as "activityContext"', function() {
          try {
            service.restore();
          } catch (e) {}

          expect(service.getScope().name).toEqual('activityContext');
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

        expect(Mock.StorageService.session.removeItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT);
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

        expect(Mock.StorageService.session.getItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT);
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

        expect(Mock.StorageService.session.getItem).not.toHaveBeenCalledWith(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT);
      });

      it('should return false', function() {
        expect(service.isValid()).toBe(false);
      });

    });

  });

  describe('configureStorage method', function() {

    it('should store a reference to ServiceStorage.session', function() {
      spyOn(Mock.StorageService.session, 'setItem');

      service.setParent(Mock.ApplicationContextService);
      service.begin();
      service.configureStorage(Mock.StorageService.session);
      service.save();

      expect(Mock.StorageService.session.setItem).toHaveBeenCalled();
    });

  });

  describe('setParent method', function() {

    it('should store a reference to parent context service', function() {
      service.setParent(Mock.ApplicationContextService);

      spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);
      service.begin();
      expect(Mock.ApplicationContextService.getScope).toHaveBeenCalledWith();
    });

    it('should initialize activityContextService attribute of parent context service with self value', function() {
      service.setParent(Mock.ApplicationContextService);

      expect(Mock.ApplicationContextService.activityContextService).toEqual(service);
    });

  });

  describe('broadcast method', function() {

    describe('when internal scope is initialized', function() {

      var internalScope;

      beforeEach(function() {
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.ApplicationContextService);
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
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.ApplicationContextService);
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
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.ApplicationContextService);
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

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT, '{"KEY":"VALUE"}');
      });

    });

  });

  describe('removeData method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.ApplicationContextService);
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

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT, '{}');
      });

    });

  });

  describe('save method', function() {

    describe('when internal scope and context are initialized', function() {

      beforeEach(function() {
        internalScope = Mock.$scope.$new();
        spyOn(Mock.$scope, '$new').and.returnValue(internalScope);
        spyOn(Mock.ApplicationContextService, 'getScope').and.returnValue(Mock.$scope);

        service.setParent(Mock.ApplicationContextService);
        service.configureStorage(Mock.StorageService.session);
        service.begin();
      });

      it('should save the serialized application context object in session storage', function() {
        spyOn(Mock.StorageService.session, 'setItem');

        service.save();

        expect(Mock.StorageService.session.setItem).toHaveBeenCalledWith(Injections.CONTEXT_DATA.ACTIVITY_CONTEXT, '{}');
      });

    });

  });

  describe('getSelectedParticipant method', function() {

    describe('when parent context service have a participant context service as a child', function() {

      var participant = {};

      beforeEach(function() {
        Mock.ApplicationContextService.participantContextService = {};
        Mock.ApplicationContextService.participantContextService.getSelectedParticipant = jasmine.createSpy().and.returnValue(participant);
        service.setParent(Mock.ApplicationContextService);
      })

      it('should request the selected participant from participantContextService', function() {
        var returnedValue = service.getSelectedParticipant();

        expect(Mock.ApplicationContextService.participantContextService.getSelectedParticipant).toHaveBeenCalled();
        expect(returnedValue).toEqual(participant);
      });

    });

    describe('when parent context service does not have a participant context service as a child', function() {

      beforeEach(function() {
        service.setParent(Mock.ApplicationContextService);
      })

      it('should return null', function() {
        expect(service.getSelectedParticipant()).toBe(null);
      });

    });

  });

  xdescribe('getSelectedActivities method', function() {

    it('should use the getData method with parameter "selectedActivities"', function() {
      spyOn(service, 'getData');

      service.getSelectedActivities();

      expect(service.getData).toHaveBeenCalledWith('selectedActivities');
    });

  });

  xdescribe('clearSelectedActivities method', function() {

    it('should use the setData method with parameter "selectedActivities" and an array', function() {
      spyOn(service, 'setData');

      service.clearSelectedActivities();

      expect(service.setData).toHaveBeenCalledWith([]);
    });

  });

  xdescribe('selectActivities method', function() {

    it('should use the setData method with parameter "selectedActivities" and an array', function() {
      spyOn(service, 'setData');

      service.selectActivities([]);

      expect(service.setData).toHaveBeenCalledWith('selectedActivities', []);
    });

  });

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
