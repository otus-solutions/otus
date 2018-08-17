xdescribe('UserAccessRecoveryService', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(angular.mock.module('otusjs.user.access.service'));
  beforeEach(angular.mock.module(function ($provide) {
    mockStruture();
    $provide.value('otusjs.deploy.UserAccessRecoveryRestService', {
      ValidateToken: function (response) {
        return Promise.resolve(true);
      },
      recovery: function () {
        return Promise.resolve(Mock.token);
      },
      updatePassword: function () {
        return Promise.resolve(true);
      }
    });
  }));
  beforeEach(function () {
    inject(function (_$injector_) {
      Injections = {
        "OtusRestResourceService": _$injector_.get('otusjs.participant.core.OtusRestResourceService'),
      };
      service = _$injector_.get('otusjs.user.access.service.UserAccessRecoveryService', Injections);
    });
  });
  describe('onInit method', function () {
    it('should return structure expected', function () {
      expect(true).toBe(true);
    });
  });

  function mockStruture() {
    Mock.token = 'CKXsdZUfJoYpyx2EMNcUcovyfIOj25B6FvT6qzK0'
  }

  function mockInjections($injector) {
    Mock.UserAccessRecoveryRestService = $injector.get('otusjs.deploy.UserAccessRecoveryRestService');
  }
});