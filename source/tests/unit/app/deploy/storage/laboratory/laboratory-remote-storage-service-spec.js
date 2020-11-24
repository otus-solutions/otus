describe('LaboratoryRemoteStorageService_Test_Suite', function () {
  var Mock = {};
  var Injections = [];
  var service;

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject( ($injector) => {
      Injections.$q = $injector.get('$q');
      Injections.LaboratoryRestService = $injector.get('otusjs.deploy.LaboratoryRestService');
      Injections.SampleTransportRestService = $injector.get('otusjs.deploy.SampleTransportRestService');

      service = $injector.get('otusjs.deploy.LaboratoryRemoteStorageService', Injections);
    });

    _mockInitialize();
    Injections.LaboratoryRestService.initialize();
    spyOn(Injections.LaboratoryRestService, 'getCheckingExist').and.returnValue(Mock.resolve);
  });


  it('check existence of service', function () {
    expect(service).toBeDefined();
  });

  it('check existence of methods', function () {
    expect(service.insert).toBeDefined();
    expect(service.initializeLaboratory).toBeDefined();
    expect(service.getLaboratory).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.updateAliquots).toBeDefined();
    expect(service.deleteAliquot).toBeDefined();
    expect(service.updateTubeCollectionData).toBeDefined();
    expect(service.updateTubeCustomMetadata).toBeDefined();

    expect(service.getDescriptors).toBeDefined();
    expect(service.getAliquotDescriptors).toBeDefined();
    expect(service.getCheckingExist).toBeDefined();
    expect(service.updateTubeCustomMetadata).toBeDefined();

    expect(service.getAliquots).toBeDefined();
    expect(service.getLots).toBeDefined();
    expect(service.getTube).toBeDefined();
    expect(service.createLot).toBeDefined();
    expect(service.updateLot).toBeDefined();
    expect(service.deleteLot).toBeDefined();
  });

  it('getCheckingExist method should to call getCheckingExist method', function () {
    service.getCheckingExist();
    expect(Injections.LaboratoryRestService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

  it('updateTubeCustomMetadata method should to call updateTubeCustomMetadata rest method', function () {
    spyOn(Injections.LaboratoryRestService, 'updateTubeCustomMetadata').and.returnValue(Mock.resolve);
    service.updateTubeCustomMetadata(Mock.tube);
    expect(Injections.LaboratoryRestService.updateTubeCustomMetadata).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryRestService.updateTubeCustomMetadata).toHaveBeenCalledWith(Mock.tube);
  });

  it('getTubeMedataDataByType method should to call getTubeMedataDataByType rest method', function () {
    spyOn(Injections.LaboratoryRestService, 'getTubeMedataDataByType').and.returnValue(Mock.resolve);
    service.getTubeMedataDataByType(Mock.tube.type);
    expect(Injections.LaboratoryRestService.getTubeMedataDataByType).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryRestService.getTubeMedataDataByType).toHaveBeenCalledWith(Mock.tube.type);
  });


  function _mockInitialize(){
    Mock.resolve = Promise.resolve({});
    Mock.resolve = Promise.reject('error');

    Mock.tube = {type: 'ABC'};
  }

});