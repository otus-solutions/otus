(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.PlayerService', Service);

  Service.$inject = [
    'otusjs.player.core.player.PlayerService',
    'otusjs.player.core.player.PlayerConfigurationService',
    'otusjs.deploy.ExitPlayerStepService',
    'otusjs.deploy.StopPlayerStepService',
    'otusjs.deploy.SavePlayerStepService',
  ];

  function Service(PlayerService, PlayerConfigurationService, ExitPlayerStepService, StopPlayerStepService, SavePlayerStepService) {
    var self = this;

    /* Public methods */
    self.setup = setup;

    function setup(configuration) {
      // Module custom steps
      configuration.onEject.forEach(PlayerConfigurationService.onEject);
      configuration.onSave.forEach(PlayerConfigurationService.onSave);

      // Application default steps
      PlayerConfigurationService.onStop(StopPlayerStepService);
      PlayerConfigurationService.onEject(ExitPlayerStepService);
      PlayerConfigurationService.onSave(SavePlayerStepService);

      PlayerService.setup();
    }
  }
}());
