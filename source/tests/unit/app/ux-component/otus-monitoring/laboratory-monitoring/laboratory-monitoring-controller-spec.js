describe('otusParticipantHeatmap test', function () {
  const CENTER_RS = 'RS';
  const CENTER_RJ = 'RJ';
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
      downloadCSVFileOfPendingResultsByAliquots: function (center) {
        return Promise.resolve();
      },
      downloadCSVFileOfOrphansByExam: function () {
        return Promise.resolve();
      },
      getDataOfPendingResultsByAliquots: function (center) {
        if (center === CENTER_RS) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataQuantitativeByTypeOfAliquots: function (center) {
        if (center === CENTER_RS) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataOrphanByExams: function () {
        return Promise.resolve();
      },
      getDataOfStorageByAliquots: function (center) {
        if (center === CENTER_RS) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataByExam: function (center) {
        if (center === CENTER_RS) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }
    };

    Mock.BarChartsVerticalFactory = {
      create: function () { }
    };

    Mock.BarChartsHorizontalFactory = {
      create: function () { }
    };

    Mock.LaboratoryViewerService = Test.utils.data.LaboratoryViewerService;

    angular.mock.module(function ($provide) {
      $provide.value('$filter', Mock.$filter);
      $provide.value('otusjs.application.session.core.ContextService', Mock.SessionContextService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('otusjs.deploy.FieldCenterRestService', Mock.FieldCenterRestService);
      $provide.value('otusjs.monitoring.business.LaboratoryMonitoringService', Mock.LaboratoryMonitoringService);
      $provide.value('otusjs.otus.uxComponent.BarChartsVerticalFactory', Mock.BarChartsVerticalFactory);
      $provide.value('otusjs.otus.uxComponent.BarChartsHorizontalFactory', Mock.BarChartsHorizontalFactory);
      $provide.value('otusjs.application.dialog.DialogShowService', []);
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Mock.LaboratoryViewerService);
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
        BarChartsHorizontalFactory: _$injector_.get('otusjs.otus.uxComponent.BarChartsHorizontalFactory'),
        DialogShowService: _$injector_.get('otusjs.application.dialog.DialogShowService'),
        LaboratoryViewerService: _$injector_.get('otusjs.laboratoryViewerService.LaboratoryViewerService')
      };

      ctrl = _$controller_('otusLaboratoryMonitoringDashboardCtrl', Injections);
    });
  });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(ctrl, 'openTabPendingResultsByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfPendingResultsByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
      ctrl.$onInit();
    });

    it('should be defined', (done) => {
      expect(ctrl.$onInit).not.toBeNull();
      expect(ctrl.$onInit).toHaveBeenCalled();
      expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
      expect(ctrl.laboratoryExists ).toEqual(true);
      done();
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

  describe('loadDataByCenter method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'loadDataByCenter').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfPendingResultsByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataQuantitativeByTypeOfAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfStorageByAliquots').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataByExam').and.callThrough();
      spyOn(Injections.BarChartsVerticalFactory, 'create').and.callThrough();
      spyOn(Injections.BarChartsHorizontalFactory, 'create').and.callThrough();
    });

    it('when method loadDataByCenter is called then variable centerFilter should receive value of parameter', () => {
      ctrl.loadDataByCenter(jasmine.any(Object), CENTER_RS);

      expect(ctrl.centerFilter).toBe(CENTER_RS);
    });

    it('when method loadDataByCenter is called with currentTab equal to pending then method getDataOfPendingResultsByAliquots should be called', () => {
      ctrl.loadDataByCenter(PENDING, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataOfPendingResultsByAliquots).toHaveBeenCalled();
    });

    it('when method loadDataByCenter is called with currentTab equal to quantitative then method getDataQuantitativeByTypeOfAliquots should be called', () => {
      ctrl.loadDataByCenter(QUANTITATIVE, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots).toHaveBeenCalled();
    });

    it('when method loadDataByCenter is called with currentTab equal to storage then method getDataOfStorageByAliquots should be called', () => {
      ctrl.loadDataByCenter(STORAGE, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataOfStorageByAliquots).toHaveBeenCalled();
    });

    it('when method loadDataByCenter is called with currentTab equal to exam then method getDataByExam should be called', () => {
      ctrl.loadDataByCenter(EXAM, CENTER_RS);

      expect(Injections.LaboratoryMonitoringService.getDataByExam).toHaveBeenCalled();
    });
  });


  describe('openTabPendingResultsByAliquots method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'loadDataByCenter').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfPendingResultsByAliquots').and.callThrough();
      spyOn(Injections.BarChartsVerticalFactory, 'create').and.callThrough();
    });

    it('should called method getDataOfPendingResultsByAliquots', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabPendingResultsByAliquots();

      expect(Injections.LaboratoryMonitoringService.getDataOfPendingResultsByAliquots).toHaveBeenCalled();
    });

    xit('should called method create of BarChartsVerticalFactory', () => {
      expect(Injections.BarChartsVerticalFactory.create).toHaveBeenCalled();
    });

    it('when the getDataOfPendingResultsByAliquots method returns success, then error variability must be false', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabPendingResultsByAliquots();

      expect(ctrl.error).toBe(false);
    });
  });

  describe('openTabQuantitativeByTypeOfAliquots method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'loadDataByCenter').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataQuantitativeByTypeOfAliquots').and.callThrough();
      spyOn(Injections.BarChartsVerticalFactory, 'create').and.callThrough();
    });

    it('should called method getDataOfPendingResultsByAliquots', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabQuantitativeByTypeOfAliquots();

      expect(Injections.LaboratoryMonitoringService.getDataQuantitativeByTypeOfAliquots).toHaveBeenCalled();
    });

    xit('should called method create of BarChartsVerticalFactory', () => {
      expect(Injections.BarChartsVerticalFactory.create).toHaveBeenCalled();
    });

    it('when the getDataQuantitativeByTypeOfAliquots method returns success, then error variability must be false', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabQuantitativeByTypeOfAliquots();

      expect(ctrl.error).toBe(false);
    });
  });

  describe('openTabOrphanByExams method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'loadDataByCenter').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOrphanByExams').and.callThrough();
      spyOn(Injections.BarChartsHorizontalFactory, 'create').and.callThrough();
    });

    it('should called method getDataOfPendingResultsByAliquots', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabOrphanByExams();

      expect(Injections.LaboratoryMonitoringService.getDataOrphanByExams).toHaveBeenCalled();
    });

    xit('should called method create of BarChartsHorizontalFactory', () => {
      expect(Injections.BarChartsHorizontalFactory.create).toHaveBeenCalled();
    });

    it('when the getDataOrphanByExams method returns success, then error variability must be false', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabOrphanByExams();

      expect(ctrl.error).toBe(false);
    });
  });

  describe('openTabStorageByAliquots method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'loadDataByCenter').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataOfStorageByAliquots').and.callThrough();
      spyOn(Injections.BarChartsHorizontalFactory, 'create').and.callThrough();
    });

    it('should called method getDataOfPendingResultsByAliquots', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabStorageByAliquots();

      expect(Injections.LaboratoryMonitoringService.getDataOfStorageByAliquots).toHaveBeenCalled();
    });

    xit('should called method create of BarChartsHorizontalFactory', () => {
      expect(Injections.BarChartsHorizontalFactory.create).toHaveBeenCalled();
    });

    it('when the getDataOfStorageByAliquots method returns success, then error variability must be false', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabStorageByAliquots();

      expect(ctrl.error).toBe(false);
    });
  });

  describe('openTabByExam method', () => {
    beforeEach(() => {
      spyOn(ctrl, 'loadDataByCenter').and.callThrough();
      spyOn(Injections.LaboratoryMonitoringService, 'getDataByExam').and.callThrough();
      spyOn(Injections.BarChartsHorizontalFactory, 'create').and.callThrough();
    });

    it('should called method getDataOfPendingResultsByAliquots', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabByExam();

      expect(Injections.LaboratoryMonitoringService.getDataByExam).toHaveBeenCalled();
    });

    xit('should called method create of BarChartsHorizontalFactory', () => {
      expect(Injections.BarChartsHorizontalFactory.create).toHaveBeenCalled();
    });

    it('when the getDataByExam method returns success, then error variability must be false', () => {
      ctrl.centerFilter = CENTER_RS;
      ctrl.openTabByExam();

      expect(ctrl.error).toBe(false);
    });
  });
});

