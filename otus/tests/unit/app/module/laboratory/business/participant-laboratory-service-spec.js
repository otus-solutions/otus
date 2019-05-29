describe('otusParticipantLaboratoryService', function() {

  var UNIT_NAME = 'otusjs.laboratory.business.participant.ParticipantLaboratoryService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    angular.mock.module('otusjs.laboratory.repository');
    angular.mock.module('otusjs.laboratory.configuration');
    angular.mock.module('otusjs.laboratory.storage');
    angular.mock.module('otusjs.laboratory.business');
    angular.mock.module('otusjs.laboratory.core');
    angular.mock.module('otusjs.laboratory.business');
    angular.mock.module('otusjs.laboratory.participant');
  });


  beforeEach(function() {

    inject(function(_$injector_) {

      Injections.LaboratoryRepositoryService = _$injector_.get('otusjs.laboratory.repository.LaboratoryRepositoryService');
      Injections.ContextService = _$injector_.get('otusjs.laboratory.core.ContextService');
      Injections.EventService = _$injector_.get('otusjs.laboratory.core.EventService');
      Injections.LaboratoryLabelFactory = _$injector_.get('otusjs.laboratory.business.participant.LaboratoryLabelFactory');
      Injections.ParticipantLaboratoryFactory = _$injector_.get('otusjs.laboratory.participant.ParticipantLaboratoryFactory');

      service = _$injector_.get(UNIT_NAME, Injections);
    });

  });

  describe('populateAliquotsArray method', function() {


    beforeEach(function() {

    });

    it('should verify a aliquot struture', function() {
      spyOn(Injections.LaboratoryRepositoryService,"convertStorageAliquot");
      service.convertStorageAliquot({});

      expect(Injections.LaboratoryRepositoryService.convertStorageAliquot).toHaveBeenCalled();
    });

  });


});
