describe('otus-flag-report-manager-list-component Test', function() {
    var Mock = {};
    var controller;
    var Injections = {};

    beforeEach(function() {
      // var alasql = jasmine.createSpy('alasql');
      mockInjections();
      angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
        $provide.value('otusjs.deploy.FieldCenterRestService', Mock.ProjectFieldCenterService);
          $provide.value('otusjs.monitoring.business.MonitoringService', Mock.MonitoringService);
          $provide.value('otusjs.application.activity.StatusHistoryService', Mock.StatusHistoryService);
          $provide.value('otusjs.otus.dashboard.core.ContextService', Mock.dashboardContextService);
          $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
          $provide.value('otusFlagReportParseDataFactory', Mock.FlagReportParseData);
      });

      inject(function(_$controller_) {
         controller = _$controller_('otusFlagReportManagerCtrl');
      });

      spyOn(Mock.ProjectFieldCenterService, "loadCenters").and.callThrough();
      spyOn(Mock.dashboardContextService, "getLoggedUser").and.callThrough();
      spyOn(Mock.MonitoringService, "listAcronyms").and.callThrough();
      spyOn(Mock.StatusHistoryService, "listStatus").and.callThrough();
      spyOn(Mock.StatusHistoryService, "getColors").and.callThrough();
      spyOn(Mock.StatusHistoryService, "getLabels").and.callThrough();
      spyOn(Mock.MonitoringService, "getActivitiesProgressReport").and.callThrough();
      spyOn(Mock.FlagReportParseData, "create").and.callThrough();
      spyOn(Mock.LoadingScreenService, "start").and.callThrough();
      spyOn(Mock.LoadingScreenService, "finish").and.callThrough();

      spyOn(window, "alasql");

      spyOn(controller, "updatePage").and.callThrough();
    });
    it('should initialize the component', function(done) {
      controller.$onInit();
      expect(controller.ready).toEqual(false);
      expect(Mock.LoadingScreenService.start).toHaveBeenCalledTimes(1);
      expect(Mock.ProjectFieldCenterService.loadCenters).toHaveBeenCalledTimes(1);
      expect(Mock.StatusHistoryService.getColors).toHaveBeenCalledTimes(1);
      expect(Mock.StatusHistoryService.getLabels).toHaveBeenCalledTimes(1);

      Mock.ProjectFieldCenterService.loadCenters().then(function () {

        expect(Mock.dashboardContextService.getLoggedUser).toHaveBeenCalledTimes(1);

        Mock.dashboardContextService.getLoggedUser().then(function () {

          expect(Mock.MonitoringService.listAcronyms).toHaveBeenCalledTimes(1);

          Mock.MonitoringService.listAcronyms().then(function () {
            expect(Mock.StatusHistoryService.listStatus).toHaveBeenCalledTimes(1);
            expect(Mock.MonitoringService.getActivitiesProgressReport).toHaveBeenCalledTimes(1);

            Mock.MonitoringService.getActivitiesProgressReport().then(function () {
              expect(Mock.FlagReportParseData.create).toHaveBeenCalledTimes(2);
              expect(controller.updatePage).toHaveBeenCalledTimes(1);
              expect(Mock.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
              expect(controller.ready).toEqual(true);

            });
          });
        });
      });
      done();
    });

    describe('updateData method' ,function () {
      beforeEach(function () {
        controller.selectedCenter = {acronym: "RS"};
        controller.centers = [{acronym: "RS"}];
        spyOn(controller, "setActivities").and.callThrough();
      });

      it('should call getActivitiesProgressReport function', function () {
        controller.updateData(null, null, null , 'BA');
        expect(Mock.MonitoringService.getActivitiesProgressReport).toHaveBeenCalledTimes(2);
      });

      it('should update activities with other acronym', function () {
        controller.selectedAcronym = "CISE";
        controller.updateData(null, 'ACTA', null , 'RS');
        expect(controller.setActivities).toHaveBeenCalledTimes(1);
      });

      it('should update activities with other status', function () {
        controller.selectedStatus = null;
        controller.updateData(null, null, 1 , 'RS');
        expect(controller.setActivities).toHaveBeenCalledTimes(1);
      });
    });


    function mockInjections() {
      Mock.ProjectFieldCenterService = {
        loadCenters: () => {
        return Promise.resolve([{name:"São Paulo", acronym: "SP"}]);
        }
      };

       Mock.StatusHistoryService = {
        getColors: () => {
          return [];
        },
         getLabels: () => {
          return [];
        },
         listStatus: () => {
          return [];
         }
      };

      Mock.MonitoringService = {
        listAcronyms: () => {
          return Promise.resolve([]);
        },
        getActivitiesProgressReport: (center) => {
          return Promise.resolve([]);
        }
      };

      Mock.dashboardContextService = {
        getLoggedUser: () => {
          return Promise.resolve({fieldCenter:{acronym: "SP"}});
        }
      };

      Mock.LoadingScreenService = {
        start: () => {},
        finish: () => {}
      };

      Mock.FlagReportParseData = {
        create: () => {}
      }

    }

});
