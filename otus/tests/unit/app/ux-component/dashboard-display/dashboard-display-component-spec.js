describe('otusDashboardDisplay test', function () {
  var ctrl;
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.module('otusjs.laboratory');
    angular.mock.module('otusjs.otus.laboratory');
    angular.mock.module('otusjs.user');
    angular.mock.module('otusjs.otus.dashboard');

    angular.mock.inject(function (_$injector_, _$controller_) {

      Injections.EventService = _$injector_.get('otusjs.otus.dashboard.core.EventService');
      Injections.DashboardService = _$injector_.get('otusjs.otus.dashboard.service.DashboardService');
      Injections.UserAccessPermissionService = _$injector_.get('otusjs.user.business.UserAccessPermissionService');
      Injections.ParticipantLaboratoryService = _$injector_.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');

      ctrl =  _$controller_('otusDashboardDisplayCtrl', Injections);

      spyOn(Injections.EventService, 'onParticipantSelected').and.callThrough();
      spyOn(Injections.DashboardService, 'getSelectedParticipant').and.callThrough();
      spyOn(Injections.UserAccessPermissionService, 'getCheckingLaboratoryPermission').and.callThrough();
      spyOn(Injections.ParticipantLaboratoryService, 'getCheckingExist').and.callThrough();

    });
  });

  it('ctrlExistence_check', function () {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', function () {
    expect(ctrl.$onInit).toBeDefined();
  });

  it('onInit_method_should_evoke_internalMethods', function () {
    ctrl.$onInit();
    expect(Injections.EventService.onParticipantSelected).toHaveBeenCalledTimes(1);
    expect(Injections.DashboardService.getSelectedParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantLaboratoryService.getCheckingExist).toHaveBeenCalledTimes(1);
    expect(Injections.UserAccessPermissionService.getCheckingLaboratoryPermission).toHaveBeenCalledTimes(1);
  });

});
