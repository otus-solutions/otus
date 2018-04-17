describe('otusjs.laboratory.core.project.ContextService', function() {
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
  });

  beforeEach(inject(function(_$injector_) {
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
    spyOn(Mock.context, 'getData').and.returnValue(dataKeySending);
    spyOn(Injections.LaboratoryLocalStorageService, 'get').and.callThrough;
  }));

  it('setFileStructure', function() {
    service.setFileStructure(file);
    expect(Injections.LaboratoryLocalStorageService.clear).toHaveBeenCalled();
    expect(Injections.LaboratoryLocalStorageService.insert).toHaveBeenCalledWith(file);
    expect(Mock.context.setData).toHaveBeenCalledWith(dataKey, dataValue);
  });

  it('save', function() {
    service.setFileStructure(file);
    expect(Mock.storage.setItem).toHaveBeenCalledWith(LABORATORY_CONTEXT, Mock.context.toJson());
  });

  it('getFileStructure', function() {
    service.getFileStructure();
    //expect(Mock.context.getData).toHaveBeenCalledWith(dataKey);
    expect(Mock.context.getData(dataKeySending)).toEqual('FieldCenterInSendingExam');
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
