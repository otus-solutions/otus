describe('otusActivityManagerBottomSheet', function () {

  var UNIT_NAME = 'otusActivityManagerBottomSheetCtrl';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var controller;


  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {

      Mock.ActivityViewService = {
        load: function () {
          return Promise.resolve();
        }
      };

      Mock.ApplicationStateService = {
        activateActivityViewer: function () {
          return Promise.resolve();
        }
      };

      mockInjections();

      $provide.value('$q', {});
      $provide.value('$mdToast', Mock.mdToast);
      $provide.value('$timeout', {});
      $provide.value('$mdDialog', Mock.mdDialog);
      $provide.value('otusjs.activity.core.EventService', {});
      $provide.value('otusjs.otus.uxComponent.CheckerItemFactory', Mock.CheckerItemFactory);
      $provide.value('otusjs.application.dialog.DialogShowService', {});
      $provide.value('otusjs.activity.business.ActivityPlayerService', {});
      $provide.value('otusjs.activity.business.ActivityViewService', Mock.ActivityViewService);
      $provide.value('otusjs.activity.business.ActivityPlayerService', {});
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
      $provide.value('otusjs.activity.business.ParticipantActivityService', Mock.ParticipantActivityService);
    });

    inject(function (_$injector_, _$controller_) {
      controller = _$controller_(UNIT_NAME);
    });
  });

  describe('updateChecker method', function () {
    beforeEach(function () {
      spyOn(Mock.mdDialog, "cancel").and.callThrough();
      spyOn(Mock.mdDialog, "show").and.callThrough();
    });
    it('should call dialog', function () {
      expect(controller.cancel).toBeUndefined();
      controller.updateChecker();
      expect(controller.cancel).toBeDefined();
      expect(Mock.mdDialog.cancel).toEqual(controller.cancel);
      expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);

    });
  });

  xdescribe('DialogController not update checker ', function () {
    beforeEach(function () {
      spyOn(Mock.ParticipantActivityService, "listActivityCheckers").and.callThrough();
      spyOn(Mock.ParticipantActivityService, "updateCheckerActivity").and.callThrough();
      spyOn(Mock.mdToast, "show").and.callThrough();

    });

    it('should not update checker activity', function (done) {
      controller.DialogController(Test.utils.data.activity[0].activities[0]);
      spyOn(controller.selectedActivity.statusHistory, "getInitializedOfflineRegistry").and.callThrough();
      expect(controller.selectedActivity).toBeDefined();
      expect(controller.user).toBeDefined();
      expect(controller.querySearch).toBeDefined();
      expect(controller.updateCheckerActivity).toBeDefined();
      expect(controller.cancel).toBeDefined();
      expect(controller.checkers).toBeDefined();
      expect(controller.selectedItem).toBeDefined();
      expect(controller.maxDate).toBeDefined();

      controller.updateCheckerActivity();
      expect(Mock.ParticipantActivityService.listActivityCheckers).toHaveBeenCalledTimes(1);
      expect(Mock.ParticipantActivityService.updateCheckerActivity).toHaveBeenCalledTimes(1);
      Mock.ParticipantActivityService.updateCheckerActivity().then(function () {
        expect(controller.selectedActivity.statusHistory.getInitializedOfflineRegistry).toHaveBeenCalledTimes(1);
        done();
      }).catch(function () {
        expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  xdescribe('DialogController update checker ', function () {
    beforeEach(function () {
      spyOn(Mock.ParticipantActivityService, "listActivityCheckers").and.callThrough();
      spyOn(Mock.ParticipantActivityService, "updateCheckerActivity").and.returnValue(Promise.resolve(true));
      spyOn(Mock.mdToast, "show").and.callThrough();

    });

    it('should update checker activity', function (done) {
      controller.DialogController(Test.utils.data.activity[0].activities[0], Mock.updateList);
      spyOn(controller.selectedActivity.statusHistory, "getInitializedOfflineRegistry").and.callThrough();
      expect(controller.selectedActivity).toBeDefined();
      expect(controller.user).toBeDefined();
      expect(controller.querySearch).toBeDefined();
      expect(controller.updateCheckerActivity).toBeDefined();
      expect(controller.cancel).toBeDefined();
      expect(controller.checkers).toBeDefined();
      expect(controller.selectedItem).toBeDefined();

      controller.updateCheckerActivity();
      expect(Mock.ParticipantActivityService.listActivityCheckers).toHaveBeenCalledTimes(1);
      expect(Mock.ParticipantActivityService.updateCheckerActivity).toHaveBeenCalledTimes(1);
      Mock.ParticipantActivityService.updateCheckerActivity().then(function () {
        expect(controller.updateList).toHaveBeenCalledTimes(2);
        expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
        done();
      }).catch(function () {
        done();
      });
    });
  });

  describe('viewSelectedActivity method', function () {
    beforeEach(function () {
      spyOn(Mock.ActivityViewService, "load").and.callThrough();
      spyOn(Mock.ApplicationStateService, "activateActivityViewer").and.callThrough();
    });

    it('should method to be defined', function () {
      expect(controller.viewSelectedActivity).toBeDefined();
    });

    it('should call methods expected', function () {
      controller.viewSelectedActivity();

      expect(Mock.ActivityViewService.load).toHaveBeenCalled();
    });
  });

  function mockInjections() {
    Mock.mdDialog = {
      cancel: function () { },
      show: function () {
        return Promise.resolve();
      },
    };

    Mock.mdToast = {
      show: function (confirm) {
        var self = this;
        self.test = confirm;
        return Promise.resolve(self);
      },
      simple: function () {
        var self = this;

        self.textContent = function (msg) {
          var vm = this;
          vm.msg = msg;
          return vm;
        };

        self.position = function (p) {
          var vm = this;
          vm.p = p;
          return vm;
        };

        self.hideDelay = function (time) {
          var vm = this;
          vm.time = time;
          return vm;
        };

        return self;
      }
    };

    Mock.CheckerItemFactory = {
      create: function (item) {
        return item;
      }
    }

    Mock.updateList = function () {

    };

    Mock.ParticipantActivityService = {
      listActivityCheckers: function () {
        return [{
          checker: {
            "name": "Emanoel",
            "surname": "Vianna",
            "phone": "51999999999",
            "email": "otus@otus.com"
          }
        },
        {
          checker: {
            "name": "Emanoel",
            "surname": "Vianna",
            "phone": "51999999999",
            "email": "otus@otus.com"
          }
        }
        ];
      },
      updateCheckerActivity: function () {
        return Promise.resolve();
      }
    };
  };

});