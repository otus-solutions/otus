describe('ParticipantLaboratoryService_UnitTest_Suite', function() {

  var UNIT_NAME = 'otusjs.laboratory.business.participant.ParticipantLaboratoryService';
  var Injections = [];
  var service;

  beforeEach(function(){
    angular.mock.module('otusjs.laboratory.business');
    angular.mock.module('otusjs.laboratory.repository');
    angular.mock.module('otusjs.laboratory.core');
    angular.mock.module('otusjs.laboratory.participant');
    angular.mock.module('otusjs.laboratory.storage');
    angular.mock.module('otusjs.laboratory.configuration');

    angular.mock.inject(function (_$injector_) {
      Injections.$q = _$injector_.get('$q');
      Injections.LaboratoryRepositoryService = _$injector_.get('otusjs.laboratory.repository.LaboratoryRepositoryService');
      Injections.ContextService = _$injector_.get('otusjs.laboratory.core.ContextService');
      Injections.LaboratoryLabelFactory = _$injector_.get('otusjs.laboratory.business.participant.LaboratoryLabelFactory');
      Injections.EventService = _$injector_.get('otusjs.laboratory.core.EventService');
      Injections.ParticipantLaboratoryFactory = _$injector_.get('otusjs.laboratory.participant.ParticipantLaboratoryFactory');
      Injections.LaboratoryConfigurationService = _$injector_.get('otusjs.laboratory.business.configuration.LaboratoryConfigurationService');

      service = _$injector_.get(UNIT_NAME, Injections);

      spyOn(Injections.EventService, "onParticipantSelected").and.callThrough();
      spyOn(Injections.ContextService, "getSelectedParticipant").and.callThrough();
      spyOn(Injections.ContextService, "getCurrentUser").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "updateLaboratoryParticipant").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "updateTubeCollectionData").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "updateAliquots").and.callThrough();
      spyOn(Injections.LaboratoryRepositoryService, "deleteAliquot").and.callThrough();
      spyOn(Injections.LaboratoryLabelFactory,"create");
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

});
