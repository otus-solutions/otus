xdescribe('LaboratoryRemoteStorageService Test', function () {

  var service;
  var Mock = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.deploy');
  });

  beforeEach(function () {
    Mock.LaboratoryRestService = {
      create: function () {
      },
      initializeLaboratory: function () {
      },
      getLaboratory: function () {
      },
      updateLaboratoryParticipant: function () {
      },
      updateTubeCollectionData: function () {
      },
      updateAliquots: function () {
      },
      deleteAliquot: function () {
      },
      getDescriptors: function () {
      },
      getAliquotDescriptors: function () {
      },
      getCheckingExist: function () {
      }
    };

    Mock.SampleTransportRestService = {
      create: function () {
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
      $provide.value('otusjs.deploy.LaboratoryRestService', Mock.LaboratoryRestService);
      $provide.value('otusjs.deploy.SampleTransportRestService', Mock.SampleTransportRestService);
    });
  });

  beforeEach(function () {
    angular.mock.inject(function ($injector, $q) {
      Injections = { "$q": $q };
      service = $injector.get('otusjs.deploy.LaboratoryRemoteStorageService', Injections);
      spyOn(Mock.LaboratoryRestService, 'getCheckingExist').and.returnValue(Promise.resolve({}));
    });
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
    expect(service.getDescriptors).toBeDefined();
    expect(service.getAliquotDescriptors).toBeDefined();
    expect(service.getCheckingExist).toBeDefined();
    expect(service.getAliquots).toBeDefined();
    expect(service.getLots).toBeDefined();
    expect(service.createLot).toBeDefined();
    expect(service.updateLot).toBeDefined();
    expect(service.deleteLot).toBeDefined();
  });

  it('getCheckingExist method should to call getCheckingExist method', function () {
    service.getCheckingExist();

    expect(Mock.LaboratoryRestService.getCheckingExist).toHaveBeenCalledTimes(1);
  });

});