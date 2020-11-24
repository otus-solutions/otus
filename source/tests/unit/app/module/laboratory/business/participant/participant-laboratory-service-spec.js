describe('ParticipantLaboratoryService_Test_Suite', function() {
  var Mock = {};
  var Injections = [];
  var service;

  beforeEach(function(){
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector) {
      Injections.$q = $injector.get('$q');
      Injections.LaboratoryRepositoryService = $injector.get('otusjs.laboratory.repository.LaboratoryRepositoryService');
      Injections.ContextService = $injector.get('otusjs.laboratory.core.ContextService');
      Injections.LaboratoryLabelFactory = $injector.get('otusjs.laboratory.business.participant.LaboratoryLabelFactory');
      Injections.LaboratoryLabelAliquotFactory = $injector.get('otusjs.laboratory.business.participant.LaboratoryLabelAliquotFactory');
      Injections.EventService = $injector.get('otusjs.laboratory.core.EventService');
      Injections.ParticipantLaboratoryFactory = $injector.get('otusjs.laboratory.participant.ParticipantLaboratoryFactory');
      Injections.LaboratoryConfigurationService = $injector.get('otusjs.laboratory.business.configuration.LaboratoryConfigurationService');

      service = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService', Injections);

      spyOn(Injections.EventService, "onParticipantSelected").and.callThrough();
      spyOn(Injections.ContextService, "getSelectedParticipant").and.callThrough();
      spyOn(Injections.ContextService, "getCurrentUser").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "updateLaboratoryParticipant").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "updateTubeCollectionData").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "updateAliquots").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "deleteAliquot").and.callThrough();
      spyOn(Injections.LaboratoryLabelFactory,"create");
      spyOn(Injections.LaboratoryLabelAliquotFactory,"create");
      spyOn(Injections.LaboratoryConfigurationService,"getCheckingExist").and.callThrough();
    });
  });

  it('serviceExistence_check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', function () {
    expect(service.initializeLaboratory).toBeDefined();
    expect(service.getSelectedParticipant).toBeDefined();
    expect(service.hasLaboratory).toBeDefined();
    expect(service.getLaboratory).toBeDefined();
    expect(service.onParticipantSelected).toBeDefined();
    expect(service.generateLabels).toBeDefined();
    expect(service.getLoggedUser).toBeDefined();
    expect(service.updateLaboratoryParticipant).toBeDefined();
    expect(service.updateAliquots).toBeDefined();
    expect(service.updateTubeCollectionData).toBeDefined();
    expect(service.deleteAliquot).toBeDefined();
    expect(service.getCheckingExist).toBeDefined();
    expect(service.getTubeMedataDataByType).toBeDefined();
    expect(service.updateTubeCustomMetadata).toBeDefined();
  });

  it('onParticipantSelected_method_should_evoke_internalMethods', function () {
    service.onParticipantSelected([]);
    expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
  });

  it('getSelectedParticipant_method_should_evoke_internalMethods', function () {
    service.getSelectedParticipant();
    expect(Injections.ContextService.getSelectedParticipant).toHaveBeenCalledTimes(1);
  });

  it('getLoggedUser_method_should_evoke_internalMethods', function () {
    service.getLoggedUser();
    expect(Injections.ContextService.getCurrentUser).toHaveBeenCalledTimes(1);
  });

  it('updateLaboratoryParticipant_method_should_evoke_internalMethods', function () {
    service.updateLaboratoryParticipant();
    expect(Injections.LaboratoryRepositoryService.updateLaboratoryParticipant).toHaveBeenCalledTimes(1);
  });

  it('updateTubeCollectionData_method_should_evoke_internalMethods', function () {
    service.updateTubeCollectionData([]);
    expect(Injections.LaboratoryRepositoryService.updateTubeCollectionData).toHaveBeenCalledTimes(1);
  });

  it('updateAliquots_method_should_evoke_internalMethods', function () {
    service.updateAliquots([]);
    expect(Injections.LaboratoryRepositoryService.updateAliquots).toHaveBeenCalledTimes(1);
  });

  it('deleteAliquot_method_should_evoke_internalMethods', function () {
    service.deleteAliquot([]);
    expect(Injections.LaboratoryRepositoryService.deleteAliquot).toHaveBeenCalledTimes(1);
  });

  it('generateLabels_method_should_evoke_internalMethods', function () {
    service.generateLabels();
    expect(Injections.LaboratoryLabelFactory.create).toHaveBeenCalledTimes(1);
  });

  it('getCheckingExist_method_should_evoke_internalMethods', function () {
    service.getCheckingExist();
    expect(Injections.LaboratoryConfigurationService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

  it('getLaboratory_method_should_return', function () {
    expect(service.getLaboratory()).toEqual(undefined);
  });

  it('initializeLaboratory_method_should_execute', function () {
    expect(service.initializeLaboratory()).toBePromise();
  });

  it('hasLaboratory_method_should_execute', function () {
    expect(service.hasLaboratory()).toBePromise();
  });

  it('getTubeMedataDataByType_method_should_call_LaboratoryConfigurationService_method', function () {
    spyOn(Injections.LaboratoryConfigurationService,"getTubeMedataDataByType").and.callThrough();
    Mock.tubeType = {};
    expect(service.getTubeMedataDataByType(Mock.tubeType)).toBePromise();
    expect(Injections.LaboratoryConfigurationService.getTubeMedataDataByType).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryConfigurationService.getTubeMedataDataByType).toHaveBeenCalledWith(Mock.tubeType);
  });

  it('updateTubeCustomMetadata_method_should_call_LaboratoryConfigurationService_method', function () {
    spyOn(Injections.LaboratoryRepositoryService,"updateTubeCustomMetadata").and.callThrough();
    Mock.tube = {};
    expect(service.updateTubeCustomMetadata(Mock.tube)).toBePromise();
    expect(Injections.LaboratoryRepositoryService.updateTubeCustomMetadata).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryRepositoryService.updateTubeCustomMetadata).toHaveBeenCalledWith(Mock.tube);
  });

});
