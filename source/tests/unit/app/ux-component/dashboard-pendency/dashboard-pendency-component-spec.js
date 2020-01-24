describe('otusDashboardPendency Test', function() {

  var UNIT_NAME = 'otusDashboardPendencyCtrl';
  var Injections = {};
  var controller = {};
  var DATA_RN = "9892854";
  var DATA_ACTIVITY = "54321";
  var Mock = {};

  beforeEach(function() {

    angular.mock.module('otusjs.otus');

    inject(function($injector, $controller, $rootScope) {
      Mock.scope = $rootScope.$new();

      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.UserActivityPendencyFactory = $injector.get('otusjs.model.pendency.UserActivityPendencyFactory');
      Injections.ActivityPlayerService = $injector.get('otusjs.activity.business.ActivityPlayerService');
      Injections.ActivityViewService = $injector.get('otusjs.activity.business.ActivityViewService');
      Injections.UserActivityPendencyService = $injector.get('otusjs.pendency.business.UserActivityPendencyService');
      Injections.$filter = $injector.get('$filter');
      Injections.$q = $injector.get('$q');
      Injections.$mdToast = $injector.get('$mdToast');

      controller = $controller(UNIT_NAME, Injections);

      Mock.deferred = Injections.$q.defer();
      Mock.foundPendency = Test.utils.data.userActivityPendency;

    });

    spyOn(Injections.ParticipantManagerService,"getParticipant");
    spyOn(Injections.ParticipantManagerService,"selectParticipant");
    spyOn(Injections.ParticipantManagerService,"setup").and.returnValue(Promise.resolve({}));
    spyOn(Injections.ParticipantActivityService,"getActivity").and.returnValue(Promise.resolve({}));
    spyOn(Injections.ParticipantActivityService,"selectActivities").and.returnValue(Promise.resolve());
    spyOn(Injections.ActivityPlayerService,"load").and.returnValue(Promise.resolve());
    spyOn(Injections.ActivityViewService,"load").and.returnValue(Promise.resolve());
    spyOn(Injections.UserActivityPendencyService,"getOpenedUserActivityPendenciesToReceiver").and.returnValue(Promise.resolve([Mock.foundPendency,Mock.foundPendency]));
    spyOn(Injections.ApplicationStateService,"activateParticipantActivities");
    spyOn(Injections.ApplicationStateService,"activateActivityPlayer");
    spyOn(Injections.ApplicationStateService,"activateActivityViewer");
    spyOn(Injections.ParticipantActivityService,"clearSelectedActivities");

    controller.$onInit();
  });

  it('should controller defined', function() {
    expect(controller).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.filterGridTile).toBeDefined();
    expect(controller.loadActivities).toBeDefined();
    expect(controller.loadActivityPlayer).toBeDefined();
    expect(controller.loadActivityViewer).toBeDefined();
    expect(controller.selectParticipant).toBeDefined();
    expect(controller.displayGridLarge).toBeDefined();
    expect(controller.displayGridSmall).toBeDefined();
  });

  it('should call onInit method', function () {
    expect(Injections.ParticipantManagerService.setup).toHaveBeenCalledTimes(1);
    expect(Injections.UserActivityPendencyService.getOpenedUserActivityPendenciesToReceiver).toHaveBeenCalledTimes(1);
  });

  it('filterGridTileMethod should filter the activities', function () {
    expect(controller.filter).toEqual("");
    controller.userActivityPendencies.curr.push(Mock.foundPendency);
    controller.filter = "CSJ";
    controller.filterGridTile();
    expect(controller.filteredActiviteis.length).toEqual(1);
  });

  it('should call selectParticipant method', function () {
    expect(controller.selectParticipant(DATA_RN)).toBePromise();

    expect(Injections.ParticipantManagerService.getParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.selectParticipant).toHaveBeenCalledTimes(1);
  });

  it('should call loadActivities method', function (done) {
    spyOn(controller,"selectParticipant").and.returnValue(Promise.resolve());

    controller.loadActivities(DATA_RN);

    Mock.scope.$digest();

    expect(Injections.ParticipantManagerService.getParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.selectParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call loadActivityPlayer method', function (done) {
    spyOn(controller,"selectParticipant").and.returnValue(Promise.resolve());

    controller.loadActivityPlayer(DATA_RN, DATA_ACTIVITY);
    Mock.scope.$digest();

    expect(Injections.ParticipantManagerService.getParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.selectParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantActivityService.getActivity).toHaveBeenCalledTimes(1);
    Injections.ParticipantActivityService.getActivity().then(function() {
      expect(Injections.ParticipantActivityService.selectActivities).toHaveBeenCalledTimes(1);
      done();
    });
    expect(Injections.ActivityPlayerService.load).toHaveBeenCalledTimes(0);
    expect(Injections.ApplicationStateService.activateActivityPlayer).toHaveBeenCalledTimes(0);
    expect(Injections.ParticipantActivityService.clearSelectedActivities).toHaveBeenCalledTimes(1);
    done();
  });

  it('should call loadActivityViewer method', function (done) {
    spyOn(controller,"selectParticipant").and.returnValue(Promise.resolve());

    controller.loadActivityViewer(DATA_RN, DATA_ACTIVITY);
    Mock.scope.$digest();

    expect(Injections.ParticipantManagerService.getParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.selectParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantActivityService.getActivity).toHaveBeenCalledTimes(1);
    Injections.ParticipantActivityService.getActivity().then(function() {
      expect(Injections.ParticipantActivityService.selectActivities).toHaveBeenCalledTimes(1);
      expect(Injections.ActivityViewService.load).toHaveBeenCalledTimes(0);
      expect(Injections.ApplicationStateService.activateActivityViewer).toHaveBeenCalledTimes(0);
      expect(Injections.ParticipantActivityService.clearSelectedActivities).toHaveBeenCalledTimes(1);
      done();
    });
    done();
  });

  it('should call displayGridLarge method', function () {
    window.innerWidth = 1300;
    expect(controller.displayGridLarge()).toEqual('1:0.75');
    window.innerWidth = 1900;
    expect(controller.displayGridLarge()).toEqual('1:0.5');
  });

  it('should call displayGridSmall method', function () {
    window.innerWidth = 600;
    expect(controller.displayGridSmall()).toEqual('1:1.3');
    window.innerWidth = 800;
    expect(controller.displayGridSmall()).toEqual('1:1');
  });

});
