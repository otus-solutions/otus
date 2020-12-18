describe('LaboratoryViewerService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(($injector, $q, $rootScope) => {
      Injections.LaboratoryRepositoryService = $injector.get('otusjs.laboratory.repository.LaboratoryRepositoryService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');

      service = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService', Injections);

      _mockInitialize($q, $rootScope);
    });
  });

  it('service_existence_check', () => {
    expect(service).toBeDefined();
  });

  it('service_methods_existence_check', () => {
    expect(service.checkExistAndRunOnInitOrBackHome).toBeDefined();
  });

  describe('checkExistAndRunOnInitOrBackHome_method', () => {

    function _spyOn(promiseResult){
      spyOn(Injections.LaboratoryRepositoryService, 'checkLaboratoryConfiguration').and.returnValue(promiseResult);
      spyOn(Mock, 'onInit');
      spyOn(Mock, 'finishLoadingScreen');
      spyOn(Injections.ApplicationStateService, 'activateDashboard');
    }

    function _expects(promiseResult){
      Mock.$scope.$digest();

      let onInitCalls = (promiseResult == Mock.resolve ? 1 : 0);
      let finishLoadingScreenCalls = 1 - onInitCalls;

      expect(Injections.LaboratoryRepositoryService.checkLaboratoryConfiguration).toHaveBeenCalledTimes(1);
      expect(Mock.onInit).toHaveBeenCalledTimes(onInitCalls);
      expect(Mock.finishLoadingScreen).toHaveBeenCalledTimes(finishLoadingScreenCalls);
      expect(Mock.finishLoadingScreen).toHaveBeenCalledTimes(finishLoadingScreenCalls);
    }

    it('should_call_onInit_callback', () => {
      _spyOn(Mock.resolve);
      service.checkExistAndRunOnInitOrBackHome(Mock.onInit);
      _expects(Mock.resolve);
    });

    it('should_call_finishLoadingScreen_callback_and_activateDashboard_state', () => {
      _spyOn(Mock.reject);
      service.checkExistAndRunOnInitOrBackHome(Mock.onInit, Mock.finishLoadingScreen);
      _expects(Mock.reject);
    });

  });

  function _mockInitialize($q, $rootScope){
    Mock.onInit = function() {};
    Mock.finishLoadingScreen = function() {};

    Mock.$scope = $rootScope.$new();

    const deferredResolve = $q.defer();
    deferredResolve.resolve();
    Mock.resolve = deferredResolve.promise;

    const deferredReject = $q.defer();
    deferredReject.reject('some error');
    Mock.reject = deferredReject.promise;
  }

});