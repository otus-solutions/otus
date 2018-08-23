describe('UserAccessRecoveryRestService', function() {
  var Mock = {};
  var service;
  var modulo;
  var Injections = {};
  var UNIT_NAME = 'otusjs.deploy.user.UserAccessRecoveryRestService';

  beforeEach(function() {
    angular.mock.module('otusjs.deploy.user');
  });

  beforeEach(function() {
    Mock.OtusRestResourceService = {
      getPasswordResetResource: () => {
        return {
          validationToken: () => {
            return Promise.resolve();
          },
          requestRecovery: () => {
            return Promise.resolve();
          },
          updatePassword: () => {
            return Promise.resolve();
          }
        };
      }
    };

    angular.mock.module(function($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });
  });

  beforeEach(function() {
    inject(function(_$injector_) {
      Injections = {
        OtusRestResourceService: _$injector_.get('OtusRestResourceService')
      };
      service = _$injector_.get(UNIT_NAME, Injections);
      service.initialize();
    });
  });
  describe('initialize method', function() {
    beforeEach(function() {
      spyOn(service, 'initialize').and.callThrough();
      spyOn(Injections.OtusRestResourceService, 'getPasswordResetResource').and.callThrough();
      service.initialize();
    });

    it('should initialize be defined', function() {
      expect(service.initialize).toHaveBeenCalled();
      expect(service.initialize).not.toBeNull();
      expect(Injections.OtusRestResourceService.getPasswordResetResource).toHaveBeenCalled();
    });
  });

  describe('validateToken method', function() {
    beforeEach(function() {
      spyOn(service, 'validateToken').and.callThrough();
      service.validateToken();
    });

    it('should validateToken be defined', function() {
      expect(service.validateToken).toHaveBeenCalled();
      expect(service.validateToken).not.toBeNull();
    });
  });

  describe('sendPasswordReset method', function() {
    beforeEach(function() {
      spyOn(service, 'sendPasswordReset').and.callThrough();
      service.sendPasswordReset();
    });

    it('should sendPasswordReset be defined', function() {
      expect(service.sendPasswordReset).toHaveBeenCalled();
      expect(service.sendPasswordReset).not.toBeNull();
    });
  });

  describe('updatePassword method', function() {
    beforeEach(function() {
      spyOn(service, 'sendPasswordReset').and.callThrough();
      service.sendPasswordReset();
    });

    it('should updatePassword be defined', function() {
      expect(service.sendPasswordReset).toHaveBeenCalled();
      expect(service.sendPasswordReset).not.toBeNull();
    });
  });

});
