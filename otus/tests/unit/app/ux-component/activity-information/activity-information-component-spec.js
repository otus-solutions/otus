describe('activity-information-component Test', function() {
  var Mock = {};
  var controller;
  var originalTimeout;
  var Injections = {};

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value('otusActivityManager',{});
      $provide.value('$mdDialog', Mock.mdDialog);
      $provide.value('$mdToast',Mock.mdToast);
      $provide.value('otusjs.activity.core.ContextService',Mock.ContextService);
      $provide.value('otusjs.activity.business.ParticipantActivityService',Mock.ParticipantActivityService);
      $provide.value('otusjs.deploy.model.ActivityFacadeService',Mock.ActivityFacadeService);
    });

    inject(function(_$injector_, _$controller_) {
      Injections = {
        "$mdSidenav": _$injector_.get("$mdSidenav"),
        ActivityStatusItemFactory: _$injector_.get('otusjs.otus.uxComponent.ActivityStatusItemFactory'),
      };

      controller = _$controller_('otusActivityInformationCtrl', Injections);
      controller.otusActivityManager = {};
    });
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('create controller', function() {
    expect(controller.show).toBeDefined();
    expect(controller.activityReviewForm).toBeDefined();
    expect(controller.DialogController).toBeDefined();
  });

  describe("activities revisions tests", function () {
    beforeEach(function () {
      spyOn(Mock.ParticipantActivityService, "getActivityRevisions").and.callThrough();
      spyOn(Mock.ParticipantActivityService, "addActivityRevision").and.callThrough();
      spyOn(Mock.ActivityFacadeService, "getActivityRevisions").and.callThrough();
      spyOn(Mock.ActivityFacadeService, "createActivityRevision").and.callThrough();
      spyOn(Mock.mdToast, 'show').and.callThrough();

    });

    it('should load revisions', function () {
      controller.show();
      expect(Mock.ParticipantActivityService.getActivityRevisions).toHaveBeenCalledTimes(1);
      Mock.ParticipantActivityService.getActivityRevisions().then(function () {
        expect(Mock.ActivityFacadeService.getActivityRevisions).toHaveBeenCalledTimes(1);
      });
    });

    it('should create dialog to add revision', function () {
      controller.DialogController();
      expect(controller.activityRevision).toBeDefined();
      expect(controller.addActivityRevision).toBeDefined();
      expect(controller.user).toBeDefined();
      expect(controller.activity).toBeDefined();
      expect(controller.revisionDate).toBeDefined();
      expect(controller.now).toBeDefined();
      expect(controller.hide).toBeDefined();
      expect(controller.cancel).toBeDefined();
    });

    it('should add revision', function (done) {
      controller.DialogController();
      spyOn(controller, "hide").and.returnValue(true);
      controller.addActivityRevision();
      expect(Mock.ActivityFacadeService.createActivityRevision).toHaveBeenCalledTimes(1);
      expect(Mock.ParticipantActivityService.addActivityRevision).toHaveBeenCalledTimes(1);
      Mock.ParticipantActivityService.addActivityRevision({}, Test.utils.data.activity[0].activities[0])
        .then(function () {
          Mock.mdToast.show().then(function () {
            expect(Mock.ParticipantActivityService.getActivityRevisions).toHaveBeenCalledTimes(2);
            done();
          });
          Mock.ParticipantActivityService.getActivityRevisions().then(function () {
            done();
          });
          done();
        }).catch(function () {
        done();
      });
      done();
    });

  });

  function mockInjections() {
    Mock.ParticipantActivityService = {
      getActivityRevisions: function (id, activity) {
        return Promise.resolve([])
      },
      addActivityRevision: function () {
        return Promise.resolve({data:true})
      }
    };

    Mock.mdDialog = {
      show: function (dialog) {
        var self = this;
        self.test = dialog;
        return Promise.resolve(self);
      },
      hide: function () {}
    };

    Mock.mdToast = {
      show: function (confirm) {
        var self = this;
        self.test = confirm;
        return Promise.resolve(self);
      },
      simple: function () {
        var self = this;

        self.textContent = function(msg){
          var vm = this;
          vm.msg = msg;
          return vm;
        };

        self.position = function(p){
          var vm = this;
          vm.p = p;
          return vm;
        };

        self.hideDelay = function(time){
          var vm = this;
          vm.time = time;
          return vm;
        };

        return self;
      }
    };

    Mock.ContextService = {
      getSelectedActivities: function () {
        return Test.utils.data.activity[0].activities;
      },
      getLoggedUser: function () {
        return {};
      }
    };

    Mock.ActivityFacadeService = {
      getActivityRevisions: function () {
        return [];
      },
      createActivityRevision: function () {
        return {};
      }
    }
  }

});
