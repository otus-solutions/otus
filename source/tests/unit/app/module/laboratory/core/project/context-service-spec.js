describe('the Laboratory Core Context Service', function() {
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
  var LABORATORY_CONTEXT = 'project_context';
  
  beforeEach(function() {
    angular.mock.module('otusjs.otus.laboratory');
    inject(function(_$injector_) {
      Injections = {
        LaboratoryLocalStorageService: mockLaboratoryLocalStorageService(_$injector_)
      };
      service = _$injector_.get('otusjs.laboratory.core.project.ContextService', Injections);
      mockContext();
      service.configureContext({
        create: function() {
          return Mock.context;
        }
      });
      mockStorage();
      service.configureStorage(Mock.storage);

      spyOn(Injections.LaboratoryLocalStorageService, 'clear').and.callFake(function() {});
      spyOn(Injections.LaboratoryLocalStorageService, 'insert').and.callFake(function(file) {});
      spyOn(Mock.context, 'setData').and.callThrough;
      spyOn(Mock.storage, 'setItem').and.callThrough;
      spyOn(Mock.context, 'getData').and.callFake(function(key) {return key;});
      spyOn(Injections.LaboratoryLocalStorageService, 'get').and.callThrough;
    });
  });

  describe('setFileStructure method', function() {
    it('should call the LaboratoryLocalStorageService.clear', function() {
      service.setFileStructure(file);
      expect(Injections.LaboratoryLocalStorageService.clear).toHaveBeenCalled();
    });
    it('should call the LaboratoryLocalStorageService.insert with file', function() {
      service.setFileStructure(file);
      expect(Injections.LaboratoryLocalStorageService.insert).toHaveBeenCalledWith(file);
    });
    it('should call the context.setData with dataKey and dataValue parameter', function() {
      service.setFileStructure(file);
      expect(Mock.context.setData).toHaveBeenCalledWith(dataKey, dataValue);
    });
  });
  
  describe('save method', function() {
    it('should call the storage.setItem', function() {
      service.save();
      expect(Mock.storage.setItem).toHaveBeenCalledWith(LABORATORY_CONTEXT, Mock.context.toJson());
    });
  });

  describe('getData method', function() {
    it('should call the context.getData with "PARAMETER"', function() {
      service.getData('PARAMETER');
      expect(Mock.context.getData).toHaveBeenCalledWith('PARAMETER');
    });
    it('return should be equal "PARAMETER2"', function() {
      expect(service.getData('PARAMETER2')).toEqual('PARAMETER2');
    });
  });

  function mockLaboratoryLocalStorageService($injector) {
    Mock.LaboratoryLocalStorageService = $injector.get('otusjs.laboratory.storage.LaboratoryLocalStorageService');
    return Mock.LaboratoryLocalStorageService;
  }

  function mockContext() {
    Mock.context = {
      clear: function() {},
      setData: function(key, value) {},
      toJson: function() {},
      setItem: function(key, value) {},
      getData: function(key) {}
    };
    return Mock.context;
  }

  function mockStorage() {
    Mock.storage = {
      clear: function() {},
      setData: function(key, value) {},
      toJson: function() {},
      setItem: function(key, value) {}
    };
    return Mock.storage;
  }
});
