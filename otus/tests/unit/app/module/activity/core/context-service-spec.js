xdescribe('the Activity Core Context Service', function () {
  var file = {
    'exameSendingLot': {},
    'exams': [],
    '$loki': 1
  }
  var Mock = {};
  var Injections = {};
  var service;
  var dataKeySending = 'FieldCenterInSendingExam';
  var dataKey = 'fileStructureAddress';
  var dataValue = file.$loki;
  var ACTIVITY_CONTEXT = 'activity_context';

  beforeEach(function () {
    angular.mock.module('otusjs.activity.core');
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

      spyOn(Injections.ActivityLocalStorageService, 'clear').and.callFake(function () { });
      spyOn(Injections.ActivityLocalStorageService, 'insert').and.callFake(function (file) { });
      spyOn(Mock.context, 'setData').and.callThrough;
      spyOn(Mock.storage, 'setItem').and.callThrough;
      spyOn(Mock.context, 'getData').and.callFake(function (key) { return key; });
      spyOn(Injections.ActivityLocalStorageService, 'get').and.callThrough;
    });
  });

  describe('service step', function () {
    it('should to be defined', function () {
      expect(service).toBeDefined();
    });
  });

  xdescribe('setFileStructure method', function () {
    it('should call the ActivityLocalStorageService.clear', function () {
      service.setFileStructure(file);
      expect(Injections.ActivityLocalStorageService.clear).toHaveBeenCalled();
    });
    it('should call the ActivityLocalStorageService.insert with file', function () {
      service.setFileStructure(file);
      expect(Injections.ActivityLocalStorageService.insert).toHaveBeenCalledWith(file);
    });
    it('should call the context.setData with dataKey and dataValue parameter', function () {
      service.setFileStructure(file);
      expect(Mock.context.setData).toHaveBeenCalledWith(dataKey, dataValue);
    });
  });

  xdescribe('save method', function () {
    it('should call the storage.setItem', function () {
      service.save();
      expect(Mock.storage.setItem).toHaveBeenCalledWith(ACTIVITY_CONTEXT, Mock.context.toJson());
    });
  });

  xdescribe('getData method', function () {
    it('should call the context.getData with "PARAMETER"', function () {
      service.getData('PARAMETER');
      expect(Mock.context.getData).toHaveBeenCalledWith('PARAMETER');
    });
    it('return should be equal "PARAMETER2"', function () {
      expect(service.getData('PARAMETER2')).toEqual('PARAMETER2');
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
