describe('MaterialTransportationService_UnitTest_Suite', () => {

  var Mock = {};
  var Injections = [];
  var service;

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject( ($injector) => {
      Injections.$q = $injector.get('$q');
      Injections.TransportationService = $injector.get('otusjs.laboratory.transportation.TransportationService');
      Injections.LaboratoryConfigurationService = $injector.get('otusjs.laboratory.business.configuration.LaboratoryConfigurationService');
      Injections.LaboratoryRepositoryService = $injector.get('otusjs.laboratory.repository.LaboratoryRepositoryService');

      service = $injector.get('otusjs.laboratory.business.project.transportation.MaterialTransportationService', Injections);
    });

    _mockInitialize();
  });

  it('service_existence_check', () => {
    expect(service).toBeDefined();
  });

  it('service_methods_existence_check', () => {
    expect(service.createAliquotLot).toBeDefined();
    expect(service.loadAliquotLotFromJson).toBeDefined();

    expect(service.getAliquots).toBeDefined();
    expect(service.getLots).toBeDefined();
    expect(service.getTube).toBeDefined();
    expect(service.createLot).toBeDefined();
    expect(service.updateLot).toBeDefined();
    expect(service.deleteLot).toBeDefined();
    expect(service.getContainerLabelToAliquot).toBeDefined();
  });

  describe('getContainerLabelToAliquot_method', () => {
    const CRYOTUBE = "CRYOTUBE";

    it('should_return_aliquot_container_type_in_case_CRYOTUBE', () => {
      Mock.aliquot = { container: CRYOTUBE };
      expect(service.getContainerLabelToAliquot(Mock.aliquot)).toBe("Criotubo");
    });

    it('should_return_aliquot_container_type_in_case_not_CRYOTUBE', () => {
      Mock.aliquot = { container: CRYOTUBE+"x" };
      expect(service.getContainerLabelToAliquot(Mock.aliquot)).toBe("Palheta");
    });
  });

  it('createAliquotLot_method_should_return_TransportationService_createAliquotLot_result', () => {
    const result = {};
    spyOn(Injections.TransportationService, 'createAliquotLot').and.returnValue(result);
    expect(service.createAliquotLot()).toEqual(result);
  });

  it('loadAliquotLotFromJson_should_return_TransportationService_buildAliquotLotFromJson_result', () => {
    Mock.lotJSON = { a: 1 };
    Mock.expectedResult = { b: 0 };
    spyOn(Injections.TransportationService, 'buildAliquotLotFromJson').and.returnValue(Mock.expectedResult);
    const result = service.loadAliquotLotFromJson(Mock.lotJSON);
    expect(result).toEqual(Mock.expectedResult);
    expect(Injections.TransportationService.buildAliquotLotFromJson).toHaveBeenCalledWith(Mock.lotJSON);
  });

  describe('getAliquots_method', () => {
    function _getAliquotsTest(promise){
      Mock.lotAliquot = { code: 0 };
      Mock.unique = { x: true };
      spyOn(Injections.LaboratoryRepositoryService, 'getAliquots').and.returnValue(promise);
      expect(service.getAliquots(Mock.lotAliquot, Mock.unique)).toBePromise();
      expect(Injections.LaboratoryRepositoryService.getAliquots).toHaveBeenCalledWith(Mock.lotAliquot, Mock.unique);
    }

    it('should_return_resolved_promise', () => {
      _getAliquotsTest(Promise.resolve({}));
    });

    it('should_return_rejected_promise', () => {
      _getAliquotsTest(Promise.reject('error'));
    });
  });

  describe('getTube_method', () => {
    function _getTubeTest(promise){
      Mock.locationPointId = "123456";
      Mock.tubeCode = "331005009";
      spyOn(Injections.LaboratoryRepositoryService, 'getTube').and.returnValue(promise);
      expect(service.getTube(Mock.locationPointId, Mock.tubeCode)).toBePromise();
      expect(Injections.LaboratoryRepositoryService.getTube).toHaveBeenCalledWith(Mock.locationPointId, Mock.tubeCode);
    }

    it('should_return_resolved_promise', () => {
      _getTubeTest(Promise.resolve({}));
    });

    it('should_return_rejected_promise', () => {
      _getTubeTest(Promise.reject('error'));
    });
  });

  describe('getLots_method', () => {
    function _getLotsTest(promise){
      Mock.locationPointId = "123456";
      spyOn(Injections.LaboratoryConfigurationService, 'fetchAliquotsDescriptors').and.returnValue(Promise.resolve());
      spyOn(Injections.LaboratoryRepositoryService, 'getLots').and.returnValue(promise);
      spyOn(Injections.TransportationService, 'buildAliquotLotFromJson').and.returnValue({});
      expect(service.getLots(Mock.locationPointId)).toBePromise();
    }

    it('should_return_resolved_promise', () => {
      _getLotsTest(Promise.resolve({}));
    });

    it('should_return_rejected_promise', () => {
      _getLotsTest(Promise.reject('error'));
    });
  });

  describe('fetchConfiguration_method', () => {
    function _fetchConfigurationTest(promise){
      spyOn(Injections.LaboratoryConfigurationService, 'fetchAliquotsDescriptors').and.returnValue(promise);
      expect(service.fetchConfiguration()).toBePromise();
      expect(Injections.LaboratoryConfigurationService.fetchAliquotsDescriptors).toHaveBeenCalledTimes(1);
    }

    it('should_return_resolved_promise', () => {
      _fetchConfigurationTest(Promise.resolve({}));
    });
  });

  describe('createLot_method', () => {
    function _createLotTest(promise){
      Mock.lotStructure = {};
      spyOn(Injections.LaboratoryRepositoryService, 'createLot').and.returnValue(promise);
      expect(service.createLot(Mock.lotStructure)).toBePromise();
      expect(Injections.LaboratoryRepositoryService.createLot).toHaveBeenCalledWith(Mock.lotStructure);
    }

    it('should_return_resolved_promise', () => {
      _createLotTest(Promise.resolve({}));
    });

    it('should_return_rejected_promise', () => {
      _createLotTest(Promise.reject('error'));
    });
  });

  describe('updateLot_method', () => {
    function _updateLotTest(promise){
      Mock.lotStructure = {};
      spyOn(Injections.LaboratoryRepositoryService, 'updateLot').and.returnValue(promise);
      expect(service.updateLot(Mock.lotStructure)).toBePromise();
      expect(Injections.LaboratoryRepositoryService.updateLot).toHaveBeenCalledWith(Mock.lotStructure);
    }

    it('should_return_resolved_promise', () => {
      _updateLotTest(Promise.resolve({}));
    });

    it('should_return_rejected_promise', () => {
      _updateLotTest(Promise.reject('error'));
    });
  });

  describe('deleteLot_method', () => {
    function _deleteLotTest(promise){
      Mock.lotStructure = {};
      spyOn(Injections.LaboratoryRepositoryService, 'deleteLot').and.returnValue(promise);
      expect(service.deleteLot(Mock.lotStructure)).toBePromise();
      expect(Injections.LaboratoryRepositoryService.deleteLot).toHaveBeenCalledWith(Mock.lotStructure);
    }

    it('should_return_resolved_promise', () => {
      _deleteLotTest(Promise.resolve({}));
    });

    it('should_return_rejected_promise', () => {
      _deleteLotTest(Promise.reject('error'));
    });
  });

  function _mockInitialize(){

  }

});