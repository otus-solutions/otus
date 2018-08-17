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
      getRecovery: function () {
        return Promise.resolve();
      },
      updatePassword: function () {
        return Promise.resolve();
      }
    };
    
    angular.mock.module('otusjs.user.access.service');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.deploy.UserAccessRecoveryRestService', Mock.UserAccessRecoveryRestService);
    });

    inject(function(_$injector_) {
      Injections = {
        UserAccessRecoveryRestService: _$injector_.get('otusjs.deploy.UserAccessRecoveryRestService'),
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

  describe('recovery method', function() {
    beforeEach(function() {
      spyOn(service, 'recovery').and.callThrough();
      spyOn(Injections.UserAccessRecoveryRestService, 'getRecovery').and.callThrough();
      service.recovery();
    });

    it('should validateToken be defined', function() {
      expect(service.recovery).toHaveBeenCalled();
      expect(service.recovery).not.toBeNull();
    });

    it('method UserAccessRecoveryRestService.getRecovery should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.getRecovery).toHaveBeenCalled();
    });
  });

  describe('recovery method', function() {
    beforeEach(function() {
      spyOn(service, 'recovery').and.callThrough();
      spyOn(Injections.UserAccessRecoveryRestService, 'getRecovery').and.callThrough();
      service.recovery();
    });

    it('should validateToken be defined', function() {
      expect(service.recovery).toHaveBeenCalled();
      expect(service.recovery).not.toBeNull();
    });

    it('method UserAccessRecoveryRestService.getRecovery should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.getRecovery).toHaveBeenCalled();
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

    it('method UserAccessRecoveryRestService.getRecovery should to have been called', function() {
      expect(Injections.UserAccessRecoveryRestService.updatePassword).toHaveBeenCalled();
    });
  });



  // beforeEach(angular.mock.module('otusjs.user.access.service'));
  // beforeEach(angular.mock.module(function ($provide) {
  //   mockStruture();
  //   $provide.value('otusjs.deploy.UserAccessRecoveryRestService', {
  //     ValidateToken: function (response) {
  //       return Promise.resolve(true);
  //     },
  //     recovery: function () {
  //       return Promise.resolve(Mock.token);
  //     },
  //     updatePassword: function () {
  //       return Promise.resolve(true);
  //     }
  //   });
  // }));
  // beforeEach(function () {
  //   inject(function (_$injector_) {
  //     Injections = {
  //       "OtusRestResourceService": _$injector_.get('otusjs.participant.core.OtusRestResourceService'),
  //     };
  //     service = _$injector_.get('otusjs.user.access.service.UserAccessRecoveryService', Injections);
  //   });
  // });
  // describe('onInit method', function () {
  //   it('should return structure expected', function () {
  //     expect(true).toBe(true);
  //   });
  // });
  //
  // function mockStruture() {
  //   Mock.token = 'CKXsdZUfJoYpyx2EMNcUcovyfIOj25B6FvT6qzK0'
  // }
  //
  // function mockInjections($injector) {
  //   Mock.UserAccessRecoveryRestService = $injector.get('otusjs.deploy.UserAccessRecoveryRestService');
  // }
});