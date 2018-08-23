describe('UserAccessRecoveryRestService', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.UserAccessRecoveryRestService';

  beforeEach(function () {
    Mock.OtusRestResourceService = {
      getPasswordResetResource: function () {
        return true;
      },
      validationToken: function () {
        return Promise.resolve();
      },
      requestRecovery: function () {
        return Promise.resolve();
      },
      updatePassword: function () {
        return Promise.resolve();
      }
    };

    angular.mock.module('otusjs.deploy');
    angular.mock.module(function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function (_$injector_) {
      Injections = {
        OtusRestResourceService: _$injector_.get('OtusRestResourceService'),
      };
      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('initialize method', function () {
    beforeEach(function () {
      spyOn(service, 'initialize').and.callThrough();
      spyOn(Injections.OtusRestResourceService, 'getPasswordResetResource').and.callThrough();
      service.initialize();
    });

    it('should initialize be defined', function () {
      expect(service.initialize).toHaveBeenCalled();
      expect(service.initialize).not.toBeNull();
    });
  });

  describe('validateToken method', function () {
    beforeEach(function () {
      spyOn(service, 'validateToken').and.callThrough();
      spyOn(Injections.OtusRestResourceService, 'validationToken').and.callThrough();
      service.validateToken();
    });

    it('should validateToken be defined', function () {
      expect(service.validateToken).toHaveBeenCalled();
      expect(service.validateToken).not.toBeNull();
    });
  });

  describe('sendPasswordReset method', function () {
    beforeEach(function () {
      spyOn(service, 'sendPasswordReset').and.callThrough();
      spyOn(Injections.OtusRestResourceService, 'requestRecovery').and.callThrough();
      service.sendPasswordReset();
    });

    it('should sendPasswordReset be defined', function () {
      expect(service.sendPasswordReset).toHaveBeenCalled();
      expect(service.sendPasswordReset).not.toBeNull();
    });
  });

  describe('updatePassword method', function () {
    beforeEach(function () {
      spyOn(service, 'sendPasswordReset').and.callThrough();
      spyOn(Injections.OtusRestResourceService, 'updatePassword').and.callThrough();
      service.updatePassword();
    });

    it('should updatePassword be defined', function () {
      expect(service.updatePassword).toHaveBeenCalled();
      expect(service.updatePassword).not.toBeNull();
    });
  });
});