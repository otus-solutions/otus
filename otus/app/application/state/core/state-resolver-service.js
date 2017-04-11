(function() {
  'use strict';

  angular
    .module('otusjs.application.state')
    .service('otusjs.application.state.RouteResolverService', Service);

  Service.$inject = [
    '$injector',
    '$rootScope',
    '$state',
    'otusjs.application.state.ApplicationStateService'
  ];

  function Service($injector, $rootScope, $state, ApplicationStateService) {
    var self = this;

    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    //   if (toState.data && toState.data.redirect) {
    //     var redirectTo = $injector.invoke(toState.data.redirect);
    //     if (redirectTo) {
    //       event.preventDefault();
    //       $state.go(redirectTo);
    //     }
    //   }
    // });
    //
    // $rootScope.$on('$stateChangeError', function(evt, to, toParams, from, fromParams, error) {
    //   evt.preventDefault();
    //   if (error.redirectTo) {
    //     $state.go(error.redirectTo);
    //   } else {
    //     $state.go('error', {
    //       status: error.status
    //     });
    //   }
    // });

    $rootScope.$on('$stateChangeSuccess', function(evt, to, toParams, from, fromParams) {
      ApplicationStateService.setCurrentState(to);
    });
  }
}());
