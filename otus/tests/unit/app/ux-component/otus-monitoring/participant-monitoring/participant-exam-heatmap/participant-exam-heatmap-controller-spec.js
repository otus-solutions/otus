describe('participantExamHeatmapController_TestSuite', function () {

  var Mock = {};
  var ctrl;
  var Injections = [];


  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.module('otusjs.otus.dashboard.core');
    angular.mock.module('otusjs.otus.dashboard.service');
    angular.mock.module('otusjs.otus.monitoring');
    angular.mock.module('otusjs.model.monitoring');

    Mock.LoadingScreenService = {
      start: jasmine.anything(),
      finish: jasmine.anything()
    };

    Mock.ApplicationStateService = {
      getCurrentState: function () {
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
    });

    angular.mock.inject(function ($injector, $controller, $rootScope) {

      Injections.$q = $injector.get('$q');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$mdDialog = $injector.get('$mdDialog');
      Injections.$scope = $rootScope.$new();
      Injections.EventService = $injector.get('otusjs.otus.dashboard.core.EventService');
      Injections.DashboardService = $injector.get('otusjs.otus.dashboard.service.DashboardService');
      Injections.ParticipantMonitoringService = $injector.get('otusjs.monitoring.business.ParticipantMonitoringService');

      //Injections Mock because of the deploy module
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      spyOn(Injections.ApplicationStateService, "getCurrentState");

      ctrl = $controller('otusParticipantExamHeatmapCtrl', Injections);
      Mock.selectedParticipant = Test.utils.data.selectedParticipant;
    });
  });

  it('controllerExistence_check', function () {
    expect(ctrl).toBeDefined();
  });

  it('controllerMethodExistence check', function () {
    expect(ctrl.selectParticipant).toBeDefined();
    expect(ctrl.getCurrentState).toBeDefined();
    expect(ctrl.showObservation).toBeDefined();
    expect(ctrl.loadData).toBeDefined();
  });

  it('test_should_verify_the_contents_of_the_internal_variables_of_the_controller', function () {
    expect(ctrl.ERROR_MESSAGE).toBe('Atualmente não existem nenhum exame disponível no sistema');
    expect(ctrl.LOAD_ERROR_MESSAGE).toBe('O participante não possui laboratório inicializado.');
    expect(ctrl.COLOR.HAVE).toBe('#88d8b0');
    expect(ctrl.COLOR.DOES_NOT_HAVE).toBe('#ff6f69');
    expect(ctrl.COLOR.DOES_NOT_APPLY).toBe('#cecece');
    expect(ctrl.COLOR.AMBIGUITY).toBe('#bae1ff');
  });

  it('should_add_selectedParticipant_in_controlerContext', function () {
    expect(ctrl.selectedParticipant).toBeUndefined();
    ctrl.selectParticipant(Mock.selectedParticipant);
    expect(ctrl.selectedParticipant.name).toBe('OTUS');
  });

  it('getCurrentState_should_evoke_getCurrentState_of_applicationStateService ', function () {
    ctrl.getCurrentState();
    expect(Injections.ApplicationStateService.getCurrentState).toHaveBeenCalledTimes(1);
  });

  it('loadData_method_should ', function () {

  });
});