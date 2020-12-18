describe('LaboratoryCollectionService_UnitTest_Suite', function () {
  var service;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector) {
      Injections.$q = $injector.get('$q');
      Injections.ModuleService = $injector.get('otusjs.laboratory.core.ModuleService');
      Injections.LaboratoryLocalStorageService = $injector.get('otusjs.laboratory.storage.LaboratoryLocalStorageService');

      service = $injector.get('otusjs.laboratory.repository.LaboratoryCollectionService', Injections);

      _mockInitialize();

      spyOn(service, "useParticipant").and.callThrough();
      spyOn(service, "resetParticipantInUse").and.callThrough();
    });
  });

  it('serviceExistence_check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.useParticipant).toBeDefined();
    expect(service.resetParticipantInUse).toBeDefined();
    expect(service.insert).toBeDefined();
    expect(service.listAll).toBeDefined();
    expect(service.initializeLaboratory).toBeDefined();
    expect(service.update).toBeDefined();
    expect(service.updateTubeCollectionData).toBeDefined();
    expect(service.updateAliquots).toBeDefined();
    expect(service.convertStorageAliquot).toBeDefined();
    expect(service.deleteAliquot).toBeDefined();
    expect(service.getLaboratory).toBeDefined();
    expect(service.getDescriptors).toBeDefined();
    expect(service.getAliquotDescriptors).toBeDefined();
    expect(service.getCheckingExist).toBeDefined();
    expect(service.getAliquots).toBeDefined();
    expect(service.getLots).toBeDefined();
    expect(service.createLot).toBeDefined();
    expect(service.updateLot).toBeDefined();
    expect(service.deleteLot).toBeDefined();
    expect(service.getTubeMedataDataByType).toBeDefined();
    expect(service.updateTubeCustomMetadata).toBeDefined();
  });

  it('useParticipant_method_should_execute', function () {
    service.useParticipant(Mock.participant);
    expect(service.useParticipant).toHaveBeenCalledTimes(1);
  });

  it('resetParticipantInUse_method_should_execute', function () {
    service.resetParticipantInUse();
    expect(service.resetParticipantInUse).toHaveBeenCalledTimes(1);
  });

  it('insert_method_should_execute', function () {
    expect(service.insert(Mock.laboratory)).toBePromise();
  });

  it('listAll_method_should_execute', function () {
    expect(service.listAll()).toBePromise();
  });

  it('initializeLaboratoryAll_method_should_execute', function () {
    expect(service.initializeLaboratory()).toBePromise();
  });

  it('update_method_should_execute', function () {
    expect(service.update(Mock.laboratory)).toBePromise();
  });

  it('updateTubeCollectionData_method_should_execute', function () {
    expect(service.updateTubeCollectionData({})).toBePromise();
  });

  it('updateAliquots_method_should_execute', function () {
    expect(service.updateAliquots({})).toBePromise();
  });

  it('deleteAliquot_method_should_execute', function () {
    expect(service.deleteAliquot("")).toBePromise();
  });

  it('getLaboratory_method_should_execute', function () {
    expect(service.getLaboratory()).toBePromise();
  });

  it('getDescriptors_method_should_execute', function () {
    expect(service.getDescriptors()).toBePromise();
  });

  it('getAliquotDescriptors_method_should_execute', function () {
    expect(service.getAliquotDescriptors()).toBePromise();
  });

  it('getAliquots_method_should_execute', function () {
    expect(service.getAliquots()).toBePromise();
  });

  it('getLots_method_should_execute', function () {
    expect(service.getLots()).toBePromise();
  });

  it('createLot_method_should_execute', function () {
    expect(service.createLot({})).toBePromise();
  });

  it('updateLot_method_should_execute', function () {
    expect(service.updateLot({})).toBePromise();
  });

  it('deleteLot_method_should_execute', function () {
    expect(service.deleteLot("")).toBePromise();
  });

  it('convertStorageAliquot_method_should_execute', function () {
    expect(service.convertStorageAliquot(Mock.Aliquot)).toBePromise();
  });

  it('getCheckingExist_method_should_execute', function () {
    expect(service.getCheckingExist()).toBePromise();
  });

  it('checkLaboratoryConfiguration_method_should_execute', function () {
    expect(service.checkLaboratoryConfiguration()).toBePromise();
  });

  it('getTubeMedataDataByType_method_should_execute', function () {
    expect(service.getTubeMedataDataByType(Mock.tube.type)).toBePromise();
  });

  it('updateTubeCustomMetadata_method_should_execute', function () {
    expect(service.updateTubeCustomMetadata(Mock.tube)).toBePromise();
  });

  function _mockInitialize() {
    Mock.participant = {
      recruitmentNumber: 50000501
    };
    Mock.laboratory = {
      recruitmentNumber: 50000501
    };
    Mock.Aliquot = Test.utils.data.aliquot;

    Mock.tube = { type:'tube type'};
  }
});
