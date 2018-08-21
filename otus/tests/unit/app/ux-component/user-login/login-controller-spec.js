describe('login-controller Test', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var ctrl;

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');

    Mock.VerifyBrowserService = {
      verify: function () {
        return true;
      }
    };

    Mock.UserAccessRecoveryService = {
      recovery: function (userData, url) {
        if (userData === 'fail') {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.user.access.service.LoginService', {});
      $provide.value('otusjs.application.state.ApplicationStateService', {});
      $provide.value('otusjs.user.access.service.UserAccessRecoveryService', Mock.UserAccessRecoveryService);
      $provide.value('otusjs.application.verifyBrowser.VerifyBrowserService', Mock.VerifyBrowserService);
    });

    inject(function (_$injector_, _$controller_) {
      Injections = {
        $mdDialog: _$injector_.get('$mdDialog'),
        LoginService: _$injector_.get('otusjs.user.access.service.LoginService'),
        ApplicationStateService: _$injector_.get('otusjs.application.state.ApplicationStateService'),
        UserAccessRecoveryService: _$injector_.get('otusjs.user.access.service.UserAccessRecoveryService'),
        VerifyBrowserService: _$injector_.get('otusjs.application.verifyBrowser.VerifyBrowserService'),
        $mdToast: _$injector_.get('$mdToast')
      };

      ctrl = _$controller_('otusjs.otus.uxComponent.LoginController', Injections);
    });
  });

  describe('onInit method', function () {
    beforeEach(function () {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(Injections.VerifyBrowserService, 'verify').and.callThrough();
      ctrl.$onInit();

    });

    it('should onInit be defined', function () {
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
      spyOn(Injections.UserAccessRecoveryService, 'recovery').and.callThrough();
      ctrl.sendRecovery(input);
    });

    it('should method recovery to have been called', function () {
      var data = {};
      data.redirectUrl = window.location.href + '/access-recovery';
      data.userEmail = "email@email.com";
      expect(Injections.UserAccessRecoveryService.recovery).toHaveBeenCalledWith(data);
    });
  });

  describe('goToRecovery method', function () {
    beforeEach(function () {
      ctrl.goToRecovery();
    });

    it('should var recovery to be true', function () {
      expect(ctrl.recovery).toBe(true);
    });
  });

  describe('goBack method', function () {
    beforeEach(function () {
      ctrl.goBack();
    });

    it('should var recovery to be false', function () {
      expect(ctrl.recovery).toBe(false);
    });
  });
});
