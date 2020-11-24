describe('LaboratoryRestService_Test_Suite', function () {

  const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is no initialized.';

  let Mock = {};
  let Injections = [];
  let service;

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject($injector => {
      Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
      service = $injector.get('otusjs.deploy.LaboratoryRestService', Injections);
    });

    _mockInitialize();
  });

  it('check_service_existence', function () {
    expect(service).toBeDefined();
  });

  it('check_service_methods_existence', function () {
    expect(service.initialize).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.initializeLaboratory).toBeDefined();
    expect(service.getLaboratory).toBeDefined();
    expect(service.getLaboratoryByTube).toBeDefined();
    expect(service.updateLaboratoryParticipant).toBeDefined();
    expect(service.updateAliquots).toBeDefined();
    expect(service.convertStorageAliquot).toBeDefined();
    expect(service.deleteAliquot).toBeDefined();
    expect(service.updateTubeCollectionData).toBeDefined();
    expect(service.updateTubeCustomMetadata).toBeDefined();

    expect(service.getDescriptors).toBeDefined();
    expect(service.getCheckingExist).toBeDefined();
    expect(service.getAliquotDescriptors).toBeDefined();
    expect(service.getAliquotConfiguration).toBeDefined();
    expect(service.getTubeMedataDataByType).toBeDefined();

    expect(service.initializeUnattached).toBeDefined();
    expect(service.attacheLaboratory).toBeDefined();
    expect(service.listUnattached).toBeDefined();
    expect(service.getUnattachedById).toBeDefined();
    expect(service.discardUnattached).toBeDefined();
    expect(service.getUnattachedByIdentification).toBeDefined();
  });


  it('updateTubeCustomMetadata_should_invoke_participantRest_method_and_return_promise', () => {
    service.initialize();
    expect(service.updateTubeCustomMetadata(Mock.tube)).toBePromise();
  });

  it('updateTubeCustomMetadata_should_throw_error_if_participantRest_is_not_initialized', () => {
    expect(service.updateTubeCustomMetadata).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
  });


  it('getTubeMedataDataByType_should_invoke_configurationRest_method_and_return_promise', () => {
    service.initialize();
    expect(service.getTubeMedataDataByType(Mock.tube.type)).toBePromise();
  });

  it('getTubeMedataDataByType_should_throw_error_if_configurationRest_is_not_initialized', () => {
    expect(service.getTubeMedataDataByType).toThrowError(UNINITIALIZED_REST_ERROR_MESSAGE);
  });


  function _mockInitialize(){
    Mock.tube = Test.utils.data.tube;
  }

});