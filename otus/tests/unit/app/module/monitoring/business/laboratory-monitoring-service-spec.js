describe('LaboratoryMonitoringService Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    mockInjections();

    angular.mock.module('otusjs.monitoring.business', function ($provide) {
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('otusjs.laboratory.configuration.AliquotDescriptorsService', Mock.AliquotDescriptorsService);
      $provide.value('otusjs.model.chart.VerticalBarFactory', Mock.VerticalBarFactory);
      $provide.value('otusjs.monitoring.repository.MonitoringCollectionService', Mock.MonitoringCollectionService);
    });

    inject(function (_$injector_) {
      Injections = {
        "$q": _$injector_.get('$q'),
        "LoadingScreenService": _$injector_.get('otusjs.deploy.LoadingScreenService'),
        "AliquotDescriptorsService": _$injector_.get('otusjs.laboratory.configuration.AliquotDescriptorsService'),
        "VerticalBarFactory": _$injector_.get('otusjs.model.chart.VerticalBarFactory'),
        "MonitoringCollectionService": _$injector_.get('otusjs.monitoring.repository.MonitoringCollectionService')
      };

      service = _$injector_.get('otusjs.monitoring.business.LaboratoryMonitoringService', Injections);
    });

    spyOn(Injections.$q, "defer").and.callThrough();
    spyOn(window, "alasql").and.callThrough();
    spyOn(Mock.AliquotDescriptorsService, "getLabel").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "getDataOfStorageByAliquots").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "getDataByExam").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "getDataOrphanByExams").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "getDataOfPendingResultsByAliquots").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "getDataQuantitativeByTypeOfAliquots").and.callThrough();
    spyOn(Mock.MonitoringCollectionService, "getDataToCSVOfPendingResultsByAliquots").and.callThrough();
    spyOn(Mock.LoadingScreenService, "changeMessage").and.callThrough();
    spyOn(Mock.LoadingScreenService, "start").and.callThrough();
    spyOn(Mock.LoadingScreenService, "finish").and.callThrough();
  });

  describe('getDataOfPendingResultsByAliquots Method', function () {

    beforeEach(function () {
      spyOn(Mock.VerticalBarFactory, "fromJsonObject").and.callThrough();
    });

    it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function () {
      service.getDataOfPendingResultsByAliquots("RS");
      expect(Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots).toHaveBeenCalledTimes(1);
    });

    it('should call VerticalBarFactory.fromJsonObject', function () {
      service.getDataOfPendingResultsByAliquots("RS");
      Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots("RS").then(() => {
        expect(Injections.VerticalBarFactory.fromJsonObject).toHaveBeenCalledTimes(1);
      }).catch(() => {
        fail()
      });
    });

    it('should not call VerticalBarFactory.fromJsonObject', function () {
      service.getDataOfPendingResultsByAliquots("RS");
      Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots().then(() => {
        fail()
      }).catch(() => {
      });
    });

    it('should create promise', function () {
      service.getDataOfPendingResultsByAliquots("RS");
      expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDataQuantitativeByTypeOfAliquots Method', function () {

    beforeEach(function () {
      spyOn(Mock.VerticalBarFactory, "fromJsonObject").and.callThrough();
    });

    it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function () {
      service.getDataQuantitativeByTypeOfAliquots("RS");
      expect(Injections.MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots).toHaveBeenCalledTimes(1);
    });

    it('should call VerticalBarFactory.fromJsonObject', function () {
      service.getDataQuantitativeByTypeOfAliquots("RS");
      Injections.MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots("RS").then(() => {
        expect(Injections.VerticalBarFactory.fromJsonObject).toHaveBeenCalledTimes(1);
      }).catch(() => {
        fail()
      });
    });

    it('should not call VerticalBarFactory.fromJsonObject', function () {
      service.getDataQuantitativeByTypeOfAliquots("RS");
      Injections.MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots().then(() => {
        fail()
      }).catch(() => {
      });
    });

    it('should create promise', function () {
      service.getDataQuantitativeByTypeOfAliquots("RS");
      expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDataOrphanByExams Method', function () {

    it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function () {
      service.getDataOrphanByExams("RS");
      expect(Injections.MonitoringCollectionService.getDataOrphanByExams).toHaveBeenCalledTimes(1);
    });

    it('should call VerticalBarFactory.fromJsonObject', function () {
      service.getDataQuantitativeByTypeOfAliquots("RS");
      Injections.MonitoringCollectionService.getDataOrphanByExams("RS").then(() => {
      }).catch(() => {
        fail()
      });
    });

    it('should not call VerticalBarFactory.fromJsonObject', function () {
      service.getDataQuantitativeByTypeOfAliquots("RS");
      Injections.MonitoringCollectionService.getDataOrphanByExams().then(() => {
        fail()
      }).catch(() => {
      });
    });

    it('should create promise', function () {
      service.getDataQuantitativeByTypeOfAliquots("RS");
      expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDataOfStorageByAliquots Method', function () {

    it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function () {
      service.getDataOfStorageByAliquots("RS");
      expect(Injections.MonitoringCollectionService.getDataOfStorageByAliquots).toHaveBeenCalledTimes(1);
    });

    it('should call VerticalBarFactory.fromJsonObject', function () {
      service.getDataOfStorageByAliquots("RS");
      Injections.MonitoringCollectionService.getDataOfStorageByAliquots("RS").then(() => {
      }).catch(() => {
        fail()
      });
    });

    it('should not call VerticalBarFactory.fromJsonObject', function () {
      service.getDataOfStorageByAliquots("RS");
      Injections.MonitoringCollectionService.getDataOfStorageByAliquots().then(() => {
        fail()
      }).catch(() => {
      });
    });

    it('should not call AliquotDescriptorsService.getLabel', function () {
      service.getDataOfStorageByAliquots("RS");
      Injections.MonitoringCollectionService.getDataOfStorageByAliquots("RS").then(() => {
        expect(Injections.AliquotDescriptorsService.getLabel).toHaveBeenCalledTimes(1);
      }).catch(() => {
        fail()
      });
    });

    it('should create promise', function () {
      service.getDataOfStorageByAliquots("RS");
      expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDataByExam Method', function () {

    it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function () {
      service.getDataByExam("RS");
      expect(Injections.MonitoringCollectionService.getDataByExam).toHaveBeenCalledTimes(1);
    });

    it('should call VerticalBarFactory.fromJsonObject', function () {
      service.getDataByExam("RS");
      Injections.MonitoringCollectionService.getDataByExam("RS").then(() => {
      }).catch(() => {
        fail()
      });
    });

    it('should not call VerticalBarFactory.fromJsonObject', function () {
      service.getDataByExam("RS");
      Injections.MonitoringCollectionService.getDataByExam().then(() => {
        fail()
      }).catch(() => {
      });
    });

    it('should create promise', function () {
      service.getDataByExam("RS");
      expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });
  });

  describe('downloadCSVFileOfPendingResultsByAliquots Method', function () {

    it('should call LoadingScreenService.changeMessage', function () {
      service.downloadCSVFileOfPendingResultsByAliquots("RS");
      expect(Injections.LoadingScreenService.changeMessage).toHaveBeenCalledWith('Por favor, aguarde! Estamos gerando o arquivo para download.');
    });

    it('should call LoadingScreenService.start', function () {
      service.downloadCSVFileOfPendingResultsByAliquots("RS");
      expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
    });

    it('should call LoadingScreenService.finish', function () {
      service.downloadCSVFileOfPendingResultsByAliquots("RS")
      Injections.MonitoringCollectionService.getDataToCSVOfPendingResultsByAliquots().then(()=>{}).catch(()=>{}).finally(() => {
        expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
      });
    });

    it('should call Window.alasql', function () {
      service.downloadCSVFileOfPendingResultsByAliquots("RS")
      Injections.MonitoringCollectionService.getDataToCSVOfPendingResultsByAliquots("RS").then(()=>{
        expect(window.alasql).toHaveBeenCalledWith('SELECT [aliquot] AS [Alíquota], [transported] AS [Transportada], [prepared] AS [Preparada] INTO CSV("monitoramento-laboratorial-resultados-pendentes-'.concat(new Date().toLocaleDateString()).concat('.csv") FROM ? ') , [[{title: "teste"}]])
      }).catch(()=>{}).finally(() =>{});
    });

    it('should not call Window.alasql', function () {
      service.downloadCSVFileOfPendingResultsByAliquots("RS")
      Injections.MonitoringCollectionService.getDataToCSVOfPendingResultsByAliquots().then(()=>{
        fail()
      }).catch(()=>{}).finally(() =>{});
    });

    it('should create promise', function () {
      service.downloadCSVFileOfPendingResultsByAliquots("RS");
      expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });
  });

  describe('downloadCSVFileOfOrphansByExam Method', function () {

    it('should call LoadingScreenService.changeMessage', function () {
      service.downloadCSVFileOfOrphansByExam("RS");
      expect(Injections.LoadingScreenService.changeMessage).toHaveBeenCalledWith('Por favor, aguarde! Estamos gerando o arquivo para download.');
    });

    it('should call LoadingScreenService.start', function () {
      service.downloadCSVFileOfOrphansByExam("RS");
      expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
    });

    it('should call LoadingScreenService.finish', function () {
      service.downloadCSVFileOfOrphansByExam("RS");
      Injections.MonitoringCollectionService.getDataToCSVOfOrphansByExam().then(()=>{}).catch(()=>{}).finally(() => {
        expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
      });
    });

    it('should call Window.alasql', function () {
      service.downloadCSVFileOfOrphansByExam();
      Injections.MonitoringCollectionService.getDataToCSVOfOrphansByExam("RS").then(()=>{
        expect(window.alasql).toHaveBeenCalledWith('SELECT [aliquotCode] AS [Alíquota], [examName] AS [Exame] INTO CSV("monitoramento-laboratorial-exame-orfaos-'.concat(new Date().toLocaleDateString()).concat('.csv") FROM ? ') , [[{title: "teste"}]])
      }).catch(()=>{
      }).finally(() =>{});
    });

    it('should create promise', function () {
      service.downloadCSVFileOfOrphansByExam("RS");
      expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });
  });


  function mockInjections() {
    Mock.MonitoringCollectionService = {
      getDataOfPendingResultsByAliquots: (center) => {
        if (center === "RS") {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataQuantitativeByTypeOfAliquots: (center) => {
        if (center === "RS") {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataOrphanByExams: (center) => {
        if (center === "RS") {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataOfStorageByAliquots: (center) => {
        if (center === "RS") {
          return Promise.resolve([{title: "teste"}]);
        } else {
          return Promise.reject();
        }
      },
      getDataByExam: (center) => {
        if (center === "RS") {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      getDataToCSVOfPendingResultsByAliquots: (center) => {
        if (center === "RS") {
          return Promise.resolve([{title: "teste"}]);
        } else {
          return Promise.reject();
        }
      },
      getDataToCSVOfOrphansByExam: () => {
          return Promise.resolve([{title: "teste"}]);
      }
    };

    Mock.VerticalBarFactory = {
      fromJsonObject: () => {
      }
    };

    Mock.AliquotDescriptorsService = {
      getLabel: () => {
      }
    };

    Mock.LoadingScreenService = {
      changeMessage: (msg) => {},
      start: () => {},
      finish: () => {}
    };

    window.alasql = () => {
    }
  }

});