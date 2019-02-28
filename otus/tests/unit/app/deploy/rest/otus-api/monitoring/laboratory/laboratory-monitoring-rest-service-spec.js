describe('LaboratoryMonitoringRestService', function () {
  var Mock = {};
  var service;
  var _rest = {};
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.monitoring.LaboratoryMonitoringRestService';

  beforeEach(function () {
    angular.mock.module('otusjs.deploy.monitoring');
  });

  beforeEach(function () {
    _rest = {
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

    Mock.OtusRestResourceService = {
      getOtusLaboratoryMonitoringResource: function () {
        return _rest;
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function (_$injector_) {
      Injections = {
        OtusRestResourceService: _$injector_.get('OtusRestResourceService')
      };

      service = _$injector_.get(UNIT_NAME, Injections);
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

  describe('getDataOfPendingResultsByAliquots method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataOfPendingResultsByAliquots').and.callThrough();
      spyOn(_rest, 'getDataOfPendingResultsByAliquots').and.callThrough();
    });

    it('should getDataOfPendingResultsByAliquots be defined', function () {
      expect(service.getDataOfPendingResultsByAliquots).not.toBeNull();
    });

    it('should call _rest.getDataOfPendingResultsByAliquots', function () {
      service.initialize();
      service.getDataOfPendingResultsByAliquots();
      expect(_rest.getDataOfPendingResultsByAliquots).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getDataOfPendingResultsByAliquots', function () {
      expect(function(){ service.getDataOfPendingResultsByAliquots(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

  describe('getDataQuantitativeByTypeOfAliquots method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataQuantitativeByTypeOfAliquots').and.callThrough();
      spyOn(_rest, 'getDataQuantitativeByTypeOfAliquots').and.callThrough();
    });

    it('should getDataOfPendingResultsByAliquots be defined', function () {
      expect(service.getDataQuantitativeByTypeOfAliquots).not.toBeNull();
    });

    it('should call _rest.getDataOfPendingResultsByAliquots', function () {
      service.initialize();
      service.getDataQuantitativeByTypeOfAliquots();
      expect(_rest.getDataQuantitativeByTypeOfAliquots).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getDataOfPendingResultsByAliquots', function () {
      expect(function(){ service.getDataQuantitativeByTypeOfAliquots(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

  describe('getDataOrphanByExams method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataOrphanByExams').and.callThrough();
      spyOn(_rest, 'getDataOrphanByExams').and.callThrough();
    });

    it('should getDataOfPendingResultsByAliquots be defined', function () {
      expect(service.getDataOrphanByExams).not.toBeNull();
    });

    it('should call _rest.getDataOfPendingResultsByAliquots', function () {
      service.initialize();
      service.getDataOrphanByExams();
      expect(_rest.getDataOrphanByExams).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getDataOfPendingResultsByAliquots', function () {
      expect(function(){ service.getDataOrphanByExams(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

  describe('getDataOfStorageByAliquots method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataOfStorageByAliquots').and.callThrough();
      spyOn(_rest, 'getDataOfStorageByAliquots').and.callThrough();
    });

    it('should getDataOfPendingResultsByAliquots be defined', function () {
      expect(service.getDataOfStorageByAliquots).not.toBeNull();
    });

    it('should call _rest.getDataOfPendingResultsByAliquots', function () {
      service.initialize();
      service.getDataOfStorageByAliquots();
      expect(_rest.getDataOfStorageByAliquots).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getDataOfPendingResultsByAliquots', function () {
      expect(function(){ service.getDataOfStorageByAliquots(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

  describe('getDataByExam method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataByExam').and.callThrough();
      spyOn(_rest, 'getDataByExam').and.callThrough();
    });

    it('should getDataByExam be defined', function () {
      expect(service.getDataByExam).not.toBeNull();
    });

    it('should call _rest.getDataByExam', function () {
      service.initialize();
      service.getDataByExam();
      expect(_rest.getDataByExam).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getDataByExam', function () {
      expect(function(){ service.getDataByExam(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

  describe('getDataToCSVOfPendingResultsByAliquots method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataToCSVOfPendingResultsByAliquots').and.callThrough();
      spyOn(_rest, 'getDataToCSVOfPendingResultsByAliquots').and.callThrough();
    });

    it('should getDataToCSVOfPendingResultsByAliquots be defined', function () {
      expect(service.getDataToCSVOfPendingResultsByAliquots).not.toBeNull();
    });

    it('should call _rest.getDataToCSVOfPendingResultsByAliquots', function () {
      service.initialize();
      service.getDataToCSVOfPendingResultsByAliquots();
      expect(_rest.getDataToCSVOfPendingResultsByAliquots).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getDataToCSVOfPendingResultsByAliquots', function () {
      expect(function(){ service.getDataToCSVOfPendingResultsByAliquots(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

  describe('getDataToCSVOfOrphansByExam method', function () {
    beforeEach(function () {
      spyOn(service, 'getDataToCSVOfOrphansByExam').and.callThrough();
      spyOn(_rest, 'getDataToCSVOfOrphansByExam').and.callThrough();
    });

    it('should getDataToCSVOfOrphansByExam be defined', function () {
      expect(service.getDataToCSVOfOrphansByExam).not.toBeNull();
    });

    it('should call _rest.getDataToCSVOfPendingResultsByAliquots', function () {
      service.initialize();
      service.getDataToCSVOfOrphansByExam();
      expect(_rest.getDataToCSVOfOrphansByExam).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getDataToCSVOfPendingResultsByAliquots', function () {
      expect(function(){ service.getDataToCSVOfOrphansByExam(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

});
