describe('otusActivityStageListCtrl Test', function () {

  let Mock = {};
  let Injections = [];
  let controller = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector, $controller, $rootScope, $q) {
      Injections.EventService = $injector.get('otusjs.activity.core.EventService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.ActivityPlayerService = $injector.get('otusjs.activity.business.ActivityPlayerService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.ActivityBasicFactory = $injector.get('otusjs.model.activity.ActivityBasicFactory');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.$log = $injector.get('$log');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$mdColors = $injector.get('$mdColors');
      Injections.ACTIVITY_MANAGER_LABELS = $injector.get('ACTIVITY_MANAGER_LABELS');

      mockInitialize($rootScope, $q);

      controller = $controller('otusActivityStageListCtrl', Injections);
    });
  });

  it('controller existence check', function () {
    expect(controller).toBeDefined();
  });

  it('should verify properties definition', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.fillSelectedActivity).toBeDefined();
    expect(controller.showFillingButton).toBeDefined();
    expect(controller.deleteSelectedActivity).toBeDefined();
    expect(controller.refreshActivityStage).toBeDefined();
  });

  describe('Methods Suite Test', function () {

    beforeEach(function () {
      spyOn(Injections.EventService, "onParticipantSelected");
      spyOn(Injections.ParticipantActivityService, "listAllCategories").and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.ParticipantActivityService, "selectActivities").and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.LoadingScreenService, "start").and.callThrough();
      spyOn(Injections.LoadingScreenService, "finish").and.callThrough();
      spyOn(Injections.ActivityPlayerService, "load").and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.ApplicationStateService, "activateActivityPlayer");
      spyOn(Injections.DialogShowService, "showConfirmationDialog").and.returnValue(Mock.deferredResolve.promise);
      spyOn(Injections.ParticipantActivityService, "discardActivity").and.callThrough();
    });

    it('onInitMethod should initialized the controller variables', function () {
      spyOn(Injections.ParticipantActivityService, "getAllByStageGroup").and.returnValue(Mock.deferred.promise);
      controller.$onInit();
      expect(controller.stages).toEqual([]);
      expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
      expect(Injections.ParticipantActivityService.listAllCategories).toHaveBeenCalledTimes(1);
      expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
      expect(Injections.ParticipantActivityService.getAllByStageGroup).toHaveBeenCalledTimes(1);
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    });

    it('fillSelectedActivityMethod should initialized the controller variables', function () {
      controller.fillSelectedActivity(Mock.activities[0]);
      Mock.scope.$digest();
      expect(Injections.ParticipantActivityService.selectActivities).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityPlayerService.load).toHaveBeenCalledTimes(1);
      expect(Injections.ApplicationStateService.activateActivityPlayer).toHaveBeenCalledTimes(1);
    });

    it('deleteSelectedActivityMethod should initialized the controller variables', function () {
      controller.deleteSelectedActivity(Mock.activities[0]);
      Mock.scope.$digest();
      expect(Injections.DialogShowService.showConfirmationDialog).toHaveBeenCalledTimes(1);
      expect(Injections.ParticipantActivityService.discardActivity).toHaveBeenCalledTimes(1);
    });

    it('showFillingButtonMethod should initialized the controller variables', function () {
      expect(controller.showFillingButton(Mock.mode)).toEqual(true);
    });

  });

  function mockInitialize($rootScope, $q) {
    Mock.activity = Test.utils.data.activity;
    Mock.mode = 'ONLINE';
    Mock.scope = $rootScope.$new();
    Mock.deferred = $q.defer();
    Mock.deferredResolve = $q.defer();
    Mock.deferredResolve.resolve();
    Mock.deferredActivity = $q.defer();
    Mock.deferredActivity.resolve(Mock.activity);
    Mock.stages = [];
    Mock.activities = [];
    Mock.model = {
      "_id": "20193n8120938",
      "objectType": "ActivityBasicModel",
      "acronym": "FRC",
      "name": "Formulário de revisão cardiovascular",
      "mode": "AUTOFILL",
      "category": "C0",
      "lastStatus": {
        "name": "FINALIZED",
        "user": {},
        "date": "2020-09-30T00:00:00"
      },
      "externalId": "20200921516453",
      "stage": "87624basdkjasmdijas"

    }

    Mock.activities.push(Mock.model);

    Mock.stages = [
      {
        stage: "onda 3",
        activities: Mock.activities
      },
      {
        stage: "onda covid",
        activities: Mock.activities
      },
      {
        stage: "onda 4",
        activities: Mock.activities
      }
    ];
    Mock.deferred.resolve(Mock.stages);
  }

});
