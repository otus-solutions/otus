describe('UserAccessRecoveryService', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var UNIT_NAME = 'otusjs.user.access.service.UserAccessRecoveryService';

  beforeEach(function () {
    Mock.UserAccessRecoveryRestService = {
      initialize: function () {
        return true;
      },
      validateToken: function () {
        return Promise.resolve();
      },
      sendPasswordReset: function () {
        return Promise.resolve();
      },
      updatePassword: function () {
        return Promise.resolve();
      }
    };
    
    angular.mock.module('otusjs.user.access.service');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.deploy.user.UserAccessRecoveryRestService', Mock.UserAccessRecoveryRestService);
    });

    inject(function(_$injector_) {
      Injections = {
        UserAccessRecoveryRestService: _$injector_.get('otusjs.deploy.user.UserAccessRecoveryRestService'),
      };

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('onInit method', function() {
    beforeEach(function() {
      spyOn(service, '$onInit').and.callThrough();
      spyOn(Injections.UserAccessRecoveryRestService, 'initialize').and.callThrough();
      service.$onInit();
    });

    it('should onInit be defined', function() {
      expect(service.$onInit).toHaveBeenCalled();
      expect(service.$onInit).not.toBeNull();
    });

    it('method UserAccessRecoveryRestService.initialize should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.initialize).toHaveBeenCalled();
    });
  });

  describe('validateToken method', function() {
    beforeEach(function() {
      spyOn(service, 'validateToken').and.callThrough();
      spyOn(Injections.UserAccessRecoveryRestService, 'validateToken').and.callThrough();
      service.validateToken();
    });

    it('should validateToken be defined', function() {
      expect(service.validateToken).toHaveBeenCalled();
      expect(service.validateToken).not.toBeNull();
    });

    it('method UserAccessRecoveryRestService.initialize should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.validateToken).toHaveBeenCalled();
    });
  });

  describe('sendPasswordReset method', function() {
    beforeEach(function() {
      spyOn(service, 'sendPasswordReset').and.callThrough();
      spyOn(Injections.UserAccessRecoveryRestService, 'sendPasswordReset').and.callThrough();
      service.sendPasswordReset();
    });

    it('should validateToken be defined', function() {
      expect(service.sendPasswordReset).toHaveBeenCalled();
      expect(service.sendPasswordReset).not.toBeNull();
    });

    it('method UserAccessRecoveryRestService.sendPasswordReset should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.sendPasswordReset).toHaveBeenCalled();
    });
  });

  describe('sendPasswordReset method', function() {
    beforeEach(function() {
      spyOn(service, 'sendPasswordReset').and.callThrough();
      spyOn(Injections.UserAccessRecoveryRestService, 'sendPasswordReset').and.callThrough();
      service.sendPasswordReset();
    });

    it('should validateToken be defined', function() {
      expect(service.sendPasswordReset).toHaveBeenCalled();
      expect(service.sendPasswordReset).not.toBeNull();
    });

    it('method UserAccessRecoveryRestService.sendPasswordReset should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.sendPasswordReset).toHaveBeenCalled();
    });
  });

  describe('updatePassword method', function() {
    beforeEach(function() {
      spyOn(service, 'updatePassword').and.callThrough();
      spyOn(Injections.UserAccessRecoveryRestService, 'updatePassword').and.callThrough();
      service.updatePassword();
    });

    it('should validateToken be defined', function() {
      expect(service.updatePassword).toHaveBeenCalled();
      expect(service.updatePassword).not.toBeNull();
    });

    it('method UserAccessRecoveryRestService.sendPasswordReset should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.updatePassword).toHaveBeenCalled();
    });
  });
});