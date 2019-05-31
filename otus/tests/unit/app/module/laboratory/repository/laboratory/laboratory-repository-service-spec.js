describe('LaboratoryRepositoryService Test', function () {

  var service;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.laboratory.repository');
  });

  beforeEach(function () {
    Mock.LaboratoryCollectionService = {
      useParticipant: function () {
      },
      initializeLaboratory: function () {
      },
      update: function () {
      },
      updateTubeCollectionData: function () {
      },
      updateAliquots: function () {
      },
      deleteAliquot: function () {
      },
      getLaboratory: function () {
      },
      getDescriptors: function () {
      },
      getAliquotDescriptors: function () {
      },
      getCheckingExist: function () {
      },
      getAliquots: function () {
      },
      getLots: function () {
      },
      createLot: function () {
      },
      updateLot: function () {
      },
      deleteLot: function () {
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.repository.LaboratoryCollectionService', Mock.LaboratoryCollectionService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      service = $injector.get('otusjs.laboratory.repository.LaboratoryRepositoryService', Injections);
      spyOn(Mock.LaboratoryCollectionService, 'getCheckingExist').and.returnValue(Promise.resolve({}));
    });
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
    expect(service.getCheckingExist).toBeDefined();
    expect(service.getLaboratoryDescriptors).toBeDefined();
    expect(service.getAliquotsDescriptors).toBeDefined();
    expect(service.getAliquotsDescriptors).toBeDefined();
    expect(service.getAliquots).toBeDefined();
    expect(service.getLots).toBeDefined();
    expect(service.createLot).toBeDefined();
    expect(service.updateLot).toBeDefined();
    expect(service.deleteLot).toBeDefined();
    expect(service.deleteAliquot).toBeDefined();
  });

  it('getCheckingExist method should to call getCheckingExist method', function () {
    service.getCheckingExist();

    expect(Mock.LaboratoryCollectionService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

});