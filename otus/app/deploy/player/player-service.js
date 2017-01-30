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

    function setup() {
      // Module custom steps
      // configuration.onEject.forEach(PlayerConfigurationService.onEject);
      // configuration.onSave.forEach(PlayerConfigurationService.onSave);

      // Application default steps
      PlayerConfigurationService.onEject(ExitPlayerStepService);
      PlayerConfigurationService.onEject(SavePlayerStepService);
      PlayerConfigurationService.onSave(SavePlayerStepService);
      PlayerConfigurationService.onStop(StopPlayerStepService);

      PlayerService.setup();
    }
  }
}());
