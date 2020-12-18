describe('BootstrapService_UnitTest_Suite', () => {
  let service;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');
    angular.mock.inject($injector => {
      Injections.OtusApiService = $injector.get('otusjs.deploy.OtusApiService');
      Injections.DataSourceLoaderService = $injector.get('otusjs.deploy.DataSourceLoaderService');
      Injections.AccessModuleBootstrap = $injector.get('otusjs.deploy.AccessModuleBootstrap');
      Injections.ActivityModuleBootstrap = $injector.get('otusjs.deploy.ActivityModuleBootstrap');
      Injections.ApplicationModuleBootstrap = $injector.get('otusjs.deploy.ApplicationModuleBootstrap');
      Injections.ParticipantModuleBootstrap = $injector.get('otusjs.deploy.ParticipantModuleBootstrap');
      Injections.SessionModuleBootstrap = $injector.get('otusjs.deploy.SessionModuleBootstrap');
      Injections.UserModuleBootstrap = $injector.get('otusjs.deploy.UserModuleBootstrap');
      Injections.LaboratoryModuleBootstrap = $injector.get('otusjs.deploy.LaboratoryModuleBootstrap');
      Injections.AccessModule = $injector.get('otusjs.user.access.core.ModuleService');
      Injections.ActivityModule = $injector.get('otusjs.activity.core.ModuleService');
      Injections.LaboratoryModule = $injector.get('otusjs.laboratory.core.ModuleService');
      Injections.ApplicationModule = $injector.get('otusjs.application.core.ModuleService');
      Injections.DashboardModule = $injector.get('otusjs.otus.dashboard.core.ModuleService');
      Injections.ParticipantModule = $injector.get('otusjs.participant.core.ModuleService');
      Injections.SessionModule = $injector.get('otusjs.application.session.core.ModuleService');
      Injections.UserModule = $injector.get('otusjs.user.core.ModuleService');
      Injections.StorageLoaderService = $injector.get('otusjs.deploy.StorageLoaderService');
      Injections.ProjectModuleBootstrap = $injector.get('otusjs.deploy.ProjectModuleBootstrap');
      Injections.ReportModuleBootstrap = $injector.get('otusjs.deploy.ReportModuleBootstrap');
      Injections.MonitoringModuleBootstrap = $injector.get('otusjs.deploy.MonitoringModuleBootstrap');
      Injections.PendencyModuleBootstrap = $injector.get('otus.deploy.PendencyModuleBootstrap');
      Injections.ProjectCommunicationModuleBootstrap = $injector.get('otus.deploy.ProjectCommunicationModuleBootstrap');
      Injections.StageModuleBootstrap = $injector.get('otusjs.deploy.StageModuleBootstrap');

      service = $injector.get('otusjs.deploy.BootstrapService', Injections);
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.run).toBeDefined();
  });

  it('run_method_should_evoke_bootstraps_of_injections', () => {
    spyOn(Injections.AccessModuleBootstrap, 'bootstrap');
    spyOn(Injections.ActivityModuleBootstrap, 'bootstrap');
    spyOn(Injections.ParticipantModuleBootstrap, 'bootstrap');
    spyOn(Injections.UserModuleBootstrap, 'bootstrap');
    spyOn(Injections.LaboratoryModuleBootstrap, 'bootstrap');
    spyOn(Injections.ProjectModuleBootstrap, 'bootstrap');
    spyOn(Injections.ReportModuleBootstrap, 'bootstrap');
    spyOn(Injections.MonitoringModuleBootstrap, 'bootstrap');
    spyOn(Injections.PendencyModuleBootstrap, 'bootstrap');
    spyOn(Injections.ProjectCommunicationModuleBootstrap, 'bootstrap');
    spyOn(Injections.StageModuleBootstrap, 'bootstrap');

    service.run();
    
    expect(Injections.AccessModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.ActivityModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.UserModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.LaboratoryModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.ProjectModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.ReportModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.MonitoringModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.PendencyModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.ProjectCommunicationModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
    expect(Injections.StageModuleBootstrap.bootstrap).toHaveBeenCalledTimes(1);
  });

  it('run_method_should_evoke_AccessModule_ignore_and_DashboardModule_recover_in_case_SessionModule_hasContextActive_return_true', () => {
    spyOn(Injections.SessionModule, 'hasContextActive').and.returnValue(true);
    spyOn(Injections.AccessModule, 'ignore');
    spyOn(Injections.DashboardModule, 'recover');
    service.run();
    expect(Injections.AccessModule.ignore).toHaveBeenCalledTimes(1);
    expect(Injections.DashboardModule.recover).toHaveBeenCalledTimes(1);
  });

});
