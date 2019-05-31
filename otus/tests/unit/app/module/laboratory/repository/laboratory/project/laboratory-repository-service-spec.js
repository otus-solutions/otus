describe('otusLaboratoryRepositoryService', function() {

  var UNIT_NAME = 'otusjs.laboratory.repository.LaboratoryRepositoryService';
  var Injections = {};
  var service = {};

  beforeEach(function() {
    angular.mock.module('otusjs.laboratory.repository');
    angular.mock.module('otusjs.laboratory.core');
    angular.mock.module('otusjs.laboratory.storage');
  });

  beforeEach(function() {

    inject(function(_$injector_) {

      Injections.ModuleService = _$injector_.get('otusjs.laboratory.core.ModuleService');
      Injections.LaboratoryCollectionService = _$injector_.get('otusjs.laboratory.repository.LaboratoryCollectionService');

      service = _$injector_.get(UNIT_NAME, Injections);
    });

  });

  describe('convertStorageAliquot method', function() {

    it('should call LaboratoryCollectionService convertStorageAliquot', function() {
      spyOn(Injections.LaboratoryCollectionService,"convertStorageAliquot");
      service.convertStorageAliquot({});
      expect(Injections.LaboratoryCollectionService.convertStorageAliquot).toHaveBeenCalled();
    });

  });

});
