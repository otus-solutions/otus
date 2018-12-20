xdescribe('otusParticipantHeatmap test', function () {
  const CENTER_RS = 'RS';
  const PENDING = 'pending';
  const QUANTITATIVE = 'quantitative';
  const ORPHAN = 'orphan';
  const STORAGE = 'storage';
  const EXAM = 'exam';

  var Mock = {};
  var ctrl;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');

    Mock.SessionContextService = {
      getData: function () { }
    };

    Mock.LoadingScreenService = {
      start: function () { },
      finish: function () { }
    };

    Mock.FieldCenterRestService = {
      loadCenters: function () {
        return Promise.resolve();
      }
    };

    Mock.LaboratoryMonitoringService = {
      downloadCSVFileOfPendingResultsByAliquots: function () {
        return Promise.resolve();
      },
      downloadCSVFileOfOrphansByExam: function () {
        return Promise.resolve();
      },
      getDataOfPendingResultsByAliquots: function (bol) {
        if (bol) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataQuantitativeByTypeOfAliquots: function () {
        return Promise.resolve();
      },
      getDataOrphanByExams: function () {
        return Promise.resolve();
      },
      getDataOfStorageByAliquots: function () {
        return Promise.resolve();
      },
      getDataByExam: function () {
        return Promise.resolve();
      }
    };

    Mock.BarChartsVerticalFactory = {
      create: function () { }
    };

    Mock.BarChartsHorizontalFactory = {
      create: function () { }
    };

    angular.mock.module(function ($provide) {
      $provide.value('$filter', Mock.$filter);
      $provide.value('otusjs.application.session.core.ContextService', Mock.SessionContextService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('otusjs.deploy.FieldCenterRestService', Mock.FieldCenterRestService);
      $provide.value('otusjs.monitoring.business.LaboratoryMonitoringService', Mock.LaboratoryMonitoringService);
      $provide.value('otusjs.otus.uxComponent.BarChartsVerticalFactory', Mock.BarChartsVerticalFactory);
      $provide.value('otusjs.otus.uxComponent.BarChartsHorizontalFactory', Mock.BarChartsHorizontalFactory);
    });

    inject(function (_$injector_, _$controller_) {
      Injections = {
        $q: _$injector_.get('$q'),
        $filter: _$injector_.get('$filter'),
        SessionContextService: _$injector_.get('otusjs.application.session.core.ContextService'),
        LoadingScreenService: _$injector_.get('otusjs.deploy.LoadingScreenService'),
        FieldCenterRestService: _$injector_.get('otusjs.deploy.FieldCenterRestService'),
        LaboratoryMonitoringService: _$injector_.get('otusjs.monitoring.business.LaboratoryMonitoringService'),
        BarChartsVerticalFactory: _$injector_.get('otusjs.otus.uxComponent.BarChartsVerticalFactory'),
        BarChartsHorizontalFactory: _$injector_.get('otusjs.otus.uxComponent.BarChartsHorizontalFactory')
      };

      ctrl = _$controller_('otusLaboratoryMonitoringDashboardCtrl', Injections);
    });
  });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(ctrl, 'openTabPendingResultsByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfPendingResultsByAliquots').and.callThrough();
      ctrl.$onInit();
    });

    it('should be defined', () => {
      expect(ctrl.$onInit).not.toBeNull();
      expect(ctrl.$onInit).toHaveBeenCalled();
      // expect(ctrl.openTabPendingResultsByAliquots).toHaveBeenCalled();
    });
  });

  describe('downloadCSVFile method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'downloadCSVFile').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'downloadCSVFileOfPendingResultsByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'downloadCSVFileOfOrphansByExam').and.callThrough();
    });

    it('should call method downloadCSVFileOfPendingResultsByAliquots when current download is to file of pending results', () => {
      ctrl.downloadCSVFile(PENDING);

      expect(Injections.LaboratoryMonitoringService.downloadCSVFileOfPendingResultsByAliquots).toHaveBeenCalled();
    });

    it('should call method downloadCSVFileOfOrphansByExam when current download is to file of orphans by exam', () => {
      ctrl.downloadCSVFile(jasmine.any(Object));

      expect(Injections.LaboratoryMonitoringService.downloadCSVFileOfOrphansByExam).toHaveBeenCalled();
    });
  });

  describe('loadData method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'loadData').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfPendingResultsByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataQuantitativeByTypeOfAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfStorageByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataByExam').and.callThrough();
      spyOn(Injections.BarChartsVerticalFactory, 'create').and.callThrough();
      spyOn(Injections.BarChartsHorizontalFactory, 'create').and.scallThrough();
    });

    it('when method loadData is called then variable centerFilter should receive value of parameter', () => {
      ctrl.loadData(jasmine.any(Object), CENTER_RS);

      expect(ctrl.centerFilter).toBe(CENTER_RS);
    });

    it('when method loadData is called with currentTab equal to pending then method getDataOfPendingResultsByAliquots should be called', () => {
      ctrl.loadData(PENDING, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataOfPendingResultsByAliquots).toHaveBeenCalledTimes(1);
      Injections.LaboratoryMonitoringService.getDataOfPendingResultsByAliquots(true).then(() => { }).catch(() => { fail() })
    });

    it('when method loadData is called with currentTab equal to quantitative then method getDataOfPendingResultsByAliquots should be called', () => {
      ctrl.loadData(QUANTITATIVE, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots).toHaveBeenCalled();
    });

    it('when method loadData is called with currentTab equal to storage then method getDataOfPendingResultsByAliquots should be called', () => {
      ctrl.loadData(STORAGE, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataOfStorageByAliquots).toHaveBeenCalled();
    });

    it('when method loadData is called with currentTab equal to exam then method getDataOfPendingResultsByAliquots should be called', () => {
      ctrl.loadData(EXAM, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataByExam).toHaveBeenCalled();
    });
  });
});

