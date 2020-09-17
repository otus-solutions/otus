describe('otusActivityManagerBottomSheet', function () {

  let Mock = {};
  let Bindings = {};
  let Injections = {};
  let controller;

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
    angular.mock.inject(($injector, $rootScope, $q, $controller) => {
      Injections.$q = $injector.get('$q');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.$timeout = $injector.get('$timeout');
      Injections.$mdDialog = $injector.get('$mdDialog');
      Injections.$mdColors = $injector.get('$mdColors');
      Injections.EventService = $injector.get('otusjs.activity.core.EventService');
      Injections.CheckerItemFactory = $injector.get('otusjs.otus.uxComponent.CheckerItemFactory');
      Injections.DialogService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.ActivityPlayerService = $injector.get('otusjs.activity.business.ActivityPlayerService');
      Injections.ActivityViewService = $injector.get('otusjs.activity.business.ActivityViewService');
      Injections.ActivityPlayerService = $injector.get('otusjs.activity.business.ActivityPlayerService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.ActivityStatusFactory = $injector.get('otusjs.model.activity.ActivityStatusFactory');
      Injections.ContextService = $injector.get('otusjs.otus.dashboard.core.ContextService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');

      Bindings.updateList = function() {};
      Bindings.onViewInfo = function() {};

      controller = $controller('otusActivityManagerBottomSheetCtrl', Injections, Bindings);

      _mockInitialize($rootScope, $q);
    });
  });


  it('controller_existence_check', function () {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.$onInit).toBeDefined();
    expect(controller.fillSelectedActivity).toBeDefined();
    expect(controller.viewSelectedActivity).toBeDefined();
    expect(controller.deleteSelectedActivity).toBeDefined();
    expect(controller.visualizeSelectedActivityInfo).toBeDefined();
    expect(controller.updateChecker).toBeDefined();
    expect(controller.DialogController).toBeDefined();
    expect(controller.activitySharingDialog).toBeDefined();
    expect(controller.reopenActivityDialog).toBeDefined();
  });


  it('onInit method should set selectedItemCounterBackgroundColor and call EventService methods', function(){
    const BACKGROUND_COLOR = 'gray';
    spyOn(Injections.$mdColors, 'getThemeColor').and.returnValue(BACKGROUND_COLOR);
    spyOn(Injections.EventService, "onParticipantSelected");
    spyOn(Injections.EventService, "onActivitySelected");
    controller.$onInit();
    expect(controller.selectedItemCounterBackgroundColor).toBe(BACKGROUND_COLOR);
    expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
    expect(Injections.EventService.onActivitySelected).toHaveBeenCalledTimes(1);
  });

  it('fillSelectedActivity method should call some services methods', function(){
    spyOn(Injections.ActivityPlayerService, "load").and.returnValue(Mock.resolve);
    spyOn(Injections.ApplicationStateService, "activateActivityPlayer");
    controller.fillSelectedActivity();
    Mock.$scope.$digest();
    expect(Injections.ActivityPlayerService.load).toHaveBeenCalledTimes(1);
    expect(Injections.ApplicationStateService.activateActivityPlayer).toHaveBeenCalledTimes(1);
  });

  it('viewSelectedActivity method should call some services methods', function(){
    spyOn(Injections.ActivityViewService, "load").and.returnValue(Mock.resolve);
    spyOn(Injections.ApplicationStateService, "activateActivityViewer");
    controller.viewSelectedActivity();
    Mock.$scope.$digest();
    expect(Injections.ActivityViewService.load).toHaveBeenCalledTimes(1);
    expect(Injections.ApplicationStateService.activateActivityViewer).toHaveBeenCalledTimes(1);
  });

  it('deleteSelectedActivity method should call updateList method', function(){
    spyOn(Injections.DialogService, "showConfirmationDialog").and.returnValue(Mock.resolve);
    spyOn(Injections.ParticipantActivityService, "getSelectedActivities").and.returnValue({
      discard: function(){}
    });
    spyOn(controller, 'updateList');
    controller.deleteSelectedActivity();
    Mock.$scope.$digest();
    expect(controller.updateList).toHaveBeenCalledTimes(1);
  });


  it('updateChecker method should call dialog', function () {
    spyOn(Injections.$mdDialog, "cancel");
    spyOn(Injections.$mdDialog, "show");
    controller.updateChecker();
    expect(controller.cancel).toBeDefined();
    expect(controller.cancel).toEqual(Injections.$mdDialog.cancel);
    expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
  });

  it('visualizeSelectedActivityInfo method should call onViewInfo method', function(){
    spyOn(controller, "onViewInfo");
    controller.visualizeSelectedActivityInfo();
    expect(controller.onViewInfo).toHaveBeenCalledTimes(1);
  });


  describe('DialogController Suite Test', function () {

    let DialogController;

    beforeEach(function(){
      spyOn(Injections.CheckerItemFactory, 'create').and.returnValue(Mock.checker);
      spyOn(Injections.ParticipantActivityService, 'listActivityCheckers').and.returnValue([Mock.checker]);
      spyOn(Mock, 'updateList').and.callThrough();
      spyOn(Injections.$mdToast, "show");
      DialogController = new controller.DialogController(Mock.selectedActivity, Mock.updateList);
      spyOn(DialogController.selectedActivity.statusHistory, "getInitializedOfflineRegistry").and.callThrough();
    });

    it('DialogController methods existence check', function() {
      expect(DialogController.selectedActivity).toBeDefined();
      expect(DialogController.user).toBeDefined();
      expect(DialogController.querySearch).toBeDefined();
      expect(DialogController.updateCheckerActivity).toBeDefined();
      expect(DialogController.cancel).toBeDefined();
      expect(DialogController.checkers).toBeDefined();
      expect(DialogController.selectedItem).toBeDefined();
      expect(DialogController.maxDate).toBeDefined();
    });

    it('should update checker activity', function () {
      spyOn(Injections.ParticipantActivityService, "updateCheckerActivity").and.returnValue(Mock.resolveObj);

      DialogController.updateCheckerActivity();
      Mock.$scope.$digest();

      expect(Injections.ParticipantActivityService.updateCheckerActivity).toHaveBeenCalledTimes(1);
      expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
      expect(Mock.updateList).toHaveBeenCalledTimes(1);
    });

    it('should not update checker activity in case no response from ParticipantActivityService.updateCheckerActivity', function () {
      spyOn(Injections.ParticipantActivityService, "updateCheckerActivity").and.returnValue(Mock.resolve);

      DialogController.updateCheckerActivity();
      Mock.$scope.$digest();

      expect(Injections.ParticipantActivityService.updateCheckerActivity).toHaveBeenCalledTimes(1);
      expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
      expect(Mock.updateList).not.toHaveBeenCalled();
    });

    it('should not update checker activity in case ParticipantActivityService.updateCheckerActivity reject', function () {
      spyOn(Injections.ParticipantActivityService, "updateCheckerActivity").and.returnValue(Mock.reject);
      spyOn(DialogController, "cancel");

      DialogController.updateCheckerActivity();
      Mock.$scope.$digest();

      expect(Injections.ParticipantActivityService.updateCheckerActivity).toHaveBeenCalledTimes(1);
      expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
      expect(Mock.updateList).not.toHaveBeenCalled();
      expect(DialogController.cancel).toHaveBeenCalledTimes(1);
    });
  });



  it('activitySharingDialog method should call onViewInfo method', function(){
    const selectedActivity = {};
    spyOn(Injections.DialogService, "showActivitySharingDialog");
    controller.activitySharingDialog(selectedActivity);
    expect(Injections.DialogService.showActivitySharingDialog).toHaveBeenCalledTimes(1);
    expect(Injections.DialogService.showActivitySharingDialog).toHaveBeenCalledWith(selectedActivity);
  });

  describe('reopenActivityDialog method Suite Test', function(){

    beforeEach(function(){
      spyOn(Injections.LoadingScreenService, 'start');
      spyOn(Injections.LoadingScreenService, 'finish');
      spyOn(Mock.selectedActivity.statusHistory, 'getHistory').and.callThrough();
    });

    it('at showConfirmationDialog dont press ok', function(){
      spyOn(Injections.DialogService, 'showConfirmationDialog').and.returnValue(Mock.reject);

      controller.reopenActivityDialog(Mock.selectedActivity);
      Mock.$scope.$digest();

      expect(Mock.selectedActivity.statusHistory.getHistory).not.toHaveBeenCalled();
    });

    it('getLoggedUser fail', function(){
      spyOn(Injections.DialogService, 'showConfirmationDialog').and.returnValue(Mock.resolve);
      spyOn(Injections.ContextService, 'getLoggedUser').and.returnValue(Mock.reject);
      spyOn(Injections.ParticipantActivityService, 'reopenActivity');

      controller.reopenActivityDialog(Mock.selectedActivity);
      Mock.$scope.$digest();

      expect(Mock.selectedActivity.statusHistory.getHistory).not.toHaveBeenCalled();
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalled();
    });

    it('reopenActivity fail', function(){
      spyOn(Injections.DialogService, 'showConfirmationDialog').and.returnValue(Mock.resolve);
      spyOn(Injections.ContextService, 'getLoggedUser').and.returnValue(Mock.resolveObj);
      spyOn(Injections.ActivityStatusFactory, 'createReopenedStatus').and.returnValue({});
      spyOn(Injections.ParticipantActivityService, 'reopenActivity').and.returnValue(Mock.reject);
      spyOn(controller, 'updateList');

      controller.reopenActivityDialog(Mock.selectedActivity);
      Mock.$scope.$digest();

      expect(Mock.selectedActivity.statusHistory.getHistory).toHaveBeenCalledTimes(1);
      expect(controller.updateList).not.toHaveBeenCalled();
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    });

    it('reopenActivity should push new status and call updateList method', function(){
      spyOn(Injections.DialogService, 'showConfirmationDialog').and.returnValue(Mock.resolve);
      spyOn(Injections.ContextService, 'getLoggedUser').and.returnValue(Mock.resolveObj);
      spyOn(Injections.ActivityStatusFactory, 'createReopenedStatus').and.returnValue({});
      spyOn(Injections.ParticipantActivityService, 'reopenActivity').and.returnValue(Mock.resolve);
      spyOn(controller, 'updateList');

      controller.reopenActivityDialog(Mock.selectedActivity);
      Mock.$scope.$digest();

      expect(Mock.selectedActivity.statusHistory.getHistory).toHaveBeenCalledTimes(1);
      expect(controller.updateList).toHaveBeenCalledTimes(1);
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    });

  });

  function _mockInitialize($rootScope, $q){
    Mock.$scope = $rootScope.$new();

    const deferredResolve = $q.defer();
    deferredResolve.resolve();
    Mock.resolve = deferredResolve.promise;

    const deferredResolveObj = $q.defer();
    deferredResolveObj.resolve({});
    Mock.resolveObj = deferredResolveObj.promise;

    const deferredReject = $q.defer();
    deferredReject.reject('some error');
    Mock.reject = deferredReject.promise;

    Mock.selectedActivity = {
      participantData: {
        recruitmentNumber: 123
      },
      getID: function() { return '123457890'},
      statusHistory: {
        getHistory: function () { return []; },
        getInitializedOfflineRegistry: function() {
          return {
            user: {}, date: {},
            setUser: function(user){},
            setDate: function(date){},
          };
        }
      }
    };

    Mock.updateList = function() {};

    Mock.checker = {
      checker: {
        "name": "Joao",
        "surname": "Silva",
        "phone": "51999999999",
        "email": "otus@otus.com"
      }
    };
  }

});