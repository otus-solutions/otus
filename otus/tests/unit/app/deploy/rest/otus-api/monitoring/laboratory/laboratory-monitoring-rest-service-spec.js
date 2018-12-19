xdescribe('LaboratoryMonitoringRestService', function () {
  var Mock = {};
  var service;
  var modulo;
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.LaboratoryMonitoringRestService';

  beforeEach(function () {
    angular.mock.module('otusjs.deploy');
  });

  beforeEach(function () {
    Mock.OtusRestResourceService = {
      getOtusLaboratoryMonitoringResource: function () {
        return {
          getDataOfPendingResultsByAliquots: () => {
            return Promise.resolve();
          },
          getDataQuantitativeByTypeOfAliquots: () => {
            return Promise.resolve();
          },
          getDataOrphanByExams: () => {
            return Promise.resolve();
          },
          getDataOfStorageByAliquots: () => {
            return Promise.resolve();
          },
          getDataByExam: () => {
            return Promise.resolve();
          },
          getDataToCSVOfPendingResultsByAliquots: () => {
            return Promise.resolve();
          },
          getDataToCSVOfOrphansByExam: () => {
            return Promise.resolve();
          }
        };
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      Injections = {
        OtusRestResourceService: _$injector_.get('OtusRestResourceService')
      };
      service = _$injector_.get(UNIT_NAME, Injections);
      service.initialize();
    });
  });
  describe('initialize method', function () {
    beforeEach(function () {
      spyOn(service, 'initialize').and.callThrough();
      spyOn(Injections.OtusRestResourceService, 'getOtusLaboratoryMonitoringResource').and.callThrough();
      service.initialize();
    });

    it('should initialize be defined', function () {
      expect(service.initialize).toHaveBeenCalled();
      expect(service.initialize).not.toBeNull();
      expect(Injections.OtusRestResourceService.getOtusLaboratoryMonitoringResource).toHaveBeenCalled();
    });
  });

  xdescribe('getDataOfPendingResultsByAliquots method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataOfPendingResultsByAliquots').and.callThrough();
      service.getDataOfPendingResultsByAliquots();
    });

    it('should getDataOfPendingResultsByAliquots be defined', function () {
      expect(service.getDataOfPendingResultsByAliquots).toHaveBeenCalled();
      expect(service.getDataOfPendingResultsByAliquots).not.toBeNull();
    });
  });

});
