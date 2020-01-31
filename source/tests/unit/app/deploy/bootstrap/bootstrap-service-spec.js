describe('BootstrapService_UnitTest_Suite', () => {
  let service;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.PendencyModuleBootstrap = $injector.get('otus.deploy.PendencyModuleBootstrap');
      service = $injector.get('otusjs.deploy.BootstrapService', Injections);
      spyOn(Injections.PendencyModuleBootstrap, 'bootstrap')
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.run).toBeDefined();
  });

  it('runMethod_should_evoke_bootstraps_of_injections', () => {
    service.run();
    expect(Injections.PendencyModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1)
  });

});
