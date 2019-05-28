xdescribe('otusDashboardDisplay test', function () {
  var Mock = {};
  var $controller;
  var ctrl;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function () {
    Mock.UserAccessPermissionService = {
      getCheckingLaboratoryPermission: () => { }
    };

    Mock.ParticipantLaboratoryService = {
      getCheckingExist: () => { }
    };

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.user.business.UserAccessPermissionService', Mock.UserAccessPermissionService);
      $provide.value('otusjs.laboratory.business.participant.ParticipantLaboratoryService', Mock.ParticipantLaboratoryService);
    })
  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_) {
      $controller = _$controller_;
      Injections = {
        UserAccessPermissionService: Mock.UserAccessPermissionService,
        ParticipantLaboratoryService: Mock.ParticipantLaboratoryService
      };
      ctrl = $controller('otusDashboardDisplayCtrl', Injections);
    });
  });

  describe('onInit method', () => {
    beforeEach(() => {
      spyOn(ctrl, '$onInit').and.callThrough();
      spyOn(Mock.UserAccessPermissionService, 'getCheckingLaboratoryPermission').and.callThrough();
      spyOn(Mock.ParticipantLaboratoryService, 'getCheckingExist').and.callThrough();

      ctrl.$onInit();
    });

    it('should onInit be defined', () => {
      expect(Mock.UserAccessPermissionService.getCheckingLaboratoryPermission).toHaveBeenCalledTimes(1);
    });
  });

});
