(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.PlayerService', Service);

  Service.$inject = [
    'otusjs.player.core.player.PlayerService',
    'otusjs.player.core.player.PlayerConfigurationService',
    'otusjs.deploy.PrePlayerStepService',
    'otusjs.deploy.ExitPlayerStepService',
    'otusjs.deploy.StopPlayerStepService',
    'otusjs.deploy.SavePlayerStepService',
    '$q',
    '$timeout'
  ];

  function Service(PlayerService, PlayerConfigurationService, PrePlayerStepService, ExitPlayerStepService, StopPlayerStepService, SavePlayerStepService, $q, $timeout) {
    var self = this;
    var _isSetupStepsReady = false;

    /* Public methods */
    self.setup = setup;

    function setup() {
      if (!_isSetupStepsReady) {
        _setupSteps();
      }
      PlayerService.setup();
    }

    function _setupSteps() {
      // Application default steps
      PlayerConfigurationService.onPrePlayerStart(PrePlayerStepService);
      PlayerConfigurationService.onEject(ExitPlayerStepService);
      PlayerConfigurationService.onEject(SavePlayerStepService);
      PlayerConfigurationService.onSave(SavePlayerStepService);
      PlayerConfigurationService.onStop(StopPlayerStepService);
      _isSetupStepsReady = true;
    }

  }
}());
