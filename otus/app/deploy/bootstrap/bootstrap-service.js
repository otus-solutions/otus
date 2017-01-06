(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.BootstrapService', Service);

  Service.$inject = [
    'otusjs.deploy.DataSourceLoaderService',
    'otusjs.deploy.AccessModuleBootstrap',
    'otusjs.deploy.ActivityModuleBootstrap',
    'otusjs.deploy.ApplicationModuleBootstrap',
    'otusjs.deploy.ParticipantModuleBootstrap',
    'otusjs.deploy.SessionModuleBootstrap',
    'otusjs.deploy.UserModuleBootstrap',
    'otusjs.user.access.core.ModuleService',
    'otusjs.activity.core.ModuleService',
    'otusjs.application.core.ModuleService',
    'otusjs.otus.dashboard.core.ModuleService',
    'otusjs.participant.core.ModuleService',
    'otusjs.application.session.core.ModuleService',
    'otusjs.user.core.ModuleService'
  ];

  function Service(
    DataSourceLoaderService,
    AccessModuleBootstrap, ActivityModuleBootstrap, ApplicationModuleBootstrap,
    ParticipantModuleBootstrap, SessionModuleBootstrap, UserModuleBootstrap,
    AccessModule, ActivityModule, ApplicationModule, DashboardModule, ParticipantModule, SessionModule, UserModule) {

    var self = this;

    self.run = run;

    function run() {
      ApplicationModuleBootstrap.bootstrap();
      AccessModuleBootstrap.bootstrap();
      ActivityModuleBootstrap.bootstrap();
      ParticipantModuleBootstrap.bootstrap();
      SessionModuleBootstrap.bootstrap();
      UserModuleBootstrap.bootstrap();

      //--------------------------------------------------------------------------------------------
      // Here the application identifies if should recover a "logged state" or request a new
      // authentication to user.
      //--------------------------------------------------------------------------------------------
      if (SessionModule.hasContextActive()) {
        AccessModule.ignore();
        DashboardModule.recover();
      }

      //--------------------------------------------------------------------------------------------
      // AccessModule setup.
      //--------------------------------------------------------------------------------------------
      AccessModule.Service.Authentication = UserModule.Service.UserAuthenticationService;
      //--------------------------------------------------------------------------------------------
      // ActivityModule setup.
      //--------------------------------------------------------------------------------------------
      ActivityModule.DataSource.User = UserModule.DataSource.User;
      //--------------------------------------------------------------------------------------------
      // DashboardModule setup.
      //--------------------------------------------------------------------------------------------
      // DashboardModule.DataSources.configureParticipant(ParticipantModule.DataSources.getParticipant());

      //--------------------------------------------------------------------------------------------
      // Setup event listening for modules.
      //--------------------------------------------------------------------------------------------
      // From Access Module to...
      AccessModule.onLogin(SessionModule.Event.fireLogin);
      AccessModule.onLogin(DashboardModule.Event.fireLogin);
      AccessModule.onLogin(ActivityModule.Event.fireLogin);
      AccessModule.onLogin(DataSourceLoaderService.initializeDataSources);
      // AccessModule.onLogout(SessionModule.Event.fireLogout);
      AccessModule.onLogout(DashboardModule.Event.fireLogout);
      AccessModule.onLogout(ParticipantModule.Event.fireLogout);
      AccessModule.onLogout(ActivityModule.Event.fireLogout);
      AccessModule.onLogout(SessionModule.Event.fireLogout);
      // From Session Module to...
      SessionModule.Event.onLogin(DataSourceLoaderService.initializeDataSources);
      SessionModule.Event.onLogin(DashboardModule.Event.fireLogin);
      SessionModule.Event.onLogin(ActivityModule.Event.fireLogin);
      // From Participant Module to...
      ParticipantModule.Event.onParticipantSelected(ActivityModule.Event.fireParticipantSelected);
      ParticipantModule.Event.onParticipantSelected(DashboardModule.Event.fireParticipantSelected);

      ApplicationModuleBootstrap.beginApplicationContext();
    }
  }
}());
