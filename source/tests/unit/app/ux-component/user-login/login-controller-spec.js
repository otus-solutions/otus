describe('login-controller_Suite_Test', function () {
  var Mock = {};
  var Injections = {};
  var ctrl;

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');

    Mock.DialogShowService = {
      showDialog: function (dialog) {
        var self = this;
        self.test = dialog;
        return Promise.resolve(self);
      }
    };

    Mock.VerifyBrowserService = {
      verify: function () {
        return true;
      }
    };

    Mock.UserAccessRecoveryService = {
      sendPasswordReset: function (userData, url) {
        if (userData === 'fail') {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      }
    };

    Mock.THEME_CONSTANTS = {
      imageURLs: { banner: ""}
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.user.access.service.LoginService', {});
      $provide.value('otusjs.application.state.ApplicationStateService', {});
      $provide.value('otusjs.user.access.service.UserAccessRecoveryService', Mock.UserAccessRecoveryService);
      $provide.value('otusjs.application.verifyBrowser.VerifyBrowserService', Mock.VerifyBrowserService);
      $provide.value('otusjs.application.dialog.DialogShowService', Mock.DialogShowService);
      $provide.value('THEME_CONSTANTS', Mock.THEME_CONSTANTS);
      $provide.value('$scope', {});
    });

    inject(function (_$injector_, _$controller_, _$scope_) {
      Injections = {
        $scope: _$injector_.get('$scope'),
        $mdDialog: _$injector_.get('$mdDialog'),
        $mdToast: _$injector_.get('$mdToast'),
        LoginService: _$injector_.get('otusjs.user.access.service.LoginService'),
        ApplicationStateService: _$injector_.get('otusjs.application.state.ApplicationStateService'),
        UserAccessRecoveryService: _$injector_.get('otusjs.user.access.service.UserAccessRecoveryService'),
        VerifyBrowserService: _$injector_.get('otusjs.application.verifyBrowser.VerifyBrowserService'),
        DialogShowService: _$injector_.get('otusjs.application.dialog.DialogShowService'),
        THEME_CONSTANTS: _$injector_.get('THEME_CONSTANTS'),
      };

      ctrl = _$controller_('otusjs.otus.uxComponent.LoginController', Injections);
    });
  });


  it('ctrlExistence check', function () {
    expect(ctrl).toBeDefined();
  });

  describe('onInit method', function () {
    beforeEach(function () {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(Injections.VerifyBrowserService, 'verify').and.callThrough();
      ctrl.$onInit();

    });

    it('should onInit be defined', function () {
      expect(ctrl.$onInit).toBeDefined();
      expect(ctrl.$onInit).toHaveBeenCalled();
      expect(ctrl.$onInit).not.toBeNull();
    });

    it('should VerifyBrowserService.verify to have been called', function () {
      expect(Injections.VerifyBrowserService.verify).toHaveBeenCalled();
    });
  });

  describe('sendRecovery method', function () {
    beforeEach(function () {
      var input = {};
      input.email = 'email@email.com';
      spyOn(ctrl, 'sendRecovery').and.callThrough();
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(Injections.UserAccessRecoveryService, 'sendPasswordReset').and.callThrough();
      ctrl.sendRecovery(input);
    });

    it('sendRecoveryMethodExistence check', function () {
      expect(ctrl.sendRecovery).toBeDefined();
    });

    it('should method sendPasswordReset to have been called', function () {
      var data = {};
      data.redirectUrl = window.location.href + '/access-recovery';
      data.userEmail = "email@email.com";
      expect(Injections.UserAccessRecoveryService.sendPasswordReset).toHaveBeenCalledWith(data);
    });
  });

  describe('authenticate method', function () {

    it('goToRecoveryMethodExistence check', function () {
      expect(ctrl.authenticate).toBeDefined();
    });
  });

  describe('goToRecovery method', function () {
    beforeEach(function () {
      ctrl.goToRecovery();
    });

    it('goToRecoveryMethodExistence check', function () {
      expect(ctrl.goToRecovery).toBeDefined();
    });

    it('should var recovery to be true', function () {
      expect(ctrl.recovery).toBeTruthy();
    });
  });

  describe('goBack method', function () {
    beforeEach(function () {
      ctrl.goBack();
    });

    it('goToRecoveryMethodExistence check', function () {
      expect(ctrl.goBack).toBeDefined();
    });

    it('should var recovery to be false', function () {
      expect(ctrl.recovery).toBeFalsy();
    });
  });

  describe('resetValidation method', function () {

    it('should var recovery to be false', function () {
      expect(ctrl.resetValidation).toBeDefined();
    });
  });
});
