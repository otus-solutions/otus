describe('MonitoringRestService', function () {
  var Mock = {};
  var service;
  var _rest = {};
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.monitoring.MonitoringRestService';

  beforeEach(function () {
    angular.mock.module('otusjs.deploy.monitoring');
  });

  beforeEach(function () {
    _rest = {
      list: () => {
        return Promise.resolve();
      },
      find: () => {
        return Promise.resolve();
      },
      listAcronyms: () => {
        return Promise.resolve();
      },
      listCenters: () => {
        return Promise.resolve();
      },
      getActivitiesProgressReport: () => {
        return Promise.resolve();
      },
      getStatusOfActivities: () => {
        return Promise.resolve();
      },
      defineActivityWithDoesNotApplies: () => {
        return Promise.resolve();
      },
      deleteNotAppliesOfActivity: () => {
        return Promise.resolve();
      },
      getExamFlagReportLabels: () => {
        return Promise.resolve();
      },
      getExamsProgressReport: () => {
        return Promise.resolve();
      }
    };

    Mock.OtusRestResourceService = {
      getOtusMonitoringResource: function () {
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
      spyOn(Injections.OtusRestResourceService, 'getOtusMonitoringResource').and.callThrough();
      service.initialize();
    });

    it('should initialize be defined', function () {
      expect(service.initialize).toHaveBeenCalled();
      expect(service.initialize).not.toBeNull();
      expect(Injections.OtusRestResourceService.getOtusMonitoringResource).toHaveBeenCalled();
    });
  });

  describe('getExamsName method', function () {
    beforeEach(function () {
      spyOn(service, 'getExamsName').and.callThrough();
      spyOn(_rest, 'getExamFlagReportLabels').and.callThrough();
    });

    it('should getExamsName be defined', function () {
      expect(service.getExamsName).not.toBeNull();
    });

    it('should call _rest.getExamsName', function () {
      service.initialize();
      service.getExamsName();
      expect(_rest.getExamFlagReportLabels).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getExamsName', function () {
      expect(function () { service.getExamsName(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });

  describe('getExamsProgressReport method', function () {
    beforeEach(function () {
      spyOn(service, 'getExamsProgressReport').and.callThrough();
      spyOn(_rest, 'getExamsProgressReport').and.callThrough();
    });

    it('should getExamsProgressReport be defined', function () {
      expect(service.getExamsProgressReport).not.toBeNull();
    });

    it('should call _rest.getExamsProgressReport', function () {
      service.initialize();
      service.getExamsProgressReport();
      expect(_rest.getExamsProgressReport).toHaveBeenCalledTimes(1);
    });

    it('should not call _rest.getExamsProgressReport', function () {
      expect(function () { service.getExamsProgressReport(); }).toThrow(new Error('REST resource is not initialized.'));
    });
  });
});
