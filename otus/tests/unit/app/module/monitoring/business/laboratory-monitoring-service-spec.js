describe('LaboratoryMonitoringService Test', function() {
    var Mock = {};
    var service;
    var Injections = {};

    beforeEach(function() {
        mockInjections();
        angular.mock.module('otusjs.monitoring.business', function($provide) {
            $provide.value('otusjs.deploy.LoadingScreenService', {});
            $provide.value('otusjs.monitoring.business.MonitoringCollectionService', Mock.MonitoringCollectionService);
        });

        inject(function(_$injector_) {
            Injections = {
                "$q": _$injector_.get('$q'),
                "LoadingScreenService": _$injector_.get('otusjs.deploy.LoadingScreenService'),
                "LoadingScreenService": _$injector_.get('otusjs.deploy.LoadingScreenService'),
                MonitoringCollectionService: Mock.MonitoringCollectionService
            };

            service = _$injector_.get('otusjs.monitoring.business.LaboratoryMonitoringService', Injections);
        });

        spyOn(Injections.$q, "defer").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "find").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "listAcronyms").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "listCenters").and.callThrough();
        spyOn(Mock.MonitoringCollectionService, "getActivitiesProgressReport").and.callThrough();
    });

    it('should called method create', function() {
        expect(Injections.$q.defer).toHaveBeenCalledTimes(1);
    });

    function mockInjections() {
        Mock.MonitoringCollectionService = {
            find: () => {},
            listAcronyms: () => {},
            listCenters: () => {},
            getActivitiesProgressReport: () => {}
        }
    }

});