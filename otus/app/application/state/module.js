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
    '$state'
  ];

  function Run(STATE, OtusApiService, $rootScope, $injector, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      if (toState.data && toState.data.redirect) {
        $injector
          .invoke(toState.data.redirect)
          .then(function(redirectTo) {
            event.preventDefault();
            if (redirectTo) {
              $state.go(redirectTo);
            }
          });
          _loadRestrictResourses(toState.name);
      }
    });

    $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
      evt.preventDefault();
      console.error(error.message);
      if (error.redirectTo) {
        $state.go(error.redirectTo);
      } else {
        $state.go('error', {
          status: error.status
        });
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
