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
        spyOn(Mock.MonitoringCollectionService, "find").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "listAcronyms").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "listCenters").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getActivitiesProgressReport").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getDataOfPendingResultsByAliquots").and.callThrough();
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
        service.getDataOfPendingResultsByAliquots("RS").then(() => {fail()}).catch(() => {fail()});
        Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots("RS").then(() => {
          expect(Injections.VerticalBarFactory.fromJsonObject).toHaveBeenCalledTimes(1);
        }).catch(() => {
          fail()
        });
      });

      it('should not call VerticalBarFactory.fromJsonObject', function() {
        service.getDataOfPendingResultsByAliquots("RS").then(() => {fail()}).catch(() => {fail()});
        Injections.MonitoringCollectionService.getDataOfPendingResultsByAliquots().then(() => {
          fail()
        }).catch(() => {});
      });

      it('should create promise', function() {
        service.getDataOfPendingResultsByAliquots("RS");
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
            find: () => {},
            listAcronyms: () => {},
            listCenters: () => {},
            getActivitiesProgressReport: () => {}
        };

        Mock.VerticalBarFactory = {
            fromJsonObject: () => {}
        };
    }

});