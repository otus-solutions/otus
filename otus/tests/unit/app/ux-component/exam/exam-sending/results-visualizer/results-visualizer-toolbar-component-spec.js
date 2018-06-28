xdescribe('Lot info manager display component', function () {
  var Mock = {};
  var $controller;
  var ctrl;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function () {
    Mock.SendingExamService = {};
    Mock.AliquotErrorReportingService = {};
    Mock.ContextService = {};
    Mock.ApplicationStateService = {};
    Mock.LoadingScreenService = {};

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.business.project.sending.SendingExamService', Mock.SendingExamService);
      $provide.value('otusjs.laboratory.business.project.sending.AliquotErrorReportingService', Mock.AliquotErrorReportingService);
      $provide.value('otusjs.laboratory.core.project.ContextService', Mock.ContextService);
      $provide.value('otusjs.application.state.ApplicationStateService', Mock.ApplicationStateService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
    });
  });

  beforeEach(function () {

    inject(function (_$injector_, _$controller_) {
      $controller = _$controller_;
      Injections = {
        $mdDialog: _$injector_.get('$mdDialog'),
        $mdToast: _$injector_.get('$mdToast'),
        $filter: _$injector_.get('$filter'),
        AliquotErrorReportingService: _$injector_.get('otusjs.laboratory.business.project.sending.AliquotErrorReportingService')
      };
      ctrl = $controller('otusResultVisualizerManagerToolbarCtrl', Injections);
      mockLotAliquotList(ctrl);
    });
  });

  describe('method', () => {
    it('Sempre true', () => {
      expect(true).toBe(true);
    });
  });
});