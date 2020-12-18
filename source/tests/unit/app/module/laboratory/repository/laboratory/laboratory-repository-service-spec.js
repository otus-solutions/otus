describe('LaboratoryRepositoryService_Test_Suite', function () {

  var service;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(function ($injector) {
      Injections.LaboratoryCollectionService = $injector.get('otusjs.laboratory.repository.LaboratoryCollectionService');
      service = $injector.get('otusjs.laboratory.repository.LaboratoryRepositoryService', Injections);
    });

    _mockInitialize();
  });

  it('check existence of service', function () {
    expect(service).toBeDefined();
  });

  it('check existence of methods', function () {
    expect(service.initializeLaboratory).toBeDefined();
    expect(service.getLaboratory).toBeDefined();
    expect(service.updateLaboratoryParticipant).toBeDefined();
    expect(service.updateAliquots).toBeDefined();
    expect(service.updateTubeCollectionData).toBeDefined();
    expect(service.updateTubeCustomMetadata).toBeDefined();

    expect(service.getCheckingExist).toBeDefined();
    expect(service.getLaboratoryDescriptors).toBeDefined();
    expect(service.getAliquotsDescriptors).toBeDefined();
    expect(service.getTubeMedataDataByType).toBeDefined();

    expect(service.getAliquots).toBeDefined();
    expect(service.getLots).toBeDefined();
    expect(service.createLot).toBeDefined();
    expect(service.updateLot).toBeDefined();
    expect(service.deleteLot).toBeDefined();
    expect(service.deleteAliquot).toBeDefined();
  });

  it('getCheckingExist method should to call getCheckingExist method', function () {
    spyOn(Injections.LaboratoryCollectionService, 'getCheckingExist').and.returnValue(Mock.resolve);
    service.getCheckingExist();
    expect(Injections.LaboratoryCollectionService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

  it('checkLaboratoryConfiguration method should to call getCheckingExist method', function () {
    spyOn(Injections.LaboratoryCollectionService, 'checkLaboratoryConfiguration').and.returnValue(Mock.resolve);
    service.checkLaboratoryConfiguration();
    expect(Injections.LaboratoryCollectionService.checkLaboratoryConfiguration).toHaveBeenCalledTimes(1);
  });

  it('updateTubeCustomMetadata method should to call updateTubeCustomMetadata method', function () {
    spyOn(Injections.LaboratoryCollectionService, 'updateTubeCustomMetadata').and.returnValue(Mock.resolve);
    service.updateTubeCustomMetadata(Mock.tube);
    expect(Injections.LaboratoryCollectionService.updateTubeCustomMetadata).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryCollectionService.updateTubeCustomMetadata).toHaveBeenCalledWith(Mock.tube);
  });

  it('getTubeMedataDataByType method should to call getTubeMedataDataByType method', function () {
    spyOn(Injections.LaboratoryCollectionService, 'getTubeMedataDataByType').and.returnValue(Mock.resolve);
    service.getTubeMedataDataByType(Mock.tube.type);
    expect(Injections.LaboratoryCollectionService.getTubeMedataDataByType).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryCollectionService.getTubeMedataDataByType).toHaveBeenCalledWith(Mock.tube.type);
  });

  function _mockInitialize() {
    Mock.resolve =  Promise.resolve({});
    Mock.tube = { type:'tube type'};
  }

});