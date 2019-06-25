describe('the Activity Core Context Service', function () {
  var file = {
    'exameSendingLot': {},
    'exams': [],
    '$loki': 1
  }
  var Mock = {};
  var Injections = {};
  var service;
  var dataKey = 'fileStructureAddress';
  var dataValue = file.$loki;
  var ACTIVITY_CONTEXT = 'activity_context';

  beforeEach(function () {
    angular.mock.module('otusjs.activity');
    inject(function (_$injector_) {
      Injections = {
        ActivityLocalStorageService: mockActivityLocalStorageService(_$injector_)
      };
      service = _$injector_.get('otusjs.activity.core.ContextService', Injections);
      mockContext();
      service.configureContext({
        create: function () {
          return Mock.context;
        }
      });
      mockStorage();
      service.configureStorage(Mock.storage);

      spyOn(Mock.context, 'setData').and.callThrough;
      spyOn(Mock.storage, 'setItem').and.callThrough;
      spyOn(Mock.context, 'getData').and.callFake(function (key) { return key; });
    });
  });

  describe('service step', function () {

    it('should to be defined', function () {
      expect(service).toBeDefined();
    });

    it('should to be defined methods', function () {
      expect(service.begin).toBeDefined();
      expect(service.restore).toBeDefined();
      expect(service.end).toBeDefined();
      expect(service.isValid).toBeDefined();
      expect(service.hasContextActive).toBeDefined();
      expect(service.save).toBeDefined();
      expect(service.configureContext).toBeDefined();
      expect(service.configureStorage).toBeDefined();
      expect(service.getData).toBeDefined();
      expect(service.setData).toBeDefined();
      expect(service.removeData).toBeDefined();
      expect(service.getSelectedParticipant).toBeDefined();
      expect(service.setSelectedParticipant).toBeDefined();
      expect(service.getLoggedUser).toBeDefined();
      expect(service.setLoggedUser).toBeDefined();
      expect(service.getSelectedActivities).toBeDefined();
      expect(service.clearSelectedActivities).toBeDefined();
      expect(service.selectActivities).toBeDefined();
      expect(service.getActivityToPlay).toBeDefined();
      expect(service.setActivityToPlay).toBeDefined();
      expect(service.getActivityToView).toBeDefined();
      expect(service.setActivityToView).toBeDefined();
      expect(service.existsActivityToPlay).toBeDefined();
      expect(service.existsActivityToView).toBeDefined();
    });

  });

  describe('getActivityToView method', function () {
    it('should call getData method', function () {
      service.getActivityToView();

      expect(Mock.context.getData).toHaveBeenCalled();
    });

    it('should call the context.getData with parameter expected', function () {
      service.getActivityToView();

      expect(Mock.context.getData).toHaveBeenCalledWith('activityToView');
    });
  });

  describe('setActivityToView method', function () {
    it('should call getData method', function () {
      service.setActivityToView();

      expect(Mock.context.setData).toHaveBeenCalled();
    });

  });

  function mockActivityLocalStorageService($injector) {
    Mock.ActivityLocalStorageService = $injector.get('otusjs.activity.storage.ActivityLocalStorageService');
    return Mock.ActivityLocalStorageService;
  }

  function mockContext() {
    Mock.context = {
      clear: function () { },
      setData: function (key, value) { },
      toJson: function () { },
      setItem: function (key, value) { },
      getData: function (key) { }
    };
    return Mock.context;
  }

  function mockStorage() {
    Mock.storage = {
      clear: function () { },
      setData: function (key, value) { },
      toJson: function () { },
      setItem: function (key, value) { }
    };
    return Mock.storage;
  }
});
