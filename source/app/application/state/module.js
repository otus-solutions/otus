(function() {
  'use strict';

  angular
    .module('otusjs.application.state', [])
    .run(Run);

  Run.$inject = [
    'STATE',
    'otusjs.deploy.OtusApiService',
    '$rootScope',
    '$injector',
    '$state',
    '$transitions'
  ];

  function Run(STATE, OtusApiService, $rootScope, $injector, $state, $transitions) {
    $transitions.onBefore({}, function(transition) {
      let toState = transition.to();
      if (toState.data && toState.data.redirect) {
        $injector
          .invoke(toState.data.redirect)
          .then(function(redirectTo) {
            if (redirectTo) {
              $state.go(redirectTo);
            }
          });
        _loadRestrictResourses(toState.name);
      }
    });

    /**
     * Initialize the Rest Services that cannot be initialized before de login
     */
    function _loadRestrictResourses(toState) {
      if(toState != STATE.LOGIN){
        OtusApiService.initializeRestrictResources();
      }
    }

    var currentModule = angular.module('otusjs.application.state');
    var application = $injector.get('otusjs.application.core.ModuleService');
    application.notifyModuleLoad(currentModule.name);
    console.info('State module ready.');
  }

}());
