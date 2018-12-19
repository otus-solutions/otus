describe('LaboratoryMonitoringService Test', function() {
    var Mock = {};
    var service;
    var Injections = {};

    beforeEach(function() {
        mockInjections();

        angular.mock.module('otusjs.monitoring.business', function($provide) {
            $provide.value('otusjs.deploy.LoadingScreenService', {});
            $provide.value('otusjs.model.chart.VerticalBarFactory', Mock.VerticalBarFactory);
            $provide.value('otusjs.monitoring.repository.MonitoringCollectionService', Mock.MonitoringCollectionService);
        });

        inject(function(_$injector_) {
            Injections = {
                "$q": _$injector_.get('$q'),
                "LoadingScreenService": _$injector_.get('otusjs.deploy.LoadingScreenService'),
                "VerticalBarFactory": _$injector_.get('otusjs.model.chart.VerticalBarFactory'),
                "MonitoringCollectionService": _$injector_.get('otusjs.monitoring.repository.MonitoringCollectionService')
            };

            service = _$injector_.get('otusjs.monitoring.business.LaboratoryMonitoringService', Injections);
        });

        spyOn(Injections.$q, "defer").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getDataOfStorageByAliquots").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getDataByExam").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getDataOrphanByExams").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getDataOfPendingResultsByAliquots").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getDataQuantitativeByTypeOfAliquots").and.callThrough();
    });

    describe('getDataOfPendingResultsByAliquots Method', function() {

      beforeEach(function() {
        spyOn(Mock.VerticalBarFactory, "fromJsonObject").and.callThrough();
      });

      it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function() {
        service.getDataOfPendingResultsByAliquots("RS");
        expect(Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots).toHaveBeenCalledTimes(1);
      });

      it('should call VerticalBarFactory.fromJsonObject', function() {
        service.getDataOfPendingResultsByAliquots("RS");
        Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots("RS").then(() => {
          expect(Injections.VerticalBarFactory.fromJsonObject).toHaveBeenCalledTimes(1);
        }).catch(() => {
          fail()
        });
      });

      it('should not call VerticalBarFactory.fromJsonObject', function() {
        service.getDataOfPendingResultsByAliquots("RS");
        Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots().then(() => {
          fail()
        }).catch(() => {});
      });

      it('should create promise', function() {
        service.getDataOfPendingResultsByAliquots("RS");
        expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
      });
    });

    describe('getDataQuantitativeByTypeOfAliquots Method', function() {

      beforeEach(function() {
        spyOn(Mock.VerticalBarFactory, "fromJsonObject").and.callThrough();
      });

      it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function() {
        service.getDataQuantitativeByTypeOfAliquots("RS");
        expect(Injections.MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots).toHaveBeenCalledTimes(1);
      });

      it('should call VerticalBarFactory.fromJsonObject', function() {
        service.getDataQuantitativeByTypeOfAliquots("RS");
        Injections.MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots("RS").then(() => {
          expect(Injections.VerticalBarFactory.fromJsonObject).toHaveBeenCalledTimes(1);
        }).catch(() => {
          fail()
        });
      });

      it('should not call VerticalBarFactory.fromJsonObject', function() {
        service.getDataQuantitativeByTypeOfAliquots("RS");
        Injections.MonitoringCollectionService.getDataQuantitativeByTypeOfAliquots().then(() => {
          fail()
        }).catch(() => {});
      });

      it('should create promise', function() {
        service.getDataQuantitativeByTypeOfAliquots("RS");
        expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
      });
    });

    describe('getDataOrphanByExams Method', function() {

      it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function() {
        service.getDataOrphanByExams("RS");
        expect(Injections.MonitoringCollectionService.getDataOrphanByExams).toHaveBeenCalledTimes(1);
      });

      it('should call VerticalBarFactory.fromJsonObject', function() {
        service.getDataQuantitativeByTypeOfAliquots("RS");
        Injections.MonitoringCollectionService.getDataOrphanByExams("RS").then(() => {}).catch(() => {
          fail()
        });
      });

      it('should not call VerticalBarFactory.fromJsonObject', function() {
        service.getDataQuantitativeByTypeOfAliquots("RS");
        Injections.MonitoringCollectionService.getDataOrphanByExams().then(() => {
          fail()
        }).catch(() => {});
      });

      it('should create promise', function() {
        service.getDataQuantitativeByTypeOfAliquots("RS");
        expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
      });
    });

    describe('getDataOfStorageByAliquots Method', function() {
  
      it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function() {
        service.getDataOfStorageByAliquots("RS");
        expect(Injections.MonitoringCollectionService.getDataOfStorageByAliquots).toHaveBeenCalledTimes(1);
      });
  
      it('should call VerticalBarFactory.fromJsonObject', function() {
        service.getDataOfStorageByAliquots("RS");
        Injections.MonitoringCollectionService.getDataOfStorageByAliquots("RS").then(() => { }).catch(() => {
          fail()
        });
      });
  
      it('should not call VerticalBarFactory.fromJsonObject', function() {
        service.getDataOfStorageByAliquots("RS");
        Injections.MonitoringCollectionService.getDataOfStorageByAliquots().then(() => {
          fail()
        }).catch(() => {});
      });
  
      it('should create promise', function() {
        service.getDataOfStorageByAliquots("RS");
        expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('getDataByExam Method', function() {
  
      it('should call MonitoringCollectionService.getDataOfPendingResultsByAliquots', function() {
        service.getDataByExam("RS");
        expect(Injections.MonitoringCollectionService.getDataByExam).toHaveBeenCalledTimes(1);
      });
  
      it('should call VerticalBarFactory.fromJsonObject', function() {
        service.getDataByExam("RS");
        Injections.MonitoringCollectionService.getDataByExam("RS").then(() => { }).catch(() => {
          fail()
        });
      });
  
      it('should not call VerticalBarFactory.fromJsonObject', function() {
        service.getDataByExam("RS");
        Injections.MonitoringCollectionService.getDataByExam().then(() => {
          fail()
        }).catch(() => {});
      });
  
      it('should create promise', function() {
        service.getDataOfStorageByAliquots("RS");
        expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
      });
    });


    function mockInjections() {
        Mock.MonitoringCollectionService = {
            getDataOfPendingResultsByAliquots: (center) => {
                if(center === "RS") {
                  return Promise.resolve();
                } else{
                  return Promise.reject();
                }
              },
            getDataQuantitativeByTypeOfAliquots: (center) => {
              if(center === "RS") {
                return Promise.resolve();
              } else{
                return Promise.reject();
              }
            },
            getDataOrphanByExams: (center) => {
              if(center === "RS") {
                return Promise.resolve();
              } else{
                return Promise.reject();
              }
            },
            getDataOfStorageByAliquots: (center) => {
              if(center === "RS") {
                return Promise.resolve();
              } else{
                return Promise.reject();
              }
            },
            getDataByExam: (center) => {
              if(center === "RS") {
                return Promise.resolve();
              } else{
                return Promise.reject();
              }
            }
        };

        Mock.VerticalBarFactory = {
            fromJsonObject: () => {}
        };
    }

});